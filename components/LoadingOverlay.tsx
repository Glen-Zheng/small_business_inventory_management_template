import React from "react";
import { motion } from "framer-motion";

const LoadingOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gray-800 rounded-lg p-8 shadow-2xl"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="w-16 h-16 border-t-4 border-turqoise border-solid rounded-full animate-spin mb-4 mx-auto"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-white text-xl font-semibold tracking-wider"
        >
          Loading
          <motion.span
            animate={{ opacity: [0, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            ...
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingOverlay;
