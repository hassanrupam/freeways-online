import GameCanvas from "@/components/GameCanvas";
import { useAppDispatch, useAppSelector } from "@/store";
import { setLevelSettings } from "@/store/slices/gameLevelSlice";
import { CollisionBox } from "@/utils/classes/CollisionBox";
import { generateCenteredSpiralMatrix, getLevelWiseCollisionData } from "@/utils/helperFunctions";
import axios from "axios";
import { useEffect, useState } from "react";

const GridCanvas = () => {
  const dispatch = useAppDispatch();
  const [selectedCanvas, setSelectedCanvas] = useState<number | null>(null);
  const [collisionBox, setCollisionBox] = useState<CollisionBox[]>([]);
  
  const {levelMatrixNumber, collisionBoxes} = useAppSelector((state) => state.gameLevel);
  const [matrix, setMatrix] = useState<number[][]>(generateCenteredSpiralMatrix(levelMatrixNumber));
  const selectCanvas = (index: number) => {
    setSelectedCanvas(index);
  };

  const exitCanvas = () => {
    setSelectedCanvas(null);
  };

  useEffect(() => {
    const matrix = generateCenteredSpiralMatrix(levelMatrixNumber);
    setMatrix(matrix);
  }
  , [levelMatrixNumber]);


  useEffect(() => {
    axios.get("http://localhost:3000/api/game-settings")
    .then((response) => {
      const data = response.data[0];
      dispatch(setLevelSettings(data));
    }
    )
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Handle the error as needed
    }
    );
  }, 
  [dispatch]);

  useEffect(() => {
    setCollisionBox(getLevelWiseCollisionData(collisionBoxes,1))
  }, [selectedCanvas, collisionBoxes]);


  return (
    <div className="w-screen h-screen flex flex-col">
      <div
        className={`grid transition-all duration-500 ${
          selectedCanvas === null ? levelMatrixNumber===3 ? "grid-cols-3 grid-rows-3" : levelMatrixNumber===5? "grid-cols-5 grid-rows-5" : 
          levelMatrixNumber===7 ? "grid-cols-7 grid-rows-7" : levelMatrixNumber===9 ? "grid-cols-9 grid-rows-9" : "grid-cols-1 grid-rows-1"  : "grid-cols-1 grid-rows-1"
        } w-full h-full p-2`}
      >
        {matrix.map((row) => (
          <>
            {row.map((col) => (
             <div
             key={col}
             className={`relative flex items-center justify-center bg-gray-800 transition-all duration-500 border-[1px] ${
               selectedCanvas === null
                 ? "w-full h-full cursor-pointer"
                 : selectedCanvas === col
                 ? "col-span-3 row-span-3 w-full h-full flex flex-col"
                 : "hidden"
             }`}
             onClick={() => selectedCanvas === null && selectCanvas(col)}
           >
             <GameCanvas selectedCanvas={selectedCanvas} index={col} exitCanvas={exitCanvas} collisionBox={collisionBox} />
           </div>
            ))}
          </>
        ))}
      </div>
    </div>
  );
};

export default GridCanvas;
