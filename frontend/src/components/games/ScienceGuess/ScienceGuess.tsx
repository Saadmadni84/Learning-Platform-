'use client';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './ScienceGuess.module.css';

interface ScienceQuestion {
  id: number;
  type: 'element' | 'compound' | 'phenomenon' | 'scientist';
  question: string;
  hint: string;
  answers: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface GameStats {
  score: number;
  streak: number;
  questionsAnswered: number;
  correctAnswers: number;
  timeElapsed: number;
  level: number;
}

const ScienceGuess: React.FC = () => {
  const [gameState, setGameState] = useState<'playing' | 'gameOver' | 'paused'>('playing');
  const [currentQuestion, setCurrentQuestion] = useState<ScienceQuestion | null>(null);
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    streak: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    timeElapsed: 0,
    level: 1,
  });
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [powerUps, setPowerUps] = useState({
    hint: 3,
    skipQuestion: 2,
    extraTime: 2,
  });
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Generate science questions based on difficulty
  const generateQuestion = useCallback((): ScienceQuestion => {
    const questionTypes: ScienceQuestion['type'][] = ['element', 'compound', 'phenomenon', 'scientist'];
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    let question = '';
    let correctAnswer = '';
    let hint = '';
    let answers: string[] = [];
    let explanation = '';

    switch (type) {
      case 'element':
        const elements = [
          { name: 'Hydrogen', symbol: 'H', atomic: 1, hint: 'Lightest element, fuel for stars' },
          { name: 'Helium', symbol: 'He', atomic: 2, hint: 'Noble gas, makes balloons float' },
          { name: 'Carbon', symbol: 'C', atomic: 6, hint: 'Basis of all organic compounds' },
          { name: 'Oxygen', symbol: 'O', atomic: 8, hint: 'Essential for breathing and combustion' },
          { name: 'Iron', symbol: 'Fe', atomic: 26, hint: 'Magnetic metal, makes blood red' },
          { name: 'Gold', symbol: 'Au', atomic: 79, hint: 'Precious metal, symbol from Latin aurum' }
        ];
        const element = elements[Math.floor(Math.random() * elements.length)];
        question = `What element has the symbol ${element.symbol}?`;
        correctAnswer = element.name;
        hint = element.hint;
        answers = [
          element.name,
          elements[Math.floor(Math.random() * elements.length)].name,
          elements[Math.floor(Math.random() * elements.length)].name,
          elements[Math.floor(Math.random() * elements.length)].name,
        ];
        explanation = `${element.name} (${element.symbol}) has atomic number ${element.atomic}. ${element.hint}.`;
        break;
      
      case 'compound':
        const compounds = [
          { name: 'Water', formula: 'H₂O', hint: 'Essential for life, covers 71% of Earth' },
          { name: 'Carbon Dioxide', formula: 'CO₂', hint: 'Greenhouse gas, product of respiration' },
          { name: 'Sodium Chloride', formula: 'NaCl', hint: 'Table salt, essential for nerve function' },
          { name: 'Glucose', formula: 'C₆H₁₂O₆', hint: 'Primary energy source for cells' },
          { name: 'Methane', formula: 'CH₄', hint: 'Simplest hydrocarbon, natural gas' }
        ];
        const compound = compounds[Math.floor(Math.random() * compounds.length)];
        question = `What is the common name for ${compound.formula}?`;
        correctAnswer = compound.name;
        hint = compound.hint;
        answers = [
          compound.name,
          compounds[Math.floor(Math.random() * compounds.length)].name,
          compounds[Math.floor(Math.random() * compounds.length)].name,
          compounds[Math.floor(Math.random() * compounds.length)].name,
        ];
        explanation = `${compound.name} has the chemical formula ${compound.formula}. ${compound.hint}.`;
        break;
      
      case 'phenomenon':
        const phenomena = [
          { name: 'Photosynthesis', hint: 'Process by which plants make food', explanation: 'Plants convert sunlight, water, and CO₂ into glucose and oxygen.' },
          { name: 'Gravity', hint: 'Force that pulls objects toward each other', explanation: 'Newton\'s law of universal gravitation describes this fundamental force.' },
          { name: 'Evolution', hint: 'Change in species over time', explanation: 'Darwin\'s theory explains how species adapt and change through natural selection.' },
          { name: 'Electromagnetism', hint: 'Interaction between electric and magnetic fields', explanation: 'Maxwell\'s equations describe this fundamental force of nature.' }
        ];
        const phenomenon = phenomena[Math.floor(Math.random() * phenomena.length)];
        question = `What scientific phenomenon is described as: "${phenomenon.hint}"?`;
        correctAnswer = phenomenon.name;
        hint = phenomenon.hint;
        answers = [
          phenomenon.name,
          phenomena[Math.floor(Math.random() * phenomena.length)].name,
          phenomena[Math.floor(Math.random() * phenomena.length)].name,
          phenomena[Math.floor(Math.random() * phenomena.length)].name,
        ];
        explanation = phenomenon.explanation;
        break;
      
      case 'scientist':
        const scientists = [
          { name: 'Albert Einstein', hint: 'Developed theory of relativity', explanation: 'Famous for E=mc² and Nobel Prize in Physics 1921.' },
          { name: 'Marie Curie', hint: 'First woman to win Nobel Prize', explanation: 'Pioneer in radioactivity, won Nobel Prizes in Physics and Chemistry.' },
          { name: 'Charles Darwin', hint: 'Theory of evolution by natural selection', explanation: 'Author of "On the Origin of Species" (1859).' },
          { name: 'Isaac Newton', hint: 'Laws of motion and universal gravitation', explanation: 'Formulated the three laws of motion and law of universal gravitation.' },
          { name: 'Rosalind Franklin', hint: 'X-ray crystallography of DNA', explanation: 'Her work was crucial in discovering the double helix structure of DNA.' }
        ];
        const scientist = scientists[Math.floor(Math.random() * scientists.length)];
        question = `Who is the scientist known for: "${scientist.hint}"?`;
        correctAnswer = scientist.name;
        hint = scientist.hint;
        answers = [
          scientist.name,
          scientists[Math.floor(Math.random() * scientists.length)].name,
          scientists[Math.floor(Math.random() * scientists.length)].name,
          scientists[Math.floor(Math.random() * scientists.length)].name,
        ];
        explanation = scientist.explanation;
        break;
    }

    // Shuffle answers
    answers = answers.sort(() => Math.random() - 0.5);
    
    return {
      id: Math.random(),
      type,
      question,
      hint,
      answers,
      correctAnswer,
      explanation,
      difficulty,
    };
  }, [difficulty]);

  // Initialize first question
  useEffect(() => {
    if (!currentQuestion) {
      setCurrentQuestion(generateQuestion());
    }
  }, [currentQuestion, generateQuestion]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && gameState === 'playing' && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameState('gameOver');
    }
  }, [timeLeft, gameState, showResult]);

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);

    setTimeout(() => {
      const isCorrect = answer === currentQuestion?.correctAnswer;
      
      if (isCorrect) {
        const basePoints = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30;
        const timeBonus = Math.floor(timeLeft / 10);
        const streakBonus = stats.streak * 5;
        const points = Math.floor((basePoints + timeBonus + streakBonus) * comboMultiplier);

        setStats(prev => ({
          ...prev,
          score: prev.score + points,
          streak: prev.streak + 1,
          correctAnswers: prev.correctAnswers + 1,
          questionsAnswered: prev.questionsAnswered + 1,
        }));

        // Level up logic
        if (stats.score > 0 && (stats.score + points) > stats.level * 100) {
          setStats(prev => ({ ...prev, level: prev.level + 1 }));
          setShowLevelUp(true);
          setTimeout(() => setShowLevelUp(false), 2000);
        }

        // Combo multiplier
        if (stats.streak > 0 && stats.streak % 5 === 0) {
          setComboMultiplier(prev => Math.min(prev + 0.5, 3));
        }
      } else {
        setStats(prev => ({
          ...prev,
          streak: 0,
          questionsAnswered: prev.questionsAnswered + 1,
        }));
        setComboMultiplier(1);
      }

      // Generate next question
      setTimeout(() => {
        setCurrentQuestion(generateQuestion());
        setSelectedAnswer(null);
        setShowResult(false);
        setShowHint(false);
      }, 1500);
    }, 1000);
  };

  // Power-up handlers
  const useHint = () => {
    if (powerUps.hint > 0) {
      setPowerUps(prev => ({ ...prev, hint: prev.hint - 1 }));
      setShowHint(true);
    }
  };

  const useSkipQuestion = () => {
    if (powerUps.skipQuestion > 0) {
      setPowerUps(prev => ({ ...prev, skipQuestion: prev.skipQuestion - 1 }));
      setCurrentQuestion(generateQuestion());
    }
  };

  const useExtraTime = () => {
    if (powerUps.extraTime > 0) {
      setPowerUps(prev => ({ ...prev, extraTime: prev.extraTime - 1 }));
      setTimeLeft(prev => prev + 15);
    }
  };

  const restartGame = () => {
    setGameState('playing');
    setStats({
      score: 0,
      streak: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      timeElapsed: 0,
      level: 1,
    });
    setTimeLeft(60);
    setPowerUps({ hint: 3, skipQuestion: 2, extraTime: 2 });
    setComboMultiplier(1);
    setCurrentQuestion(generateQuestion());
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
  };

  if (!currentQuestion) return null;

  return (
    <div className={styles.gameContainer}>
      {/* Floating background elements */}
      <div className={styles.floatingElements}>
        <div className={`${styles.scienceSymbol} top-10 left-10`} style={{ animationDelay: '0s' }}>⚗️</div>
        <div className={`${styles.scienceSymbol} top-20 right-20`} style={{ animationDelay: '2s' }}>🧪</div>
        <div className={`${styles.scienceSymbol} bottom-20 left-20`} style={{ animationDelay: '4s' }}>🔬</div>
        <div className={`${styles.scienceSymbol} bottom-10 right-10`} style={{ animationDelay: '1s' }}>⚛️</div>
      </div>

      {/* Level up notification */}
      {showLevelUp && (
        <div className={styles.levelUpNotification}>
          🎉 Level {stats.level} Unlocked! 🎉
        </div>
      )}

      <div className={styles.gameBoard}>
        {/* Game Header */}
        <div className={styles.gameHeader}>
          <div className="flex items-center justify-between mb-4">
            <h1 className={styles.gameTitle}>🔬 Science Guess</h1>
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              🏠 Back to Home
            </button>
          </div>
          <div className={styles.scoreBoard}>
            <div className={styles.scoreItem}>
              <div className={styles.scoreLabel}>Score</div>
              <div className={styles.scoreValue}>{stats.score.toLocaleString()}</div>
            </div>
            <div className={styles.scoreItem}>
              <div className={styles.scoreLabel}>Level</div>
              <div className={styles.scoreValue}>{stats.level}</div>
            </div>
            <div className={styles.scoreItem}>
              <div className={styles.scoreLabel}>Streak</div>
              <div className={`${styles.scoreValue} ${styles.streakIndicator}`}>
                <span className={styles.streakFlame}>🔥</span>
                {stats.streak}
              </div>
            </div>
          </div>
          <div className={styles.controlButtons}>
            <button
              className={styles.controlButton}
              onClick={() => setGameState('gameOver')}
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
            {/* Difficulty Selector */}
            <div className={styles.difficultySelector}>
              {(['easy', 'medium', 'hard'] as const).map((diff) => (
                <button
                  key={diff}
                  className={`${styles.difficultyButton} ${
                    difficulty === diff ? styles.active : styles.inactive
                  }`}
                  onClick={() => setDifficulty(diff)}
                >
                  {diff.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Timer */}
            <div className={styles.timer}>
              <div className={styles.timerDisplay}>{timeLeft}s</div>
            </div>

            {/* Progress Bar */}
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${((60 - timeLeft) / 60) * 100}%` }}
              />
            </div>

            {/* Combo Multiplier */}
            {comboMultiplier > 1 && (
              <div className={styles.comboMultiplier}>
                🔥 {comboMultiplier}x COMBO! 🔥
              </div>
            )}

            {/* Power-ups */}
            <div className={styles.powerUps}>
              <button
                className={`${styles.powerUpButton} ${powerUps.hint === 0 ? styles.disabled : ''}`}
                onClick={useHint}
                disabled={powerUps.hint === 0}
              >
                💡 Hint ({powerUps.hint})
              </button>
              <button
                className={`${styles.powerUpButton} ${powerUps.skipQuestion === 0 ? styles.disabled : ''}`}
                onClick={useSkipQuestion}
                disabled={powerUps.skipQuestion === 0}
              >
                ⏭️ Skip ({powerUps.skipQuestion})
              </button>
              <button
                className={`${styles.powerUpButton} ${powerUps.extraTime === 0 ? styles.disabled : ''}`}
                onClick={useExtraTime}
                disabled={powerUps.extraTime === 0}
              >
                ⏰ +15s ({powerUps.extraTime})
              </button>
            </div>

            {/* Question */}
            <div className={styles.questionContainer}>
              <div className={styles.questionType}>
                {currentQuestion.type.toUpperCase()}
              </div>
              <div className={styles.question}>
                {currentQuestion.question}
              </div>
              
              {showHint && (
                <div className={styles.hintContainer}>
                  <div className={styles.hintLabel}>💡 Hint:</div>
                  <div className={styles.hintText}>{currentQuestion.hint}</div>
                </div>
              )}
            </div>

            {/* Answers */}
            <div className={styles.answersContainer}>
              {currentQuestion.answers.map((answer, index) => (
                <button
                  key={index}
                  className={`${styles.answerButton} ${
                    selectedAnswer === answer
                      ? answer === currentQuestion.correctAnswer
                        ? styles.correct
                        : styles.incorrect
                      : ''
                  } ${
                    showResult && answer === currentQuestion.correctAnswer
                      ? styles.correct
                      : ''
                  }`}
                  onClick={() => handleAnswerSelect(answer)}
                  disabled={showResult}
                >
                  {answer}
                </button>
              ))}
            </div>

            {/* Result */}
            {showResult && (
              <div className={styles.resultContainer}>
                <div className={`${styles.resultHeader} ${
                  selectedAnswer === currentQuestion.correctAnswer ? styles.correctResult : styles.incorrectResult
                }`}>
                  {selectedAnswer === currentQuestion.correctAnswer ? '🎉 Correct!' : '❌ Incorrect'}
                </div>
                <div className={styles.explanation}>
                  {currentQuestion.explanation}
                </div>
              </div>
            )}
          </>
        )}

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className={styles.gameOverContainer}>
            <div className={styles.gameOverHeader}>
              <h2 className={styles.gameOverTitle}>🧪 Quest Complete! 🧪</h2>
              <div className={styles.finalScoreDisplay}>
                <div className={styles.scoreCircle}>
                  <div className={styles.scoreNumber}>{stats.score.toLocaleString()}</div>
                  <div className={styles.scoreLabel}>Final Score</div>
                </div>
              </div>
            </div>
            
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Accuracy</div>
                <div className={styles.statValue}>
                  {stats.questionsAnswered > 0
                    ? Math.round((stats.correctAnswers / stats.questionsAnswered) * 100)
                    : 0}%
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Best Streak</div>
                <div className={styles.statValue}>{stats.streak}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Level Reached</div>
                <div className={styles.statValue}>{stats.level}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Questions</div>
                <div className={styles.statValue}>{stats.questionsAnswered}</div>
              </div>
            </div>
            
            <button className={styles.restartButton} onClick={restartGame}>
              🚀 Start New Quest
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScienceGuess;