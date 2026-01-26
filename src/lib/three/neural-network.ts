import { Vector3 } from 'three';

// ============================================
// Constants
// ============================================

export const NODE_COUNT = 35; // 30-40 nodes for localized effect
export const NODE_RADIUS = 0.06; // Small sphere size
export const NODE_SEGMENTS = 12; // Sphere detail (lower = better performance)

// Connection settings
export const CONNECTION_DISTANCE = 2.5; // Max distance for connection
export const MAX_CONNECTIONS_PER_NODE = 4; // Limit connections to prevent clutter

// Animation settings
export const FLOAT_AMPLITUDE = 0.25; // Movement range (0.1-0.3 for subtlety)
export const FLOAT_FREQUENCY = 0.4; // Speed of oscillation

// Physics/Inertia settings
export const SPRING_STIFFNESS = 3.0;    // How strongly nodes return to base position
export const GLOBAL_DAMPING = 0.94;     // Prevents oscillation (0.85-0.98)
export const MASS_MIN = 0.5;            // Lightest nodes (respond fastest)
export const MASS_MAX = 2.0;            // Heaviest nodes (respond slowest)
export const NODE_DAMPING_MIN = 0.88;
export const NODE_DAMPING_MAX = 0.96;
export const MAX_VELOCITY = 5.0;        // Prevents instability

// Gravity settings (cursor as center of gravity)
export const GRAVITY_STRENGTH = 0.15;   // Base gravitational pull toward center
export const GRAVITY_FALLOFF = 0.3;     // How quickly gravity weakens with distance

// Pulse settings
export const MAX_PULSES = 6; // Maximum active pulses at once
export const PULSE_SPAWN_INTERVAL = 1.0; // Seconds between pulse spawns
export const PULSE_SPEED = 0.4; // Progress per second (0-1 range)
export const PULSE_RADIUS = 0.05; // Small sphere radius for pulses

// Spread bounds for node positions (centered in canvas)
export const BOUNDS = {
  x: { min: -3, max: 3 },
  y: { min: -3, max: 3 },
  z: { min: -2, max: 2 },
};

// Colors from design tokens
export const COLORS = {
  node: '#575757',        // text-muted
  connection: '#313131',  // border
  pulse: '#a855f7',       // purple
};

// ============================================
// Types
// ============================================

export interface NodeData {
  position: Vector3;
  basePosition: Vector3; // Original position for floating animation
  phase: Vector3;        // Phase offsets for sine wave animation
  // Physics properties
  velocity: Vector3;     // Current velocity
  mass: number;          // 0.5-2.0 range (affects response speed)
  damping: number;       // Per-node damping coefficient
  floatOffset: Vector3;  // Sine wave offset (calculated each frame)
}

// Reusable Vector3 objects (avoid GC pressure in animation loop)
const _tempDisplacement = new Vector3();
const _tempForce = new Vector3();
const _tempAcceleration = new Vector3();
const _tempTarget = new Vector3();
const _tempVelocityDelta = new Vector3();
const _tempGravity = new Vector3();
const _gravityCenter = new Vector3(0, 0, 0); // Center of canvas = cursor position

export interface Connection {
  startIndex: number;
  endIndex: number;
  distance: number;
}

export interface Pulse {
  connectionIndex: number;
  progress: number; // 0 to 1
  position: Vector3;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Generate a random number within a range
 */
export function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generate initial node data with random positions and phases
 */
export function generateNodeData(): NodeData[] {
  const nodes: NodeData[] = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    const position = new Vector3(
      randomInRange(BOUNDS.x.min, BOUNDS.x.max),
      randomInRange(BOUNDS.y.min, BOUNDS.y.max),
      randomInRange(BOUNDS.z.min, BOUNDS.z.max)
    );

    nodes.push({
      position: position.clone(),
      basePosition: position.clone(),
      phase: new Vector3(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ),
      // Physics properties
      velocity: new Vector3(0, 0, 0),
      mass: randomInRange(MASS_MIN, MASS_MAX),
      damping: randomInRange(NODE_DAMPING_MIN, NODE_DAMPING_MAX),
      floatOffset: new Vector3(0, 0, 0),
    });
  }

