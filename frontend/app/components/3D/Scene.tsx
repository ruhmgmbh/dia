"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

function ModelTracker({
  url,
  getDomRef,
  offset = [0, 0, 0],
}: {
  url: string;
  getDomRef: () => HTMLElement | null;
  offset?: [number, number, number];
}) {
  const ref = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const { scene } = useGLTF(url);

  useFrame(() => {
    const el = getDomRef();
    if (el && ref.current) {
      const rect = el.getBoundingClientRect();
      const x = ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1;
      const y = (-(rect.top + rect.height / 2) / window.innerHeight) * 2 + 1;
      const base = new THREE.Vector3(x, y, 0.5).unproject(camera);
      const final = base.add(new THREE.Vector3(...offset));
      ref.current.position.lerp(final, 0.2);
    }
  });

  return <primitive object={scene} ref={ref} scale={1.2} />;
}

export default function Scene({
  models,
}: {
  models: { id: string; url: string; getDomRef: () => HTMLElement | null }[];
}) {
  return (
    <div className="fixed inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        className="pointer-events-none"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <Suspense fallback={null}>
          {models.map((m) => (
            <ModelTracker key={m.id} url={m.url} getDomRef={m.getDomRef} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
