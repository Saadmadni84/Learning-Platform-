'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, MapPin, School, User } from 'lucide-react';
import { ProgressIndicatorProps } from '@/types/auth.types';

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentStep, 
  totalSteps, 
  isCompleted = false 
}) => {
  const steps = [
    { number: 1, label: 'State', icon: MapPin },
    { number: 2, label: 'School', icon: School },
    { number: 3, label: 'Student ID', icon: User }
  ];

  return (
    <div className="mb-8">
      {/* Step Numbers */}
      <div className="flex justify-between mb-4">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const Icon = step.icon;
          
          return (
            <motion.div
              key={step.number}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                    : isActive
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-110'
                    : 'bg-gray-300 text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </div>
              <span
                className={`text-xs font-medium mt-2 transition-colors duration-300 ${
                  isActive || isCompleted
                    ? 'text-gray-800 dark:text-gray-200'
                    : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ 
            width: isCompleted 
              ? '100%' 
              : `${((currentStep - 1) / (totalSteps - 1)) * 100}%` 
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      {/* Progress Text */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)}% Complete
        </span>
      </div>
    </div>
  );
};

export default ProgressIndicator;
