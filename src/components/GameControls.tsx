import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useRef } from "react";
import AppTooltip from "./common/AppToolTip";
import { useRouter } from "next/router";

const GameControls = () => {
    const { data: session } = useSession();
    const router =  useRouter(); 
    const [hovered, setHovered] = useState(false);
    const containerRef = useRef(null);
    
    // Use a timer to prevent rapid state changes
    const handleMouseEnter = () => {
        setHovered(true);
    };
    
    const handleMouseLeave = () => {
        setHovered(false);
    };
    
    // Add click handler outside of the rendered JSX for clarity
    const handleExit = () => {
        router.push("/");
    };

    return (
        <div 
            ref={containerRef}
            className="fixed top-8 right-8 h-12 z-[1000]"
        >
            <AppTooltip title={`Exit Game`} placement="bottom">
                <div 
                    className={`flex items-center rounded-full h-12
                      ${hovered ? 'w-64' : 'w-12'} bg-white quick-transition hover:cursor-pointer`}
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                    onClick={handleExit}
                >
                    {session ? (
                        <Image
                            src={"/assets/images/game-user.png"}
                            width={12}
                            height={12}
                            alt="User Avatar"
                            quality={100}
                            className="w-12 h-12 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-full border-2 border-white shadow-lg object-cover"
                        />
                    ) : (
                        <div className="w-12 h-12 bg-google-logo bg-cover bg-no-repeat bg-center"></div>
                    )}
                    
                    <div className={`overflow-hidden ${hovered ? 'w-full' : 'w-0 hidden'}  flex flex-col items-start justify-center px-2  smooth-transition leading-none`}>
                        <span className="text-black max-w-[32ch] truncate">Exit Game</span>
                        <span className="font-normal text-slate-700 max-w-[32ch] truncate">Current Progress will be saved.</span>
                    </div>
                    
                    <div className={`${hovered ? 'opacity-100 w-6' : 'opacity-0 w-0'} flex justify-center quick-transition px-4`}>
                        <FontAwesomeIcon className="text-red-500" icon={faXmark}/>
                    </div>
                </div>
            </AppTooltip>
        </div>
    );
};

export default GameControls;