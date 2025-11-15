'use client';

import ThemeToggle from '@/components/ThemeToggle';

export default function LeaderboardPage() {
  const podium = [
    { rank: 2, name: 'Gaurav Singh', points: 3870, stage: 'Silver', color: 'from-slate-300 to-gray-400', emoji: '🥈' },
    { rank: 1, name: 'Vedant', points: 4120, stage: 'Gold', color: 'from-amber-300 to-yellow-400', emoji: '🥇' },
    { rank: 3, name: 'Suhani', points: 3590, stage: 'Bronze', color: 'from-orange-300 to-amber-400', emoji: '🥉' },
  ]

  const rows = [
    { rank: 4, name: 'Faraz Rahmani', points: 3310, stage: 'Bronze', progress: 78 },
    { rank: 5, name: 'Ritika Gaur', points: 3205, stage: 'Bronze', progress: 64 },
    { rank: 6, name: 'Shashank Singh', points: 3090, stage: 'Rookie', progress: 52 },
    { rank: 7, name: 'Saad Madni', points: 2975, stage: 'Rookie', progress: 48 },
    { rank: 8, name: 'Shubhansh Dalla', points: 2860, stage: 'Rookie', progress: 42 },
  ]

  const stageColor = (stage: string) => {
    switch (stage) {
      case 'Gold':
        return 'bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-900'
      case 'Silver':
        return 'bg-gradient-to-r from-gray-300 to-slate-300 text-slate-800'
      case 'Bronze':
        return 'bg-gradient-to-r from-orange-300 to-amber-300 text-amber-900'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 relative">
      {/* Theme Toggle for Leaderboard */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-900 dark:text-gray-100">Leaderboard Stages</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 font-inter">Climb from Rookie → Bronze → Silver → Gold and beyond!</p>
        </div>

        {/* Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-end">
          {podium.map((p, i) => (
            <div key={p.rank} className={`relative rounded-2xl shadow-lg overflow-hidden bg-gradient-to-br ${p.color} ${p.rank === 1 ? 'md:order-2' : p.rank === 2 ? 'md:order-1' : 'md:order-3'}`}>
              <div className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{p.emoji}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stageColor(p.stage)}`}>{p.stage}</span>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Rank #{p.rank}</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{p.name}</div>
                </div>
                <div className="mt-4">
                  <div className="text-xs text-gray-600 dark:text-gray-300">Points</div>
                  <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">{p.points.toLocaleString()}</div>
                </div>
              </div>
              <div className={`h-16 ${p.rank === 1 ? 'bg-gradient-to-t from-yellow-400 to-amber-300' : p.rank === 2 ? 'bg-gradient-to-t from-gray-400 to-slate-300' : 'bg-gradient-to-t from-amber-400 to-orange-300'}`} />
            </div>
          ))}
        </div>

        {/* Stage Legend */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {['Rookie', 'Bronze', 'Silver', 'Gold'].map((s) => (
            <span key={s} className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${stageColor(s)}`}>{s}</span>
          ))}
        </div>

        {/* Leaderboard Rows */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600">
            <div className="grid grid-cols-12 text-xs font-semibold text-gray-500 dark:text-gray-300">
              <div className="col-span-2">Rank</div>
              <div className="col-span-4">Player</div>
              <div className="col-span-2">Stage</div>
              <div className="col-span-2">Points</div>
              <div className="col-span-2">Next Stage</div>
            </div>
          </div>
          <div className="divide-y dark:divide-gray-700">
            {rows.map((u) => (
              <div key={u.rank} className="px-6 py-4 grid grid-cols-12 items-center hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="col-span-2 font-semibold text-gray-800 dark:text-gray-200">#{u.rank}</div>
                <div className="col-span-4 flex items-center gap-3">
                  <span className="text-xl">{u.rank % 2 === 0 ? '🛡️' : '⚔️'}</span>
                  <div>
                    <div className="text-gray-900 dark:text-gray-100 font-semibold">{u.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Top {Math.max(1, 100 - u.rank)}%</div>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stageColor(u.stage)}`}>{u.stage}</span>
                </div>
                <div className="col-span-2 font-semibold text-gray-900 dark:text-gray-100">{u.points.toLocaleString()}</div>
                <div className="col-span-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Progress</div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-purple-600" style={{ width: `${u.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
