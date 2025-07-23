// components/3D/Project3DOverlay.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

type Props = {
  modelUrl: string;
  scale?: number;
};

function FloatingModel({ modelUrl, scale = 1 }: Props) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(modelUrl);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = Math.sin(t) * 0.1;
    }
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.x = 0.3;
      ref.current.rotation.y = -0.4;
    }
  }, [modelUrl]);

  return <primitive object={scene} ref={ref} scale={scale} dispose={null} />;
}

export default function Project3DOverlay({ modelUrl, scale }: Props) {
  return (
    <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-10">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 100 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        {/* <MeshComponent modelUrl={modelUrl} scale={scale} /> */}

        <Suspense fallback={null}>
          <FloatingModel modelUrl={modelUrl} scale={1} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
