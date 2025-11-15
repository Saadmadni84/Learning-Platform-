'use client';

import { useState, useEffect } from 'react';

interface GameSession {
  gameId: string;
  score: number;
  streak: number;
  timePlayed: number;
  completed: boolean;
  timestamp: Date;
}

interface GameStats {
  gamesPlayed: number;
  totalScore: number;
  bestStreak: number;
  averageScore: number;
  favoriteGame: string;
  totalTimePlayed: number;
  gameHistory: GameSession[];
}

const STORAGE_KEY = 'acadevia-game-stats';

export function useGameStats() {
  const [stats, setStats] = useState<GameStats>({
    gamesPlayed: 0,
    totalScore: 0,
    bestStreak: 0,
    averageScore: 0,
    favoriteGame: 'None',
    totalTimePlayed: 0,
    gameHistory: []
  });

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem(STORAGE_KEY);
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        // Convert timestamp strings back to Date objects
        parsed.gameHistory = parsed.gameHistory.map((session: any) => ({
          ...session,
          timestamp: new Date(session.timestamp)
        }));
        setStats(parsed);
      } catch (error) {
        console.error('Error loading game stats:', error);
      }
    }
  }, []);

  // Save stats to localStorage whenever stats change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const recordGameSession = (gameId: string, score: number, streak: number, timePlayed: number, completed: boolean = true) => {
    const newSession: GameSession = {
      gameId,
      score,
      streak,
      timePlayed,
      completed,
      timestamp: new Date()
    };

    setStats(prevStats => {
      const newGameHistory = [...prevStats.gameHistory, newSession];
      
      // Calculate favorite game (most played)
      const gameCounts = newGameHistory.reduce((acc, session) => {
        acc[session.gameId] = (acc[session.gameId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const favoriteGame = Object.entries(gameCounts).reduce((a, b) => 
        gameCounts[a[0]] > gameCounts[b[0]] ? a : b
      )[0];

      // Calculate new totals
      const totalGames = newGameHistory.length;
      const totalScore = newGameHistory.reduce((sum, session) => sum + session.score, 0);
      const bestStreak = Math.max(...newGameHistory.map(session => session.streak));
      const averageScore = totalGames > 0 ? totalScore / totalGames : 0;
      const totalTime = newGameHistory.reduce((sum, session) => sum + session.timePlayed, 0);

      return {
        gamesPlayed: totalGames,
        totalScore,
        bestStreak,
        averageScore,
        favoriteGame: getGameDisplayName(favoriteGame),
        totalTimePlayed: totalTime,
        gameHistory: newGameHistory
      };
    });
  };

  const getGameDisplayName = (gameId: string): string => {
    const gameNames: Record<string, string> = {
      'math-sprint': 'Math Sprint',
      'science-guess': 'Science Guess',
      'word-builder': 'Word Builder',
      'logic-puzzle': 'Logic Puzzle'
    };
    return gameNames[gameId] || gameId;
  };

  const getRecentGames = (limit: number = 5): GameSession[] => {
    return stats.gameHistory
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  };

  const getGamePerformance = (gameId: string) => {
    const gameSessions = stats.gameHistory.filter(session => session.gameId === gameId);
    if (gameSessions.length === 0) return null;

    const totalScore = gameSessions.reduce((sum, session) => sum + session.score, 0);
    const bestScore = Math.max(...gameSessions.map(session => session.score));
    const averageScore = totalScore / gameSessions.length;
    const bestStreak = Math.max(...gameSessions.map(session => session.streak));

    return {
      gamesPlayed: gameSessions.length,
      totalScore,
      bestScore,
      averageScore,
      bestStreak
    };
  };

  const clearStats = () => {
    setStats({
      gamesPlayed: 0,
      totalScore: 0,
      bestStreak: 0,
      averageScore: 0,
      favoriteGame: 'None',
      totalTimePlayed: 0,
      gameHistory: []
    });
  };

  return {
    stats,
    recordGameSession,
    getRecentGames,
    getGamePerformance,
    clearStats
  };
}
