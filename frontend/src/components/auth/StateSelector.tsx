'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ChevronDown, Check } from 'lucide-react';
import { StepProps } from '@/types/auth.types';
import { INDIAN_STATES } from '@/data/states-schools';

const StateSelector: React.FC<StepProps> = ({ onNext, data, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(data.state || '');

  const filteredStates = INDIAN_STATES.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStateSelect = (stateId: string) => {
    setSelectedState(stateId);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const handleNext = () => {
    if (selectedState) {
      onNext({ state: selectedState });
    }
  };

  const selectedStateData = INDIAN_STATES.find(state => state.id === selectedState);

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
          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <MapPin className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Select Your State
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose your state or union territory to continue
        </p>
      </div>

      {/* Search and Dropdown */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for your state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Dropdown */}
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-60 overflow-y-auto"
          >
            {filteredStates.length > 0 ? (
              filteredStates.map((state) => (
                <button
                  key={state.id}
                  onClick={() => handleStateSelect(state.id)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                    <span className="text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {state.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {state.type === 'state' ? 'State' : 'UT'}
                    </span>
                  </div>
                  {selectedState === state.id && (
                    <Check className="w-4 h-4 text-purple-500" />
                  )}
                </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-center">
                  No states found
                </div>
              )}
          </motion.div>
        )}
      </div>

      {/* Selected State Display */}
      {selectedStateData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-700"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {selectedStateData.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedStateData.type === 'state' ? 'State' : 'Union Territory'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Next Button */}
      <motion.button
        onClick={handleNext}
        disabled={!selectedState || isLoading}
        className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          'Continue to School Selection'
        )}
      </motion.button>
    </motion.div>
  );
};

export default StateSelector;
