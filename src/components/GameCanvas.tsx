import { useCanvas } from "@/hooks/useCanvas";
import { useAppSelector } from "@/store";
import { CollisionBox } from "@/utils/classes/CollisionBox";
import { faShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface GameCanvasProps {
    selectedCanvas?: number | null;
    index?: number | null;
    exitCanvas?: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
    collisionBox: CollisionBox[]
}
const GameCanvas = ({ selectedCanvas, index, exitCanvas, collisionBox }: GameCanvasProps) => {
    const storageKey = `canvas-${index ?? "default"}`;
    const { canvasRef, canvasManager } = useCanvas(storageKey, collisionBox)
    const [isLevelCompleted, setIsLevelCompleted] = useState<boolean>(false);
    const { levelCompleted, levelMatrixNumber } = useAppSelector((state) => state.gameLevel);
    useEffect(()=>{
        if (levelCompleted && levelCompleted.length > 0 && index != null) {
            setIsLevelCompleted(levelCompleted.includes(index));
        }
    },[levelCompleted,index])

    // in GameCanvas.tsx, below your existing effects
    useEffect(() => {
        if (canvasManager && selectedCanvas) {
            canvasManager.updateCollisionBoxes(collisionBox);
        }
    }, [collisionBox, canvasManager, selectedCanvas]);
  

    return (
        <div className="w-full h-full flex flex-col">
            {!selectedCanvas && isLevelCompleted &&
                <div className={`absolute top-0 left-0 right-0 flex justify-center items-center h-12 text-center text-xl bg-transparent`}>
                    {index}
                </div>
            }
            {/* Canvas */}
            <div className="relative w-full h-full">
                {!selectedCanvas && !isLevelCompleted &&
                    <div className={`absolute top-0 left-0 right-0  h-full text-center text-xl 
                        ${index&&index%2===0 ? "bg-gray-500" : "bg-gray-400"} bg-opacity-100 z-[10] flex justify-center items-center 
                        rounded-lg shadow-md`}>
                       
                        <FontAwesomeIcon className={`${levelMatrixNumber >6 ? 'text-6xl' : levelMatrixNumber > 4 ? 'text-8xl' : 'text-9xl'} 
                        ${index&&index%2===0 ? "text-stone-800" : "text-stone-600"}`} icon={faShield}/>
                        <span className={`absolute inset-0 flex justify-center items-center text-white font-bold
                            ${levelMatrixNumber > 6 ? 'text-xl' : levelMatrixNumber > 4 ?  'text-2xl' : 'text-4xl'}`}>
                            {index}
                        </span>
                    </div>
                }
                
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 right-0 w-full h-full"
                    onMouseDown={(e) => {
                        if (e.button === 0) { // Only left click (0)
                            canvasManager?.startDrawing(e.clientX, e.clientY);
                        }
                    }}
                    onMouseMove={(e) => canvasManager?.draw(e.clientX, e.clientY)}
                    onMouseUp={() => canvasManager?.stopDrawing()}
                    onMouseLeave={() => canvasManager?.stopDrawing()}
                    // onContextMenu={(e) => e.preventDefault()}
                    onContextMenu={(e) => {
                        e.preventDefault();
                    }}

                />
            </div>

            {/* Controls - Now outside the canvas div */}
            {selectedCanvas != null && (
                <div className="w-full h-16 flex flex-row justify-center items-center bg-white shadow-md">
                    <div className="w-1/2 p-2">
                        <button
                            onClick={() => canvasManager?.clearCanvas()}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                            Clear Roads
                        </button>
                    </div>
                    <div className="w-1/2 p-2 flex justify-end">
                        <button onClick={exitCanvas} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                            Exit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

};

export default GameCanvas;