  return nodes;
}

/**
 * Calculate connections between nearby nodes
 * Limits connections per node to prevent visual clutter
 */
export function calculateConnections(nodes: NodeData[]): Connection[] {
  const connections: Connection[] = [];
  const connectionCount: number[] = new Array(nodes.length).fill(0);

  // Check all pairs of nodes
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      // Skip if either node has reached max connections
      if (
        connectionCount[i] >= MAX_CONNECTIONS_PER_NODE ||
        connectionCount[j] >= MAX_CONNECTIONS_PER_NODE
      ) {
        continue;
      }

      const distance = nodes[i].position.distanceTo(nodes[j].position);

      if (distance <= CONNECTION_DISTANCE) {
        connections.push({
          startIndex: i,
          endIndex: j,
          distance,
        });
        connectionCount[i]++;
        connectionCount[j]++;
      }
    }
  }

  return connections;
}

/**
 * Build line positions array for BufferGeometry
 * Returns Float32Array with [x1, y1, z1, x2, y2, z2, ...] for each connection
 */
export function buildConnectionPositions(
  nodes: NodeData[],
  connections: Connection[]
): Float32Array {
  const positions = new Float32Array(connections.length * 6); // 2 points × 3 coords per connection

  connections.forEach((conn, i) => {
    const start = nodes[conn.startIndex].position;
    const end = nodes[conn.endIndex].position;
    const offset = i * 6;

    positions[offset] = start.x;
    positions[offset + 1] = start.y;
    positions[offset + 2] = start.z;
    positions[offset + 3] = end.x;
    positions[offset + 4] = end.y;
    positions[offset + 5] = end.z;
  });

  return positions;
}

/**
 * Update node positions based on time using sine wave animation
 * Modifies positions in place for performance
 */
export function updateNodePositions(nodes: NodeData[], time: number): void {
  const scaledTime = time * FLOAT_FREQUENCY;

  nodes.forEach((node) => {
    node.position.x =
      node.basePosition.x + Math.sin(scaledTime + node.phase.x) * FLOAT_AMPLITUDE;
    node.position.y =
      node.basePosition.y + Math.sin(scaledTime * 0.8 + node.phase.y) * FLOAT_AMPLITUDE;
    node.position.z =
      node.basePosition.z + Math.sin(scaledTime * 0.6 + node.phase.z) * FLOAT_AMPLITUDE * 0.5;
  });
}

/**
 * Update node positions with gravity-based physics
 * Cursor acts as center of gravity - nodes are attracted toward it
 * Each node responds at different speeds based on mass
 */
