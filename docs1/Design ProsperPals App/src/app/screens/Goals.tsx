import { Plus, TrendingUp } from "lucide-react";
import { CircularProgress, LinearProgress } from "../components/CircularProgress";
import { GoldieAvatar, FinAvatar } from "../components/GoldieAvatar";

export function Goals() {
  const goals = [
    {
      id: 1,
      title: "Summer Trip to Greece",
      emoji: "🏖️",
      current: 1500,
      target: 2000,
      monthly: 200,
      targetDate: "June 2026",
      status: "on-track",
      message: "On track! You'll reach this by May if you keep going!",
    },
    {
      id: 2,
      title: "Emergency Fund",
      emoji: "🛡️",
      current: 3000,
      target: 6000,
      monthly: 250,
      targetDate: "December 2026",
      status: "milestone",
      message: "Great foundation! After this, let's talk about growing your money.",
      milestone: "Just hit 3 months covered!",
    },
    {
      id: 3,
      title: "New Laptop",
      emoji: "💻",
      current: 300,
      target: 1000,
      monthly: 75,
      targetDate: "December 2026",
      status: "behind",
      message: "Add €50 more/month to hit your December target",
    },
  ];

  const completedGoals = [
    { title: "Paid off credit card", date: "January 2026" },
    { title: "Built €500 buffer", date: "December 2025" },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a] p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-white">Your Goals</h1>
              <span className="text-3xl">🎯</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <span className="text-xl">🪙</span>
              </div>
              <p className="text-white/80">You're crushing it! 3 goals in progress.</p>
            </div>
          </div>
          <button className="group relative px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl opacity-100 group-hover:opacity-90 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
            <span className="relative text-gray-900 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Goal
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-6">
        {/* Active Goals */}
        <div className="col-span-2 space-y-6">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <div
                key={goal.id}
                className={`bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border rounded-xl p-6 relative overflow-hidden ${
                  goal.status === "milestone"
                    ? "border-yellow-500/30 shadow-lg shadow-yellow-500/20"
                    : "border-white/10"
                }`}
              >
                {/* Confetti effect for milestone */}
                {goal.status === "milestone" && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-2xl"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `float ${2 + Math.random()}s infinite ease-in-out`,
                          animationDelay: `${Math.random()}s`,
                        }}
                      >
                        {["🎉", "✨", "🎊", "⭐"][Math.floor(Math.random() * 4)]}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-6">
                    {/* Circular Progress Ring */}
                    <CircularProgress
                      percentage={progress}
                      size={120}
                      centerText={`${progress.toFixed(0)}%`}
                      centerSubtext="complete"
                      variant={goal.title === "Emergency Fund" ? "green" : "gold"}
                    />
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-5xl">{goal.emoji}</div>
                        <h3 className="text-2xl font-bold text-white">{goal.title}</h3>
                      </div>
                      {goal.milestone && (
                        <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium mb-2">
                          🎉 {goal.milestone}
                        </div>
                      )}
                      <div className="text-sm text-white/60">Target: {goal.targetDate}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white mb-1">
                      €{goal.current.toLocaleString()}
                    </div>
                    <div className="text-white/60">of €{goal.target.toLocaleString()}</div>
                  </div>
                </div>

                {/* Progress Bar - Using standardized gold gradient */}
                <div className="mb-6 relative z-10">
                  <LinearProgress 
                    percentage={progress} 
                    variant={goal.title === "Emergency Fund" ? "green" : "gold"}
                    height={8}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-white/60">
                      Monthly contribution: €{goal.monthly}
                    </span>
                    <span className="text-sm font-semibold text-white">{progress.toFixed(0)}%</span>
                  </div>
                </div>

                {/* Goldie/Fin Note */}
                <div
                  className={`rounded-lg p-4 mb-4 relative z-10 ${
                    goal.status === "behind"
                      ? "bg-yellow-500/10 border border-yellow-500/20"
                      : goal.status === "milestone"
                      ? "bg-blue-500/10 border border-blue-500/20"
                      : "bg-yellow-500/10 border border-yellow-500/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">
                      {goal.status === "milestone" ? "🐋" : "🪙"}
                    </span>
                    <p className="text-white/90 text-sm leading-relaxed">{goal.message}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 relative z-10">
                  <button className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm font-medium transition-colors">
                    Add money
                  </button>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 text-sm font-medium transition-colors">
                    Adjust goal
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completed Goals - Sidebar */}
        <div className="col-span-2">
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>✅</span>
              Completed Goals
            </h2>
            <div className="space-y-3">
              {completedGoals.map((goal, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between"
                >
                  <span className="text-white/90 font-medium">{goal.title}</span>
                  <span className="text-sm text-white/60">{goal.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Goal Projections Panel */}
      <div className="max-w-6xl mx-auto mt-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🐋</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">Goal Projections by Fin</h3>
              <p className="text-white/70 mb-4">
                Did you know your emergency fund could work harder for you? If you invested it in a low-risk index fund...
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-sm text-white/60 mb-1">In 1 year</div>
                  <div className="text-2xl font-bold text-white">€3,180</div>
                  <div className="text-xs text-green-400">+€180 (6%)</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-sm text-white/60 mb-1">In 5 years</div>
                  <div className="text-2xl font-bold text-white">€4,015</div>
                  <div className="text-xs text-green-400">+€1,015 (33.8%)</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-sm text-white/60 mb-1">In 10 years</div>
                  <div className="text-2xl font-bold text-white">€5,372</div>
                  <div className="text-xs text-green-400">+€2,372 (79.1%)</div>
                </div>
              </div>
              <button className="mt-4 px-6 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 font-medium transition-colors">
                Learn about investing emergency funds →
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}