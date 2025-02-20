import GameCanvas from "@/components/GameCanvas";
import { useState } from "react";
``

const GridCanvas = () => {
  const [selectedCanvas, setSelectedCanvas] = useState<number | null>(null);

  const toggleCanvas = (index: number) => {
    setSelectedCanvas(selectedCanvas === index ? null : index);
  };

  return (
    <div className="w-screen h-screen flex flex-col ">
      <div
        className={`grid transition-all duration-500 ${selectedCanvas === null ? "grid-cols-7 grid-rows-7" : "grid-cols-1 grid-rows-1"
          } w-full h-full p-2`}
      >
        {Array.from({ length: 69 }).map((_, index) => (
          <div
            key={index}
            className={`relative flex items-center justify-center bg-gray-800 transition-all duration-500 border-[1px] ${selectedCanvas === null
                ? "w-full h-full cursor-pointer"
                : selectedCanvas === index
                  ? "col-span-3 row-span-3 w-full h-full"
                  : "hidden"
              }`}
            onClick={() => toggleCanvas(index)}
          >
            <GameCanvas selectedCanvas={selectedCanvas} index={index}/>
          </div>
        ))}

      </div>
      <div className="absolute bottom-0 w-full flex justify-center">
        <span >Copyright @ Hassan Sakib Afrin</span>
      </div>
    </div>
  );
};

export default GridCanvas;
