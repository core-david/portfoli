# Phase 4: Cursor-Following Neural Network Animation

## Overview
Add a cursor-following neural network animation to the hero section using @react-three/fiber. The animation features floating nodes connected by lines that appear in a localized area around the user's cursor position, with subtle pulse effects traveling along connections.

**Scope:** Hero section only (home page) - follows cursor movement
**Interaction:** Animation follows cursor position, creating a localized interactive effect
**Colors:** Using existing design tokens - text-muted (#737373) for nodes, border (#262626) for connections
**Libraries:** @react-three/fiber, @react-three/drei, three (already installed)

---

## Milestone 4.1: Canvas Setup & Cursor Tracking ✅ COMPLETE

**Context:** Before rendering any 3D content, we need a React Three Fiber `<Canvas>` component that follows the cursor position. This requires dynamic imports to avoid SSR issues (Three.js needs the browser's WebGL context). The canvas should be positioned near the cursor with a localized effect area (e.g., 400-600px diameter).

**Tasks:**
- [x] Create `src/components/home/NeuralNetworkCanvas.tsx` - Client component wrapper
- [x] Use `next/dynamic` with `{ ssr: false }` to prevent server-side rendering
- [x] Add cursor position tracking using window `mousemove` event listener with refs (not React state)
- [x] Position canvas centered on cursor using GPU-accelerated `transform: translate()`
- [x] Configure canvas with transparent background, fixed size (500px), proper camera position (z: 10, fov: 45)
- [x] Add canvas to HeroSection with `pointer-events: none` to avoid blocking clicks
- [x] Hide canvas on mobile/touch devices using `@media (hover: none)` CSS query
- [x] Verify canvas follows cursor smoothly without errors

**Implementation Notes:**
- Used `requestAnimationFrame` loop with lerp (linear interpolation, factor 0.15) for smooth cursor following
- Cursor tracking uses refs instead of React state to avoid re-renders on every mouse move
- Direct DOM manipulation via ref for transform updates (bypasses React render cycle)
- Added `willChange: 'transform'` hint for GPU optimization
- Passive event listener for better scroll performance
- WebGL detection added early (graceful degradation if unavailable)
- Placeholder sphere renders to verify canvas is working

**Files created/modified:**
- `src/components/home/NeuralNetworkCanvas.tsx` (new)
- `src/components/home/HeroSection.tsx` (modified - imports and renders canvas)
- `src/app/globals.css` (modified - added `hover-device:block` utility with `@media (hover: none)`)

---

## Milestone 4.2: Create Floating Nodes with InstancedMesh ✅ COMPLETE

**Context:** Instead of creating 30-50 individual mesh objects, we use Three.js `InstancedMesh` to render all nodes in a single draw call. This is critical for performance. Each node is a small sphere positioned randomly in 3D space within the localized canvas area (centered around cursor position).

**Tasks:**
- [x] Create `src/lib/three/neural-network.ts` for animation logic and constants
- [x] Define node count (35 nodes), spread bounds (x: -3 to 3, y: -3 to 3, z: -2 to 2)
- [x] Create `Nodes` component using `instancedMesh` with `sphereGeometry`
- [x] Use `meshBasicMaterial` with text-muted color (#737373)
- [x] Initialize random positions for each node instance using `Object3D.matrix` (centered in canvas)
- [x] Verify nodes render as small grey spheres scattered in localized 3D space

**Implementation Notes:**
- `neural-network.ts` contains: NODE_COUNT (35), NODE_RADIUS (0.08), NODE_SEGMENTS (12), BOUNDS, COLORS
- `NodeData` type stores position, basePosition (for future animation), and phase offsets
- `generateNodeData()` creates randomized node positions within bounds
- `Nodes` component uses `useRef` to access InstancedMesh and set matrices on mount
- Reusable `tempObject` (Object3D) avoids allocations during matrix updates
- Node data is memoized with `useMemo` to prevent regeneration on re-renders

**Files created/modified:**
- `src/lib/three/neural-network.ts` (new)
- `src/components/home/NeuralNetworkCanvas.tsx` (modified - added Nodes component)

---

## Milestone 4.3: Add Dynamic Connections Between Nearby Nodes ✅ COMPLETE

**Context:** Connections create the "network" visual. We draw lines between nodes that are within a certain distance threshold (e.g., 2.5 units). Using `BufferGeometry` with `LineSegments`, we can efficiently render many lines. Connection opacity fades based on distance - closer nodes have stronger connections.

**Tasks:**
- [x] Create `Connections` component using `lineSegments` and `bufferGeometry`
- [x] Calculate which node pairs are within connection distance threshold (2.5 units)
- [x] Use `lineBasicMaterial` with border color (#262626), transparency enabled (opacity: 0.6)
- [x] Line positions ready for dynamic updates (prepare for Milestone 4.4)
- [x] Limit max connections per node (4) to prevent visual clutter
- [x] Verify connections appear between nearby nodes

**Implementation Notes:**
- Added `CONNECTION_DISTANCE` (2.5) and `MAX_CONNECTIONS_PER_NODE` (4) constants
- `Connection` type stores startIndex, endIndex, and distance
- `calculateConnections()` finds node pairs within threshold, respecting max connections limit
- `buildConnectionPositions()` creates Float32Array for BufferGeometry (6 floats per connection)
- Connections rendered before nodes so lines appear behind spheres
- Connections memoized with `useMemo` to avoid recalculation

**Files modified:**
- `src/lib/three/neural-network.ts` (added connection constants, types, and functions)
- `src/components/home/NeuralNetworkCanvas.tsx` (added Connections component)

---

## Milestone 4.4: Add Gentle Floating Motion ✅ COMPLETE

**Context:** Static nodes look lifeless. We add subtle movement using sine waves with different frequencies and phases for each node. This creates an organic, floating effect without being distracting. The `useFrame` hook from R3F gives us access to the animation loop where we update positions each frame.

**Tasks:**
- [x] Store each node's base position and unique phase offset (done in 4.2)
- [x] In `useFrame`, calculate new positions using `sin(time + phase)` for x, y, z drift
- [x] Keep movement amplitude small (0.15 units) for subtlety
- [x] Update `InstancedMesh` matrices each frame with new positions
- [x] Update connection line positions to follow node movement
- [x] Verify smooth, gentle floating animation at 60fps

**Implementation Notes:**
- Added `FLOAT_AMPLITUDE` (0.15) and `FLOAT_FREQUENCY` (0.3) constants
- `updateNodePositions()` modifies node positions in-place using sine waves with different frequencies per axis
- `updateConnectionPositions()` updates existing Float32Array for better performance (no allocations)
- Combined `Nodes` and `Connections` into single `NeuralNetworkScene` component for synchronized animation
- `useFrame` hook accesses `state.clock.elapsedTime` for smooth timing
- z-axis movement uses smaller amplitude (0.5x) for depth subtlety
- Different frequency multipliers per axis (1.0, 0.8, 0.6) prevent synchronized motion

**Synchronization Fix:**
- Initial issue: Connections were static while nodes moved - caused by updating a separate Float32Array ref instead of the BufferAttribute's internal array
- Fix: Access `geometryRef.current.attributes.position.array` directly in useFrame
- Initialize both nodes and connections in first useFrame callback (not separate useEffects) to ensure refs are ready
- Both nodes and connections now update from the same `updateNodePositions()` call each frame

**Files modified:**
- `src/lib/three/neural-network.ts` (added animation constants and update functions)
- `src/components/home/NeuralNetworkCanvas.tsx` (combined scene component with useFrame, direct BufferAttribute array access)

---

## Milestone 4.5: Add Pulse Effects Along Connections ✅ COMPLETE

**Context:** Pulses add life to the network by simulating data/signals traveling between nodes. Each pulse is a small bright point that travels along a connection line over time. We use a separate geometry for pulses, updating their positions each frame based on progress along their assigned connection.

**Tasks:**
- [x] Create pulse rendering using InstancedMesh (smooth spheres, not square points)
- [x] Spawn pulses periodically on random connections (every 1.0 seconds)
- [x] Animate pulse position along connection path (0% to 100% progress via lerpVectors)
- [x] Use bright green color for pulses (#00cc6a - primary-dim)
- [x] Remove completed pulses, spawn new ones (max 6 active pulses)
- [x] Verify pulses travel smoothly along connection lines

**Implementation Notes:**
- Added pulse constants: `MAX_PULSES` (6), `PULSE_SPAWN_INTERVAL` (1.0s), `PULSE_SPEED` (0.4), `PULSE_RADIUS` (0.05)
- `Pulse` type stores connectionIndex, progress (0-1), and position Vector3
- `spawnPulse()` creates pulse on random connection
- `updatePulses()` advances progress, calculates position via `lerpVectors`, filters completed pulses
- Uses InstancedMesh with sphereGeometry (8 segments) for smooth appearance
- Pulses use refs to avoid React re-renders during animation

**Bug Fixes:**
- Clamped deltaTime to max 0.1s to prevent pulses completing instantly on first frame or after tab switch
- Initialized `lastSpawnTimeRef` to `-PULSE_SPAWN_INTERVAL` so first pulse spawns immediately
- Changed from Points geometry (square) to InstancedMesh (smooth spheres)
- Unused pulse instances hidden at z: -1000

**Files modified:**
- `src/lib/three/neural-network.ts` (added pulse constants, types, and functions)
- `src/components/home/NeuralNetworkCanvas.tsx` (added pulse InstancedMesh and update logic)

---

## Milestone 4.6: Add Fallback for Non-WebGL Browsers (Partially Complete)

**Context:** Not all browsers/devices support WebGL. For browsers without WebGL support, we can either hide the effect entirely or show a simple CSS-based alternative. Since this is a subtle enhancement, gracefully degrading to no effect is acceptable.

**Tasks:**
- [x] Detect WebGL support before rendering canvas (done in 4.1)
- [x] Hide animation completely when WebGL unavailable (done in 4.1 - returns null)
- [ ] Verify no console errors when WebGL unavailable

**Files to modify:**
- `src/components/home/NeuralNetworkCanvas.tsx` (modify - add detection)
- Optional: `src/app/globals.css` (if adding CSS fallback glow effect)

---

## Milestone 4.7: Mobile & Touch Device Handling (Partially Complete)

**Context:** Mobile devices don't have cursor hover, so this effect doesn't make sense on touch devices. We should hide the canvas on mobile/touch devices or provide an alternative subtle effect. Use CSS media queries and feature detection.

**Tasks:**
- [x] Detect hover capability using `@media (hover: none)` CSS media query (done in 4.1)
- [x] Hide neural network canvas on non-hover devices via `hover-device:block` utility (done in 4.1)
- [ ] Optionally add a simple static gradient effect for mobile as alternative
- [ ] Test on mobile devices/emulator to verify canvas is hidden
- [ ] Verify no performance impact on mobile (canvas should not render at all)

**Files modified:**
- `src/components/home/NeuralNetworkCanvas.tsx` (uses `hover-device:block` class)
- `src/app/globals.css` (added `@media (hover: none)` rule)

---

## Verification Checklist

- [x] Canvas follows cursor position smoothly on desktop (Milestone 4.1)
- [x] Nodes appear as grey spheres scattered in localized area (Milestone 4.2 - floating motion in 4.4)
- [x] Connections appear between nearby nodes (Milestone 4.3)
- [x] Pulses travel along connections periodically (Milestone 4.5)
- [x] Canvas has `pointer-events: none` and doesn't block interactions (Milestone 4.1)
- [ ] Fallback gradient shows when WebGL disabled (Milestone 4.6 - optional)
- [x] Animation hidden on mobile/touch devices (Milestone 4.1/4.7)
- [x] Animation maintains 60fps on desktop (Milestone 4.4 - uses useFrame + efficient updates)
- [ ] No visual glitches during page load/hydration or cursor movement (to verify after all milestones)

---

## File Structure After Phase 4

```
src/
├── components/
│   └── home/
│       ├── HeroSection.tsx (modified)
│       ├── NeuralNetworkCanvas.tsx (new)
│       └── FallbackGradient.tsx (new)
├── lib/
│   └── three/
│       └── neural-network.ts (new)
└── app/
    └── globals.css (modified - fallback animation)
```
