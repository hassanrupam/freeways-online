import { useRef, useEffect, useState } from "react";
import { CanvasManager } from "../utils/canvasManager";

export const useCanvas = (storageKey: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasManager, setCanvasManager] = useState<CanvasManager | null>(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      const manager = new CanvasManager(canvasRef.current,storageKey);
      setCanvasManager(manager);
    }
  }, [storageKey]);
  return { canvasRef, canvasManager };
};
