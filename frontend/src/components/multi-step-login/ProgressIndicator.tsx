'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';
import { ProgressIndicatorProps } from '@/types/multi-step-login.types';

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentStep, 
  totalSteps, 
  isCompleted = false 
}) => {
  const progressPercentage = isCompleted ? 100 : (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Enhanced Circular Progress Ring with Multiple Layers */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-32 h-32">
          {/* Outer Glow Ring */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 blur-lg"
          />
          
          {/* Background Circle */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className="text-white/20"
            />
            {/* Progress Circle with Enhanced Gradient */}
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              stroke="url(#enhancedGradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - progressPercentage / 100) }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))'
              }}
            />
            <defs>
              <linearGradient id="enhancedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="30%" stopColor="#3b82f6" />
                <stop offset="70%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Inner Progress Ring */}
          <svg className="absolute inset-2 w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="38"
              stroke="url(#innerGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 38}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 38 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 38 * (1 - progressPercentage / 100) }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            />
            <defs>
              <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Content with Enhanced Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="text-center"
            >
              <motion.div
                animate={isCompleted ? { 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360, 0]
                } : {}}
                transition={{ duration: 0.6 }}
                className="text-3xl font-black text-white"
              >
                {Math.round(progressPercentage)}%
              </motion.div>
              <div className="text-xs text-purple-200 font-medium">
                {isCompleted ? 'Complete!' : 'Progress'}
              </div>
            </motion.div>
          </div>
          
          {/* Floating Achievement Icons */}
          {isCompleted && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-sm">🏆</span>
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-sm">⭐</span>
              </motion.div>
            </>
          )}
        </div>
      </div>
        
        {/* Enhanced Achievement-Style Step Indicators */}
        <div className="flex justify-between mt-8">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isStepCompleted = stepNumber < currentStep || isCompleted;
            const stepIcons = ['🏛️', '🏫', '🎓'];
            const stepTitles = ['State', 'District', 'User ID'];
            const stepRewards = ['+10 Points', '+15 Points', '+25 Points'];
            const stepDescriptions = ['Select your state', 'Choose district', 'Enter your ID'];
            
            return (
              <motion.div
                key={stepNumber}
                className="flex flex-col items-center relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Connection Line */}
                {index < totalSteps - 1 && (
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-white/20 to-white/10 transform translate-x-1/2 z-0">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ 
                        width: isStepCompleted ? '100%' : '0%' 
                      }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                    />
                  </div>
                )}
                
                <motion.div
                  className={`
                    w-20 h-20 rounded-3xl flex items-center justify-center text-2xl font-bold
                    transition-all duration-500 shadow-2xl relative z-10
                    ${isStepCompleted 
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-green-500/50' 
                      : isActive 
                        ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-purple-500/50 scale-110' 
                        : 'bg-gradient-to-br from-white/20 to-white/10 text-white/60 backdrop-blur-sm border border-white/20'
                    }
                  `}
                  animate={isActive ? { 
                    scale: [1, 1.15, 1.1],
                    rotate: [0, 5, -5, 0],
                    boxShadow: [
                      '0 10px 25px rgba(139, 92, 246, 0.3)',
                      '0 20px 40px rgba(139, 92, 246, 0.5)',
                      '0 10px 25px rgba(139, 92, 246, 0.3)'
                    ]
                  } : {}}
                  transition={{ duration: 0.8, repeat: isActive ? Infinity : 0 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {/* Glow Effect for Active Step */}
                  {isActive && (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 to-blue-400 blur-lg -z-10"
                    />
                  )}
                  
                  {isStepCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                      className="relative"
                    >
                      <Check className="w-8 h-8" />
                      {/* Success Sparkle */}
                      <motion.div
                        animate={{ 
                          scale: [0, 1, 0],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ 
                          duration: 0.6,
                          delay: 0.5,
                          repeat: 2
                        }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
                      >
                        <span className="text-xs">✨</span>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.span
                      animate={isActive ? { 
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0]
                      } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      {stepIcons[index]}
                    </motion.span>
                  )}
                </motion.div>
                
                <div className="mt-4 text-center max-w-24">
                  <motion.div
                    className={`
                      text-sm font-bold mb-1
                      ${isStepCompleted || isActive 
                        ? 'text-white' 
                        : 'text-white/60'
                      }
                    `}
                    animate={isActive ? { 
                      color: ['#ffffff', '#fbbf24', '#ffffff']
                    } : {}}
                    transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                  >
                    {stepTitles[index]}
                  </motion.div>
                  
                  <div className="text-xs text-white/50 mb-2">
                    {stepDescriptions[index]}
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="inline-flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20"
                  >
                    <span className="text-yellow-300 text-xs">⭐</span>
                    <span className="text-xs font-medium text-white/80">
                      {stepRewards[index]}
                    </span>
                  </motion.div>
                  
                  {isStepCompleted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-2 text-xs text-green-400 font-bold bg-green-400/20 rounded-full px-2 py-1"
                    >
                      ✓ Complete
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      
      {/* Motivational Progress Text */}
      <motion.div 
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {isCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 border-2 border-green-200 dark:border-green-700"
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl">🎉</span>
              <span className="text-green-600 dark:text-green-400 font-bold text-lg">
                Profile Complete!
              </span>
              <span className="text-2xl">🏆</span>
            </div>
            <p className="text-green-700 dark:text-green-300 font-medium">
              You've earned 50 points and unlocked the Profile Badge!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
              {currentStep === 1 && "🏛️ Let's start with your location!"}
              {currentStep === 2 && "🏫 Almost there! Select your district."}
              {currentStep === 3 && "🎓 Final step! Enter your User ID."}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep} of {totalSteps} • {Math.round(progressPercentage)}% complete
            </p>
            <div className="flex items-center justify-center space-x-4 mt-3">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  +{currentStep * 10} points earned
                </span>
              </div>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center space-x-1">
                <span className="text-blue-500">🎯</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {3 - currentStep} steps remaining
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProgressIndicator;
