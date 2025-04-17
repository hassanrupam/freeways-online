import { useRef, useEffect, useState } from "react";
import { CanvasManager } from "../utils/canvasManager";
import { store, useAppDispatch } from "@/store";
import { getRoadCoordinatesByStorageKey } from "@/utils/helperFunctions";

export const useCanvas = (storageKey: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch(); // ✅ valid use here

  const [canvasManager, setCanvasManager] = useState<CanvasManager | null>(null);

   // ✅ Use selector here
 
  
  useEffect(() => {
    if (canvasRef.current) {
      const fullState = store.getState(); // ✅ Full Redux state
      const manager = new CanvasManager(canvasRef.current,storageKey,dispatch,getRoadCoordinatesByStorageKey(fullState,storageKey));
      setCanvasManager(manager);
    }
  }, [storageKey]);
  return { canvasRef, canvasManager };
};
