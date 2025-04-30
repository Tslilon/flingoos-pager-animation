import React from 'react';
import { motion } from 'framer-motion';

interface AnimationRunnerProps {
  children?: React.ReactNode;
}

const AnimationRunner: React.FC<AnimationRunnerProps> = ({ children }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div 
        className="bg-white rounded-lg shadow-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimationRunner; 