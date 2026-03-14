import { useState } from "react";
import { motion } from "motion/react";
import { Target, TrendingUp, Clock, Sparkles, History, Share2 } from "lucide-react";
import { WinToast, WinToastMobile } from "../components/celebrations/WinToast";
import { MilestoneStrip } from "../components/celebrations/MilestoneStrip";
import { SegmentedProgressRing } from "../components/celebrations/SegmentedProgressRing";
import { StreakBadgeRow } from "../components/celebrations/StreakBadge";
import { ShareWinSheet } from "../components/celebrations/ShareWinSheet";
import { GoalReachedModal } from "../components/celebrations/GoalReachedModal";
import { PostWinCard } from "../components/celebrations/PostWinCard";

export function GoalsCelebrationShowcase() {
  // State for different celebration demos
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);

  return (
    <div className="flex-1 bg-[#0f0f1a] overflow-auto">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">Celebration Moments System</h1>
          </div>
          <p className="text-white/60">
            High-fidelity celebration flows for Goals & Milestones (Desktop 1440x1024 + Mobile 390x844)
          </p>

          {/* Design System Info */}
          <div className="mt-6 grid grid-cols-5 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="text-xs text-white/60 mb-1">Brand</div>
              <div className="text-sm font-semibold text-white">ProsperPals</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="text-xs text-white/60 mb-1">Typography</div>
              <div className="text-sm font-semibold text-white">Inter</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="text-xs text-white/60 mb-1">Style</div>
              <div className="text-sm font-semibold text-white">Glassmorphism</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="text-xs text-white/60 mb-1">Corners</div>
              <div className="text-sm font-semibold text-white">12px</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="text-xs text-white/60 mb-1">Companions</div>
              <div className="text-sm font-semibold text-white">🪙 Goldie + 🐋 Fin</div>
            </div>
          </div>
        </div>

        {/* Frame Grid */}
        <div className="p-8 space-y-12">
          {/* ========== FRAME 1: Default State (No Celebration Active) ========== */}
          <section>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                  1
                </div>
                <h2 className="text-2xl font-bold text-white">Goals & Milestones - Default State</h2>
              </div>
              <p className="text-white/60 text-sm">No celebration active • Progress tracking visible</p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              {/* Active Goals */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-4">Active Goals</h3>
                <div className="grid grid-cols-2 gap-6">
                  {/* Emergency Fund Goal */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm text-white/60 mb-1">Emergency Fund</div>
                        <div className="text-2xl font-bold text-white">€2,500 / €5,000</div>
                      </div>
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        🛡️
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/60">Progress</span>
                        <span className="text-white font-semibold">50%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "50%" }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-white/60">€2,500 to go</div>
                      <div className="text-green-400 font-semibold">On track</div>
                    </div>
                  </div>

                  {/* Summer Trip Goal */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm text-white/60 mb-1">Summer Trip</div>
                        <div className="text-2xl font-bold text-white">€2,250 / €3,000</div>
                      </div>
                      <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        ✈️
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/60">Progress</span>
                        <span className="text-white font-semibold">75%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-orange-400 to-orange-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-white/60">€750 to go</div>
                      <div className="text-orange-400 font-semibold">Close!</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Streak Badges */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Your Badges</h3>
                <StreakBadgeRow />
              </div>
            </div>
          </section>

          {/* ========== FRAME 2: 50% Milestone (Subtle Inline Celebration) ========== */}
          <section>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                  2
                </div>
                <h2 className="text-2xl font-bold text-white">50% Milestone - Subtle Inline Celebration</h2>
              </div>
              <p className="text-white/60 text-sm">Win toast appears • Progress card shows milestone pulse • Low intensity</p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative">
              {/* Inline milestone celebration */}
              <div className="mb-6">
                <MilestoneStrip
                  milestone={50}
                  goalName="Emergency Fund"
                  message="You're halfway there! Keep going!"
                  intensity="subtle"
                />
              </div>

              {/* Active Goals with celebration highlight */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-4">Active Goals</h3>
                <div className="grid grid-cols-2 gap-6">
                  {/* Emergency Fund Goal - CELEBRATING */}
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                    className="bg-gradient-to-br from-yellow-400/10 to-yellow-500/5 border-2 border-yellow-400/30 rounded-xl p-6 relative overflow-hidden"
                  >
                    {/* Pulse effect */}
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1.5],
                        opacity: [0.5, 0, 0],
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 rounded-xl"
                    />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div className="text-sm text-white font-semibold">Emergency Fund</div>
                            <div className="px-2 py-0.5 bg-yellow-400/20 rounded-full text-xs font-bold text-yellow-400">
                              50% 🎉
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-white">€2,500 / €5,000</div>
                        </div>
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          🛡️
                        </div>
                      </div>

                      {/* Segmented ring */}
                      <div className="flex justify-center my-6">
                        <SegmentedProgressRing
                          percentage={50}
                          size="medium"
                          currentAmount={2500}
                          targetAmount={5000}
                        />
                      </div>

                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-xs text-white/60 mb-1">Goldie says:</div>
                        <div className="text-sm text-white">"You're close — €80 to go!"</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Summer Trip Goal - normal state */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm text-white/60 mb-1">Summer Trip</div>
                        <div className="text-2xl font-bold text-white">€2,250 / €3,000</div>
                      </div>
                      <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        ✈️
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/60">Progress</span>
                        <span className="text-white font-semibold">75%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-orange-400 to-orange-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-white/60">€750 to go</div>
                      <div className="text-orange-400 font-semibold">Close!</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo button */}
              <button
                onClick={() => setShowToast(true)}
                className="px-4 py-2 bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400/40 rounded-lg text-yellow-400 font-semibold text-sm transition-all"
              >
                Show Win Toast
              </button>
            </div>
          </section>

          {/* ========== FRAME 3: 75% Milestone (Stronger Celebration) ========== */}
          <section>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                  3
                </div>
                <h2 className="text-2xl font-bold text-white">75% Milestone - Stronger Celebration Strip</h2>
              </div>
              <p className="text-white/60 text-sm">Enhanced celebration strip • Goldie encouraging message • Medium intensity</p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              {/* Stronger milestone celebration */}
              <div className="mb-6">
                <MilestoneStrip
                  milestone={75}
                  goalName="Summer Trip"
                  message="Almost there! Just one more push!"
                  intensity="strong"
                />
              </div>

              {/* Goal detail with Goldie message */}
              <div className="grid grid-cols-3 gap-6">
                {/* Main goal card */}
                <div className="col-span-2 bg-gradient-to-br from-orange-400/10 to-orange-500/5 border-2 border-orange-400/30 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-2xl font-bold text-white">Summer Trip</h3>
                        <div className="px-3 py-1 bg-orange-400/20 rounded-full text-sm font-bold text-orange-400">
                          75% 🎉
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">€2,250 / €3,000</div>
                      <div className="text-white/60">Only €750 to go!</div>
                    </div>
                    <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center text-4xl">
                      ✈️
                    </div>
                  </div>

                  {/* Progress visualization */}
                  <div className="flex justify-center mb-6">
                    <SegmentedProgressRing
                      percentage={75}
                      size="large"
                      currentAmount={2250}
                      targetAmount={3000}
                    />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-white">45</div>
                      <div className="text-xs text-white/60">Days active</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-white">€50</div>
                      <div className="text-xs text-white/60">Per week</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-white">15</div>
                      <div className="text-xs text-white/60">Days left</div>
                    </div>
                  </div>
                </div>

                {/* Goldie encouragement sidebar */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border-2 border-yellow-400/30 rounded-xl p-5">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                      🪙
                    </div>
                    <div className="text-center mb-4">
                      <div className="font-bold text-white mb-2">Goldie says:</div>
                      <div className="text-sm text-white/80">
                        "You're crushing it! Just €750 more and you'll be on that beach! 🏖️"
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-sm font-semibold text-white mb-2">Reward Unlocked</div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">75% Achievement</span>
                      <span className="text-yellow-400 font-bold text-lg">+75 PC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========== FRAME 4: 100% Goal Reached (Full Modal) ========== */}
          <section>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                  4
                </div>
                <h2 className="text-2xl font-bold text-white">100% Goal Reached - Full Celebration Modal</h2>
              </div>
              <p className="text-white/60 text-sm">Confetti + Full takeover + 3 CTA buttons • High intensity</p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 bg-green-500/20 border-2 border-green-500/40 rounded-xl px-6 py-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white">Goal Completed!</div>
                    <div className="text-green-400 font-semibold">Click to see celebration</div>
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] rounded-xl font-bold text-white transition-all"
                >
                  Show Full Celebration Modal
                </button>

                {/* Micro-interaction annotations */}
                <div className="mt-8 grid grid-cols-3 gap-4 text-left">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="text-yellow-400 font-bold mb-2">🎊 Confetti</div>
                    <div className="text-sm text-white/60">3-second continuous burst from both sides</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="text-green-400 font-bold mb-2">⏱️ Modal Enter</div>
                    <div className="text-sm text-white/60">320ms spring animation (Y + opacity)</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="text-blue-400 font-bold mb-2">♿ Accessibility</div>
                    <div className="text-sm text-white/60">Reduce motion = fade only, no confetti</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========== FRAME 5: Post-Celebration State ========== */}
          <section>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                  5
                </div>
                <h2 className="text-2xl font-bold text-white">Post-Celebration State</h2>
              </div>
              <p className="text-white/60 text-sm">Completed goal card + "What's next?" recommendations</p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="grid grid-cols-3 gap-6">
                {/* Completed goal */}
                <div className="col-span-2">
                  <PostWinCard
                    goalName="Summer Trip"
                    amount={3000}
                    completedDate="Feb 20, 2026"
                    timeToGoal={60}
                    onSetNextGoal={() => {}}
                  />
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Suggested Goals</h3>
                  <div className="space-y-3">
                    <button className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-400/30 rounded-xl transition-all text-left group">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-xl">
                          🏠
                        </div>
                        <div className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                          House Down Payment
                        </div>
                      </div>
                      <div className="text-sm text-white/60">€20,000 target</div>
                    </button>

                    <button className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-400/30 rounded-xl transition-all text-left group">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-xl">
                          🚗
                        </div>
                        <div className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                          New Car
                        </div>
                      </div>
                      <div className="text-sm text-white/60">€15,000 target</div>
                    </button>

                    <button className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-400/30 rounded-xl transition-all text-left group">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-xl">
                          💎
                        </div>
                        <div className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                          Investment Fund
                        </div>
                      </div>
                      <div className="text-sm text-white/60">€10,000 target</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========== FRAME 6: Celebration History Timeline ========== */}
          <section>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                  6
                </div>
                <h2 className="text-2xl font-bold text-white">Celebration History Timeline</h2>
              </div>
              <p className="text-white/60 text-sm">Timeline of wins: 25%, 50%, 75%, 100%</p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <History className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Your Achievement Journey</h3>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-orange-400 to-green-500" />

                {/* Timeline items */}
                <div className="space-y-6">
                  {/* 100% */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0 }}
                    className="relative flex items-start gap-6"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 border-4 border-[#0f0f1a] z-10">
                      100%
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-green-500/20 to-green-600/10 border-2 border-green-500/30 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold text-white text-lg">Goal Completed! 🎉</div>
                        <div className="text-sm text-white/60">Feb 20, 2026</div>
                      </div>
                      <div className="text-white/80 mb-3">Summer Trip fully funded — €3,000 saved!</div>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-yellow-400/20 rounded-lg text-sm font-semibold text-yellow-400">
                          +200 PC
                        </div>
                        <div className="px-3 py-1 bg-white/10 rounded-lg text-sm text-white/60">
                          <Clock className="w-3 h-3 inline mr-1" />
                          60 days
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* 75% */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative flex items-start gap-6"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 border-4 border-[#0f0f1a] z-10">
                      75%
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold text-white">Almost There!</div>
                        <div className="text-sm text-white/60">Feb 5, 2026</div>
                      </div>
                      <div className="text-white/80 mb-3">€2,250 saved — only €750 to go!</div>
                      <div className="px-3 py-1 bg-yellow-400/20 rounded-lg text-sm font-semibold text-yellow-400 inline-block">
                        +75 PC
                      </div>
                    </div>
                  </motion.div>

                  {/* 50% */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative flex items-start gap-6"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 border-4 border-[#0f0f1a] z-10">
                      50%
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold text-white">Halfway There!</div>
                        <div className="text-sm text-white/60">Jan 20, 2026</div>
                      </div>
                      <div className="text-white/80 mb-3">€1,500 saved — great progress!</div>
                      <div className="px-3 py-1 bg-yellow-400/20 rounded-lg text-sm font-semibold text-yellow-400 inline-block">
                        +50 PC
                      </div>
                    </div>
                  </motion.div>

                  {/* 25% */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative flex items-start gap-6"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 border-4 border-[#0f0f1a] z-10">
                      25%
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold text-white">Off to a Great Start!</div>
                        <div className="text-sm text-white/60">Jan 5, 2026</div>
                      </div>
                      <div className="text-white/80 mb-3">€750 saved — keep it up!</div>
                      <div className="px-3 py-1 bg-yellow-400/20 rounded-lg text-sm font-semibold text-yellow-400 inline-block">
                        +25 PC
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* ========== FRAME 7: Share Win Sheet ========== */}
          <section>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                  7
                </div>
                <h2 className="text-2xl font-bold text-white">Share Win Sheet</h2>
              </div>
              <p className="text-white/60 text-sm">Private by default • Optional share to Family Space • Public social media</p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 bg-purple-500/20 border-2 border-purple-500/40 rounded-xl px-6 py-4 mb-4">
                  <Share2 className="w-8 h-8 text-purple-400" />
                  <div className="text-left">
                    <div className="text-xl font-bold text-white">Share Your Achievement</div>
                    <div className="text-purple-400 font-semibold">Privacy-first sharing options</div>
                  </div>
                </div>

                <button
                  onClick={() => setShowShareSheet(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] rounded-xl font-bold text-white transition-all"
                >
                  Open Share Sheet
                </button>

                {/* Privacy options preview */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      🔒
                    </div>
                    <div className="font-semibold text-white mb-1">Private</div>
                    <div className="text-xs text-white/60">Default option • Just you</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      👨‍👩‍👧‍👦
                    </div>
                    <div className="font-semibold text-white mb-1">Family Space</div>
                    <div className="text-xs text-white/60">Opt-in • Family members</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      🌐
                    </div>
                    <div className="font-semibold text-white mb-1">Public</div>
                    <div className="text-xs text-white/60">Social media ready</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========== FRAME 8: Mobile Celebration Flow ========== */}
          <section>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                  8
                </div>
                <h2 className="text-2xl font-bold text-white">Mobile Celebration Flow (390x844)</h2>
              </div>
              <p className="text-white/60 text-sm">Milestone card → Full-screen modal → Next action</p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="flex justify-center gap-8">
                {/* Mobile Frame 1: Milestone achieved */}
                <div className="w-[390px] h-[844px] bg-[#0f0f1a] rounded-[3rem] border-4 border-white/20 overflow-hidden relative shadow-2xl">
                  {/* Status bar */}
                  <div className="h-11 bg-black flex items-center justify-between px-8 text-white text-xs">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-4">📶</div>
                      <div className="w-4 h-4">🔋</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 h-[calc(100%-44px)] overflow-y-auto">
                    <h1 className="text-2xl font-bold text-white mb-6">Your Goals</h1>

                    {/* Goal with milestone */}
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                      className="bg-gradient-to-br from-orange-400/10 to-orange-500/5 border-2 border-orange-400/30 rounded-2xl p-6 mb-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-white">Summer Trip</span>
                            <div className="px-2 py-0.5 bg-orange-400/20 rounded-full text-xs font-bold text-orange-400">
                              75% 🎉
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-white">€2,250</div>
                          <div className="text-sm text-white/60">of €3,000</div>
                        </div>
                        <div className="text-5xl">✈️</div>
                      </div>

                      <div className="flex justify-center mb-4">
                        <SegmentedProgressRing
                          percentage={75}
                          size="small"
                          currentAmount={2250}
                          targetAmount={3000}
                        />
                      </div>

                      <div className="bg-white/10 rounded-lg p-3 text-center">
                        <div className="text-sm text-white/60 mb-1">🪙 Goldie says:</div>
                        <div className="text-sm text-white font-semibold">"Just €750 more — you got this!"</div>
                      </div>
                    </motion.div>

                    {/* Other goals */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-semibold text-white mb-1">Emergency Fund</div>
                          <div className="text-lg font-bold text-white">€2,500 / €5,000</div>
                        </div>
                        <div className="text-3xl">🛡️</div>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-gradient-to-r from-blue-400 to-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Frame 2: Full-screen celebration */}
                <div className="w-[390px] h-[844px] bg-gradient-to-br from-orange-500 to-orange-700 rounded-[3rem] border-4 border-white/20 overflow-hidden relative shadow-2xl">
                  {/* Status bar */}
                  <div className="h-11 bg-transparent flex items-center justify-between px-8 text-white text-xs">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-4">📶</div>
                      <div className="w-4 h-4">🔋</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 h-[calc(100%-44px)] flex flex-col items-center justify-center text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-8xl mb-6"
                    >
                      ✈️
                    </motion.div>

                    <h1 className="text-4xl font-bold text-white mb-2">Almost There!</h1>
                    <h2 className="text-2xl font-semibold text-white/90 mb-6">Summer Trip</h2>

                    <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 mb-8 w-full">
                      <div className="text-6xl font-bold text-white mb-2">75%</div>
                      <div className="text-xl text-white/80 mb-4">€2,250 saved</div>
                      <div className="text-white/70">Only €750 to go!</div>
                    </div>

                    <button className="w-full px-6 py-4 bg-white hover:bg-white/90 rounded-2xl font-bold text-orange-600 transition-all mb-3">
                      Keep Going!
                    </button>

                    <button className="w-full px-6 py-4 bg-white/20 hover:bg-white/30 border-2 border-white/40 rounded-2xl font-semibold text-white transition-all">
                      Share Achievement
                    </button>
                  </div>
                </div>

                {/* Mobile Frame 3: Next action */}
                <div className="w-[390px] h-[844px] bg-[#0f0f1a] rounded-[3rem] border-4 border-white/20 overflow-hidden relative shadow-2xl">
                  {/* Status bar */}
                  <div className="h-11 bg-black flex items-center justify-between px-8 text-white text-xs">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-4">📶</div>
                      <div className="w-4 h-4">🔋</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 h-[calc(100%-44px)] overflow-y-auto">
                    <div className="flex items-center gap-3 mb-6">
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                      <h1 className="text-2xl font-bold text-white">What's Next?</h1>
                    </div>

                    {/* Current progress */}
                    <div className="bg-gradient-to-br from-orange-400/10 to-orange-500/5 border border-orange-400/20 rounded-2xl p-5 mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-4xl">✈️</div>
                        <div>
                          <div className="font-bold text-white">Summer Trip</div>
                          <div className="text-white/60 text-sm">75% complete</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-white">€2,250 / €3,000</div>
                    </div>

                    {/* Recommendations */}
                    <h2 className="font-bold text-white mb-4">Recommended Actions</h2>

                    <div className="space-y-3">
                      <button className="w-full p-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-xl transition-all text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <Target className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-white">Increase Weekly Savings</div>
                            <div className="text-sm text-white/80">Reach your goal faster</div>
                          </div>
                        </div>
                      </button>

                      <button className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">Talk to Fin About Investing</div>
                            <div className="text-sm text-white/60">Grow your savings</div>
                          </div>
                        </div>
                      </button>

                      <button className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <Share2 className="w-6 h-6 text-green-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">Share with Family</div>
                            <div className="text-sm text-white/60">Celebrate together</div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Micro-interactions Reference */}
          <section className="mt-12">
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-2 border-purple-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">⚡ Micro-Interactions Reference</h2>

              <div className="grid grid-cols-4 gap-6">
                <div>
                  <h4 className="font-bold text-yellow-400 mb-3">Progress Completion</h4>
                  <div className="text-sm text-white/70 space-y-1">
                    <div>• 250ms ease-out</div>
                    <div>• Scale pulse 1.02x</div>
                    <div>• Color transition</div>
                    <div>• Ring segment fill</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-orange-400 mb-3">Coin/Spark Burst</h4>
                  <div className="text-sm text-white/70 space-y-1">
                    <div>• 450ms duration</div>
                    <div>• Spring physics</div>
                    <div>• Staggered delay</div>
                    <div>• Opacity fade out</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-green-400 mb-3">Modal Enter</h4>
                  <div className="text-sm text-white/70 space-y-1">
                    <div>• 320ms (Y + opacity)</div>
                    <div>• Spring bounce 0.4</div>
                    <div>• Backdrop blur fade</div>
                    <div>• Confetti trigger</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-blue-400 mb-3">Reduce Motion</h4>
                  <div className="text-sm text-white/70 space-y-1">
                    <div>• No confetti</div>
                    <div>• Fade only (no scale)</div>
                    <div>• No infinite loops</div>
                    <div>• Instant transitions</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Active Modals/Sheets */}
      <WinToast
        visible={showToast}
        title="Halfway there!"
        message="Emergency Fund hit 50%"
        icon={<Target className="w-5 h-5" />}
        coinsEarned={50}
        onClose={() => setShowToast(false)}
      />

      <GoalReachedModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        goalName="Summer Trip"
        amount={3000}
        timeToGoal={60}
        onSetNextGoal={() => setShowModal(false)}
        onInvest={() => setShowModal(false)}
        onShare={() => {
          setShowModal(false);
          setShowShareSheet(true);
        }}
      />

      <ShareWinSheet
        visible={showShareSheet}
        onClose={() => setShowShareSheet(false)}
        goalName="Summer Trip"
        amount={3000}
        goalIcon="✈️"
        daysToComplete={60}
      />
    </div>
  );
}
