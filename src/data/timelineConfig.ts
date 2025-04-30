import { NodeState } from '../components/WorkflowNode';

export interface TimelineStep {
  id: string;
  label: string;
  description: string;
  durationMs: number;
}

export interface TimelineTask {
  id: string;
  title: string;
  steps: TimelineStep[];
}

export interface TimelineConfig {
  tasks: TimelineTask[];
  defaultStepDuration: number;
  loopDelay: number;
}

// Sample timeline configuration
const timelineConfig: TimelineConfig = {
  tasks: [
    {
      id: 'task-1',
      title: 'Data Processing Workflow',
      steps: [
        {
          id: 'read-csv',
          label: 'read_csv',
          description: 'Successfully read CSV file content',
          durationMs: 2000,
        },
        {
          id: 'check-empty',
          label: 'check_if_empty',
          description: 'Verified CSV content is not empty',
          durationMs: 1500,
        },
        {
          id: 'handle-empty',
          label: 'handle_empty_check',
          description: 'Processed valid data from CSV',
          durationMs: 2500,
        },
      ],
    },
    {
      id: 'task-2',
      title: 'User Verification Process',
      steps: [
        {
          id: 'validate-user',
          label: 'validate_user',
          description: 'User credentials verified successfully',
          durationMs: 1800,
        },
        {
          id: 'check-permissions',
          label: 'check_permissions',
          description: 'User permissions validated',
          durationMs: 1600,
        },
        {
          id: 'grant-access',
          label: 'grant_access',
          description: 'Access granted to protected resources',
          durationMs: 2200,
        },
      ],
    },
  ],
  defaultStepDuration: 2000,
  loopDelay: 3000,
};

export default timelineConfig;

// Helper function to get node state based on current step and index
export const getNodeState = (
  currentStepIndex: number,
  nodeIndex: number
): NodeState => {
  if (nodeIndex > currentStepIndex) return 'idle';
  if (nodeIndex === currentStepIndex) return 'loading';
  return 'done';
}; 