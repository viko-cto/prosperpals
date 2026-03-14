import GlassCard from '../GlassCard';
import { Flame, Award, Lock, CheckCircle2, Clock, BookOpen } from 'lucide-react';

const tracks = [
  {
    id: 1,
    title: 'Budgeting Basics',
    status: 'completed',
    lessons: 6,
    progress: 100,
    color: '#10B981',
  },
  {
    id: 2,
    title: 'Investing 101',
    status: 'in-progress',
    lessons: 5,
    progress: 40,
    color: '#4A90D9',
    lessonList: [
      { title: 'What are stocks?', duration: 3, completed: true },
      { title: 'Index funds explained', duration: 5, completed: true },
      { title: 'Risk vs Reward', duration: 4, completed: false, current: true },
      { title: 'Building your first portfolio', duration: 6, completed: false, locked: false },
      { title: 'When to buy/sell', duration: 7, completed: false, locked: false },
    ],
  },
  {
    id: 3,
    title: 'Advanced Strategies',
    status: 'locked',
    lessons: 8,
    progress: 0,
    color: '#9CA3AF',
  },
];

export default function LearningHub() {
  return (
    <div className="h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-8 border-b border-white/10">
        <h1 className="text-3xl font-bold mb-2">Learning Hub 📚</h1>
        <p className="text-gray-400">Master your finances, one lesson at a time</p>
      </div>

      <div className="p-8 space-y-8">
        {/* Progress Overview */}
        <GlassCard className="p-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">7-day</div>
                <div className="text-sm text-gray-400">streak</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#4A90D9] to-[#2563EB] rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-gray-400">lessons completed</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-gray-400">badges earned</div>
              </div>
            </div>

            <div className="flex items-col justify-center">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1">Next milestone</div>
                <div className="text-sm font-semibold">Complete 5 more for Investment Beginner badge</div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Featured Lesson */}
        <GlassCard className="p-6 bg-gradient-to-br from-[#4A90D9]/10 to-[#2563EB]/10 border-[#4A90D9]/30">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm text-[#4A90D9] font-semibold mb-2">THIS WEEK'S FEATURED</div>
              <h3 className="text-2xl font-bold mb-2">Compound Interest Magic ✨</h3>
              <p className="text-gray-300 mb-4">
                Learn how your money can grow exponentially over time through the power of compounding.
              </p>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  4 min read
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Taught by Fin 🐬</span>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-[#4A90D9] to-[#2563EB] text-white rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(74,144,217,0.4)] transition-all">
                Start Lesson
              </button>
            </div>
            <div className="text-8xl ml-6">📈</div>
          </div>
        </GlassCard>

        {/* Learning Tracks */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Your Learning Tracks</h2>

          {tracks.map((track) => (
            <GlassCard key={track.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{track.title}</h3>
                    {track.status === 'completed' && (
                      <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                    )}
                    {track.status === 'locked' && (
                      <Lock className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{track.lessons} lessons</span>
                    <span>•</span>
                    <span>{track.progress}% complete</span>
                  </div>
                </div>
                {track.status === 'locked' && (
                  <div className="text-sm text-gray-400">
                    Complete Investing 101 to unlock
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                <div 
                  className="h-2 rounded-full transition-all"
                  style={{ 
                    width: `${track.progress}%`,
                    background: track.status === 'locked' 
                      ? '#9CA3AF' 
                      : `linear-gradient(to right, ${track.color}, ${track.color}dd)`
                  }}
                />
              </div>

              {/* Lesson List for In-Progress Track */}
              {track.status === 'in-progress' && track.lessonList && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                  {track.lessonList.map((lesson, idx) => (
                    <button
                      key={idx}
                      className={`p-4 rounded-xl text-left transition-all ${
                        lesson.current
                          ? 'bg-[#4A90D9]/20 border-2 border-[#4A90D9] hover:bg-[#4A90D9]/30'
                          : lesson.completed
                          ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                          : lesson.locked
                          ? 'bg-white/5 border border-white/10 opacity-50 cursor-not-allowed'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                      disabled={lesson.locked}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-semibold text-sm mb-1">{lesson.title}</div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            {lesson.duration} min
                          </div>
                        </div>
                        {lesson.completed && (
                          <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                        )}
                        {lesson.current && (
                          <div className="w-2 h-2 bg-[#4A90D9] rounded-full animate-pulse flex-shrink-0 mt-1" />
                        )}
                        {lesson.locked && (
                          <Lock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Badges Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: '💰', name: 'Budget Master', earned: true },
              { emoji: '📊', name: 'First Investment', earned: true },
              { emoji: '🔥', name: '7-Day Streak', earned: true },
              { emoji: '🎓', name: 'Index Fund Graduate', earned: false },
            ].map((badge, idx) => (
              <GlassCard
                key={idx}
                className={`p-6 text-center ${
                  badge.earned ? 'border-[#FFD700]/50' : 'opacity-50'
                }`}
              >
                <div className="text-5xl mb-2">{badge.emoji}</div>
                <div className="text-sm font-semibold">{badge.name}</div>
                {!badge.earned && (
                  <div className="text-xs text-gray-500 mt-1">Locked</div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
