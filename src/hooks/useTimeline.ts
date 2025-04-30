import { useState, useEffect, useCallback, useRef } from 'react';
import timelineConfig, { TimelineTask, TimelineStep } from '../data/timelineConfig';

export interface TimelineState {
  taskIndex: number;
  stepIndex: number;
  isRunning: boolean;
  currentTask: TimelineTask | null;
  currentStep: TimelineStep | null;
  progress: number;
}

const useTimeline = (autoStart = true) => {
  const [state, setState] = useState<TimelineState>({
    taskIndex: 0,
    stepIndex: -1, // Start at -1 so first step is 0
    isRunning: false,
    currentTask: null,
    currentStep: null,
    progress: 0,
  });
  
  const timerRef = useRef<number | null>(null);
  
  const startTimeline = useCallback(() => {
    setState(prev => ({
      ...prev,
      isRunning: true,
    }));
  }, []);
  
  const pauseTimeline = useCallback(() => {
    setState(prev => ({
      ...prev,
      isRunning: false,
    }));
  }, []);
  
  const resetTimeline = useCallback(() => {
    setState({
      taskIndex: 0,
      stepIndex: -1,
      isRunning: false,
      currentTask: null,
      currentStep: null,
      progress: 0,
    });
  }, []);
  
  const advanceStep = useCallback(() => {
    setState(prev => {
      const tasks = timelineConfig.tasks;
      
      // If no tasks, return current state
      if (tasks.length === 0) return prev;
      
      let newTaskIndex = prev.taskIndex;
      let newStepIndex = prev.stepIndex + 1;
      let newCurrentTask = tasks[newTaskIndex];
      
      // Check if we've completed all steps in current task
      if (newCurrentTask && newStepIndex >= newCurrentTask.steps.length) {
        // Move to next task
        newTaskIndex = (newTaskIndex + 1) % tasks.length;
        newStepIndex = 0;
        newCurrentTask = tasks[newTaskIndex];
        
        // Add delay between tasks (implemented with a timeout)
        if (timerRef.current) {
          window.clearTimeout(timerRef.current);
        }
        
        return {
          ...prev,
          taskIndex: newTaskIndex,
          stepIndex: -1, // Reset to -1 to indicate between-task state
          currentTask: null,
          currentStep: null,
          progress: 0,
        };
      }
      
      const newCurrentStep = newCurrentTask?.steps[newStepIndex] || null;
      
      return {
        ...prev,
        taskIndex: newTaskIndex,
        stepIndex: newStepIndex,
        currentTask: newCurrentTask,
        currentStep: newCurrentStep,
        progress: 0,
      };
    });
  }, []);
  
  // Effect to handle automatic timeline progression
  useEffect(() => {
    if (!state.isRunning) return;
    
    // If we're between tasks (stepIndex === -1), add a delay
    if (state.stepIndex === -1) {
      timerRef.current = window.setTimeout(() => {
        advanceStep();
      }, timelineConfig.loopDelay);
      return;
    }
    
    // Get duration for current step
    const duration = state.currentStep?.durationMs || timelineConfig.defaultStepDuration;
    const stepInterval = 50; // Update progress every 50ms
    const steps = duration / stepInterval;
    
    // Start progress updates
    const interval = window.setInterval(() => {
      setState(prev => {
        const newProgress = prev.progress + (1 / steps);
        
        // If progress reaches 1, advance to next step
        if (newProgress >= 1) {
          window.clearInterval(interval);
          advanceStep();
          return { ...prev, progress: 1 };
        }
        
        return { ...prev, progress: newProgress };
      });
    }, stepInterval);
    
    return () => {
      if (interval) window.clearInterval(interval);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [state.isRunning, state.taskIndex, state.stepIndex, state.currentStep, advanceStep]);
  
  // Auto-start timeline if enabled
  useEffect(() => {
    if (autoStart) {
      startTimeline();
    }
    
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [autoStart, startTimeline]);
  
  return {
    ...state,
    startTimeline,
    pauseTimeline,
    resetTimeline,
    advanceStep,
    timelineConfig,
  };
};

export default useTimeline; 