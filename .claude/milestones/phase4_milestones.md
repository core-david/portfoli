# Phase 4: Three.js Neural Network Animation - Milestones

## Overview

Implement an interactive 3D neural network animation as a full-viewport background behind the HeroSection. The animation features floating nodes with dynamic connections, mouse-based interactivity, and smooth 60fps performance across devices.

## Design Specifications

| Property | Value |
|----------|-------|
| Placement | Full-viewport background, behind HeroSection |
| Node count (desktop) | 80-120 nodes |
| Node count (mobile) | 40 nodes |
| Node color | Dim grey (#737373 / text-muted) |
| Connection color | Dim grey with opacity (#737373 at 30-50% opacity) |
| Connection behavior | Dynamic (proximity-based threshold) |
| Pulse effect | Random direction along connections |
| Mouse interaction | Nodes repel/attract near cursor |
| Performance target | Smooth 60fps (priority over visual complexity) |
| Fallback | Subtle CSS animated gradient |

---

## Milestone 4.1: Environment Setup & Dependencies

**Objective:** Install and configure Three.js ecosystem for React/Next.js

### Tasks

- [ ] **4.1.1** Install required dependencies:
  ```bash
  npm install three @react-three/fiber @react-three/drei
  npm install -D @types/three
  ```

- [ ] **4.1.2** Verify dependencies are compatible with Next.js 14 and React 18

- [ ] **4.1.3** Create directory structure:
  ```
  src/
  ├── components/home/NeuralNetworkCanvas.tsx
  ├── components/home/NeuralNetworkScene.tsx
  └── lib/three/
      ├── neural-network.ts
      └── types.ts
  ```

### Acceptance Criteria
- [ ] All packages install without peer dependency conflicts
- [ ] `npm run build` passes with no Three.js-related errors
- [ ] TypeScript recognizes Three.js types

---

## Milestone 4.2: Canvas Wrapper Component

**Objective:** Create the React wrapper that hosts the Three.js canvas with SSR handling

### Tasks

- [ ] **4.2.1** Create `NeuralNetworkCanvas.tsx` with dynamic import:
  ```tsx
  // Must use dynamic import to disable SSR
  const NeuralNetworkScene = dynamic(
    () => import('./NeuralNetworkScene'),
    { ssr: false, loading: () => <FallbackGradient /> }
  )
  ```

- [ ] **4.2.2** Configure canvas wrapper styling:
  - Position: `fixed`, `inset-0`, `z-[-1]`
  - Pointer events: `pointer-events-none` (allow clicks through to content)
  - Ensure canvas is behind all page content

- [ ] **4.2.3** Implement WebGL detection:
  ```ts
  function isWebGLAvailable(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }
  ```

- [ ] **4.2.4** Create loading state that matches fallback gradient

### Acceptance Criteria
- [ ] Canvas renders without hydration errors
- [ ] Canvas is positioned behind all content
- [ ] Page content remains clickable/interactive
- [ ] Loading state displays while scene initializes

---

## Milestone 4.3: Fallback Gradient (CSS Animation)

**Objective:** Create a subtle animated gradient for non-WebGL browsers

### Tasks

- [ ] **4.3.1** Create `FallbackGradient.tsx` component:
  - Full viewport coverage
  - Dark background base (#0a0a0a)
  - Subtle animated gradient overlay

- [ ] **4.3.2** Implement CSS keyframe animation in `globals.css`:
  ```css
  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  ```

- [ ] **4.3.3** Design gradient colors:
  - Base: background color (#0a0a0a)
  - Accent: Very subtle grey tones (#141414, #1a1a1a)
  - Animation: Slow, gentle movement (20-30s cycle)

- [ ] **4.3.4** Ensure fallback matches the visual tone of the 3D animation

### Acceptance Criteria
- [ ] Fallback renders when WebGL is unavailable
- [ ] Animation is subtle and not distracting
- [ ] Performance is smooth (CSS-only, no JS animation)
- [ ] Visual consistency with overall dark theme

---

## Milestone 4.4: Node System with InstancedMesh

**Objective:** Implement efficient rendering of 80-120 floating nodes

### Tasks

- [ ] **4.4.1** Create `lib/three/types.ts` with interfaces:
  ```ts
  interface NodeData {
    id: number;
    position: Vector3;
    velocity: Vector3;
    basePosition: Vector3;  // For floating animation
    phase: number;          // For sine wave offset
  }
  ```

- [ ] **4.4.2** Implement node initialization in `neural-network.ts`:
  - Random distribution within viewport bounds
  - Account for 3D depth (-5 to 5 on z-axis)
  - Store base positions for floating animation

- [ ] **4.4.3** Create `InstancedMesh` setup:
  ```tsx
  <instancedMesh ref={meshRef} args={[geometry, material, nodeCount]}>
    <sphereGeometry args={[nodeRadius, 16, 16]} />
    <meshBasicMaterial color="#737373" transparent opacity={0.6} />
  </instancedMesh>
  ```

- [ ] **4.4.4** Implement floating animation using sine waves:
  - Each node oscillates around its base position
  - Unique phase offset per node for organic movement
  - Amplitude: 0.2-0.5 units
  - Frequency: 0.5-1.0 Hz

- [ ] **4.4.5** Update instance matrices in animation loop:
  ```ts
  // In useFrame hook
  nodes.forEach((node, i) => {
    const offset = Math.sin(elapsed * frequency + node.phase) * amplitude;
    dummy.position.set(node.position.x, node.position.y + offset, node.position.z);
    dummy.updateMatrix();
    meshRef.current.setMatrixAt(i, dummy.matrix);
  });
  meshRef.current.instanceMatrix.needsUpdate = true;
  ```

### Acceptance Criteria
- [ ] 80-120 nodes render on desktop
- [ ] All nodes rendered in single draw call (verify with browser devtools)
- [ ] Smooth floating animation at 60fps
- [ ] Nodes distributed evenly across viewport

---

## Milestone 4.5: Dynamic Connection System

**Objective:** Implement proximity-based connections between nodes

### Tasks

- [ ] **4.5.1** Define connection parameters:
  ```ts
  const CONNECTION_DISTANCE = 2.5;  // Max distance for connection
  const MAX_CONNECTIONS_PER_NODE = 4;  // Limit for performance
  ```

- [ ] **4.5.2** Implement spatial partitioning (optional optimization):
  - Simple grid-based spatial hash for O(n) neighbor lookup
  - Update grid when nodes move significantly

- [ ] **4.5.3** Create connection calculation function:
  ```ts
  function calculateConnections(nodes: NodeData[]): Connection[] {
    const connections: Connection[] = [];
    for (let i = 0; i < nodes.length; i++) {
      let connectionCount = 0;
      for (let j = i + 1; j < nodes.length; j++) {
        if (connectionCount >= MAX_CONNECTIONS_PER_NODE) break;
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < CONNECTION_DISTANCE) {
          connections.push({ from: i, to: j, distance });
          connectionCount++;
        }
      }
    }
    return connections;
  }
  ```

- [ ] **4.5.4** Implement `BufferGeometry` for lines:
  ```tsx
  <lineSegments ref={linesRef}>
    <bufferGeometry>
      <bufferAttribute
        attach="attributes-position"
        count={maxConnections * 2}
        array={positionsArray}
        itemSize={3}
      />
    </bufferGeometry>
    <lineBasicMaterial color="#737373" transparent opacity={0.3} />
  </lineSegments>
  ```

- [ ] **4.5.5** Update line positions each frame:
  - Recalculate connections when nodes move
  - Update buffer geometry positions
  - Fade opacity based on distance (closer = more visible)

### Acceptance Criteria
- [ ] Connections appear/disappear smoothly based on distance
- [ ] No more than MAX_CONNECTIONS_PER_NODE per node
- [ ] Line opacity fades with distance
- [ ] Connection updates don't cause frame drops

---

## Milestone 4.6: Pulse Effect Along Connections

**Objective:** Add traveling pulse effects along connection lines

### Tasks

- [ ] **4.6.1** Define pulse data structure:
  ```ts
  interface Pulse {
    connectionIndex: number;
    progress: number;      // 0 to 1
    speed: number;         // Units per second
    direction: 1 | -1;     // Random direction
  }
  ```

- [ ] **4.6.2** Implement pulse spawning system:
  - Random spawn interval (every 0.5-2 seconds)
  - Select random active connection
  - Random direction (forward or backward)
  - Limit max concurrent pulses (10-15 for performance)

- [ ] **4.6.3** Create pulse visual using small spheres or points:
  ```tsx
  <points ref={pulsesRef}>
    <bufferGeometry>
      <bufferAttribute ... />
    </bufferGeometry>
    <pointsMaterial
      color="#737373"
      size={0.1}
      transparent
      opacity={0.8}
      sizeAttenuation={true}
    />
  </points>
  ```

- [ ] **4.6.4** Animate pulse positions along connections:
  ```ts
  pulses.forEach(pulse => {
    pulse.progress += delta * pulse.speed * pulse.direction;
    if (pulse.progress > 1 || pulse.progress < 0) {
      // Remove pulse or reset
    }
    const connection = connections[pulse.connectionIndex];
    const position = lerpVector3(
      nodes[connection.from].position,
      nodes[connection.to].position,
      pulse.progress
    );
    // Update buffer
  });
  ```

- [ ] **4.6.5** Add subtle glow effect to pulses (optional, performance permitting):
  - Slightly larger, more transparent secondary point
  - Or use additive blending

### Acceptance Criteria
- [ ] Pulses travel along connections in random directions
- [ ] Pulses spawn and despawn smoothly
- [ ] No performance impact from pulse system
- [ ] Visual is subtle, not distracting

---

## Milestone 4.7: Mouse Interaction (Repel/Attract)

**Objective:** Nodes react to mouse cursor position

### Tasks

- [ ] **4.7.1** Track mouse position in normalized device coordinates:
  ```ts
  const mouse = useRef(new Vector2());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  ```

- [ ] **4.7.2** Project mouse to 3D world coordinates:
  ```ts
  const mouseWorld = new Vector3(mouse.current.x, mouse.current.y, 0);
  mouseWorld.unproject(camera);
  // Intersect with z=0 plane for interaction point
  ```

- [ ] **4.7.3** Implement repulsion force:
  ```ts
  const REPEL_RADIUS = 2.0;
  const REPEL_STRENGTH = 0.5;

  nodes.forEach(node => {
    const distance = node.position.distanceTo(mouseWorld);
    if (distance < REPEL_RADIUS) {
      const force = (1 - distance / REPEL_RADIUS) * REPEL_STRENGTH;
      const direction = node.position.clone().sub(mouseWorld).normalize();
      node.velocity.add(direction.multiplyScalar(force));
    }
  });
  ```

- [ ] **4.7.4** Add velocity damping for smooth return:
  ```ts
  const DAMPING = 0.95;
  const RETURN_STRENGTH = 0.02;

  nodes.forEach(node => {
    // Apply velocity
    node.position.add(node.velocity);
    // Damping
    node.velocity.multiplyScalar(DAMPING);
    // Return to base position
    const returnForce = node.basePosition.clone().sub(node.position);
    node.velocity.add(returnForce.multiplyScalar(RETURN_STRENGTH));
  });
  ```

- [ ] **4.7.5** Handle touch events for mobile:
  ```ts
  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    mouse.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(touch.clientY / window.innerHeight) * 2 + 1;
  };
  ```

- [ ] **4.7.6** Reset mouse position when cursor leaves viewport

### Acceptance Criteria
- [ ] Nodes smoothly repel from cursor
- [ ] Nodes return to original positions when cursor moves away
- [ ] Interaction feels responsive but not jarring
- [ ] Touch interaction works on mobile devices
- [ ] No interaction glitches at viewport edges

---

## Milestone 4.8: Mobile Optimization

**Objective:** Ensure smooth 60fps on mobile devices

### Tasks

- [ ] **4.8.1** Detect device capabilities:
  ```ts
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isLowPower = navigator.hardwareConcurrency <= 4;
  ```

- [ ] **4.8.2** Implement adaptive node count:
  ```ts
  const getNodeCount = () => {
    if (isMobile || isLowPower) return 40;
    if (window.innerWidth < 768) return 50;
    return 100;
  };
  ```

- [ ] **4.8.3** Reduce visual complexity on mobile:
  - Disable pulse effects on low-power devices
  - Reduce connection distance threshold
  - Lower max connections per node
  - Simplify sphere geometry (8 segments instead of 16)

- [ ] **4.8.4** Implement performance monitoring:
  ```ts
  const stats = useRef({ frames: 0, lastTime: 0 });

  useFrame(() => {
    stats.current.frames++;
    const now = performance.now();
    if (now - stats.current.lastTime > 1000) {
      const fps = stats.current.frames;
      if (fps < 30) {
        // Reduce complexity dynamically
      }
      stats.current.frames = 0;
      stats.current.lastTime = now;
    }
  });
  ```

- [ ] **4.8.5** Add pixel ratio limiting:
  ```tsx
  <Canvas dpr={[1, Math.min(2, window.devicePixelRatio)]}>
  ```

- [ ] **4.8.6** Implement visibility-based pausing:
  ```ts
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause animation loop
      } else {
        // Resume animation loop
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);
  ```

### Acceptance Criteria
- [ ] Consistent 60fps on iPhone 12 / Pixel 5 equivalent
- [ ] No frame drops during scrolling
- [ ] Graceful degradation on older devices
- [ ] Animation pauses when tab is not visible
- [ ] Memory usage remains stable over time

---

## Milestone 4.9: Integration with HeroSection

**Objective:** Seamlessly integrate animation with existing HeroSection

### Tasks

- [ ] **4.9.1** Update `page.tsx` to include NeuralNetworkCanvas:
  ```tsx
  export default function Home() {
    return (
      <>
        <NeuralNetworkCanvas />
        <HeroSection />
        {/* ... rest of sections */}
      </>
    );
  }
  ```

- [ ] **4.9.2** Ensure HeroSection content is readable:
  - Verify text contrast against animated background
  - Add subtle dark overlay if needed
  - Test with various node positions

- [ ] **4.9.3** Coordinate animation with scroll:
  - Optional: Fade animation opacity as user scrolls past hero
  - Optional: Parallax effect on nodes based on scroll position

- [ ] **4.9.4** Handle resize events:
  ```ts
  useEffect(() => {
    const handleResize = () => {
      // Recalculate node bounds
      // Update camera aspect ratio
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  ```

- [ ] **4.9.5** Test with existing scroll animations (AnimatedSection)

### Acceptance Criteria
- [ ] Animation visible behind HeroSection
- [ ] All hero text/buttons remain fully readable
- [ ] Animation doesn't interfere with scroll behavior
- [ ] Smooth resize handling
- [ ] No z-index conflicts with other elements

---

## Milestone 4.10: Final Polish & Performance Audit

**Objective:** Optimize, test, and finalize the animation

### Tasks

- [ ] **4.10.1** Run Lighthouse performance audit:
  - Target: 90+ performance score
  - Check for layout shifts caused by canvas
  - Verify no blocking resources

- [ ] **4.10.2** Profile with Chrome DevTools:
  - GPU memory usage
  - Draw call count (should be minimal)
  - Frame time distribution

- [ ] **4.10.3** Test across browsers:
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Edge (latest)
  - [ ] Safari iOS
  - [ ] Chrome Android

- [ ] **4.10.4** Test fallback scenarios:
  - Disable WebGL in browser settings
  - Test on very old device/browser
  - Verify graceful degradation

- [ ] **4.10.5** Code cleanup:
  - Remove console.logs
  - Add TypeScript strict types
  - Document complex algorithms
  - Extract magic numbers to constants

- [ ] **4.10.6** Memory leak testing:
  - Navigate away and back to page
  - Monitor memory over extended period
  - Verify proper cleanup in useEffect

### Acceptance Criteria
- [ ] Lighthouse performance score >= 90
- [ ] No memory leaks after 10 minutes
- [ ] Works on all target browsers
- [ ] Fallback displays correctly when WebGL unavailable
- [ ] Code is clean, documented, and maintainable

---

## File Structure (Final)

```
src/
├── components/
│   └── home/
│       ├── NeuralNetworkCanvas.tsx    # Dynamic import wrapper
│       ├── NeuralNetworkScene.tsx     # Main Three.js scene
│       └── FallbackGradient.tsx       # CSS animated fallback
├── lib/
│   └── three/
│       ├── neural-network.ts          # Core animation logic
│       ├── types.ts                   # TypeScript interfaces
│       └── utils.ts                   # Helper functions
└── app/
    └── globals.css                    # Fallback gradient animation
```

---

## Dependencies

```json
{
  "dependencies": {
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0"
  },
  "devDependencies": {
    "@types/three": "^0.160.0"
  }
}
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Performance issues on mobile | Aggressive node reduction, disable effects, dynamic quality adjustment |
| WebGL not available | CSS fallback ready from Milestone 4.3 |
| Memory leaks | Proper cleanup in useEffect, dispose geometries/materials |
| Hydration errors | Dynamic import with `ssr: false` |
| Bundle size increase | Code splitting via dynamic import |

---

## Success Metrics

1. **Performance:** 60fps on mid-range devices (iPhone 12 / Pixel 5 class)
2. **Load time:** Canvas initialization < 500ms
3. **Bundle impact:** < 100KB gzipped for Three.js components
4. **Accessibility:** Fallback works, animation respects `prefers-reduced-motion`
5. **UX:** Animation enhances without distracting from content
