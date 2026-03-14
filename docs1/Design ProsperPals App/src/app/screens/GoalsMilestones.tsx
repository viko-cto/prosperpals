import { useState } from "react";
import { Plus, TrendingUp, Edit, DollarSign, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { WinToast } from "../components/celebrations/WinToast";
import { GoalReachedModal } from "../components/celebrations/GoalReachedModal";
import { SegmentedProgressRing } from "../components/celebrations/SegmentedProgressRing";

interface Goal {
  id: string;
  name: string;
  emoji: string;
  current: number;
  target: number;
  targetDate: string;
  status: "on-track" | "needs-attention" | "completed";
  monthlyContribution: number;
  lastMilestone: number;
}

export function GoalsMilestones() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      name: "Emergency Fund",
      emoji: "🛡️",
      current: 3000,
      target: 6000,
      targetDate: "Dec 2026",
      status: "on-track",
      monthlyContribution: 250,
      lastMilestone: 25,
    },
    {
      id: "2",
      name: "Summer Trip",
      emoji: "🏖️",
      current: 1500,
      target: 2000,
      targetDate: "Jun 2026",
      status: "on-track",
      monthlyContribution: 200,
      lastMilestone: 50,
    },
    {
      id: "3",
      name: "New Laptop",
      emoji: "💻",
      current: 300,
      target: 1000,
      targetDate: "Oct 2026",
      status: "needs-attention",
      monthlyContribution: 75,
      lastMilestone: 0,
    },
  ]);

  const [showMilestoneToast, setShowMilestoneToast] = useState(false);
  const [showGoalReachedModal, setShowGoalReachedModal] = useState(false);
  const [celebratingGoal, setCelebratingGoal] = useState<Goal | null>(null);

  // Calculate progress percentage
  const getProgress = (goal: Goal) => {
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  // Get milestone threshold
  const getCurrentMilestone = (percentage: number) => {
    if (percentage >= 100) return 100;
    if (percentage >= 75) return 75;
    if (percentage >= 50) return 50;
    if (percentage >= 25) return 25;
    return 0;
  };

  // Trigger micro-confetti for milestone
  const triggerMicroConfetti = () => {
    const duration = 1200;
    const end = Date.now() + duration;

    const colors = ["#FFD700", "#FFA500", "#F59E0B"];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 45,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
        gravity: 0.8,
        scalar: 0.8,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  // Simulate adding money to a goal
  const handleAddMoney = (goalId: string, amount: number) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === goalId) {
          const newCurrent = Math.min(goal.current + amount, goal.target);
          const oldProgress = getProgress(goal);
          const newProgress = (newCurrent / goal.target) * 100;

          const oldMilestone = getCurrentMilestone(oldProgress);
          const newMilestone = getCurrentMilestone(newProgress);

          // Check if we crossed a milestone
          if (newMilestone > oldMilestone && newMilestone !== 100) {
            triggerMicroConfetti();
            setCelebratingGoal({ ...goal, current: newCurrent });
            setShowMilestoneToast(true);
          }

          // Check if goal completed
          if (newProgress >= 100 && oldProgress < 100) {
            setCelebratingGoal({ ...goal, current: newCurrent });
            setShowGoalReachedModal(true);
          }

          return {
            ...goal,
            current: newCurrent,
            lastMilestone: newMilestone,
            status: newProgress >= 100 ? ("completed" as const) : goal.status,
          };
        }
        return goal;
      })
    );
  };

  return (
    <div className="flex h-screen bg-[#0f0f1a] overflow-hidden">
      {/* Main Content Area (60%) */}
      <div className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">Goals & Milestones</h1>
            <span className="text-2xl">🎯</span>
          </div>
          <p className="text-white/60 text-sm">Track your progress and celebrate wins</p>
        </div>

        {/* Active Goals */}
        <div className="space-y-4 pb-20">
          {goals.map((goal) => {
            const progress = getProgress(goal);
            const currentMilestone = getCurrentMilestone(progress);

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 transition-all"
              >
                {/* Glow effect on milestone */}
                {progress >= 25 && progress < 100 && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.1), transparent 70%)`,
                    }}
                  />
                )}

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{goal.emoji}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{goal.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-white/60">Target: {goal.targetDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Chip */}
                    {goal.status === "on-track" ? (
                      <div className="flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 px-3 py-1.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-xs font-medium text-green-400">On track</span>
                      </div>
                    ) : goal.status === "needs-attention" ? (
                      <div className="flex items-center gap-1.5 bg-yellow-500/20 border border-yellow-500/30 px-3 py-1.5 rounded-full">
                        <AlertCircle className="w-3.5 h-3.5 text-yellow-400" />
                        <span className="text-xs font-medium text-yellow-400">Needs attention</span>
                      </div>
                    ) : null}
                  </div>

                  {/* Amount */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-white">
                        €{goal.current.toLocaleString()}
                      </span>
                      <span className="text-lg text-white/60">/ €{goal.target.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="relative w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-3 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500"
                      />
                      
                      {/* Milestone markers */}
                      {[25, 50, 75].map((milestone) => (
                        <div
                          key={milestone}
                          className="absolute top-0 h-3 w-0.5 bg-white/30"
                          style={{ left: `${milestone}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-white/60">{progress.toFixed(0)}% complete</span>
                      {currentMilestone > 0 && (
                        <span className="text-xs font-semibold text-yellow-400">
                          {currentMilestone}% milestone reached
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAddMoney(goal.id, 100)}
                      className="flex-1 group/btn relative px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl opacity-100 group-hover/btn:opacity-90 transition-opacity" />
                      <span className="relative text-gray-900 flex items-center justify-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Add money
                      </span>
                    </button>
                    <button className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/70 text-sm font-semibold transition-all flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit goal
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right Panel (40%) - Projections & Next Steps */}
      <div className="w-2/5 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] border-l border-white/10 overflow-y-auto p-6">
        {/* Projection Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-xl">🐋</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Projections</h2>
              <p className="text-xs text-white/60">by Fin</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-5 mb-4">
            <p className="text-sm text-white/80 mb-4">
              Your emergency fund could work harder. In a low-risk fund:
            </p>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60">In 1 year</span>
                  <span className="text-sm font-bold text-white">€3,180</span>
                </div>
                <div className="text-xs text-green-400 mt-1">+€180 (6%)</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60">In 5 years</span>
                  <span className="text-sm font-bold text-white">€4,015</span>
                </div>
                <div className="text-xs text-green-400 mt-1">+€1,015 (33.8%)</div>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 text-sm font-semibold transition-colors flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Learn more
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-xl">🪙</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Next Steps</h2>
              <p className="text-xs text-white/60">by Goldie</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-xl p-4 hover:border-yellow-500/30 transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    Add €50 to your laptop fund
                  </h3>
                  <p className="text-xs text-white/70">
                    This will keep you on track for October
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-xl p-4 hover:border-yellow-500/30 transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎉</span>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    You're crushing it!
                  </h3>
                  <p className="text-xs text-white/70">
                    2 goals are on track. Keep up the momentum
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-xl p-4 hover:border-yellow-500/30 transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Set a new goal</h3>
                  <p className="text-xs text-white/70">
                    What's next after your summer trip?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Overall Progress</h3>
          <div className="flex items-center justify-center mb-4">
            <SegmentedProgressRing
              percentage={Math.round(
                (goals.reduce((sum, g) => sum + g.current, 0) /
                  goals.reduce((sum, g) => sum + g.target, 0)) *
                  100
              )}
              size="medium"
              showMilestones={true}
              currentAmount={goals.reduce((sum, g) => sum + g.current, 0)}
              targetAmount={goals.reduce((sum, g) => sum + g.target, 0)}
            />
          </div>
          <div className="text-center">
            <p className="text-xs text-white/60">Total saved across all goals</p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 group relative px-6 py-4 rounded-2xl font-bold shadow-2xl z-50"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl opacity-100 group-hover:opacity-90 transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
        <span className="relative text-gray-900 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create goal
        </span>
      </motion.button>

      {/* Milestone Toast */}
      <WinToast
        visible={showMilestoneToast}
        title="Milestone reached 🎉"
        message={
          celebratingGoal
            ? `${celebratingGoal.name}: ${getCurrentMilestone(getProgress(celebratingGoal))}% complete`
            : ""
        }
        coinsEarned={25}
        onClose={() => {
          setShowMilestoneToast(false);
          setCelebratingGoal(null);
        }}
        duration={4000}
      />

      {/* Goal Reached Modal */}
      <GoalReachedModal
        visible={showGoalReachedModal}
        onClose={() => {
          setShowGoalReachedModal(false);
          setCelebratingGoal(null);
        }}
        goalName={celebratingGoal?.name || ""}
        amount={celebratingGoal?.target || 0}
        timeToGoal={90}
        onSetNextGoal={() => {
          setShowGoalReachedModal(false);
          setCelebratingGoal(null);
        }}
        onInvest={() => {
          setShowGoalReachedModal(false);
          setCelebratingGoal(null);
        }}
        onShare={() => {
          setShowGoalReachedModal(false);
          setCelebratingGoal(null);
        }}
      />
    </div>
  );
}
