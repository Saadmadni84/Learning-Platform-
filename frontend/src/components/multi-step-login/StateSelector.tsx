'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { StepProps } from '@/types/multi-step-login.types';
import { INDIAN_STATES } from '@/data/indian-states-districts';

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
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
      className="w-full"
    >
      {/* Enhanced Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl relative"
        >
          <span className="text-4xl">🏛️</span>
          {/* Floating particles around icon */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 360, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full"
          />
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, -360, 0]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -bottom-2 -left-2 w-2 h-2 bg-pink-400 rounded-full"
          />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-black text-white mb-3 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent"
        >
          Select Your State
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-purple-100 text-lg mb-6"
        >
          Choose your state or union territory to continue
        </motion.p>
        
        {/* Enhanced Points Preview */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="inline-flex items-center space-x-3 bg-white/15 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/30 shadow-lg"
        >
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-yellow-300 text-xl"
          >
            ⭐
          </motion.span>
          <div>
            <div className="text-white font-black text-lg">+10 Points</div>
            <div className="text-yellow-200 text-xs">Step 1 Reward</div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Search and Dropdown */}
      <div className="space-y-6">
        {/* Modern Search Input with Glassmorphism */}
        <div className="relative">
          <motion.div
            animate={isDropdownOpen ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-purple-300 w-6 h-6 z-10" />
            <input
              type="text"
              placeholder="🔍 Search for your state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
              className="w-full pl-14 pr-12 py-5 border-2 border-white/20 rounded-3xl focus:border-purple-400 focus:ring-4 focus:ring-purple-200/30 transition-all duration-300 bg-white/10 backdrop-blur-xl text-white placeholder-purple-200 focus:bg-white/20 hover:bg-white/15 shadow-xl"
            />
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-all duration-200 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Enhanced Selected State Display */}
        {selectedStateData && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-6 bg-white/15 backdrop-blur-2xl rounded-3xl border-2 border-white/30 shadow-2xl relative overflow-hidden"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse"></div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-xl relative"
                >
                  <span className="text-2xl">🏛️</span>
                  {/* Success indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center"
                  >
                    <span className="text-xs">✓</span>
                  </motion.div>
                </motion.div>
                <div>
                  <p className="font-black text-white text-xl">
                    {selectedStateData.name}
                  </p>
                  <p className="text-purple-200 capitalize text-sm">
                    {selectedStateData.type.replace('_', ' ')}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-yellow-300 text-sm">⭐</span>
                    <span className="text-yellow-200 text-sm font-bold">+10 Points Earned</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setSelectedState('');
                  setIsDropdownOpen(false);
                }}
                className="text-purple-300 hover:text-white transition-all duration-300 p-3 rounded-2xl hover:bg-white/10 border border-white/20 hover:border-white/40"
              >
                ✕
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Enhanced Dropdown with Modern Styling */}
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="max-h-80 overflow-y-auto border-2 border-white/30 rounded-3xl bg-white/15 backdrop-blur-2xl shadow-2xl relative"
          >
            {/* Dropdown header */}
            <div className="sticky top-0 bg-white/20 backdrop-blur-xl border-b border-white/20 p-4 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🏛️</span>
                  <span className="text-white font-bold">Select State</span>
                </div>
                <span className="text-purple-200 text-sm">
                  {filteredStates.length} states
                </span>
              </div>
            </div>
            
            <div className="p-2">
              {filteredStates.length > 0 ? (
                filteredStates.map((state, index) => (
                  <motion.button
                    key={state.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleStateSelect(state.id)}
                    className="w-full px-6 py-5 text-left hover:bg-white/20 transition-all duration-300 flex items-center justify-between group rounded-2xl mx-1 my-1 border border-transparent hover:border-white/20"
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-12 h-12 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-2xl flex items-center justify-center"
                      >
                        <span className="text-xl">🏛️</span>
                      </motion.div>
                      <div>
                        <p className="font-bold text-white text-lg">
                          {state.name}
                        </p>
                        <p className="text-purple-200 capitalize text-sm">
                          {state.type.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      className="text-purple-300 group-hover:text-white transition-colors"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-white/60 text-lg">
                    No states found matching "{searchTerm}"
                  </p>
                  <p className="text-purple-200 text-sm mt-2">
                    Try a different search term
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Enhanced States Grid */}
        {!isDropdownOpen && !searchTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-y-auto"
          >
            {INDIAN_STATES.slice(0, 12).map((state) => (
              <motion.button
                key={state.id}
                onClick={() => handleStateSelect(state.id)}
                className="p-4 text-left bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 hover:border-purple-400/50 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-xl flex items-center justify-center">
                    <span className="text-lg">🏛️</span>
                  </div>
                  <span className="font-bold text-white group-hover:text-yellow-200 transition-colors">
                    {state.name}
                  </span>
                </div>
              </motion.button>
            ))}
            
            {INDIAN_STATES.length > 12 && (
              <button
                onClick={() => setIsDropdownOpen(true)}
                className="p-3 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-200 group"
              >
                <div className="flex items-center justify-center space-x-2">
                  <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-purple-500" />
                  <span className="text-sm font-medium text-gray-500 group-hover:text-purple-500">
                    View all {INDIAN_STATES.length} states
                  </span>
                </div>
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Enhanced Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10"
      >
        <motion.button
          onClick={handleNext}
          disabled={!selectedState || isLoading}
          className="w-full py-5 px-8 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white font-black rounded-3xl hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-3xl relative overflow-hidden group border-2 border-white/20 hover:border-white/40"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated background with multiple layers */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ 
                x: [-100, 100],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-0 w-2 h-2 bg-white/60 rounded-full"
            />
            <motion.div
              animate={{ 
                x: [-100, 100],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute top-1/2 left-0 w-1 h-1 bg-yellow-300/80 rounded-full"
            />
          </div>
          
          <div className="relative flex items-center justify-center space-x-4">
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                />
                <span className="text-lg font-bold">Processing...</span>
              </>
            ) : (
              <>
                <motion.span
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-2xl"
                >
                  🏫
                </motion.span>
                <span className="text-lg font-bold">Continue to District Selection</span>
                <motion.span
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-2xl"
                >
                  →
                </motion.span>
              </>
            )}
          </div>
        </motion.button>
        
        {/* Enhanced Points preview */}
        {selectedState && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-center"
          >
            <div className="inline-flex items-center space-x-3 bg-white/15 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/30 shadow-lg">
              <motion.span
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-yellow-300 text-xl"
              >
                ⭐
              </motion.span>
              <div>
                <div className="text-white font-black text-lg">+10 Points</div>
                <div className="text-yellow-200 text-xs">Step 1 Complete</div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default StateSelector;
