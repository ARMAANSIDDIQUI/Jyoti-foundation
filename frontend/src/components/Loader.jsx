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
        
        {/* Pulsing heart or logo placeholder */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(58,134,255,0.5)]" />
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
