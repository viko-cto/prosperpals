import GlassCard from '../GlassCard';
import CompanionAvatar from '../CompanionAvatar';
import { Plus, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const goals = [
  {
    id: 1,
    emoji: '🏖️',
    title: 'Summer Trip to Greece',
    current: 1500,
    target: 2000,
    monthly: 200,
    targetDate: 'June 2026',
    status: 'on-track',
    message: "On track! You'll reach this by May if you keep going!",
  },
  {
    id: 2,
    emoji: '🛡️',
    title: 'Emergency Fund',
    current: 3000,
    target: 6000,
    monthly: 250,
    targetDate: 'December 2026',
    status: 'milestone',
    message: 'Just hit 3 months covered!',
    milestone: true,
  },
  {
    id: 3,
    emoji: '💻',
    title: 'New Laptop',
    current: 300,
    target: 1000,
    monthly: 100,
    targetDate: 'December 2026',
    status: 'behind',
    message: 'Add €50 more/month to hit your December target',
  },
];

const completedGoals = [
  { emoji: '💳', title: 'Paid off credit card', date: 'January 2026' },
  { emoji: '💰', title: 'Built €500 buffer', date: 'December 2025' },
];

export default function Goals() {
  const [showCelebration, setShowCelebration] = useState(false);

  return (
    <div className="h-screen overflow-y-auto relative">
      {/* Header */}
      <div className="p-8 border-b border-white/10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Goals 🎯</h1>
            <div className="flex items-center gap-3 mt-2">
              <CompanionAvatar type="goldie" size="sm" />
              <p className="text-gray-300">You're crushing it! 3 goals in progress.</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1a1a2e] rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Goal
          </button>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Active Goals */}
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            const statusColors = {
              'on-track': 'border-[#10B981]/50 bg-[#10B981]/5',
              'milestone': 'border-[#FFD700]/50 bg-[#FFD700]/5',
              'behind': 'border-[#F59E0B]/50 bg-[#F59E0B]/5',
            };

            return (
              <GlassCard key={goal.id} className={`p-6 ${statusColors[goal.status]}`}>
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{goal.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{goal.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>€{goal.monthly}/month</span>
                          <span>•</span>
                          <span>Target: {goal.targetDate}</span>
                        </div>
                      </div>
                      {goal.milestone && (
                        <button 
                          onClick={() => setShowCelebration(true)}
                          className="px-4 py-2 bg-[#FFD700]/20 border border-[#FFD700]/50 rounded-lg text-sm font-semibold text-[#FFD700] hover:bg-[#FFD700]/30 transition-colors"
                        >
                          🎉 View Celebration
                        </button>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className="text-sm font-semibold">
                          €{goal.current.toLocaleString()} / €{goal.target.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-3 rounded-full transition-all ${
                            goal.status === 'on-track' ? 'bg-gradient-to-r from-[#10B981] to-[#10B981]/80' :
                            goal.status === 'milestone' ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]' :
                            'bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/80'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="text-sm font-semibold mt-1">
                        {progress.toFixed(0)}%
                      </div>
                    </div>

                    {/* Message */}
                    <div className={`flex items-start gap-2 p-3 rounded-lg ${
                      goal.status === 'on-track' ? 'bg-[#10B981]/10 border border-[#10B981]/30' :
                      goal.status === 'milestone' ? 'bg-[#FFD700]/10 border border-[#FFD700]/30' :
                      'bg-[#F59E0B]/10 border border-[#F59E0B]/30'
                    }`}>
                      {goal.status === 'milestone' ? (
                        <span className="text-xl">🎉</span>
                      ) : goal.status === 'behind' ? (
                        <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      ) : (
                        <CompanionAvatar type="goldie" size="sm" />
                      )}
                      <p className="text-sm text-gray-300">{goal.message}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-colors">
                        Add money
                      </button>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-colors">
                        Adjust goal
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Completed Goals */}
        <div>
          <h2 className="text-xl font-bold mb-4">Completed Goals ✅</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedGoals.map((goal, idx) => (
              <GlassCard key={idx} className="p-4 bg-[#10B981]/5 border-[#10B981]/30">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{goal.emoji}</div>
                  <div>
                    <div className="font-semibold">{goal.title}</div>
                    <div className="text-sm text-gray-400">Completed {goal.date}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Goal Projections by Fin */}
        <GlassCard className="p-6 bg-[#4A90D9]/10 border-[#4A90D9]/30">
          <div className="flex gap-4">
            <CompanionAvatar type="fin" size="md" />
            <div className="flex-1">
              <div className="font-semibold text-[#4A90D9] mb-2">Goal Projections</div>
              <p className="text-gray-300 mb-4">
                If you invested your emergency fund (€3,000) in a diversified portfolio...
              </p>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-white/5 rounded-lg text-center">
                  <div className="text-sm text-gray-400 mb-1">5 years</div>
                  <div className="text-xl font-bold text-[#10B981]">€4,200</div>
                  <div className="text-xs text-gray-500">+€1,200</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg text-center">
                  <div className="text-sm text-gray-400 mb-1">10 years</div>
                  <div className="text-xl font-bold text-[#10B981]">€6,000</div>
                  <div className="text-xs text-gray-500">+€3,000</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg text-center">
                  <div className="text-sm text-gray-400 mb-1">20 years</div>
                  <div className="text-xl font-bold text-[#10B981]">€12,000</div>
                  <div className="text-xs text-gray-500">+€9,000</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                * Assuming 7% average annual return. Past performance doesn't guarantee future results.
              </p>
              <button className="px-4 py-2 bg-gradient-to-r from-[#4A90D9] to-[#2563EB] text-white rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(74,144,217,0.4)] transition-all">
                Learn about investing
              </button>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Celebration Modal */}
      {showCelebration && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setShowCelebration(false)}
        >
          <div className="relative max-w-lg w-full mx-4">
            {/* Confetti Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    backgroundColor: ['#FFD700', '#FFA500', '#10B981', '#4A90D9', '#EF4444'][Math.floor(Math.random() * 5)],
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            <GlassCard className="p-8 text-center relative">
              <div className="text-8xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-2">GOAL REACHED!</h2>
              <p className="text-xl text-gray-300 mb-6">
                You saved €3,000 for your Emergency Fund!
              </p>
              <div className="text-6xl mb-6">🛡️</div>
              <div className="space-y-3">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1a1a2e] rounded-xl font-bold hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all">
                  What's next?
                </button>
                <button 
                  onClick={() => setShowCelebration(false)}
                  className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
}
