'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { multiStepLoginSchema, MultiStepLoginFormData } from '@/validations/multi-step-login.validation';
import { MultiStepFormData } from '@/types/multi-step-login.types';

// Components
import ProgressIndicator from './ProgressIndicator';
import StateSelector from './StateSelector';
import DistrictSelector from './DistrictSelector';
import UserIdInput from './UserIdInput';

interface MultiStepFormProps {
  onComplete?: (data: MultiStepLoginFormData) => void;
  onCancel?: () => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<MultiStepFormData>({
    state: '',
    district: '',
    userId: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<MultiStepLoginFormData>({
    resolver: zodResolver(multiStepLoginSchema),
    mode: 'onChange'
  });

  const handleNext = async (stepData: Partial<MultiStepFormData>) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);
    
    // Update form values
    Object.entries(stepData).forEach(([key, value]) => {
      setValue(key as keyof MultiStepLoginFormData, value);
    });
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - validate and complete
      try {
        const finalData = { ...updatedData, ...stepData };
        const validatedData = multiStepLoginSchema.parse(finalData);
        
        setIsCompleted(true);
        
        // Simulate success animation delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        onComplete?.(validatedData);
      } catch (error) {
        console.error('Validation error:', error);
        // Handle validation error
      }
    }
    
    setIsLoading(false);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const renderCurrentStep = () => {
    const stepProps = {
      onNext: handleNext,
      onPrevious: handlePrevious,
      data: formData,
      isLoading
    };

    switch (currentStep) {
      case 1:
        return <StateSelector {...stepProps} />;
      case 2:
        return <DistrictSelector {...stepProps} />;
      case 3:
        return <UserIdInput {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Enhanced Form Card with Advanced Glass Morphism */}
      <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative">
        {/* Enhanced glass morphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/2 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
        
        {/* Header with Enhanced Design */}
        <div className="bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-indigo-600/90 p-8 text-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mr-6 shadow-2xl"
              >
                <span className="text-3xl">🎯</span>
              </motion.div>
              <div className="text-left">
                <div className="text-sm text-yellow-200 font-bold">Current Streak</div>
                <div className="text-3xl font-black text-white">3 Days</div>
                <div className="text-xs text-yellow-300">Keep it up! 🔥</div>
              </div>
            </div>
            
            <h1 className="text-4xl font-black text-white mb-2 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Welcome to Acadevia! 🚀
            </h1>
            <p className="text-purple-100 text-lg">
              Complete your profile to unlock achievements and start earning points!
            </p>
            
            {/* Enhanced Points Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 inline-flex items-center space-x-6 bg-white/15 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/30 shadow-lg"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⭐</span>
                <div>
                  <div className="text-white font-black text-lg">+50 Points</div>
                  <div className="text-yellow-200 text-xs">Total Reward</div>
                </div>
              </div>
              <div className="w-px h-6 bg-white/40"></div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <div className="text-white font-black text-lg">Profile Badge</div>
                  <div className="text-green-200 text-xs">Achievement</div>
                </div>
              </div>
              <div className="w-px h-6 bg-white/40"></div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <div className="text-white font-black text-lg">3 Steps</div>
                  <div className="text-blue-200 text-xs">To Complete</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <div className="p-8 pb-4">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            isCompleted={isCompleted}
          />
        </div>

        {/* Enhanced Form Content */}
        <div className="px-10 pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
              className="relative"
            >
              {renderCurrentStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Cancel Button */}
        {!isCompleted && (
          <div className="px-10 pb-8">
            <motion.button
              onClick={handleCancel}
              className="w-full py-3 text-purple-200 hover:text-white transition-all duration-300 text-sm font-medium bg-white/5 hover:bg-white/10 rounded-xl border border-white/20 hover:border-white/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ← Cancel and return to home
            </motion.button>
          </div>
        )}
      </div>

      {/* Enhanced Success Animation */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 bg-opacity-95 backdrop-blur-xl flex items-center justify-center rounded-3xl"
        >
          {/* Floating celebration particles */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ y: [-20, -40, -20], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-300 rounded-full opacity-80"
            />
            <motion.div
              animate={{ y: [-30, -50, -30], rotate: [0, -180, -360] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute top-1/3 right-1/4 w-3 h-3 bg-pink-300 rounded-full opacity-80"
            />
            <motion.div
              animate={{ y: [-25, -45, -25], rotate: [0, 90, 180] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
              className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-300 rounded-full opacity-80"
            />
          </div>
          
          <div className="text-center text-white relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <span className="text-5xl">🎉</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-black mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent"
            >
              Welcome Aboard! 🚀
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-green-100 text-lg mb-6"
            >
              Your profile has been set up successfully!
            </motion.p>
            
            {/* Achievement Summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center space-x-6 mb-4">
                <div className="text-center">
                  <div className="text-2xl">⭐</div>
                  <div className="text-sm font-bold">50 Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl">🏆</div>
                  <div className="text-sm font-bold">Profile Badge</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl">🎯</div>
                  <div className="text-sm font-bold">3 Day Streak</div>
                </div>
              </div>
              <p className="text-green-200 text-sm">
                You're now ready to start your learning journey!
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MultiStepForm;
