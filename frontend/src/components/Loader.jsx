import React from 'react';
import { motion } from 'motion/react';

const Loader = ({ fullScreen = false }) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-md"
    : "flex items-center justify-center p-12 w-full";

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Main outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary"
        />
        
        {/* Pulsing logo */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center p-2"
        >
          <img src="/logo.png" alt="Loading..." className="w-full h-full object-contain drop-shadow-md" />
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
