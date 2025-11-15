'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Trophy,
  Star,
  Clock,
  Zap,
  Target,
  BookOpen,
  Brain,
  Heart,
  Home,
  RotateCcw,
  CheckCircle,
  XCircle,
  Lightbulb,
  Shuffle
} from 'lucide-react';
import styles from './WorldBuilder.module.css';

interface Word {
  original: string;
  scrambled: string;
  hint: string;
  category: string;
  grade: number;
  points: number;
}

const WORDS_DATA: Word[] = [
  // Grade 6
  { original: 'SCIENCE', scrambled: 'CNEICS', hint: 'Study of nature', category: 'Academic', grade: 6, points: 10 },
  { original: 'SCHOOL', scrambled: 'LOOHCS', hint: 'Place of learning', category: 'Academic', grade: 6, points: 10 },
  { original: 'FRIEND', scrambled: 'NEIRDF', hint: 'Close companion', category: 'Social', grade: 6, points: 10 },
  { original: 'GARDEN', scrambled: 'NEDRAG', hint: 'Place with plants', category: 'Nature', grade: 6, points: 10 },
  
  // Grade 7
  { original: 'HISTORY', scrambled: 'YROTSIH', hint: 'Study of the past', category: 'Academic', grade: 7, points: 15 },
  { original: 'MYSTERY', scrambled: 'YRETSYM', hint: 'Something unknown', category: 'Abstract', grade: 7, points: 15 },
  { original: 'LIBRARY', scrambled: 'YRBAILR', hint: 'Building with books', category: 'Academic', grade: 7, points: 15 },
  { original: 'JOURNEY', scrambled: 'YENRUOJ', hint: 'A long trip', category: 'Action', grade: 7, points: 15 },
  
  // Grade 8
  { original: 'COMPUTER', scrambled: 'RETUMPOC', hint: 'Electronic machine', category: 'Technology', grade: 8, points: 20 },
  { original: 'LANGUAGE', scrambled: 'EGAUGNAL', hint: 'System of communication', category: 'Academic', grade: 8, points: 20 },
  { original: 'CREATIVE', scrambled: 'EVITAERC', hint: 'Having imagination', category: 'Abstract', grade: 8, points: 20 },
  { original: 'QUESTION', scrambled: 'NOITSEUQ', hint: 'Something to ask', category: 'Academic', grade: 8, points: 20 },
  
  // Grade 9
  { original: 'KNOWLEDGE', scrambled: 'EGDELWONK', hint: 'Information and understanding', category: 'Abstract', grade: 9, points: 25 },
  { original: 'COMMUNITY', scrambled: 'YTINUMMOC', hint: 'Group of people', category: 'Social', grade: 9, points: 25 },
  { original: 'INVENTION', scrambled: 'NOITNEVI', hint: 'New creation', category: 'Science', grade: 9, points: 25 },
  { original: 'ADVENTURE', scrambled: 'ERUTNEDVA', hint: 'Exciting experience', category: 'Action', grade: 9, points: 25 },
  
  // Grade 10
  { original: 'TECHNOLOGY', scrambled: 'YGOLONHCET', hint: 'Applied science', category: 'Science', grade: 10, points: 30 },
  { original: 'EXPERIMENT', scrambled: 'TNEMIREPXE', hint: 'Scientific test', category: 'Science', grade: 10, points: 30 },
  { original: 'LITERATURE', scrambled: 'ERUTARETIL', hint: 'Written works', category: 'Academic', grade: 10, points: 30 },
  { original: 'DEMOCRACY', scrambled: 'YCARCOOMED', hint: 'Government by people', category: 'Social', grade: 10, points: 30 },
  
  // Grade 11
  { original: 'ENVIRONMENT', scrambled: 'TNEMNORIVNE', hint: 'Natural surroundings', category: 'Science', grade: 11, points: 35 },
  { original: 'PHILOSOPHY', scrambled: 'YHPOSOLIHP', hint: 'Love of wisdom', category: 'Abstract', grade: 11, points: 35 },
  { original: 'CIVILIZATION', scrambled: 'NOITAZILIVC', hint: 'Advanced society', category: 'Social', grade: 11, points: 35 },
  { original: 'MATHEMATICS', scrambled: 'SCITAMEHTAM', hint: 'Study of numbers', category: 'Academic', grade: 11, points: 35 },
  
  // Grade 12
  { original: 'RESPONSIBILITY', scrambled: 'YTILIBISNOSER', hint: 'Duty or obligation', category: 'Abstract', grade: 12, points: 40 },
  { original: 'ENTREPRENEURSHIP', scrambled: 'PIHSRUENERPERTNE', hint: 'Starting business', category: 'Business', grade: 12, points: 45 },
  { original: 'GLOBALIZATION', scrambled: 'NOITAZILABOLG', hint: 'Worldwide connection', category: 'Social', grade: 12, points: 40 },
  { original: 'SUSTAINABILITY', scrambled: 'YTILIBANIATSUS', hint: 'Long-term viability', category: 'Science', grade: 12, points: 40 }
];

