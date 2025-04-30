import React from 'react';
import { motion } from 'framer-motion';

interface ConnectorLineProps {
  isDrawing: boolean;
  direction?: 'vertical' | 'horizontal';
  length?: number;
  color?: string;
  thickness?: number;
}

const ConnectorLine: React.FC<ConnectorLineProps> = ({
  isDrawing,
  direction = 'vertical',
  length = 80,
  color = '#4F46E5',
  thickness = 2,
}) => {
  const isVertical = direction === 'vertical';
  
  const width = isVertical ? thickness : length;
  const height = isVertical ? length : thickness;
  
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { 
        duration: 0.7,
        ease: "easeInOut" 
      }
    }
  };

  const getPathData = () => {
    if (isVertical) {
      return `M${width/2} 0 L${width/2} ${height}`;
    } else {
      return `M0 ${height/2} L${width} ${height/2}`;
    }
  };

  return (
    <div className="flex justify-center">
      <motion.svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        initial="hidden"
        animate={isDrawing ? "visible" : "hidden"}
      >
        <motion.path
          d={getPathData()}
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray="0 1"
          fill="none"
          variants={pathVariants}
        />
      </motion.svg>
    </div>
  );
};

export default ConnectorLine; 