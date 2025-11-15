'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ChevronDown, ArrowLeft } from 'lucide-react';
import { StepProps } from '@/types/multi-step-login.types';
import { INDIAN_STATES, getDistrictsByState } from '@/data/indian-states-districts';

const DistrictSelector: React.FC<StepProps> = ({ onNext, onPrevious, data, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(data.district || '');

  const selectedStateData = INDIAN_STATES.find(state => state.id === data.state);
  const availableDistricts = getDistrictsByState(data.state);
  
  const filteredDistricts = availableDistricts.filter(district =>
    district.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDistrictSelect = (districtId: string) => {
    setSelectedDistrict(districtId);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const handleNext = () => {
    if (selectedDistrict) {
      onNext({ district: selectedDistrict });
    }
  };

  const handlePrevious = () => {
    onPrevious();
  };

  const selectedDistrictData = availableDistricts.find(district => district.id === selectedDistrict);

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
          className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <span className="text-3xl">🏫</span>
        </motion.div>
        
        <h2 className="text-4xl font-black text-white mb-2 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
          Select Your District
        </h2>
        <p className="text-blue-100 text-lg">
          Choose your district in {selectedStateData?.name}
        </p>
        
        {/* Points Preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
        >
          <span className="text-yellow-300">⭐</span>
          <span className="text-white font-bold">+15 Points</span>
        </motion.div>
      </div>

      {/* Selected State Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {selectedStateData?.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {selectedStateData?.type.replace('_', ' ')}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search and Dropdown */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for your district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          />
        </div>

        {/* Selected District Display */}
        {selectedDistrictData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {selectedDistrictData.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    District in {selectedStateData?.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedDistrict('');
                  setIsDropdownOpen(false);
                }}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}

        {/* Dropdown */}
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
          >
            {filteredDistricts.length > 0 ? (
              filteredDistricts.map((district) => (
                <motion.button
                  key={district.id}
                  onClick={() => handleDistrictSelect(district.id)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between group"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-800 dark:to-teal-800 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {district.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        District
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </motion.button>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No districts found matching "{searchTerm}"
              </div>
            )}
          </motion.div>
        )}

        {/* Districts Grid (when no search) */}
        {!isDropdownOpen && !searchTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto"
          >
            {availableDistricts.slice(0, 12).map((district) => (
              <motion.button
                key={district.id}
                onClick={() => handleDistrictSelect(district.id)}
                className="p-3 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-800 dark:to-teal-800 rounded-full flex items-center justify-center">
                    <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-300" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {district.name}
                  </span>
                </div>
              </motion.button>
            ))}
            
            {availableDistricts.length > 12 && (
              <button
                onClick={() => setIsDropdownOpen(true)}
                className="p-3 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 group"
              >
                <div className="flex items-center justify-center space-x-2">
                  <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
                  <span className="text-sm font-medium text-gray-500 group-hover:text-blue-500">
                    View all {availableDistricts.length} districts
                  </span>
                </div>
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex space-x-4"
      >
        <button
          onClick={handlePrevious}
          className="flex-1 py-3 px-6 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={!selectedDistrict || isLoading}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            'Continue to User ID'
          )}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default DistrictSelector;
