import { useCanvas } from "@/hooks/useCanvas";
import { useEffect, useState } from "react";

const GameCanvas = () => {
    const { canvasRef, canvasManager, zoomIn, zoomOut, panLeft, panRight, panUp, panDown } = useCanvas();
    const [keysPressed, setKeysPressed] = useState({
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
        KeyW: false,
        KeyA: false,
        KeyS: false,
        KeyD: false,
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code in keysPressed) {
                setKeysPressed(prev => ({ ...prev, [e.code]: true }));
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code in keysPressed) {
                setKeysPressed(prev => ({ ...prev, [e.code]: false }));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [keysPressed]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (keysPressed.ArrowUp || keysPressed.KeyW) panUp();
            if (keysPressed.ArrowDown || keysPressed.KeyS) panDown();
            if (keysPressed.ArrowLeft || keysPressed.KeyA) panLeft();
            if (keysPressed.ArrowRight || keysPressed.KeyD) panRight();
        }, 100); // Adjust the interval for panning speed

        return () => clearInterval(interval);
    }, [keysPressed, panUp, panDown, panLeft, panRight]);

    const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomIn(); // Zoom in
        } else {
            zoomOut(); // Zoom out
        }
    };

    return (
        <div className="relative w-full h-full">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
                onMouseDown={(e) => {
                    if (e.button === 0) { // Only left click (0)
                        canvasManager?.startDrawing(e.clientX, e.clientY);
                    }
                }}
                onMouseMove={(e) => canvasManager?.draw(e.clientX, e.clientY)}
                onMouseUp={() => canvasManager?.stopDrawing()}
                onMouseLeave={() => canvasManager?.stopDrawing()}
                onContextMenu={(e) => e.preventDefault()}
                onWheel={handleWheel} // Add wheel event handler
            />

            {/* Controls */}
            <div className="w-screen absolute bottom-0 flex flex-row justify-center items-center w-48 h-16 bg-white">
                <div className="w-1/3 p-2">
                    <button
                        onClick={() => canvasManager?.clearCanvas()}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        Clear Roads
                    </button>
                </div>
                <div className="w-1/3 p-2">
                    <div className="flex gap-2 justify-center">
                        <button onClick={panLeft} className="bg-gray-600 text-white px-3 py-1 rounded">⬅️</button>
                        <button onClick={panUp} className="bg-gray-600 text-white px-3 py-1 rounded">⬆️</button>
                        <button onClick={panDown} className="bg-gray-600 text-white px-3 py-1 rounded">⬇️</button>
                        <button onClick={panRight} className="bg-gray-600 text-white px-3 py-1 rounded">➡️</button>
                    </div>
                </div>
                <div className="w-1/3 p-2">
                    <div className="flex gap-2 justify-end">
                        <button onClick={zoomIn} className="bg-blue-600 text-white px-3 py-1 rounded">Zoom In</button>
                        <button onClick={zoomOut} className="bg-blue-600 text-white px-3 py-1 rounded">Zoom Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCanvas;
