import React from "react";
import { motion } from "framer-motion";
import { Button } from "antd";
import NeonText from "./NeonText";
import { signIn, signOut, useSession } from "next-auth/react";
import UserInfo from "./UserInfo";
import AppTooltip from "./common/AppToolTip";
import { useRouter } from "next/router";
const LandingPage = () => {

  const router = useRouter();
  // const isMobile = useIsMobile();
  const { data: session } = useSession();
  return (
    <div className={`w-screen h-screen flex flex-col items-center justify-center 
    bg-landing-bg bg-cover bg-no-repeat bg-center p-2 gap-8`}>
      <div className="h-full w-full flex flex-col items-center justify-center md:justify-end gap-4">
        {session && <UserInfo />}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <NeonText text="FREEWAYS" size="large" weight="thin" effectClass="logo" />
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <NeonText text="ONLINE" size="medium" weight="light" effectClass="sub-logo" />
        </motion.h2>
      </div>
      <div className="h-full w-full flex items-start justify-center">
       
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-purple-900 bg-opacity-30  p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-4"
        >
          <div className={`${session ? "h-32 w-56 bg-controller-neon animate-bounce" : "h-32 w-32  bg-google-logo"} bg-cover bg-no-repeat bg-center`}></div>
          {!session ?
            <AppTooltip title={`Sign In`} placement="top">
              <Button
                className="text-white bg-black/20  hover:bg-gray-900 flex items-center gap-3 px-6 py-2 rounded-lg text-lg"
                onClick={() =>
                  session ? signOut() : signIn('google')
                }
              >
                Sign in with Google
              </Button>
            </AppTooltip>
            :
            <AppTooltip title={`Start Game`} placement="top">
              <Button
                className="animate-pulse text-xl text-white bg-black/20  hover:bg-gray-900 flex items-center gap-3 px-6 py-3 rounded-lg text-lg"
                onClick={() => router.push("/home")}
              >
                Start Game
              </Button>
            </AppTooltip>
          }
        </motion.div>

      </div>
    </div>
  );
};

export default LandingPage;
