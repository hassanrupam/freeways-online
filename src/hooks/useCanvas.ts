import { useRef, useEffect, useState } from "react";
import { CanvasManager } from "../utils/canvasManager";
import { store, useAppDispatch } from "@/store";
import { getRoadCoordinatesByStorageKey } from "@/utils/helperFunctions";
import { CollisionBox } from '../utils/classes/CollisionBox';

export const useCanvas = (storageKey: string,collisionBoxes:CollisionBox[]) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch(); // ✅ valid use here

  const [canvasManager, setCanvasManager] = useState<CanvasManager | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const fullState = store.getState(); // ✅ Full Redux state
      const manager = new CanvasManager(canvasRef.current, storageKey, dispatch,
        getRoadCoordinatesByStorageKey(fullState, storageKey), collisionBoxes
      );
      setCanvasManager(manager);
    }
  }, [storageKey,dispatch, collisionBoxes]);
  return { canvasRef, canvasManager };
};
