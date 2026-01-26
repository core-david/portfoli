'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Object3D,
  InstancedMesh as InstancedMeshType,
  BufferGeometry,
  Float32BufferAttribute,
} from 'three';
import { useFrame } from '@react-three/fiber';
import {
  NODE_COUNT,
  NODE_RADIUS,
  NODE_SEGMENTS,
  COLORS,
  MAX_PULSES,
  PULSE_SPAWN_INTERVAL,
  PULSE_RADIUS,
  generateNodeData,
  calculateConnections,
  updateNodePositions,
  updateConnectionPositions,
  spawnPulse,
  updatePulses,
  NodeData,
  Connection,
  Pulse,
} from '@/lib/three/neural-network';

// Dynamically import Canvas to prevent SSR issues
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

const CANVAS_SIZE = 500;

// Temporary object for matrix calculations (reused to avoid allocations)
const tempObject = new Object3D();

/**
 * Combined Neural Network scene component
 * Handles nodes, connections, and pulses with synchronized animation
 */
function NeuralNetworkScene({
  nodeData,
  connections,
}: {
  nodeData: NodeData[];
  connections: Connection[];
}) {
  const meshRef = useRef<InstancedMeshType>(null);
  const geometryRef = useRef<BufferGeometry>(null);
  const pulseMeshRef = useRef<InstancedMeshType>(null);
  const initializedRef = useRef(false);

  // Pulse state (using refs to avoid re-renders)
  const pulsesRef = useRef<Pulse[]>([]);
  const lastSpawnTimeRef = useRef(-PULSE_SPAWN_INTERVAL); // Spawn first pulse immediately
  const lastTimeRef = useRef(0);

  // Animation loop - runs every frame
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    // Clamp deltaTime to prevent huge jumps on first frame or after tab switch
    const deltaTime = Math.min(time - lastTimeRef.current, 0.1);
    lastTimeRef.current = time;

    // Update node positions with simple sine wave floating
    updateNodePositions(nodeData, time);

    // Initialize on first frame (ensures refs are ready)
    if (!initializedRef.current && meshRef.current && geometryRef.current) {
      // Set up connection positions buffer
      if (connections.length > 0) {
        const positions = new Float32Array(connections.length * 6);
        updateConnectionPositions(positions, nodeData, connections);
        geometryRef.current.setAttribute('position', new Float32BufferAttribute(positions, 3));
      }
      initializedRef.current = true;
    }

    // Update instanced mesh matrices for nodes
    if (meshRef.current) {
      nodeData.forEach((node, i) => {
        tempObject.position.copy(node.position);
        tempObject.updateMatrix();
        meshRef.current!.setMatrixAt(i, tempObject.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }

    // Update connection line positions
    if (geometryRef.current?.attributes.position && connections.length > 0) {
      const positionAttr = geometryRef.current.attributes.position;
      const positions = positionAttr.array as Float32Array;
      updateConnectionPositions(positions, nodeData, connections);
      positionAttr.needsUpdate = true;
    }

    // Pulse spawning
    if (
      connections.length > 0 &&
      pulsesRef.current.length < MAX_PULSES &&
      time - lastSpawnTimeRef.current >= PULSE_SPAWN_INTERVAL
    ) {
      const newPulse = spawnPulse(connections);
      if (newPulse) {
        pulsesRef.current.push(newPulse);
        lastSpawnTimeRef.current = time;
      }
    }

    // Update pulses
    pulsesRef.current = updatePulses(pulsesRef.current, nodeData, connections, deltaTime);

    // Update pulse instanced mesh
    if (pulseMeshRef.current) {
      // Hide all pulse instances first (move far away)
      for (let i = 0; i < MAX_PULSES; i++) {
        tempObject.position.set(0, 0, -1000);
        tempObject.updateMatrix();
        pulseMeshRef.current.setMatrixAt(i, tempObject.matrix);
      }

      // Position active pulses
      pulsesRef.current.forEach((pulse, i) => {
        tempObject.position.copy(pulse.position);
        tempObject.updateMatrix();
        pulseMeshRef.current!.setMatrixAt(i, tempObject.matrix);
      });

      pulseMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Connections (rendered first so lines appear behind nodes) */}
      {connections.length > 0 && (
        <lineSegments>
          <bufferGeometry ref={geometryRef} />
          <lineBasicMaterial color={COLORS.connection} transparent opacity={0.6} />
        </lineSegments>
      )}

      {/* Pulses - small spheres traveling along connections */}
      <instancedMesh ref={pulseMeshRef} args={[undefined, undefined, MAX_PULSES]}>
        <sphereGeometry args={[PULSE_RADIUS, 8, 8]} />
        <meshBasicMaterial color={COLORS.pulse} transparent opacity={0.85} />
      </instancedMesh>

      {/* Nodes */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[NODE_RADIUS, NODE_SEGMENTS, NODE_SEGMENTS]} />
        <meshBasicMaterial color={COLORS.node} />
      </instancedMesh>
    </>
  );
}

export default function NeuralNetworkCanvas() {
  const [isClient, setIsClient] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  // Generate node data once (memoized)
  const nodeData = useMemo(() => generateNodeData(), []);

  // Calculate connections between nearby nodes (memoized)
  const connections = useMemo(() => calculateConnections(nodeData), [nodeData]);

  // Smooth lerp animation for cursor following
  const animate = useCallback(() => {
    const lerp = 0.15;

    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;

    if (containerRef.current) {
      containerRef.current.style.transform = `translate(${currentPos.current.x - CANVAS_SIZE / 2}px, ${currentPos.current.y - CANVAS_SIZE / 2}px)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  // Client-side only rendering & event setup
  useEffect(() => {
    setIsClient(true);

    // Detect WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch {
      setHasWebGL(false);
    }

    // Direct mouse tracking - limited to hero section only
    const heroSection = document.getElementById('hero');
    const handleMouseMove = (e: MouseEvent) => {
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const isInHero =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isInHero) {
          targetPos.current = { x: e.clientX, y: e.clientY };
        }
      }
    };

    // Initialize position at center of viewport
    targetPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    currentPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    // Observe hero section visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      observer.disconnect();
    };
  }, [animate]);

  // Don't render on server, without WebGL, or when outside hero section
  if (!isClient || !hasWebGL || !isVisible) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 pointer-events-none z-0 hidden md:block hover-device:block"
      style={{
        width: `${CANVAS_SIZE}px`,
        height: `${CANVAS_SIZE}px`,
        willChange: 'transform',
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 45,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        style={{
          background: 'transparent',
        }}
      >
        <NeuralNetworkScene nodeData={nodeData} connections={connections} />
      </Canvas>
    </div>
  );
}
