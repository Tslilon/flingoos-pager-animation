import { useState, useEffect, useCallback } from 'react';

interface TypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

const useTypewriter = ({
  text,
  speed = 40,
  delay = 0,
  onComplete,
}: TypewriterOptions) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const resetTypewriter = useCallback(() => {
    setDisplayText('');
    setIsComplete(false);
    setIsTyping(false);
  }, []);

  const startTypewriter = useCallback(() => {
    resetTypewriter();
    setIsTyping(true);
  }, [resetTypewriter]);

  useEffect(() => {
    if (!isTyping) return;

    let timeoutId: number | null = null;
    let currentIndex = 0;

    // Initial delay before starting to type
    const startTyping = () => {
      timeoutId = window.setTimeout(function typeNextChar() {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          currentIndex++;
          timeoutId = window.setTimeout(typeNextChar, speed);
        } else {
          setIsComplete(true);
          setIsTyping(false);
          if (onComplete) onComplete();
        }
      }, speed);
    };

    if (delay > 0) {
      timeoutId = window.setTimeout(startTyping, delay);
    } else {
      startTyping();
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [text, speed, delay, isTyping, onComplete]);

  return {
    displayText,
    isComplete,
    isTyping,
    startTypewriter,
    resetTypewriter,
  };
};

export default useTypewriter; 