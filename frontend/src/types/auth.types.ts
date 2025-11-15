export interface State {
  id: string;
  name: string;
  type: 'state' | 'union_territory';
}

export interface School {
  id: string;
  name: string;
  stateId: string;
  type: 'public' | 'private' | 'international';
}

export interface LoginFormData {
  state: string;
  school: string;
  studentId: string;
}

export interface UserProfile {
  state: string;
  school: string;
  studentId: string;
  loginTime: string;
}

export interface StepProps {
  onNext: (data: Partial<LoginFormData>) => void;
  onPrevious: () => void;
  data: LoginFormData;
  isLoading?: boolean;
}

export interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  isCompleted?: boolean;
}

export interface NavigationButtonsProps {
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isNextDisabled: boolean;
  isLoading?: boolean;
}
