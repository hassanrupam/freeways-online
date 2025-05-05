import React from "react";
import { Button } from "antd";
import NeonText from "./NeonText";
import { signIn, signOut, useSession } from "next-auth/react";
import UserInfo from "./UserInfo";
import AppTooltip from "./common/AppToolTip";
import { useRouter } from "next/router";
import FlyInMotion from "./common/motions/FlyInMotion";
import ScaleMotion from "./common/motions/ScaleMotion";
const LandingPage = () => {

  const router = useRouter();
  const { data: session } = useSession();


  return (
    <div className={`w-screen h-screen flex flex-col items-center justify-center 
    bg-landing-bg bg-auto bg-no-repeat bg-center p-2 gap-8 animate-bg-pan`}>
      <div className="inset-0 w-screen h-screen fixed animate-spin-slower bg-neon-circle bg-contain bg-no-repeat bg-center opacity-50 bg-origin-border"></div>
      <div className="inset-0 w-screen h-screen fixed animate-spin-medium bg-neon-circle bg-contain bg-no-repeat bg-center opacity-40 bg-origin-border blur-[1px]"></div>
      <div className="inset-0 w-screen h-screen fixed animate-spin-slow bg-neon-circle bg-contain bg-no-repeat bg-center opacity-30 bg-origin-border blur-xs"></div>
      <div className="h-full w-full flex flex-col items-center justify-center md:justify-end gap-4">
        {session &&<UserInfo />}
        <FlyInMotion initialStart={{y:-50,x:-50}}>
          <NeonText text="FREEWAYS" size="large" weight="thin" effectClass="logo" />
        </FlyInMotion>
        <FlyInMotion initialStart={{y:50,x:50}}>
          <NeonText text="ONLINE" size="medium" weight="light" effectClass="sub-logo" />
        </FlyInMotion>
      </div>
      <div className="h-full w-full flex items-start justify-center  py-4">
        <ScaleMotion delay={0.6} initialScale={0.5} className="h-72 w-96 bg-purple-200 bg-opacity-10 inner-shadow  p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-4 ring-2 ring-pink-300 ring-opacity-30">
          <div className={`${session ? "px-12 h-72 w-48 bg-controller-neon animate-bounce" : "h-32 w-32  bg-google-logo"} bg-contain bg-no-repeat bg-center`}></div>
          {!session ?
            <AppTooltip title={`Sign In`} placement="top">
              <Button
                className="w-64 h-12 hover:bg-gray-900 hover:animate-none text-xl text-white bg-black/50  hover:bg-gray-900 px-6 py-3 rounded-lg text-lg"
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
                className="w-64 h-12 hover:bg-gray-900 hover:animate-none text-xl text-white bg-black/50  hover:bg-gray-900 px-6 py-3 rounded-lg text-lg"
                onClick={() => router.push("/home")}
              >
                Start Game
              </Button>
            </AppTooltip>
          }
        </ScaleMotion>
      </div>
    </div>
  );
};

export default LandingPage;
