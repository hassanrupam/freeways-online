"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PuffLoader } from "react-spinners";

interface FancyFullScreenLoaderProps {
  loading: boolean;
  message?: string;
}

const FancyFullScreenLoader = ({
  loading,
  message = "Loading...",
}: FancyFullScreenLoaderProps) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/30 flex items-center justify-center pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center space-y-6"
          >
            <PuffLoader size={80} color="#b8e6fe" />
            <h1 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 animate-pulse">
              {message}
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FancyFullScreenLoader;
