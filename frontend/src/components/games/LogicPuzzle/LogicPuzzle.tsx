'use client';

import React, { useState, useEffect } from 'react';
import styles from './LogicPuzzle.module.css';
import { useGameStats } from '@/hooks/useGameStats';

interface LogicPuzzleProps {
  onGameEnd: () => void;
}

interface Block {
  id: number;
  value: number;
  position: number;
  type?: 'number' | 'variable' | 'operator';
}

interface GameLevel {
  level: number;
  targetSum: number;
  concept: string;
  description: string;
  maxBlocks: number;
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

const GRADE_LEVELS: GameLevel[] = [
  {
    level: 1,
    targetSum: 15,
    concept: 'Basic Arithmetic',
    description: 'Add positive integers to reach the target',
    maxBlocks: 6,
    difficulty: 'basic'
  },
  {
    level: 2,
    targetSum: 24,
    concept: 'Factors & Multiples',
    description: 'Use factors and multiples to solve the puzzle',
    maxBlocks: 7,
    difficulty: 'basic'
  },
  {
    level: 3,
    targetSum: 36,
    concept: 'Prime Numbers',
    description: 'Work with prime and composite numbers',
    maxBlocks: 8,
    difficulty: 'intermediate'
  },
  {
    level: 4,
    targetSum: 42,
    concept: 'Algebraic Thinking',
    description: 'Solve using algebraic patterns',
    maxBlocks: 9,
    difficulty: 'intermediate'
  },
  {
    level: 5,
    targetSum: 60,
    concept: 'Number Theory',
    description: 'Advanced number relationships',
    maxBlocks: 10,
    difficulty: 'advanced'
  }
];

export function LogicPuzzle({ onGameEnd }: LogicPuzzleProps) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [currentLevel, setCurrentLevel] = useState<GameLevel>(GRADE_LEVELS[0]);
  const [gameActive, setGameActive] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [draggedBlock, setDraggedBlock] = useState<Block | null>(null);
  const [levelIndex, setLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes per level
  const [gameTimer, setGameTimer] = useState<NodeJS.Timeout | null>(null);
  const [bestStreak, setBestStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const { recordGameSession } = useGameStats();

  const initializeGame = () => {
    const level = GRADE_LEVELS[levelIndex];
    setCurrentLevel(level);
    setTimeLeft(120);
    
    // Create blocks based on level difficulty
    const blockValues = generateBlocksForLevel(level);
    
    const newBlocks = blockValues.map((value, index) => ({
      id: index + 1,
      value,
      position: -1,
      type: 'number' as const
    }));
    
    setBlocks(newBlocks);
  };

  const generateBlocksForLevel = (level: GameLevel): number[] => {
    const { targetSum, maxBlocks, difficulty } = level;
    const blockValues: number[] = [];
    
    if (difficulty === 'basic') {
      // For basic levels, ensure easy solution exists
      const solutionBlocks = generateBasicSolution(targetSum);
      blockValues.push(...solutionBlocks);
      
      // Add distractors
      while (blockValues.length < maxBlocks) {
        const val = Math.floor(Math.random() * 10) + 1;
        if (!blockValues.includes(val)) {
          blockValues.push(val);
        }
      }
    } else if (difficulty === 'intermediate') {
      // For intermediate levels, include factors and multiples
      const factors = getFactors(targetSum);
      const solutionBlocks = generateIntermediateSolution(targetSum, factors);
      blockValues.push(...solutionBlocks);
      
      // Add some factors and multiples as options
      const multiples = factors.map(f => f * 2).filter(m => m <= 20);
      blockValues.push(...multiples.slice(0, 3));
      
      while (blockValues.length < maxBlocks) {
        const val = Math.floor(Math.random() * 15) + 1;
        if (!blockValues.includes(val)) {
          blockValues.push(val);
        }
      }
    } else {
      // For advanced levels, include more complex number relationships
      const primes = getPrimesUpTo(targetSum / 2);
      const solutionBlocks = generateAdvancedSolution(targetSum, primes);
      blockValues.push(...solutionBlocks);
      
      // Add prime numbers and their multiples
      blockValues.push(...primes.slice(0, 3));
      const primeMultiples = primes.map(p => p * 2).filter(p => p <= 25);
      blockValues.push(...primeMultiples.slice(0, 2));
      
      while (blockValues.length < maxBlocks) {
        const val = Math.floor(Math.random() * 20) + 1;
        if (!blockValues.includes(val)) {
          blockValues.push(val);
        }
      }
    }
    
    // Shuffle array
    for (let i = blockValues.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [blockValues[i], blockValues[j]] = [blockValues[j], blockValues[i]];
    }
    
    return blockValues.slice(0, maxBlocks);
  };

  const generateBasicSolution = (target: number): number[] => {
    const solutions = [];
    let remaining = target;
    
    while (remaining > 0 && solutions.length < 3) {
      const maxVal = Math.min(remaining, 8);
      const val = Math.floor(Math.random() * maxVal) + 1;
      solutions.push(val);
      remaining -= val;
    }
    
    return solutions;
  };

  const generateIntermediateSolution = (target: number, factors: number[]): number[] => {
    const solutions = [];
    const factor1 = factors[Math.floor(Math.random() * factors.length)];
    const factor2 = target / factor1;
    
    if (factor2 <= 10) {
      solutions.push(factor1, factor2);
    } else {
      solutions.push(...generateBasicSolution(target));
    }
    
    return solutions;
  };

  const generateAdvancedSolution = (target: number, primes: number[]): number[] => {
    const solutions = [];
    const prime1 = primes[Math.floor(Math.random() * primes.length)];
    const remaining = target - prime1;
    
    if (remaining > 0) {
      solutions.push(prime1, ...generateBasicSolution(remaining));
    } else {
      solutions.push(...generateBasicSolution(target));
    }
    
    return solutions;
  };

  const getFactors = (num: number): number[] => {
    const factors = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== num / i) {
          factors.push(num / i);
        }
      }
    }
    return factors.filter(f => f > 1 && f < num);
  };

  const getPrimesUpTo = (limit: number): number[] => {
    const primes = [];
    for (let i = 2; i <= limit; i++) {
      let isPrime = true;
      for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) primes.push(i);
    }
    return primes;
  };

  const startGame = () => {
    setGameActive(true);
    setLevelIndex(0);
    setScore(0);
    setStreak(0);
    setFeedback('');
    setStartTime(new Date());
    initializeGame();
    startTimer();
  };

  const nextLevel = () => {
    if (levelIndex < GRADE_LEVELS.length - 1) {
      setLevelIndex(levelIndex + 1);
      setFeedback('');
      setTimeLeft(120);
      initializeGame();
      startTimer();
    } else {
      // Game completed
      setGameActive(false);
      const timePlayed = startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0;
      const finalScore = score + (streak * 5);
      
      // Record the game session
      recordGameSession('logic-puzzle', finalScore, bestStreak, timePlayed, true);
      
      setFeedback(`🎉 Congratulations! You've mastered all levels! Final Score: ${finalScore}`);
    }
  };

  const startTimer = () => {
    if (gameTimer) clearInterval(gameTimer);
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setFeedback('⏰ Time is up! Try again!');
          setTimeout(() => {
            if (levelIndex < GRADE_LEVELS.length - 1) {
              nextLevel();
            } else {
              setGameActive(false);
            }
          }, 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setGameTimer(timer);
  };

  useEffect(() => {
    return () => {
      if (gameTimer) clearInterval(gameTimer);
    };
  }, [gameTimer]);

  const handleDragStart = (e: React.DragEvent, block: Block) => {
    setDraggedBlock(block);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetPosition: number) => {
    e.preventDefault();
    if (!draggedBlock) return;

    setBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      const draggedIndex = newBlocks.findIndex(b => b.id === draggedBlock.id);
      
      // Remove block from current position if it was in solution area
      if (draggedBlock.position >= 0) {
        const otherBlocks = newBlocks.filter(b => b.position === draggedBlock.position && b.id !== draggedBlock.id);
        otherBlocks.forEach(b => b.position = -1);
      }
      
      // Check if target position is occupied
      const occupyingBlock = newBlocks.find(b => b.position === targetPosition);
      if (occupyingBlock) {
        occupyingBlock.position = -1; // Send back to available blocks
      }
      
      // Place dragged block in new position
      newBlocks[draggedIndex].position = targetPosition;
      
      return newBlocks;
    });
    
    setDraggedBlock(null);
  };

  const handleRemoveFromSolution = (block: Block) => {
    setBlocks(prevBlocks => 
      prevBlocks.map(b => 
        b.id === block.id ? { ...b, position: -1 } : b
      )
    );
  };

  const checkSolution = () => {
    const solutionBlocks = blocks.filter(b => b.position >= 0);
    const currentSum = solutionBlocks.reduce((sum, block) => sum + block.value, 0);
    
    if (currentSum === currentLevel.targetSum && solutionBlocks.length >= 2) {
      const levelBonus = (currentLevel.level * 20) + (120 - timeLeft);
      const streakBonus = streak * 5;
      const newScore = score + levelBonus + streakBonus;
      const newStreak = streak + 1;
      
      setScore(newScore);
      setStreak(newStreak);
      
      let feedbackMessage = `🎉 Perfect! Level ${currentLevel.level} complete!`;
      if (newStreak > 1) {
        feedbackMessage += ` Streak: ${newStreak}! 🔥`;
      }
      feedbackMessage += ` +${levelBonus} points`;
      
      setFeedback(feedbackMessage);
      
      setTimeout(() => {
        nextLevel();
      }, 2500);
    } else {
      setStreak(0);
      const diff = Math.abs(currentSum - currentLevel.targetSum);
      let hint = '';
      
      if (currentSum < currentLevel.targetSum) {
        hint = `You need ${diff} more. `;
      } else if (currentSum > currentLevel.targetSum) {
        hint = `You're ${diff} over. `;
      }
      
      setFeedback(`Current sum: ${currentSum}. Target: ${currentLevel.targetSum}. ${hint}Keep trying! 🤔`);
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  const getSolutionBlocks = () => {
    return [0, 1, 2].map(position => {
      const block = blocks.find(b => b.position === position);
      return block || null;
    });
  };

  const getAvailableBlocks = () => {
    return blocks.filter(b => b.position === -1);
  };

  return (
    <div className={styles.puzzleGame}>
      {!gameActive ? (
        <div className={styles.startScreen}>
          <div className={styles.gameHeader}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className={styles.gameIcon}>🧩</div>
                <h3 className={styles.gameTitle}>Advanced Logic Puzzle</h3>
                <p className={styles.gameSubtitle}>
                  Master mathematical concepts for grades 9-10!
                </p>
              </div>
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                🏠 Back to Home
              </button>
            </div>
            <div className={styles.controlButtons}>
              <button
                className={styles.controlButton}
                onClick={onGameEnd}
              >
                ← Back
              </button>
              <button
                className={styles.controlButton}
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? '⤢ Maximize' : '⤡ Minimize'}
              </button>
            </div>
          </div>
          
          {!isMinimized && (
          <>
          <div className={styles.conceptOverview}>
            <h4 className={styles.conceptTitle}>Mathematical Concepts Covered:</h4>
            <div className={styles.conceptGrid}>
              {GRADE_LEVELS.map((level) => (
                <div key={level.level} className={styles.conceptCard}>
                  <div className={styles.conceptLevel}>Level {level.level}</div>
                  <div className={styles.conceptName}>{level.concept}</div>
                  <div className={styles.conceptDesc}>{level.description}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.instructions}>
            <h4 className={styles.instructionsTitle}>How to Play:</h4>
            <div className={styles.instructionList}>
              <div className={styles.instructionItem}>
                <span className={styles.instructionIcon}>🎯</span>
                <span>Drag number blocks to reach the target sum</span>
              </div>
              <div className={styles.instructionItem}>
                <span className={styles.instructionIcon}>⚡</span>
                <span>Solve faster for bonus points and maintain streaks</span>
              </div>
              <div className={styles.instructionItem}>
                <span className={styles.instructionIcon}>🧠</span>
                <span>Apply grade 9-10 mathematical concepts</span>
              </div>
              <div className={styles.instructionItem}>
                <span className={styles.instructionIcon}>🏆</span>
                <span>Complete all 5 levels to become a math master!</span>
              </div>
            </div>
          </div>
          
          {feedback && score > 0 && (
            <div className={styles.finalFeedback}>
              <div className={styles.finalScore}>Final Score: {score}</div>
              <div className={styles.finalMessage}>{feedback}</div>
            </div>
          )}
          
          <button
            onClick={startGame}
            className={styles.startButton}
          >
            {score > 0 ? '🚀 Play Again' : '🎮 Start Learning'}
          </button>
          </>
          )}
        </div>
      ) : (
        <div className={styles.gameScreen}>
          <div className={styles.gameHeader}>
            <div className={styles.gameStats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Level</span>
                <span className={styles.statValue}>{currentLevel.level}/5</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Target</span>
                <span className={styles.statValue}>{currentLevel.targetSum}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Score</span>
                <span className={styles.statValue}>{score}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Streak</span>
                <span className={styles.statValue}>{streak}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Time</span>
                <span className={`${styles.statValue} ${timeLeft < 30 ? styles.timeWarning : ''}`}>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
            
            <div className={styles.controlButtons}>
              <button
                className={styles.controlButton}
                onClick={onGameEnd}
              >
                ← Back
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                🏠 Back to Home
              </button>
              <button
                className={styles.controlButton}
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? '⤢ Maximize' : '⤡ Minimize'}
              </button>
            </div>
            
            <div className={styles.levelInfo}>
              <div className={styles.conceptBadge}>
                {currentLevel.concept}
              </div>
              <div className={styles.difficultyBadge}>
                {currentLevel.difficulty.toUpperCase()}
              </div>
            </div>
          </div>

          {!isMinimized && (
          <>
          {feedback && (
            <div className={styles.feedback}>
              {feedback}
            </div>
          )}

          <div className={styles.puzzleBoard}>
            <div className={styles.targetArea}>
              <div className={styles.areaHeader}>
                <h4>Solution Area</h4>
                <p className={styles.areaDescription}>Drag blocks here to reach {currentLevel.targetSum}</p>
              </div>
              <div className={styles.solutionSlots}>
                {getSolutionBlocks().map((block, index) => (
                  <div
                    key={index}
                    className={styles.solutionSlot}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    {block ? (
                      <div 
                        className={styles.solutionBlock}
                        onClick={() => handleRemoveFromSolution(block)}
                        title="Click to remove"
                      >
                        {block.value}
                      </div>
                    ) : (
                      <div className={styles.emptySlot}>+</div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className={styles.currentSum}>
                Current Sum: {getSolutionBlocks().reduce((sum, block) => sum + (block?.value || 0), 0)}
              </div>
              
              <button 
                onClick={checkSolution}
                className={styles.checkButton}
                disabled={getSolutionBlocks().filter(Boolean).length < 2}
              >
                Check Solution
              </button>
            </div>

            <div className={styles.availableArea}>
              <div className={styles.areaHeader}>
                <h4>Available Blocks</h4>
                <p className={styles.areaDescription}>Choose wisely to solve the puzzle</p>
              </div>
              <div className={styles.blockContainer}>
                {getAvailableBlocks().map(block => (
                  <div
                    key={block.id}
                    className={styles.availableBlock}
                    draggable
                    onDragStart={(e) => handleDragStart(e, block)}
                  >
                    {block.value}
                  </div>
                ))}
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      )}
    </div>
  );
}
