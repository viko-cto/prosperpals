import { useState } from "react";
import { AnimatePresence } from "motion/react";
import {
  FirstBankConnected,
  GoalCompleted,
  StreakMilestone,
  BudgetUnderControl,
  FirstLessonCompleted,
} from "../components/CelebrationMoments";
import { Sparkles, Building2, Target, Flame, Trophy, GraduationCap } from "lucide-react";

export function CelebrationShowcase() {
  const [activeCelebration, setActiveCelebration] = useState<string | null>(null);

  const celebrations = [
    {
      id: "bank",
      title: "First Bank Connected",
      icon: Building2,
      color: "from-blue-500 to-blue-600",
      description: "User connects their first bank account",
      features: [
        "Confetti explosion",
        "Goldie dancing animation",
        "+100 PC reward",
        "\"Your financial life, unified!\"",
      ],
      Component: FirstBankConnected,
      props: {
        bankName: "Chase Bank",
        onClose: () => setActiveCelebration(null),
      },
    },
    {
      id: "goal",
      title: "Goal Completed",
      icon: Target,
      color: "from-green-500 to-green-600",
      description: "User completes a savings goal",
      features: [
        "Full-screen takeover",
        "Goal-specific animation (✈️🏠🚗)",
        "Photo-worthy share card",
        "\"What's next?\" prompt",
      ],
      Component: GoalCompleted,
      props: {
        goalName: "Greece Trip",
        goalType: "travel" as const,
        amount: 1000,
        onClose: () => setActiveCelebration(null),
      },
    },
    {
      id: "streak-7",
      title: "7 Day Streak",
      icon: Flame,
      color: "from-orange-500 to-orange-600",
      description: "Week warrior milestone",
      features: [
        "Badge unlock animation",
        "Fire effect intensifies",
        "Both Goldie & Fin celebrate",
        "Leaderboard position update",
      ],
      Component: StreakMilestone,
      props: {
        days: 7 as const,
        leaderboardPosition: 12,
        previousPosition: 18,
        onClose: () => setActiveCelebration(null),
      },
    },
    {
      id: "streak-30",
      title: "30 Day Streak",
      icon: Flame,
      color: "from-yellow-500 to-yellow-600",
      description: "Monthly master milestone",
      features: [
        "⚡ Lightning badge",
        "Enhanced fire effects",
        "Both companions dance",
        "Leaderboard boost shown",
      ],
      Component: StreakMilestone,
      props: {
        days: 30 as const,
        leaderboardPosition: 5,
        previousPosition: 15,
        onClose: () => setActiveCelebration(null),
      },
    },
    {
      id: "streak-100",
      title: "100 Day Streak",
      icon: Flame,
      color: "from-purple-500 to-purple-600",
      description: "Century champion milestone",
      features: [
        "👑 Crown badge unlock",
        "Maximum fire intensity",
        "Epic celebration from both",
        "Top leaderboard position",
      ],
      Component: StreakMilestone,
      props: {
        days: 100 as const,
        leaderboardPosition: 1,
        previousPosition: 3,
        onClose: () => setActiveCelebration(null),
      },
    },
    {
      id: "budget",
      title: "Budget Under Control",
      icon: Trophy,
      color: "from-green-400 to-green-500",
      description: "Week finished under budget",
      features: [
        "Goldie gives trophy 🏆",
        "+50 PC bonus reward",
        "\"You're crushing it!\" message",
        "Share achievement option",
      ],
      Component: BudgetUnderControl,
      props: {
        savedAmount: 50,
        onClose: () => setActiveCelebration(null),
      },
    },
    {
      id: "lesson",
      title: "First Lesson Completed",
      icon: GraduationCap,
      color: "from-blue-400 to-blue-600",
      description: "Completed first learning module",
      features: [
        "Fin graduation ceremony 🎓",
        "Certificate-style card",
        "\"Index Fund Graduate\" badge",
        "Preview of next lesson",
      ],
      Component: FirstLessonCompleted,
      props: {
        lessonTitle: "Understanding Index Funds",
        nextLesson: "Diversification Basics",
        onClose: () => setActiveCelebration(null),
      },
    },
  ];

  return (
    <div className="flex-1 bg-[#0f0f1a] overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">Celebration Micro-Moments</h1>
          </div>
          <p className="text-white/60">
            Delightful celebrations for every achievement
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-1">7</div>
            <div className="text-sm text-white/60">Celebrations</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-1">5</div>
            <div className="text-sm text-white/60">Milestone Types</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">🎊</div>
            <div className="text-sm text-white/60">Confetti</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">🏆</div>
            <div className="text-sm text-white/60">Rewards</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">🪙🐋</div>
            <div className="text-sm text-white/60">Companions</div>
          </div>
        </div>

        {/* Celebration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {celebrations.map((celebration) => {
            const Icon = celebration.icon;
            return (
              <div
                key={celebration.id}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${celebration.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{celebration.title}</h3>
                      <p className="text-sm text-white/60">{celebration.description}</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {celebration.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => setActiveCelebration(celebration.id)}
                  className={`w-full px-4 py-3 bg-gradient-to-r ${celebration.color} hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] rounded-xl font-bold text-white transition-all`}
                >
                  Preview Celebration
                </button>
              </div>
            );
          })}
        </div>

        {/* Design Principles */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🎨 Design Principles</h2>
          
          <div className="grid grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-400 mb-3">Immediate Gratification</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Confetti on achievement</li>
                <li>• Instant reward display</li>
                <li>• Companion reactions</li>
                <li>• Sound effects (optional)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-400 mb-3">Shareable Moments</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Photo-worthy cards</li>
                <li>• Social media ready</li>
                <li>• Beautiful typography</li>
                <li>• Brand consistency</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-400 mb-3">Progression Clarity</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Clear "what's next"</li>
                <li>• Badge collections</li>
                <li>• Leaderboard updates</li>
                <li>• Next lesson previews</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Celebration Types */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Achievement Celebrations */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Achievement Celebrations</h3>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  🏦
                </div>
                <div>
                  <div className="font-semibold text-white">First Bank Connected</div>
                  <div className="text-white/60">+100 PC • Dancing Goldie • Unified message</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  🎯
                </div>
                <div>
                  <div className="font-semibold text-white">Goal Completed</div>
                  <div className="text-white/60">Full screen • Share card • What's next</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  💪
                </div>
                <div>
                  <div className="font-semibold text-white">Budget Under Control</div>
                  <div className="text-white/60">+50 PC • Trophy • Crushing it message</div>
                </div>
              </div>
            </div>
          </div>

          {/* Milestone Celebrations */}
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-400 mb-4">Milestone Celebrations</h3>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  🔥
                </div>
                <div>
                  <div className="font-semibold text-white">7 Day Streak</div>
                  <div className="text-white/60">Week Warrior • Fire effect • Both celebrate</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  ⚡
                </div>
                <div>
                  <div className="font-semibold text-white">30 Day Streak</div>
                  <div className="text-white/60">Monthly Master • Lightning badge</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  👑
                </div>
                <div>
                  <div className="font-semibold text-white">100 Day Streak</div>
                  <div className="text-white/60">Century Champion • Crown badge • Epic</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  🎓
                </div>
                <div>
                  <div className="font-semibold text-white">First Lesson</div>
                  <div className="text-white/60">Graduation • Certificate • Next preview</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animation Details */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">✨ Animation Details</h2>
          
          <div className="grid grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Confetti</h4>
              <ul className="space-y-1 text-sm text-white/70">
                <li>• 200 particles</li>
                <li>• Multiple bursts</li>
                <li>• Gold/colored mix</li>
                <li>• 2-second duration</li>
                <li>• Respect reduce-motion</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Companions</h4>
              <ul className="space-y-1 text-sm text-white/70">
                <li>• Dancing animations</li>
                <li>• Y-axis bounce</li>
                <li>• Rotation wiggle</li>
                <li>• Staggered timing</li>
                <li>• Infinite loop</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Badges</h4>
              <ul className="space-y-1 text-sm text-white/70">
                <li>• Scale + rotate entry</li>
                <li>• Spring physics</li>
                <li>• Glow effects</li>
                <li>• Fire overlays</li>
                <li>• Pulse breathing</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Modals</h4>
              <ul className="space-y-1 text-sm text-white/70">
                <li>• Backdrop blur</li>
                <li>• Scale entrance</li>
                <li>• Staggered reveals</li>
                <li>• Auto-dismiss option</li>
                <li>• Share integration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Coin Rewards */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">🪙 ProsperCoin Rewards</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-black/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-sm">First Bank</span>
                <span className="text-2xl font-bold text-yellow-400">+100</span>
              </div>
              <div className="text-xs text-white/40">One-time achievement</div>
            </div>

            <div className="bg-black/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-sm">Budget Win</span>
                <span className="text-2xl font-bold text-yellow-400">+50</span>
              </div>
              <div className="text-xs text-white/40">Weekly bonus</div>
            </div>

            <div className="bg-black/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-sm">Streaks</span>
                <span className="text-2xl font-bold text-yellow-400">varies</span>
              </div>
              <div className="text-xs text-white/40">7d: +25, 30d: +100, 100d: +500</div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-400 mb-4">✅ Do This</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Celebrate immediately after action</li>
              <li>• Make it feel earned and special</li>
              <li>• Include Goldie/Fin personality</li>
              <li>• Offer share options</li>
              <li>• Guide to next step</li>
              <li>• Respect accessibility settings</li>
              <li>• Use spring physics for joy</li>
            </ul>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-red-400 mb-4">❌ Avoid This</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Don't over-celebrate small wins</li>
              <li>• Avoid blocking user flow</li>
              <li>• Don't make it dismissable too easily</li>
              <li>• Skip generic "Great job!" messages</li>
              <li>• Don't ignore reduce-motion</li>
              <li>• Avoid celebration fatigue</li>
              <li>• Never auto-share without consent</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Active Celebration */}
      <AnimatePresence>
        {activeCelebration && (() => {
          const celebration = celebrations.find(c => c.id === activeCelebration);
          if (!celebration) return null;
          const { Component, props } = celebration;
          return <Component {...props} />;
        })()}
      </AnimatePresence>
    </div>
  );
}
