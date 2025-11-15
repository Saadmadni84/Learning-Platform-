'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { NavigationButtonsProps } from '@/types/multi-step-login.types';

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
  isNextDisabled,
  isLoading = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex space-x-4"
    >
      {/* Previous Button */}
      {!isFirstStep && (
        <motion.button
          onClick={onPrevious}
          disabled={isLoading}
          className="flex-1 py-3 px-6 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </motion.button>
      )}

      {/* Next/Complete Button */}
      <motion.button
        onClick={onNext}
        disabled={isNextDisabled || isLoading}
        className={`
          flex-1 py-3 px-6 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2
          ${isLastStep
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
            : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
          }
          ${isNextDisabled || isLoading
            ? 'opacity-50 cursor-not-allowed'
            : 'transform hover:scale-105'
          }
        `}
        whileHover={!isNextDisabled && !isLoading ? { scale: 1.05 } : {}}
        whileTap={!isNextDisabled && !isLoading ? { scale: 0.95 } : {}}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </>
        ) : isLastStep ? (
          <>
            <CheckCircle className="w-5 h-5" />
            <span>Complete</span>
          </>
        ) : (
          <>
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default NavigationButtons;