export default function WordBuilder() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
  const [selectedGrade, setSelectedGrade] = useState(6);
  const [currentWords, setCurrentWords] = useState<Word[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Timer effect
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isTimerActive) {
      handleTimeUp();
    }
  }, [timeLeft, isTimerActive, lives]);

  const handleTimeUp = () => {
    setIsTimerActive(false);
    setIsCorrect(false);
    setLives(prevLives => {
      const newLives = prevLives - 1;
      if (newLives <= 0) {
      endGame();
    } else {
        setTimeout(nextWord, 2000);
    }
      return newLives;
    });
  };

  const startGame = () => {
    const gradeWords = WORDS_DATA.filter(word => word.grade === selectedGrade);
    const shuffledWords = gradeWords.sort(() => Math.random() - 0.5).slice(0, 10);
    
    setCurrentWords(shuffledWords);
    setCurrentWordIndex(0);
    setGameState('playing');
    setUserInput('');
    setIsCorrect(null);
    setShowHint(false);
    setScore(0);
    setCorrectCount(0);
    setLives(3);
    setTimeLeft(60);
    setIsTimerActive(true);
  };

  const checkAnswer = () => {
    if (!currentWords[currentWordIndex] || isCorrect !== null) return;
    
    const currentWord = currentWords[currentWordIndex];
    const correct = userInput.toUpperCase() === currentWord.original;
    
    setIsCorrect(correct);
    setIsTimerActive(false);
    
    if (correct) {
      let points = currentWord.points;
      if (timeLeft > 45) points += 10; // Speed bonus
      if (!showHint) points += 5; // No hint bonus
      
      setScore(prevScore => prevScore + points);
      setCorrectCount(prevCount => prevCount + 1);
    } else {
      setLives(prevLives => prevLives - 1);
    }
    
    setTimeout(() => {
      if (correct) {
        nextWord();
      } else {
        setLives(prevLives => {
          if (prevLives <= 1) {
            endGame();
          } else {
            nextWord();
          }
          return prevLives;
        });
      }
    }, 2000);
  };

  const nextWord = () => {
    setCurrentWordIndex(prevIndex => {
      if (prevIndex < currentWords.length - 1) {
        setUserInput('');
      setIsCorrect(null);
      setShowHint(false);
      setTimeLeft(60);
      setIsTimerActive(true);
        return prevIndex + 1;
    } else {
      endGame();
        return prevIndex;
    }
    });
  };

  const endGame = () => {
    setGameState('result');
    setIsTimerActive(false);
  };

  const resetGame = () => {
    setGameState('menu');
    setCurrentWordIndex(0);
    setUserInput('');
    setIsCorrect(null);
    setShowHint(false);
  };

  const scrambleWord = (word: string) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  const currentWord = currentWords[currentWordIndex];

  // Menu Screen
  if (gameState === 'menu') {
    return (
      <div className={styles.container}>
        <div className={styles.menuContainer}>
          <div className={styles.header}>
            <div className="flex items-center justify-between mb-4">
              <div></div>
              <div className="text-center">
                <Brain className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                <h1 className={styles.title}>Word Builder</h1>
                <p className={styles.subtitle}>Unscramble words and build your vocabulary!</p>
              </div>
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                🏠 Back to Home
              </button>
            </div>
          </div>

          <Card className={styles.menuCard}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-center">
                <Target className="h-6 w-6" />
                Select Your Grade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.gradeSelection}>
                  {[6, 7, 8, 9, 10, 11, 12].map(grade => (
                    <button
                      key={grade}
                      onClick={() => setSelectedGrade(grade)}
                    className={`${styles.gradeButton} ${selectedGrade === grade ? styles.active : ''}`}
                  >
                    Grade {grade}
                    </button>
                  ))}
              </div>

              <div className={styles.gameInfo}>
                <div className={styles.infoItem}>
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <span>{WORDS_DATA.filter(w => w.grade === selectedGrade).length} Words Available</span>
                </div>
                <div className={styles.infoItem}>
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span>60 seconds per word</span>
                </div>
                <div className={styles.infoItem}>
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>3 lives to complete</span>
                </div>
              </div>

              <Button onClick={startGame} className={styles.startButton}>
                  <Zap className="h-5 w-5 mr-2" />
                Start Game
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Playing Screen
  if (gameState === 'playing' && currentWord) {
    return (
      <div className={styles.container}>
        <div className={styles.gameContainer}>
          {/* Game Header */}
          <div className={styles.gameHeader}>
            <div className="flex items-center justify-between mb-4">
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span>{score}</span>
                </div>
                <div className={styles.statItem}>
                  <Target className="h-5 w-5 text-blue-500" />
                  <span>{correctCount}/{currentWords.length}</span>
                </div>
                <div className={styles.statItem}>
                {Array.from({length: 3}, (_, i) => (
                  <Heart key={i} className={`h-5 w-5 ${i < lives ? 'text-red-500 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <div className={styles.statItem}>
                <Clock className={`h-5 w-5 ${timeLeft <= 15 ? 'text-red-500' : 'text-green-500'}`} />
                <span className={timeLeft <= 15 ? styles.timeWarning : ''}>{timeLeft}s</span>
              </div>
              </div>
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                🏠 Back to Home
              </button>
            </div>
            
            <Progress value={(currentWordIndex / currentWords.length) * 100} className="w-full h-2" />
          </div>

          {/* Word Card */}
            <Card className={styles.wordCard}>
              <CardHeader>
              <div className={styles.wordMeta}>
                <Badge className={styles.categoryBadge}>{currentWord.category}</Badge>
                <Badge className={styles.gradeBadge}>Grade {currentWord.grade}</Badge>
                <Badge className={styles.pointsBadge}>{currentWord.points} pts</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
              {/* Scrambled Word */}
              <div className={styles.scrambledSection}>
                  <h2 className={styles.scrambledWord}>
                  {currentWord.scrambled.split('').map((letter, index) => (
                    <span key={index} className={styles.letter}>{letter}</span>
                    ))}
                  </h2>
                <p className={styles.instruction}>Unscramble these letters to form a word!</p>
                </div>

                {/* Hint Section */}
                {showHint && (
                <div className={styles.hintSection}>
                    <div className={styles.hintHeader}>
                      <Lightbulb className="h-4 w-4" />
                      <span>Hint</span>
                    </div>
                  <p>{currentWord.hint}</p>
                </div>
                )}

              {/* Input Section */}
              <div className={styles.inputSection}>
                    <Input
                      type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                      placeholder="Enter your answer..."
                      className={`${styles.wordInput} ${
                    isCorrect === true ? styles.correct : 
                    isCorrect === false ? styles.wrong : ''
                      }`}
                      disabled={isCorrect !== null}
                  maxLength={currentWord.original.length}
                />
                
                <div className={styles.actionButtons}>
                  <Button
                    onClick={() => setShowHint(true)}
                    disabled={showHint || isCorrect !== null}
                    variant="secondary"
                    className={styles.hintButton}
                  >
                    <Lightbulb className="h-4 w-4 mr-1" />
                    Hint
                  </Button>
                  
                  <Button
                    onClick={() => setUserInput(scrambleWord(userInput || currentWord.scrambled))}
                    disabled={isCorrect !== null}
                    variant="secondary"
                    className={styles.shuffleButton}
                  >
                    <Shuffle className="h-4 w-4 mr-1" />
                    Shuffle
                  </Button>
                  
                  <Button
                    onClick={checkAnswer}
                    disabled={!userInput.trim() || isCorrect !== null}
                    className={styles.checkButton}
                  >
                    {isCorrect === null ? 'Check' : isCorrect ? 'Correct!' : 'Wrong!'}
                    {isCorrect === null && <CheckCircle className="h-4 w-4 ml-1" />}
                    {isCorrect === true && <CheckCircle className="h-4 w-4 ml-1" />}
                    {isCorrect === false && <XCircle className="h-4 w-4 ml-1" />}
                  </Button>
                </div>
                      </div>
                      
              {/* Result Section */}
              {isCorrect !== null && (
                <div className={styles.resultSection}>
                  <div className={`${styles.resultMessage} ${isCorrect ? styles.success : styles.failure}`}>
                    {isCorrect ? '✅ Correct!' : `❌ Wrong! The answer was: ${currentWord.original}`}
                          </div>
                        </div>
                      )}
              </CardContent>
            </Card>
        </div>
      </div>
    );
  }

  // Result Screen
  if (gameState === 'result') {
    const accuracy = currentWords.length > 0 ? (correctCount / currentWords.length) * 100 : 0;
    
    return (
      <div className={styles.container}>
        <div className={styles.resultContainer}>
          <div className={styles.resultHeader}>
            <div className="flex items-center justify-between mb-4">
              <div></div>
              <div className="text-center">
                <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h1 className={styles.resultTitle}>Game Complete!</h1>
                <p className={styles.resultSubtitle}>Here's how you performed</p>
              </div>
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                🏠 Back to Home
              </button>
            </div>
          </div>

          <div className={styles.resultCards}>
            <Card className={styles.resultCard}>
              <CardContent className="text-center p-6">
                <Star className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                <div className={styles.resultNumber}>{score}</div>
                <div className={styles.resultLabel}>Total Score</div>
              </CardContent>
            </Card>

            <Card className={styles.resultCard}>
              <CardContent className="text-center p-6">
                <Target className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                <div className={styles.resultNumber}>{correctCount}</div>
                <div className={styles.resultLabel}>Words Correct</div>
              </CardContent>
            </Card>

            <Card className={styles.resultCard}>
              <CardContent className="text-center p-6">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <div className={styles.resultNumber}>{Math.round(accuracy)}%</div>
                <div className={styles.resultLabel}>Accuracy</div>
              </CardContent>
            </Card>
          </div>

          <div className={styles.resultButtons}>
            <Button onClick={resetGame} variant="secondary" className={styles.resultButton}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Play Again
            </Button>
            <Button onClick={resetGame} className={styles.resultButton}>
              <Home className="h-4 w-4 mr-2" />
              Main Menu
            </Button>
          </div>
          </div>
      </div>
    );
  }

  return null;
}
