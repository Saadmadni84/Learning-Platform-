'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import { StepProps } from '@/types/auth.types';
import { getSchoolsByState, getStateById } from '@/data/states-schools';

const StudentIdInput: React.FC<StepProps> = ({ onNext, onPrevious, data, isLoading = false }) => {
  const [studentId, setStudentId] = useState(data.studentId || '');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!studentId.trim()) {
      setError('Student ID is required');
      return;
    }

    if (studentId !== '777' && studentId !== '555') {
      setError('Invalid Student ID. Please enter 777 or 555 to continue.');
      return;
    }

    setError('');
    onNext({ studentId });
  };

  const handleInputChange = (value: string) => {
    setStudentId(value);
    setError('');
  };

  const schoolData = getSchoolsByState(data.state).find(school => school.id === data.school);
  const stateData = getStateById(data.state);

  const isValidId = studentId === '777' || studentId === '555';
  const hasError = error && studentId !== '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <User className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Enter Your Student ID
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Verify your identity to complete the login process
        </p>
      </div>

      {/* School and State Info */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700"
      >
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {schoolData?.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stateData?.name}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Student ID Input */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your Student ID"
            value={studentId}
            onChange={(e) => handleInputChange(e.target.value)}
            className={`w-full px-4 py-4 pr-12 border-2 rounded-xl focus:ring-2 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
              hasError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800'
                : isValidId
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200 dark:focus:ring-green-800'
                : 'border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-200 dark:focus:ring-green-800'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Validation Icons */}
        {studentId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2"
          >
            {isValidId ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                  Valid Student ID
                </span>
              </>
            ) : hasError ? (
              <>
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-600 dark:text-red-400 text-sm font-medium">
                  {error}
                </span>
              </>
            ) : (
              <>
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Enter 777 or 555
                </span>
              </>
            )}
          </motion.div>
        )}

        {/* Valid IDs Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl"
        >
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <div>
              <p className="text-blue-800 dark:text-blue-200 font-medium text-sm">
                Demo Instructions
              </p>
              <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                For demonstration purposes, please enter <strong>777</strong> or <strong>555</strong> as your Student ID.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <motion.button
          onClick={onPrevious}
          className="flex-1 py-4 border-2 border-gray-300 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Previous
        </motion.button>
        
        <motion.button
          onClick={handleSubmit}
          disabled={!isValidId || isLoading}
          className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verifying...</span>
            </div>
          ) : (
            'Complete Login'
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StudentIdInput;
