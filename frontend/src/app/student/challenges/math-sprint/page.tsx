'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { allMathQuizzes, getQuizByClass, type MathQuiz, type MathQuestion } from '@/data/mathQuizzes'

// Simple inline styles for components
const Button = ({ children, onClick, className = '', variant = 'default', size = 'default', asChild = false, ...props }: any) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
  
  const variants = {
    default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
    outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
  }
  
  const sizes = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
  }
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
  
  if (asChild) {
    return React.cloneElement(children, { className: classes, ...props })
  }
  
  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

const Card = ({ children, className = '', ...props }: any) => {
  return (
    <div className={`rounded-xl bg-white shadow-lg p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

// Simple icons as components
const ArrowLeft = ({ className = '' }: any) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const Clock = ({ className = '' }: any) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const Trophy = ({ className = '' }: any) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
)

const RotateCcw = ({ className = '' }: any) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)

const Home = ({ className = '' }: any) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const Star = ({ className = '' }: any) => (
  <svg className={`w-4 h-4 ${className}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export default function MathSprintPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showClassSelection, setShowClassSelection] = useState(true);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<MathQuiz | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Lock body scroll when page is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Timer effect
  useEffect(() => {
    if (!showClassSelection && !isFinished && timeLeft > 0 && currentQuiz) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showClassSelection, isFinished, timeLeft, currentQuiz]);

  const startQuiz = (classNumber: number) => {
    const quiz = getQuizByClass(classNumber);
    if (!quiz) return;
    
    setCurrentQuiz(quiz);
    setSelectedClass(classNumber);
    setShowClassSelection(false);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(quiz.timeLimit);
    setIsFinished(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const submitAnswer = (answer: number | string) => {
    if (isFinished || showResult || !currentQuiz) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentQuiz.questions[currentQuestion].answer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 >= currentQuiz.questions.length) {
        setIsFinished(true);
      } else {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    if (!currentQuiz) return;
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(currentQuiz.timeLimit);
    setIsFinished(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const resetToClassSelection = () => {
    setShowClassSelection(true);
    setSelectedClass(null);
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(60);
    setIsFinished(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Class selection screen
  if (showClassSelection) {
    return (
      <div className="fixed inset-0 top-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 z-50 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Button variant="outline" className="mr-4" onClick={() => window.location.href = '/'}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <h1 className="text-4xl font-bold text-gray-900">Math Sprint Challenge</h1>
            </div>
            <p className="text-xl text-gray-600">Choose your class and test your math skills!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allMathQuizzes.map((quiz) => (
              <Card key={quiz.class} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎓</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Class {quiz.class}</h3>
                  <p className="text-gray-600 mb-2 text-sm font-medium">{quiz.title}</p>
                  <p className="text-gray-500 mb-4 text-xs">{quiz.description}</p>
                  
                  <div className="flex items-center justify-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{Math.floor(quiz.timeLimit / 60)}m {quiz.timeLimit % 60}s</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      <span>{quiz.questions.length} Q</span>
                    </div>
                  </div>

                  {/* Difficulty indicators */}
                  <div className="flex justify-center gap-1 mb-4">
                    {quiz.questions.map((q, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${getDifficultyColor(q.difficulty).split(' ')[1]}`}
                        title={`Question ${index + 1}: ${q.difficulty}`}
                      />
                    ))}
                  </div>

                  <Button 
                    onClick={() => startQuiz(quiz.class)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  >
                    Start Quiz
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuiz) return null;

  const currentQ = currentQuiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentQuiz.questions.length) * 100;

  return (
    <div className="fixed inset-0 top-20 bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-6 z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button onClick={resetToClassSelection} variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Class {selectedClass} Math Quiz</h1>
              <p className="text-sm text-gray-600">{currentQuiz.title}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold">
              <Clock className="w-4 h-4 inline mr-1" />
              {formatTime(timeLeft)}
            </div>
            <div className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-semibold">
              <Trophy className="w-4 h-4 inline mr-1" />
              {score}/{currentQuiz.questions.length}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentQuestion + 1} of {currentQuiz.questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <Card className="p-8 border-2 border-yellow-200">
          {isFinished ? (
            // Results Screen
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
              <p className="text-xl text-gray-600 mb-6">
                You scored {score} out of {currentQuiz.questions.length} questions
              </p>
              
              <div className="mb-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {Math.round((score / currentQuiz.questions.length) * 100)}%
                </div>
                <p className="text-gray-600">
                  {score === currentQuiz.questions.length ? "Perfect Score! 🌟" :
                   score >= currentQuiz.questions.length * 0.8 ? "Excellent! 🎯" :
                   score >= currentQuiz.questions.length * 0.6 ? "Good Job! 👍" :
                   "Keep Practicing! 💪"}
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={restartQuiz} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
                <Button onClick={resetToClassSelection} variant="outline">
                  Choose Another Class
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/'}>
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </div>
          ) : (
            // Question Screen
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {currentQuiz.questions.length}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(currentQ.difficulty)}`}>
                  {currentQ.difficulty.toUpperCase()}
                </div>
              </div>

              <div className="text-3xl font-bold mb-8 text-center">{currentQ.question}</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQ.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQ.answer;

                  return (
                    <button
                      key={index}
                      onClick={() => submitAnswer(option)}
                      disabled={showResult}
                      className={`p-6 rounded-xl border-2 text-lg font-semibold transition-all transform active:scale-[.98] disabled:cursor-not-allowed
                        ${isSelected ? 'ring-2 ring-offset-2' : ''}
                        ${showResult 
                          ? (isCorrect 
                              ? 'border-green-400 bg-green-50 text-green-800' 
                              : isSelected 
                                ? 'border-red-300 bg-red-50 text-red-800' 
                                : 'border-gray-200 bg-gray-50')
                          : 'border-gray-200 hover:border-yellow-300 hover:shadow-sm hover:bg-yellow-50'
                        }
                      `}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {showResult && currentQ.explanation && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 font-medium">Explanation: {currentQ.explanation}</p>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}