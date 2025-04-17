import { useCanvas } from "@/hooks/useCanvas";
import { faShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface GameCanvasProps {
    selectedCanvas?: number | null;
    index?: number | null;
    exitCanvas?: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}
const GameCanvas = ({ selectedCanvas, index, exitCanvas }: GameCanvasProps) => {
    const storageKey = `canvas-${index ?? "default"}`;
    const { canvasRef, canvasManager } = useCanvas(storageKey)

    return (
        <div className="w-full h-full flex flex-col">

            {/* Canvas */}
            <div className="relative w-full h-full">
                {!selectedCanvas &&
                    <div className={`absolute top-0 left-0 right-0  h-full text-center text-xl 
                        ${index&&index%2===0 ? "bg-slate-500" : "bg-slate-700"} bg-opacity-100 z-[10] flex justify-center items-center 
                        rounded-lg shadow-md`}>
                       
                        <FontAwesomeIcon className="text-9xl text-stone-800" icon={faShield}/>
                        <span className="absolute inset-0 flex justify-center items-center text-white text-3xl font-bold">
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
                    onContextMenu={(e) => e.preventDefault()}
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
