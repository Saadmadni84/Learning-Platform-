export interface State {
  id: string;
  name: string;
  type: 'state' | 'union_territory';
}

export interface District {
  id: string;
  name: string;
  stateId: string;
}

export interface MultiStepFormData {
  state: string;
  district: string;
  userId: string;
}

export interface StepProps {
  onNext: (data: Partial<MultiStepFormData>) => void;
  onPrevious: () => void;
  data: MultiStepFormData;
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
