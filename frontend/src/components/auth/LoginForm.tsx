'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, LoginFormData } from '@/validations/auth.validation';
import { LoginFormData as FormData } from '@/types/auth.types';

// Components
import ProgressIndicator from './ProgressIndicator';
import StateSelector from './StateSelector';
import SchoolSelector from './SchoolSelector';
import StudentIdInput from './StudentIdInput';

interface LoginFormProps {
  onComplete?: (data: LoginFormData) => void;
  onCancel?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    state: '',
    school: '',
    studentId: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const { handleSubmit, setValue, watch } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: formData
  });

  const handleStepNext = (data: Partial<FormData>) => {
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);
    
    // Update form values
    Object.entries(data).forEach(([key, value]) => {
      setValue(key as keyof LoginFormData, value);
    });

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data in localStorage
      const userProfile = {
        state: formData.state,
        school: formData.school,
        studentId: formData.studentId,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      localStorage.setItem('isLoggedIn', 'true');
      
      setIsCompleted(true);
      
      // Call completion handler after a delay
      setTimeout(() => {
        onComplete?.(data);
      }, 2000);
      
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StateSelector
            onNext={handleStepNext}
            data={formData}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <SchoolSelector
            onNext={handleStepNext}
            onPrevious={handleStepPrevious}
            data={formData}
            isLoading={isLoading}
          />
        );
      case 3:
        return (
          <StudentIdInput
            onNext={handleFormSubmit}
            onPrevious={handleStepPrevious}
            data={formData}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto"
        >
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>
        
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Login Successful! 🎉
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Welcome to Acadevia! Your learning journey begins now.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700"
        >
          <div className="space-y-2">
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              Profile Created Successfully
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You will be redirected to the home page shortly...
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={3}
        isCompleted={isCompleted}
      />

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Cancel Button */}
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors text-sm"
          >
            Cancel and return to home
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default LoginForm;
