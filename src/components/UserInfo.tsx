// import { charCounter } from "@/utils/helperFunctions";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import AppTooltip from "./common/AppToolTip";

const UserInfo = () => {
    const { data: session } = useSession();

    const [hovered, setHovered] = useState<boolean>(false);

    // const nameLength = charCounter(session?.user?.name || "");
    // const widthClass = `w-${nameLength * 2}`;

    return (
        <AppTooltip title={`Sign Out`} placement="top">
        <div className={`absolute group flex items-center rounded-full top-8 right-8 h-12
          ${hovered ? 'w-64 ' : 'w-12 '} bg-white quick-transition hover:cursor-pointer
         `} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={()=>{signOut()}}>
            {
                session ?
                    <Image
                        src={session.user?.image || ""}
                        width={12}
                        height={12}
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
                    />
                    :
                    <div className="w-12 h-12 bg-google-logo bg-cover bg-no-repeat bg-center"></div>
            }
            <div className={`${hovered ? 'w-full' : 'w-0'} flex flex-col items-start justify-center px-2 smooth-transition leading-none`}>
                <span className={`${hovered ? 'w-full' : 'w-0'} text-black max-w-[32ch] truncate`}>{session?.user?.name}</span>
                <span className={`${hovered ? 'w-full' : 'w-0'} font-normal text-slate-700 max-w-[32ch] truncate`}>{session?.user?.email}</span>
            </div>
            <FontAwesomeIcon className={`${hovered ? 'w-full' : 'w-0'} text-red-500 quick-transition`} icon={faArrowRightFromBracket}/>
        </div>
        </AppTooltip>
    )
}

export default UserInfo;