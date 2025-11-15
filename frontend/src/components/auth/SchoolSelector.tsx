'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, School, ChevronDown, Check, Building } from 'lucide-react';
import { StepProps } from '@/types/auth.types';
import { getSchoolsByState, getStateById } from '@/data/states-schools';

const SchoolSelector: React.FC<StepProps> = ({ onNext, onPrevious, data, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(data.school || '');
  const [schools, setSchools] = useState(getSchoolsByState(data.state));

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSchoolSelect = (schoolId: string) => {
    setSelectedSchool(schoolId);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const handleNext = () => {
    if (selectedSchool) {
      onNext({ school: selectedSchool });
    }
  };

  const selectedSchoolData = schools.find(school => school.id === selectedSchool);
  const stateData = getStateById(data.state);

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
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <School className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Select Your School
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose your school in {stateData?.name}
        </p>
      </div>

      {/* State Info */}
      {stateData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-700"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {stateData.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stateData.type === 'state' ? 'State' : 'Union Territory'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Search and Dropdown */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for your school..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
            {filteredSchools.length > 0 ? (
              filteredSchools.map((school) => (
                <button
                  key={school.id}
                  onClick={() => handleSchoolSelect(school.id)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <School className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <div className="flex-1">
                      <span className="text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors block">
                        {school.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {school.type === 'public' ? 'Public' : school.type === 'private' ? 'Private' : 'International'}
                      </span>
                    </div>
                  </div>
                  {selectedSchool === school.id && (
                    <Check className="w-4 h-4 text-blue-500" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-center">
                No schools found
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Selected School Display */}
      {selectedSchoolData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-700"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <School className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {selectedSchoolData.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedSchoolData.type === 'public' ? 'Public School' : 
                 selectedSchoolData.type === 'private' ? 'Private School' : 'International School'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

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
          onClick={handleNext}
          disabled={!selectedSchool || isLoading}
          className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            'Continue to Student ID'
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SchoolSelector;
