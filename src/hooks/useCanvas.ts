import { useRef, useEffect, useState } from "react";
import { CanvasManager } from "../utils/canvasManager";

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasManager, setCanvasManager] = useState<CanvasManager | null>(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      const manager = new CanvasManager(canvasRef.current);
      setCanvasManager(manager);
    }
  }, []);

  const zoomIn = () => canvasManager?.zoomCanvas(1.5); // Zoom in
  const zoomOut = () => canvasManager?.zoomCanvas(0.5); // Zoom out
  const panLeft = () => canvasManager?.panCanvas(-50, 0);
  const panRight = () => canvasManager?.panCanvas(50, 0);
  const panUp = () => canvasManager?.panCanvas(0, -50);
  const panDown = () => canvasManager?.panCanvas(0, 50);

  return { canvasRef, canvasManager, zoomIn, zoomOut, panLeft, panRight, panUp, panDown };
};
