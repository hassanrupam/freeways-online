import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useRef } from "react";
import AppTooltip from "./common/AppToolTip";
import { useRouter } from "next/router";
import RightToLeftWiggle from "./common/motions/RightToLeftWiggle";

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
            className="fixed top-8 right-8 h-16 z-[1000]"
        >
            <RightToLeftWiggle>
            <AppTooltip title={`Exit Game`} placement="bottom">
                <div 
                    className={`flex items-center rounded-full h-16
                      ${hovered ? 'w-72' : 'w-16'} bg-white quick-transition hover:cursor-pointer`}
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                    onClick={handleExit}
                >
                    {session ? (
                        <Image
                            src={"/assets/images/controller-visible.png"}
                            width={16}
                            height={16}
                            alt="User Avatar"
                            quality={100}
                            className="w-16 h-16 bg-black rounded-full border-2 border-white shadow-lg object-cover"
                        />
                    ) : (
                        <div className="w-16 h-16 bg-google-logo bg-cover bg-no-repeat bg-center"></div>
                    )}
                    
                    <div className={`overflow-hidden ${hovered ? 'w-full' : 'w-0 hidden'}  flex flex-col items-start justify-center px-2  smooth-transition leading-none`}>
                        <span className="text-black max-w-[32ch] truncate">Exit Game</span>
                        <span className="font-normal text-slate-700 max-w-[32ch] truncate">Progress will be saved.</span>
                    </div>
                    
                    <div className={`${hovered ? 'opacity-100 w-8' : 'opacity-0 w-0'} flex justify-center quick-transition px-8`}>
                        <FontAwesomeIcon className="text-3xl text-red-500" icon={faXmark}/>
                    </div>
                </div>
            </AppTooltip>
            </RightToLeftWiggle>
        </div>
    );
};

export default GameControls;