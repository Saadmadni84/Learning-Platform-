'use client';

import { useState } from 'react';
import { schoolSystemData, ClassSection, Subject } from '@/data/schoolData';
import SourcesSection from '@/components/sources/SourcesSection';

export default function CoursesPage() {
  const [selectedClass, setSelectedClass] = useState<ClassSection | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const handleClassSelect = (classSection: ClassSection) => {
    setSelectedClass(classSection);
    setSelectedSubject(null);
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">School System</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore classes 6-12 with comprehensive subject coverage
          </p>
          <div className="mt-4 flex gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Total Classes: {schoolSystemData.totalClasses}</span>
            <span>Total Subjects: {schoolSystemData.totalSubjects}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Classes List */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Classes (6-12)</h2>
            <div className="space-y-4">
              {schoolSystemData.classes.map((classSection) => (
                <div
                  key={classSection.id}
                  onClick={() => handleClassSelect(classSection)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedClass?.id === classSection.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {classSection.name}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {classSection.subjects.length} subjects
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {classSection.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {classSection.totalStudents} students
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {classSection.averageProgress}% avg progress
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subjects List */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {selectedClass ? `${selectedClass.name} Subjects` : 'Select a Class'}
            </h2>
            {selectedClass ? (
              <div className="space-y-3">
                {selectedClass.subjects.map((subject) => (
                  <div
                    key={subject.id}
                    onClick={() => handleSubjectSelect(subject)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedSubject?.id === subject.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-400'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{subject.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">{subject.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{subject.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(subject.difficulty)}`}>
                        {subject.difficulty}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {subject.completedLessons}/{subject.totalLessons} lessons
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${subject.color.replace('bg-', 'bg-')}`}
                          style={{ width: `${subject.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subject.progress}% complete</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <div className="text-6xl mb-4">🎓</div>
                <p>Select a class to view its subjects</p>
              </div>
            )}
          </div>

          {/* Subject Details */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {selectedSubject ? 'Subject Details' : 'Subject Information'}
            </h2>
            {selectedSubject ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="text-center mb-6">
                  <span className="text-6xl mb-4 block">{selectedSubject.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {selectedSubject.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedSubject.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Difficulty:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedSubject.difficulty)}`}>
                      {selectedSubject.difficulty}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Progress:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {selectedSubject.completedLessons} / {selectedSubject.totalLessons} lessons
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 dark:text-gray-300">Completion:</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{selectedSubject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${selectedSubject.color.replace('bg-', 'bg-')}`}
                        style={{ width: `${selectedSubject.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="w-full bg-blue-600 dark:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200">
                      {selectedSubject.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <div className="text-6xl mb-4">📚</div>
                <p>Select a subject to view details</p>
              </div>
            )}
          </div>

          {/* Sources Section */}
          {selectedSubject && (
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <SourcesSection 
                  sources={selectedSubject.sources || []}
                  subjectName={selectedSubject.name}
                  isEditable={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
