import GameCanvas from "@/components/GameCanvas";
import { API_ENDPOINTS } from "@/constants/static";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetLevelDesign, resetLevelSettings, setLevelDesign, setLevelSettings } from "@/store/slices/gameLevelSlice";
import { startLoading, stopLoading } from "@/store/slices/globalSlice";
import { generateCenteredSpiralMatrix, getLevelWiseCollisionData } from "@/utils/helperFunctions";
import { getApiFromOutboundMiddleware } from "@/utils/requests/internalRequestHelper";
import { useEffect, useState } from "react";
import FancyFullScreenLoader from "./FancyFullScreenLoader";
import GameControls from "./GameControls";

const GridCanvas = () => {
  const dispatch = useAppDispatch();
  const [selectedCanvas, setSelectedCanvas] = useState<number | null>(null);
  const {levelMatrixNumber, collisionBoxes} = useAppSelector((state) => state.gameLevel);
  const {isLoading} = useAppSelector((state) => state.global);
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
   
      
    const fetchData = async () => {
        // setIsLoading(true);
        dispatch(startLoading());

        await Promise.all([
          getApiFromOutboundMiddleware(
            API_ENDPOINTS.GAME_SETTINGS,
              (response) => dispatch(setLevelSettings(response[0])),
              () => dispatch(resetLevelSettings())
          ),
          getApiFromOutboundMiddleware(
            API_ENDPOINTS.LEVEL_DESIGN,
              (response) => dispatch(setLevelDesign(response)),
              () => dispatch(resetLevelDesign())
          ),
        ]);

        dispatch(stopLoading());
    };
    fetchData();
  }, [dispatch])

  return (
    <div className="w-screen h-screen flex flex-col">
      {!isLoading &&
        <GameControls />
      }
      {<FancyFullScreenLoader loading={isLoading} message={"Game is Loading..."}/>}
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
             className={`relative flex items-center justify-center bg-gray-800 transition-all duration-500 border-purple-700 border-[0.5px]  ${
               selectedCanvas === null
                 ? "w-full h-full cursor-pointer"
                 : selectedCanvas === col
                 ? "col-span-3 row-span-3 w-full h-full flex flex-col"
                 : "hidden"
             }`}
             onClick={() => selectedCanvas === null && selectCanvas(col)}
           >
             <GameCanvas selectedCanvas={selectedCanvas} index={col} exitCanvas={exitCanvas} collisionBox={getLevelWiseCollisionData(collisionBoxes,col)} />
           </div>
            ))}
          </>
        ))}
      </div>
    </div>
  );
};

export default GridCanvas;
