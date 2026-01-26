# Phase 5: Neural Network Inertia Implementation

## Goal
Add physics-based inertia to the neural network animation so nodes react naturally with different response speeds - like pulling something in real life.

## Physics Model: Damped Spring System

Each node gets its own mass and damping values. Heavier nodes lag behind, lighter nodes respond quickly.

```
force = -stiffness * displacement - damping * velocity
acceleration = force / mass
velocity += acceleration * deltaTime
position += velocity * deltaTime
```

---

## Files to Modify

### 1. `src/lib/three/neural-network.ts`

**Add Physics Constants:**
```typescript
// Physics Constants
export const SPRING_STIFFNESS = 4.0;    // How snappy nodes respond (2.0-8.0)
export const GLOBAL_DAMPING = 0.92;     // Prevents oscillation (0.85-0.98)
export const MASS_MIN = 0.5;            // Lightest nodes (respond fastest)
export const MASS_MAX = 2.0;            // Heaviest nodes (respond slowest)
export const NODE_DAMPING_MIN = 0.88;
export const NODE_DAMPING_MAX = 0.96;
export const MAX_VELOCITY = 5.0;        // Prevents instability
export const CANVAS_INFLUENCE = 0.008;  // How much mouse affects nodes
```

**Add Reusable Vector3s (avoid GC):**
```typescript
const _tempDisplacement = new Vector3();
const _tempForce = new Vector3();
const _tempAcceleration = new Vector3();
const _tempTarget = new Vector3();
const _tempVelocityDelta = new Vector3();
```

**Extend NodeData Interface:**
```typescript
export interface NodeData {
  position: Vector3;
  basePosition: Vector3;
  phase: Vector3;
  // NEW
  velocity: Vector3;      // Current velocity
  mass: number;           // 0.5-2.0 range
  damping: number;        // Per-node damping
  floatOffset: Vector3;   // Sine wave offset
}
```

**Update generateNodeData():**
Add initialization of new properties:
- `velocity: new Vector3(0, 0, 0)`
- `mass: randomInRange(MASS_MIN, MASS_MAX)`
- `damping: randomInRange(NODE_DAMPING_MIN, NODE_DAMPING_MAX)`
- `floatOffset: new Vector3(0, 0, 0)`

**Create New Physics Function:**
```typescript
export function updateNodePositionsWithPhysics(
  nodes: NodeData[],
  time: number,
  deltaTime: number,
  canvasOffset: { x: number; y: number }
): void {
  const scaledTime = time * FLOAT_FREQUENCY;
  const canvasInfluenceX = canvasOffset.x * CANVAS_INFLUENCE;
  const canvasInfluenceY = -canvasOffset.y * CANVAS_INFLUENCE;

  nodes.forEach((node) => {
    // 1. Calculate sine wave offset
    node.floatOffset.set(
      Math.sin(scaledTime + node.phase.x) * FLOAT_AMPLITUDE,
      Math.sin(scaledTime * 0.8 + node.phase.y) * FLOAT_AMPLITUDE,
      Math.sin(scaledTime * 0.6 + node.phase.z) * FLOAT_AMPLITUDE * 0.5
    );

    // 2. Target = base + float + canvas influence
    _tempTarget.copy(node.basePosition).add(node.floatOffset);
    _tempTarget.x += canvasInfluenceX;
    _tempTarget.y += canvasInfluenceY;

    // 3. Spring force
    _tempDisplacement.subVectors(node.position, _tempTarget);
    _tempForce.copy(_tempDisplacement).multiplyScalar(-SPRING_STIFFNESS);
    _tempVelocityDelta.copy(node.velocity).multiplyScalar(-node.damping * 2);
    _tempForce.add(_tempVelocityDelta);

    // 4. Acceleration (F/m)
    _tempAcceleration.copy(_tempForce).divideScalar(node.mass);

    // 5. Update velocity
    node.velocity.addScaledVector(_tempAcceleration, deltaTime);
    node.velocity.multiplyScalar(GLOBAL_DAMPING);

    // 6. Clamp velocity
    const speed = node.velocity.length();
    if (speed > MAX_VELOCITY) {
      node.velocity.multiplyScalar(MAX_VELOCITY / speed);
    }

    // 7. Update position
    node.position.addScaledVector(node.velocity, deltaTime);
  });
}
```

---

### 2. `src/components/home/NeuralNetworkCanvas.tsx`

**Add canvasOffsetRef:**
```typescript
const canvasOffsetRef = useRef({ x: 0, y: 0 });
```

**Update animate() callback:**
```typescript
// After lerping currentPos, calculate offset from center:
canvasOffsetRef.current.x = currentPos.current.x - window.innerWidth / 2;
canvasOffsetRef.current.y = currentPos.current.y - window.innerHeight / 2;
```

**Update NeuralNetworkScene props:**
- Add `canvasOffset: React.RefObject<{ x: number; y: number }>` prop
- Pass `canvasOffset={canvasOffsetRef}` when rendering

**Update useFrame in NeuralNetworkScene:**
```typescript
const isFirstFrameRef = useRef(true);

useFrame((state) => {
  const time = state.clock.elapsedTime;
  const deltaTime = Math.min(time - lastTimeRef.current, 0.1);
  lastTimeRef.current = time;

  if (isFirstFrameRef.current) {
    // First frame: use original function to set initial positions
    updateNodePositions(nodeData, time);
    isFirstFrameRef.current = false;
  } else {
    // Subsequent frames: use physics
    updateNodePositionsWithPhysics(nodeData, time, deltaTime, canvasOffset.current);
  }

  // ... rest unchanged
});
```

---

## Tuning Guide

| Parameter | Default | Effect |
|-----------|---------|--------|
| SPRING_STIFFNESS | 4.0 | Higher = snappier response |
| GLOBAL_DAMPING | 0.92 | Higher = floaty, lower = stops faster |
| MASS range | 0.5-2.0 | Wider = more variation between nodes |
| CANVAS_INFLUENCE | 0.008 | Higher = more dramatic mouse effect |

---

## Verification

1. Run `npm run dev`
2. Open browser to homepage
3. Move mouse around hero section
4. Observe that:
   - Nodes follow with varying speeds (some fast, some slow)
   - Movement feels spring-like with natural settling
   - No jittering or instability
   - Connections follow nodes smoothly
5. Run `npm run build` to verify no TypeScript errors
