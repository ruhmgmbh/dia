"use client";

import { createContext, useContext, useState, useCallback } from "react";

const SceneModelContext = createContext<any>(null);

export function SceneModelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [models, setModels] = useState<any[]>([]);

  const register = (
    id: string,
    url: string,
    getDomRef: () => HTMLElement | null,
    opts?: { offset?: [number, number, number] }
  ) => {
    setModels((prev) => [
      ...prev.filter((m) => m.id !== id),
      { id, url, getDomRef, offset: opts?.offset ?? [0, 0, 0] },
    ]);
  };

  return (
    <SceneModelContext.Provider value={{ models, register }}>
      {children}
    </SceneModelContext.Provider>
  );
}

export const useSceneModels = () => useContext(SceneModelContext);
