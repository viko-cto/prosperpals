import { Flame, Award, Lock, Play, CheckCircle2, Circle } from "lucide-react";
import { useNotifications } from "../contexts/NotificationContext";

export function LearningHub() {
  const { showCoinReward } = useNotifications();

  const lessons = {
    budgetingBasics: [
      { title: "What is budgeting?", duration: 3, completed: true },
      { title: "The 50/30/20 rule", duration: 4, completed: true },
      { title: "Tracking expenses", duration: 5, completed: true },
      { title: "Emergency funds", duration: 4, completed: true },
      { title: "Avoiding debt", duration: 6, completed: true },
      { title: "Building habits", duration: 5, completed: true },
    ],
    investing101: [
      { title: "What are stocks?", duration: 3, completed: true },
      { title: "Index funds explained", duration: 5, completed: true },
      { title: "Risk vs Reward", duration: 4, completed: false, current: true },
      { title: "Building your first portfolio", duration: 6, completed: false },
      { title: "When to buy/sell", duration: 5, completed: false },
      { title: "Understanding fees", duration: 4, completed: false },
    ],
  };

  const handleCompleteLesson = () => {
    showCoinReward({
      amount: 50,
      reason: "Completed a lesson!",
      currentXP: 200,
      xpToNextLevel: 200
    });
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Learning Hub 📚</h1>
        <p className="text-white/60 text-lg">Master your finances, one lesson at a time</p>
      </div>

      {/* Progress Overview */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Flame className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">7</div>
                <div className="text-sm text-white/60">day streak</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">12</div>
                <div className="text-sm text-white/60">lessons completed</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">3</div>
                <div className="text-sm text-white/60">badges earned</div>
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="text-sm text-blue-400 mb-1">Next milestone</div>
              <div className="text-xs text-white/60">Complete 5 more for Investment Beginner badge</div>
              <button
                onClick={handleCompleteLesson}
                className="mt-3 w-full px-3 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-[#1a1a2e] font-bold text-sm rounded-lg transition-all"
              >
                Complete Lesson (Earn 50 PC)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Tracks */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Track 1: Budgeting Basics (Completed) */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-white">Budgeting Basics</h2>
            <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {lessons.budgetingBasics.map((lesson, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-4 cursor-pointer hover:border-green-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-xs text-white/40">{lesson.duration} min</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{lesson.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Investing 101 (In Progress) */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-white">Investing 101</h2>
            <div className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
              <Circle className="w-4 h-4 fill-blue-400" />
              In Progress
            </div>
            <div className="text-sm text-white/40">33% complete</div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {lessons.investing101.map((lesson, index) => (
              <div
                key={index}
                className={`rounded-xl p-4 cursor-pointer transition-all ${
                  lesson.completed
                    ? "bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 hover:border-green-500/40"
                    : lesson.current
                    ? "bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20"
                    : "bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">
                    {lesson.completed ? "✅" : lesson.current ? "▶️" : "🔒"}
                  </span>
                  <span className="text-xs text-white/40">{lesson.duration} min</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{lesson.title}</h3>
                {lesson.current && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="w-full bg-white/10 rounded-full h-1.5 mb-2">
                      <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-1.5 rounded-full" style={{ width: "45%" }} />
                    </div>
                    <div className="text-xs text-blue-400">45% complete</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Track 3: Advanced Strategies (Locked) */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-white/40">Advanced Strategies</h2>
            <div className="flex items-center gap-2 bg-white/5 text-white/40 px-3 py-1 rounded-full text-sm font-medium">
              <Lock className="w-4 h-4" />
              Locked
            </div>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8 text-center opacity-50">
            <Lock className="w-12 h-12 text-white/40 mx-auto mb-3" />
            <p className="text-white/60">Complete Investing 101 to unlock</p>
          </div>
        </div>

        {/* Featured Lesson */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Featured This Week</h2>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-colors cursor-pointer">
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-5xl">✨</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white">Compound Interest Magic</h3>
                  <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                    New
                  </span>
                </div>
                <p className="text-white/60 mb-4">
                  Learn how compound interest can turn small investments into massive wealth over time. 
                  This is the secret weapon of every successful investor.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-white/60">
                    <span className="text-sm">4 min read</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <span className="text-sm">Taught by Fin</span>
                    <span className="text-xl">🐋</span>
                  </div>
                  <button className="ml-auto px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Start Lesson
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}