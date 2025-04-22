import React from "react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { Button } from "antd";
import NeonText from "./NeonText";
import { useRouter } from "next/router";
// bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]
const LandingPage = () => {

  const router = useRouter();
  return ( 
    <div className={`w-screen min-h-screen flex items-center justify-center 
    bg-landing-bg bg-cover bg-no-repeat bg-center
     p-2
    `}>
      <div className="text-center space-y-12">
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
          >
            <NeonText text="FREEWAYS" size="large" weight="light"/>
            {/* <div className="logo font-barlow font-thin text-9xl"><b>F<span>R</span>EE<span>W</span>AYS</b></div> */}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-3xl text-pink-500 font-semibold"
          >
              <NeonText text="ONLINE" size="medium" weight="normal" effectClass="sub-logo"/>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-purple-900 bg-opacity-30  p-8 rounded-2xl shadow-lg inline-block"
        >
          <Button
            className="text-white bg-black/20  hover:bg-gray-900 flex items-center gap-3 px-6 py-3 rounded-lg text-lg"
            onClick={() => router.push("/home")}
          >
            <FaGoogle className="text-xl" /> Sign in with Google
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
