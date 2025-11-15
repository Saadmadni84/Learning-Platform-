'use client';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './MathSprint.module.css';

interface TrigQuestion {
  id: number;
  type: 'angle' | 'side' | 'ratio';
  question: string;
  triangle: {
    opposite: number;
    adjacent: number;
    hypotenuse: number;
    angle: number;
  };
  answers: number[];
  correctAnswer: number;
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

const MathSprint: React.FC = () => {
  const [gameState, setGameState] = useState<'playing' | 'gameOver' | 'paused'>('playing');
  const [currentQuestion, setCurrentQuestion] = useState<TrigQuestion | null>(null);
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    streak: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    timeElapsed: 0,
    level: 1,
  });
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [powerUps, setPowerUps] = useState({
    doublePoints: 3,
    skipQuestion: 2,
    extraTime: 2,
  });
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Generate trigonometry questions based on difficulty
  const generateQuestion = useCallback((): TrigQuestion => {
    const questionTypes: TrigQuestion['type'][] = ['angle', 'side', 'ratio'];
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    let baseRange = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 60 : 90;
    let angle = Math.floor(Math.random() * baseRange) + 10;
    let opposite = Math.floor(Math.random() * 10) + 3;
    let adjacent = Math.floor(Math.random() * 10) + 3;
    let hypotenuse = Math.sqrt(opposite * opposite + adjacent * adjacent);

    let question = '';
    let correctAnswer = 0;
    let answers: number[] = [];

    switch (type) {
      case 'angle':
        question = `Find the angle θ when sin(θ) = ${(opposite / hypotenuse).toFixed(2)}`;
        correctAnswer = Math.round(Math.asin(opposite / hypotenuse) * (180 / Math.PI));
        answers = [
          correctAnswer,
          correctAnswer + Math.floor(Math.random() * 20) + 5,
          correctAnswer - Math.floor(Math.random() * 15) - 3,
          correctAnswer + Math.floor(Math.random() * 30) + 10,
        ];
        break;
      
      case 'side':
        question = `In a right triangle, if the hypotenuse is ${hypotenuse.toFixed(1)} and one angle is ${angle}°, find the opposite side.`;
        correctAnswer = Math.round(hypotenuse * Math.sin(angle * Math.PI / 180) * 10) / 10;
        answers = [
          correctAnswer,
          Math.round((correctAnswer + Math.random() * 2) * 10) / 10,
          Math.round((correctAnswer - Math.random() * 2) * 10) / 10,
          Math.round((correctAnswer + Math.random() * 4 + 1) * 10) / 10,
        ];
        break;
      
      case 'ratio':
        question = `If opposite = ${opposite} and adjacent = ${adjacent}, what is tan(θ)?`;
        correctAnswer = Math.round((opposite / adjacent) * 100) / 100;
        answers = [
          correctAnswer,
          Math.round((correctAnswer + Math.random() * 0.5) * 100) / 100,
          Math.round((correctAnswer - Math.random() * 0.3) * 100) / 100,
          Math.round((correctAnswer + Math.random() * 1 + 0.2) * 100) / 100,
        ];
        break;
    }

    // Shuffle answers
    answers = answers.sort(() => Math.random() - 0.5);

    return {
      id: Date.now(),
      type,
      question,
      triangle: { opposite, adjacent, hypotenuse, angle },
      answers,
      correctAnswer,
      difficulty,
    };
  }, [difficulty]);

  // Initialize game
  useEffect(() => {
    setCurrentQuestion(generateQuestion());
  }, [generateQuestion]);

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setStats(prev => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }));
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameState('gameOver');
    }
  }, [gameState, timeLeft]);

  // Handle answer selection
  const handleAnswerSelect = (answer: number) => {
    if (selectedAnswer !== null || showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === currentQuestion?.correctAnswer;
    
    setTimeout(() => {
      if (isCorrect) {
        const basePoints = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30;
        const streakBonus = Math.min(stats.streak, 10) * 2;
        const points = (basePoints + streakBonus) * comboMultiplier;
        
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
      }, 1500);
    }, 1000);
  };

  // Power-up handlers
  const useDoublePoints = () => {
    if (powerUps.doublePoints > 0) {
      setPowerUps(prev => ({ ...prev, doublePoints: prev.doublePoints - 1 }));
      setComboMultiplier(prev => prev * 2);
      setTimeout(() => setComboMultiplier(prev => prev / 2), 30000);
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

  // Restart game
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
    setPowerUps({ doublePoints: 3, skipQuestion: 2, extraTime: 2 });
    setComboMultiplier(1);
    setCurrentQuestion(generateQuestion());
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (!currentQuestion) return null;

  return (
    <div className={styles.gameContainer}>
      {/* Floating background elements */}
      <div className={styles.floatingElements}>
        <div className={`${styles.mathSymbol} top-10 left-10`} style={{ animationDelay: '0s' }}>sin</div>
        <div className={`${styles.mathSymbol} top-20 right-20`} style={{ animationDelay: '2s' }}>cos</div>
        <div className={`${styles.mathSymbol} bottom-20 left-20`} style={{ animationDelay: '4s' }}>tan</div>
        <div className={`${styles.mathSymbol} bottom-10 right-10`} style={{ animationDelay: '1s' }}>θ</div>
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
          <h1 className={styles.gameTitle}>🔥 Trigonometry Sprint</h1>
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
        </div>

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
            <div className={styles.comboText}>
              🎯 {comboMultiplier}x Multiplier Active!
            </div>
          </div>
        )}

        {/* Question Card */}
        <div className={styles.questionCard}>
          <div className={styles.questionText}>
            {currentQuestion.question}
          </div>

          {/* Triangle Visualization */}
          <div className={styles.triangleDisplay}>
            <svg className={styles.triangleSvg} width="200" height="150" viewBox="0 0 200 150">
              <defs>
                <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              
              {/* Triangle */}
              <path
                d="M 20 130 L 180 130 L 180 30 Z"
                fill="none"
                stroke="url(#triangleGradient)"
                strokeWidth="3"
              />
              
              {/* Labels */}
              <text x="100" y="145" fill="white" textAnchor="middle" fontSize="12">
                Adjacent: {currentQuestion.triangle.adjacent}
              </text>
              <text x="190" y="80" fill="white" fontSize="12">
                Opp: {currentQuestion.triangle.opposite}
              </text>
              <text x="90" y="75" fill="white" fontSize="12">
                Hyp: {currentQuestion.triangle.hypotenuse.toFixed(1)}
              </text>
              
              {/* Angle indicator */}
              <path
                d="M 160 130 Q 165 125 170 120"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2"
              />
              <text x="165" y="115" fill="#fbbf24" fontSize="10">θ</text>
            </svg>
          </div>

          {/* Answer Options */}
          <div className={styles.answersGrid}>
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                className={`${styles.answerButton} ${
                  selectedAnswer === answer
                    ? answer === currentQuestion.correctAnswer
                      ? styles.answerButtonCorrect
                      : styles.answerButtonIncorrect
                    : ''
                }`}
                onClick={() => handleAnswerSelect(answer)}
                disabled={selectedAnswer !== null}
              >
                {typeof answer === 'number' ? answer.toString() : answer}
              </button>
            ))}
          </div>
        </div>

        {/* Power-ups */}
        <div className={styles.powerUps}>
          <button
            className={styles.powerUpButton}
            onClick={useDoublePoints}
            disabled={powerUps.doublePoints === 0}
          >
            🎯 2x Points ({powerUps.doublePoints})
          </button>
          <button
            className={styles.powerUpButton}
            onClick={useSkipQuestion}
            disabled={powerUps.skipQuestion === 0}
          >
            ⏭️ Skip ({powerUps.skipQuestion})
          </button>
          <button
            className={styles.powerUpButton}
            onClick={useExtraTime}
            disabled={powerUps.extraTime === 0}
          >
            ⏰ +15s ({powerUps.extraTime})
          </button>
        </div>
      </div>

      {/* Game Over Modal */}
      {gameState === 'gameOver' && (
        <div className={styles.gameOverModal}>
          <div className={styles.gameOverContent}>
            <h2 className={styles.gameOverTitle}>🎊 Quest Complete!</h2>
            <div className={styles.finalScore}>{stats.score.toLocaleString()}</div>
            
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
        </div>
      )}
    </div>
  );
};

export default MathSprint;
