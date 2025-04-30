import React from 'react';
import { motion } from 'framer-motion';

export type NodeState = 'idle' | 'appear' | 'connecting' | 'loading' | 'done';

interface WorkflowNodeProps {
  icon?: React.ReactNode;
  label: string;
  state: NodeState;
  index: number;
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({ 
  icon, 
  label, 
  state,
  index
}) => {
  const getBgColor = () => {
    switch (state) {
      case 'loading':
        return 'bg-blue-100';
      case 'done':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getBorderColor = () => {
    switch (state) {
      case 'loading':
        return 'border-blue-500';
      case 'done':
        return 'border-green-500';
      default:
        return 'border-gray-300';
    }
  };

  const getIconColor = () => {
    switch (state) {
      case 'loading':
        return 'text-blue-500';
      case 'done':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <motion.div
      className={`relative rounded-lg border-2 p-4 ${getBgColor()} ${getBorderColor()} transition-colors duration-300`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: state !== 'idle' ? 1 : 0.5, 
        scale: 1,
        x: 0
      }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.2
      }}
    >
      {state === 'loading' && (
        <motion.div 
          className="absolute inset-0 bg-blue-500 opacity-10 rounded-lg" 
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      <div className="flex items-center">
        <div className={`mr-3 ${getIconColor()}`}>
          {icon}
        </div>
        <span className="font-medium">{label}</span>
        
        {state === 'done' && (
          <motion.div 
            className="ml-auto text-green-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default WorkflowNode; 