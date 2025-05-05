import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useRef } from "react";
import AppTooltip from "./common/AppToolTip";
import RightToLeftWiggle from "./common/motions/RightToLeftWiggle";

const UserInfo = () => {
    const { data: session } = useSession();
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
    const handleSignOut = () => {
        signOut();
    };

    return (
        <div
            ref={containerRef}
            className="fixed top-8 right-8 h-12 z-[1000]"
        >
            <RightToLeftWiggle>
                <AppTooltip title={`Sign Out`} placement="bottom">
                    <div
                        className={`flex items-center rounded-full h-12
                      ${hovered ? 'w-64' : 'w-12'} bg-white quick-transition hover:cursor-pointer`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleSignOut}
                    >
                        {session ? (
                            <Image
                                src={session.user?.image || ""}
                                width={12}
                                height={12}
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
                            />
                        ) : (
                            <div className="w-12 h-12 bg-google-logo bg-cover bg-no-repeat bg-center"></div>
                        )}

                        <div className={`overflow-hidden ${hovered ? 'w-full' : 'w-0 hidden'} flex flex-col items-start justify-center px-2  smooth-transition leading-none`}>
                            <span className="text-black max-w-[32ch] truncate">{session?.user?.name}</span>
                            <span className="font-normal text-slate-700 max-w-[32ch] truncate">{session?.user?.email}</span>
                        </div>

                        <div className={`${hovered ? 'opacity-100 w-6' : 'opacity-0 w-0'} flex justify-center quick-transition px-4`}>
                            <FontAwesomeIcon className="text-red-500" icon={faArrowRightFromBracket} />
                        </div>
                    </div>
                </AppTooltip>
            </RightToLeftWiggle>
        </div>
    );
};

export default UserInfo;