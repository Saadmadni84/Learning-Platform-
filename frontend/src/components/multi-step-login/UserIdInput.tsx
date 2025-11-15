'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ArrowLeft, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { StepProps } from '@/types/multi-step-login.types';
import { INDIAN_STATES, getDistrictsByState } from '@/data/indian-states-districts';

const UserIdInput: React.FC<StepProps> = ({ onNext, onPrevious, data, isLoading = false }) => {
  const [userId, setUserId] = useState(data.userId || '');
  const [showPassword, setShowPassword] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<'idle' | 'success' | 'error'>('idle');

  const selectedStateData = INDIAN_STATES.find(state => state.id === data.state);
  const selectedDistrictData = getDistrictsByState(data.state).find(district => district.id === data.district);

  const handleUserIdChange = (value: string) => {
    setUserId(value);
    setValidationResult('idle');
  };

  const handleNext = async () => {
    if (!userId.trim()) return;
    
    setIsValidating(true);
    
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (userId === '777') {
      setValidationResult('success');
      setTimeout(() => {
        onNext({ userId });
      }, 1000);
    } else {
      setValidationResult('error');
    }
    
    setIsValidating(false);
  };

  const handlePrevious = () => {
    onPrevious();
  };

  const isUserIdValid = userId === '777';
  const canProceed = userId.trim() !== '' && !isValidating;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <span className="text-3xl">🎓</span>
        </motion.div>
        
        <h2 className="text-4xl font-black text-white mb-2 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
          Enter Your User ID
        </h2>
        <p className="text-green-100 text-lg">
          Please enter your unique user identification number
        </p>
        
        {/* Points Preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
        >
          <span className="text-yellow-300">⭐</span>
          <span className="text-white font-bold">+25 Points</span>
        </motion.div>
      </div>

      {/* Location Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-700"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {selectedStateData?.name} → {selectedDistrictData?.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Location confirmed
            </p>
          </div>
        </div>
      </motion.div>

        {/* Enhanced User ID Input */}
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 text-xl">🎓</span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="🔐 Enter your User ID (e.g., 777)"
              value={userId}
              onChange={(e) => handleUserIdChange(e.target.value)}
              className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-green-200
                ${validationResult === 'success' 
                  ? 'border-green-400 focus:ring-4 focus:ring-green-200/30 bg-green-500/10' 
                  : validationResult === 'error'
                    ? 'border-red-400 focus:ring-4 focus:ring-red-200/30 bg-red-500/10'
                    : 'border-white/20 focus:border-green-400 focus:ring-4 focus:ring-green-200/30 hover:bg-white/15'
                }
              `}
              disabled={isValidating || validationResult === 'success'}
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-300 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </motion.button>
          </div>

        {/* Enhanced Success Message with Celebration */}
        {validationResult === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl border-2 border-green-400/50 rounded-2xl shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center"
              >
                <span className="text-2xl">🎉</span>
              </motion.div>
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-bold text-white text-lg"
                >
                  User ID Verified! 🎉
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-green-200"
                >
                  Welcome to the platform! Redirecting...
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-2 flex items-center space-x-2"
                >
                  <span className="text-yellow-300">⭐</span>
                  <span className="text-white font-bold">+25 Points Earned!</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {validationResult === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-red-400/50 rounded-2xl shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl flex items-center justify-center"
              >
                <span className="text-2xl">❌</span>
              </motion.div>
              <div>
                <p className="font-bold text-white text-lg">
                  Invalid User ID
                </p>
                <p className="text-red-200">
                  Please enter the correct User ID (777) to continue.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Help Text */}
        <div className="p-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-400/50 rounded-2xl">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">💡</span>
            </div>
            <div>
              <p className="text-lg font-bold text-white mb-2">
                Demo Instructions
              </p>
              <p className="text-blue-200">
                For demonstration purposes, please enter <strong className="text-yellow-300">777</strong> as your User ID to complete the login process.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex space-x-4"
      >
        <motion.button
          onClick={handlePrevious}
          disabled={isValidating || validationResult === 'success'}
          className="flex-1 py-4 px-6 border-2 border-white/20 text-white font-bold rounded-2xl hover:border-white/40 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>
        
        <motion.button
          onClick={handleNext}
          disabled={!canProceed || isLoading}
          className="flex-1 py-4 px-8 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold rounded-2xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative flex items-center justify-center space-x-3">
            {isValidating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Verifying...</span>
              </>
            ) : validationResult === 'success' ? (
              <>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-xl"
                >
                  🎉
                </motion.span>
                <span>Success!</span>
              </>
            ) : (
              <>
                <span className="text-lg">🎓</span>
                <span>Verify & Complete</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-lg"
                >
                  →
                </motion.span>
              </>
            )}
          </div>
        </motion.button>
      </motion.div>
      
      {/* Final Points Preview */}
      {canProceed && !isValidating && validationResult !== 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <span className="text-yellow-300">⭐</span>
            <span className="text-white font-bold">+25 Points</span>
            <span className="text-white">•</span>
            <span className="text-green-300">🏆</span>
            <span className="text-white font-bold">Profile Badge</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserIdInput;