export function updateNodePositionsWithPhysics(
  nodes: NodeData[],
  time: number,
  deltaTime: number,
  canvasOffset: { x: number; y: number }
): void {
  const scaledTime = time * FLOAT_FREQUENCY;

  // Calculate gravity strength based on cursor movement (more movement = stronger pull)
  const cursorSpeed = Math.sqrt(canvasOffset.x * canvasOffset.x + canvasOffset.y * canvasOffset.y);
  const gravityMultiplier = 1 + (cursorSpeed * 0.002); // Boost gravity when cursor moves

  nodes.forEach((node) => {
    // 1. Calculate sine wave offset (base floating animation)
    node.floatOffset.set(
      Math.sin(scaledTime + node.phase.x) * FLOAT_AMPLITUDE,
      Math.sin(scaledTime * 0.8 + node.phase.y) * FLOAT_AMPLITUDE,
      Math.sin(scaledTime * 0.6 + node.phase.z) * FLOAT_AMPLITUDE * 0.5
    );

    // 2. Target = base position + floating offset
    _tempTarget.copy(node.basePosition).add(node.floatOffset);

    // 3. Calculate gravitational force toward center (cursor position)
    // Direction: from node toward center
    _tempGravity.subVectors(_gravityCenter, node.position);
    const distanceToCenter = _tempGravity.length();

    if (distanceToCenter > 0.1) {
      // Normalize and apply gravity (stronger when closer, with falloff)
      _tempGravity.normalize();
      const gravityForce = GRAVITY_STRENGTH * gravityMultiplier / (1 + distanceToCenter * GRAVITY_FALLOFF);
      _tempGravity.multiplyScalar(gravityForce);
    } else {
      _tempGravity.set(0, 0, 0);
    }

    // 4. Spring force to return to base floating position
    _tempDisplacement.subVectors(node.position, _tempTarget);
    _tempForce.copy(_tempDisplacement).multiplyScalar(-SPRING_STIFFNESS);

    // 5. Add gravity force
    _tempForce.add(_tempGravity);

    // 6. Add velocity damping
    _tempVelocityDelta.copy(node.velocity).multiplyScalar(-node.damping * 2);
    _tempForce.add(_tempVelocityDelta);

    // 7. Acceleration (F/m) - heavier nodes respond slower
    _tempAcceleration.copy(_tempForce).divideScalar(node.mass);

    // 8. Update velocity
    node.velocity.addScaledVector(_tempAcceleration, deltaTime);
    node.velocity.multiplyScalar(GLOBAL_DAMPING);

    // 9. Clamp velocity to prevent instability
    const speed = node.velocity.length();
    if (speed > MAX_VELOCITY) {
      node.velocity.multiplyScalar(MAX_VELOCITY / speed);
    }

    // 10. Update position
    node.position.addScaledVector(node.velocity, deltaTime);
  });
}

/**
 * Update connection positions in an existing Float32Array
 * More efficient than creating a new array each frame
 */
export function updateConnectionPositions(
  positions: Float32Array,
  nodes: NodeData[],
  connections: Connection[]
): void {
  connections.forEach((conn, i) => {
    const start = nodes[conn.startIndex].position;
    const end = nodes[conn.endIndex].position;
    const offset = i * 6;

    positions[offset] = start.x;
    positions[offset + 1] = start.y;
    positions[offset + 2] = start.z;
    positions[offset + 3] = end.x;
    positions[offset + 4] = end.y;
    positions[offset + 5] = end.z;
  });
}

// ============================================
// Pulse Functions
// ============================================

/**
 * Spawn a new pulse on a random connection
 */
export function spawnPulse(connections: Connection[]): Pulse | null {
  if (connections.length === 0) return null;

  const connectionIndex = Math.floor(Math.random() * connections.length);

  return {
    connectionIndex,
    progress: 0,
    position: new Vector3(),
  };
}

/**
 * Update pulse positions and progress
 * Returns array of pulses that are still active (progress < 1)
 */
export function updatePulses(
  pulses: Pulse[],
  nodes: NodeData[],
  connections: Connection[],
  deltaTime: number
): Pulse[] {
  return pulses.filter((pulse) => {
    // Update progress
    pulse.progress += PULSE_SPEED * deltaTime;

    // Remove if complete
    if (pulse.progress >= 1) {
      return false;
    }

    // Calculate position along connection
    const conn = connections[pulse.connectionIndex];
    const start = nodes[conn.startIndex].position;
    const end = nodes[conn.endIndex].position;

    pulse.position.lerpVectors(start, end, pulse.progress);

    return true;
  });
}

/**
 * Calculate pulse opacity based on progress (fade in/out)
 */
export function getPulseOpacity(progress: number): number {
  // Fade in during first 20%, fade out during last 20%
  if (progress < 0.2) {
    return progress / 0.2;
  } else if (progress > 0.8) {
    return (1 - progress) / 0.2;
  }
  return 1;
}
