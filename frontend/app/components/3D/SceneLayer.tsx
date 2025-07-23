// app/components/3D/FloatingLayer.tsx
"use client";

import { useSceneModels } from "./SceneModelProvider";
import Scene from "./Scene";

export default function SceneLayer() {
  const { models } = useSceneModels();
  return <Scene models={models} />;
}
