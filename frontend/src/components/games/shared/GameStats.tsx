'use client';

import React from 'react';

interface GameStatsProps {
  gamesPlayed: number;
  totalScore: number;
  bestStreak: number;
  averageScore: number;
  favoriteGame: string;
  totalTimePlayed: number;
}

export function GameStats({ 
  gamesPlayed, 
  totalScore, 
  bestStreak, 
  averageScore, 
  favoriteGame, 
  totalTimePlayed 
}: GameStatsProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getRankColor = (score: number) => {
    if (score >= 1000) return 'from-yellow-400 to-yellow-600';
    if (score >= 500) return 'from-gray-400 to-gray-600';
    if (score >= 200) return 'from-orange-400 to-orange-600';
    return 'from-blue-400 to-blue-600';
  };

  const getRankTitle = (score: number) => {
    if (score >= 1000) return 'Master 🏆';
    if (score >= 500) return 'Expert ⭐';
    if (score >= 200) return 'Advanced 🚀';
    return 'Beginner 🌱';
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Game Statistics
        </h3>
        <div className={`px-4 py-2 rounded-full text-white font-bold bg-gradient-to-r ${getRankColor(totalScore)}`}>
          {getRankTitle(totalScore)}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{gamesPlayed}</div>
          <div className="text-sm text-gray-600">Games Played</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{totalScore}</div>
          <div className="text-sm text-gray-600">Total Score</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-orange-600">{bestStreak}</div>
          <div className="text-sm text-gray-600">Best Streak</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">{Math.round(averageScore)}</div>
          <div className="text-sm text-gray-600">Avg Score</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-lg font-bold text-indigo-600">{favoriteGame}</div>
          <div className="text-sm text-gray-600">Favorite Game</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-lg font-bold text-teal-600">{formatTime(totalTimePlayed)}</div>
          <div className="text-sm text-gray-600">Time Played</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3">Achievements Unlocked</h4>
        <div className="flex flex-wrap gap-2">
          {gamesPlayed >= 10 && (
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              🎮 Game Master (10+ games)
            </span>
          )}
          {totalScore >= 500 && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              💯 Score Hunter (500+ points)
            </span>
          )}
          {bestStreak >= 5 && (
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              🔥 Streak Master (5+ streak)
            </span>
          )}
          {averageScore >= 50 && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              ⭐ Consistent Player (50+ avg)
            </span>
          )}
          {totalTimePlayed >= 600 && (
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              ⏰ Time Keeper (10+ min played)
            </span>
          )}
          {gamesPlayed < 10 && totalScore < 500 && bestStreak < 5 && averageScore < 50 && totalTimePlayed < 600 && (
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
              🌱 Keep playing to unlock achievements!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
