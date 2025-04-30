import { useState } from 'react';
import { motion } from 'framer-motion';

const TestComponent = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Hot Reload Test Component</h2>
      
      <motion.div
        animate={{ 
          rotate: isAnimating ? 360 : 0,
          scale: isAnimating ? 1.2 : 1
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-20 h-20 bg-blue-500 rounded-lg mx-auto mb-4"
        onClick={() => setIsAnimating(!isAnimating)}
      />
      
      <p className="text-gray-600 text-center">
        Click the blue square to animate it
      </p>
      <p className="text-gray-500 text-sm text-center mt-2">
        Edit this text to test hot reloading
      </p>
    </div>
  );
};

export default TestComponent; 