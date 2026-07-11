"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Distributed-system node network: glowing service nodes connected by
 * data links, with packets travelling along the edges and a dust of
 * background particles. The whole scene tilts subtly toward the cursor.
 */

interface NetworkConfig {
  nodeCount: number;
  particleCount: number;
  linkDistance: number;
}

const DESKTOP: NetworkConfig = { nodeCount: 42, particleCount: 700, linkDistance: 2.6 };
const MOBILE: NetworkConfig = { nodeCount: 22, particleCount: 250, linkDistance: 2.9 };

/** Deterministic PRNG so server/client renders agree. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNetwork(config: NetworkConfig) {
  const rand = mulberry32(463);
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < config.nodeCount; i++) {
    // Flattened ellipsoid cloud, denser toward the middle
    const r = Math.pow(rand(), 0.7);
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    nodes.push(
      new THREE.Vector3(
        6.2 * r * Math.sin(phi) * Math.cos(theta),
        2.6 * r * Math.cos(phi),
        2.2 * r * Math.sin(phi) * Math.sin(theta),
      ),
    );
  }

  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < config.linkDistance) {
        edges.push([i, j]);
      }
    }
  }

  const particles = new Float32Array(config.particleCount * 3);
  for (let i = 0; i < config.particleCount; i++) {
    particles[i * 3] = (rand() - 0.5) * 18;
    particles[i * 3 + 1] = (rand() - 0.5) * 9;
    particles[i * 3 + 2] = (rand() - 0.5) * 7 - 1.5;
  }

  return { nodes, edges, particles };
}

function Network({ config, animate }: { config: NetworkConfig; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const packetsRef = useRef<THREE.InstancedMesh>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));

  const { nodes, edges, particles } = useMemo(() => buildNetwork(config), [config]);

  const linePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      arr.set([...nodes[a].toArray(), ...nodes[b].toArray()], i * 6);
    });
    return arr;
  }, [nodes, edges]);

  // A packet per ~3 edges keeps the traffic readable
  const packets = useMemo(
    () =>
      edges
        .filter((_, i) => i % 3 === 0)
        .map(([a, b], i) => ({ a, b, offset: (i * 0.37) % 1, speed: 0.15 + (i % 5) * 0.04 })),
    [edges],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Place static node instances once
  useEffect(() => {
    const mesh = nodesRef.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    nodes.forEach((n, i) => {
      const scale = i % 6 === 0 ? 1.7 : 1;
      m.compose(n, new THREE.Quaternion(), new THREE.Vector3(scale, scale, scale));
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [nodes]);

  useFrame((state, delta) => {
    if (!group.current) return;
    if (animate) {
      group.current.rotation.y += delta * 0.04;
      // Ease toward cursor-driven tilt
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.current.y * -0.12,
        0.04,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        pointer.current.x * 0.05,
        0.04,
      );
    }

    const mesh = packetsRef.current;
    if (mesh && animate) {
      const m = new THREE.Matrix4();
      const pos = new THREE.Vector3();
      const t = state.clock.elapsedTime;
      packets.forEach((p, i) => {
        const progress = (p.offset + t * p.speed) % 1;
        pos.lerpVectors(nodes[p.a], nodes[p.b], progress);
        m.compose(pos, new THREE.Quaternion(), new THREE.Vector3(1, 1, 1));
        mesh.setMatrixAt(i, m);
      });
      mesh.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group} rotation={[0.1, 0, 0]}>
      {/* Service nodes */}
      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodes.length]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </instancedMesh>

      {/* Data links */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#155e75" transparent opacity={0.42} />
      </lineSegments>

      {/* Packets travelling along links */}
      <instancedMesh ref={packetsRef} args={[undefined, undefined, packets.length]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshBasicMaterial color="#a5f3fc" toneMapped={false} />
      </instancedMesh>

      {/* Ambient particle dust */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#38bdf8" size={0.02} transparent opacity={0.5} sizeAttenuation />
      </points>
    </group>
  );
}

export default function HeroScene() {
  // This component is only loaded client-side (dynamic import, ssr: false),
  // so device capabilities can be read in lazy initializers.
  const [config] = useState<NetworkConfig>(() => {
    const smallScreen = window.matchMedia("(max-width: 768px)").matches;
    const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;
    return smallScreen || lowCores ? MOBILE : DESKTOP;
  });
  const [animate] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // Stop the render loop entirely once the hero is scrolled out of view —
  // otherwise the GPU keeps drawing a scene nobody can see for the whole
  // (very long) page, which costs real battery on laptops.
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={!inView ? "never" : animate ? "always" : "demand"}
        aria-hidden
        className="!absolute inset-0"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 6]} intensity={40} color="#67e8f9" />
        <Network config={config} animate={animate && inView} />
      </Canvas>
    </div>
  );
}
