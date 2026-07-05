import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Text, Html } from "@react-three/drei";
import * as THREE from "three";

/**
 * ReactionChamber3D
 * A self-contained, original 3D visualization of two reactants combining
 * inside a glass chamber. No external assets, no third-party IP.
 *
 * status: "idle" | "mixing" | "success" | "fail"
 * productName: string shown when a reaction is found
 */

function ReactantOrb({ side, status, color }) {
  const ref = useRef();
  const t0 = side === "left" ? 0 : Math.PI;

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + t0;
    if (!ref.current) return;

    const merging = status === "mixing" || status === "success";
    const angle = t * (merging ? 2.2 : 0.6) + (side === "left" ? 0 : Math.PI);
    const orbitRadius = status === "success" ? 0.02 : status === "mixing" ? THREE.MathUtils.lerp(1.4, 0.1, (Math.sin(t) + 1) / 2) : 1.4;

    ref.current.position.x = Math.cos(angle) * orbitRadius;
    ref.current.position.z = Math.sin(angle) * orbitRadius * 0.6;
    ref.current.position.y = Math.sin(t * 1.4) * 0.15;

    if (status === "fail") {
      ref.current.material.emissiveIntensity = 0.6 + Math.sin(t * 12) * 0.4;
    } else {
      ref.current.material.emissiveIntensity = 0.9;
    }
  });

  if (status === "success") return null;

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.34, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.3}
        roughness={0.2}
        metalness={0.15}
        transparent
        opacity={0.94}
      />
    </mesh>
  );
}

function ReactionCore({ status, productName }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const targetScale = status === "success" ? 1 : 0;
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, targetScale, 0.06));
    ref.current.rotation.y = t * 0.6;
    ref.current.material.emissiveIntensity = 1.1 + Math.sin(t * 2) * 0.25;
  });

  return (
    <group>
      <mesh ref={ref} scale={0}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color="#b6ff00"
          emissive="#b6ff00"
          emissiveIntensity={1.6}
          roughness={0.1}
          metalness={0.25}
        />
      </mesh>
      {status === "success" && (
        <Text
          position={[0, -1.05, 0]}
          fontSize={0.22}
          color="#ede6d6"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          {productName?.toUpperCase() || "UNKNOWN COMPOUND"}
        </Text>
      )}
    </group>
  );
}

function ChamberGlass() {
  return (
    <mesh>
      <cylinderGeometry args={[1.05, 0.85, 2.1, 32, 1, true]} />
      <meshPhysicalMaterial
        color="#b6ff00"
        transparent
        opacity={0.08}
        roughness={0.05}
        metalness={0}
        transmission={0.9}
        thickness={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Rig({ status, productName }) {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.3;
  });
  return (
    <group ref={group}>
      <ChamberGlass />
      <ReactantOrb side="left" status={status} color="#e2811a" />
      <ReactantOrb side="right" status={status} color="#7a3a22" />
      <ReactionCore status={status} productName={productName} />
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <span className="readout" style={{ color: "var(--offwhite-dim)" }}>
        CALIBRATING CHAMBER…
      </span>
    </Html>
  );
}

export default function ReactionChamber3D({ status = "idle", productName = "" }) {
  const dustColor = useMemo(() => {
    if (status === "success") return "#b6ff00";
    if (status === "fail") return "#ff3b2e";
    return "#f0b429";
  }, [status]);

  return (
    <div
      className="panel"
      style={{
        height: "340px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Canvas camera={{ position: [0, 0.4, 4.2], fov: 42 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#08070a"]} />
        <ambientLight intensity={0.28} />
        <pointLight position={[2, 2, 2]} intensity={1.6} color="#f0b429" />
        <pointLight position={[-2, -1, -2]} intensity={1.3} color="#b6ff00" />
        <pointLight position={[0, 1.5, -2]} intensity={0.7} color="#5fe6ff" />
        <Suspense fallback={<Loader />}>
          <Rig status={status} productName={productName} />
          <Sparkles count={80} scale={4.2} size={2.4} speed={0.3} color={dustColor} opacity={0.65} />
        </Suspense>
      </Canvas>
      <div
        className="readout"
        style={{
          position: "absolute",
          bottom: "10px",
          left: "14px",
          color: "var(--offwhite-dim)",
        }}
      >
        CHAMBER STATUS:{" "}
        <span
          style={{
            color:
              status === "success" ? "var(--toxic-hot)" : status === "fail" ? "var(--danger)" : "var(--mustard)",
          }}
        >
          {status.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
