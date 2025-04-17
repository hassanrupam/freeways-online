import GameCanvas from "@/components/GameCanvas";
import { useAppSelector } from "@/store";
import { generateCenteredSpiralMatrix, getGridLayoutClassNames } from "@/utils/helperFunctions";
import { useEffect, useState } from "react";

const GridCanvas = () => {

  const [selectedCanvas, setSelectedCanvas] = useState<number | null>(null);
  
  const levelMatrixNumber = useAppSelector((state) => state.gameLevel.levelMatrixNumber);
  const [matrix, setMatrix] = useState<number[][]>(generateCenteredSpiralMatrix(levelMatrixNumber));
  const [gridClassName, setGridClassName] = useState<string>(getGridLayoutClassNames(levelMatrixNumber));
  const selectCanvas = (index: number) => {
    setSelectedCanvas(index);
  };

  const exitCanvas = () => {
    setSelectedCanvas(null);
  };

  useEffect(() => {
    const matrix = generateCenteredSpiralMatrix(levelMatrixNumber);
    setGridClassName(getGridLayoutClassNames(levelMatrixNumber));
    setMatrix(matrix);
  }
  , [levelMatrixNumber]);
  
  
  return (
    <div className="w-screen h-screen flex flex-col">
      <div
        className={`grid transition-all duration-500 ${
          selectedCanvas === null ? levelMatrixNumber===3 ? "grid-cols-3 grid-rows-3" : levelMatrixNumber===5? "grid-cols-5 grid-rows-5" : 
          levelMatrixNumber===7 ? "grid-cols-7 grid-rows-7" : levelMatrixNumber===9 ? "grid-cols-9 grid-rows-9" : "grid-cols-1 grid-rows-1"  : "grid-cols-1 grid-rows-1"
        } w-full h-full p-2`}
      >
        {matrix.map((row, rowIndex) => (
          <>
            {row.map((col, colIndex) => (
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
             <GameCanvas selectedCanvas={selectedCanvas} index={col} exitCanvas={exitCanvas} />
           </div>
            ))}
          </>
        ))}
      </div>
    </div>
  );
};

export default GridCanvas;
