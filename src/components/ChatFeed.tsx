import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ChatMessage {
  id: string;
  text: string;
  completed: boolean;
}

interface ChatFeedProps {
  messages: ChatMessage[];
  activeIndex: number;
}

const ChatFeed: React.FC<ChatFeedProps> = ({ messages, activeIndex }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeIndex]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full overflow-hidden flex flex-col">
      <div className="text-lg font-semibold mb-3 pb-2 border-b">Process Feed</div>
      
      <div className="overflow-y-auto flex-grow pr-2">
        <AnimatePresence mode="popLayout">
          {messages.slice(0, activeIndex + 1).map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-3 p-3 rounded-lg ${message.completed ? 'bg-green-50 border-l-4 border-green-500' : 'bg-gray-50 border-l-4 border-gray-300'}`}
            >
              <div className="text-sm text-gray-600">Step {index + 1}</div>
              <div className="text-gray-800">{message.text}</div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatFeed; 