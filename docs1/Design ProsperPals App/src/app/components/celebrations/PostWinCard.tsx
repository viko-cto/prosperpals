import { motion } from "motion/react";
import { CheckCircle2, TrendingUp, Target, Sparkles } from "lucide-react";

interface PostWinCardProps {
  goalName: string;
  amount: number;
  completedDate: string;
  timeToGoal: number;
  onSetNextGoal?: () => void;
}

export function PostWinCard({
  goalName,
  amount,
  completedDate,
  timeToGoal,
  onSetNextGoal,
}: PostWinCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-green-500/30 rounded-2xl p-6 relative overflow-hidden"
    >
      {/* Completed badge */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1.5 rounded-full border border-green-500/30">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span className="text-sm font-semibold text-green-400">Completed</span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-white mb-2">{goalName}</h3>
        <div className="text-4xl font-bold text-green-400 mb-2">€{amount.toLocaleString()}</div>
        <div className="text-sm text-white/60">Completed on {completedDate}</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white/5 rounded-xl p-3">
          <div className="text-2xl font-bold text-white">{timeToGoal} days</div>
          <div className="text-xs text-white/60">Time to goal</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3">
          <div className="text-2xl font-bold text-white">€{Math.round(amount / timeToGoal)}</div>
          <div className="text-xs text-white/60">Per day</div>
        </div>
      </div>

      {/* What's next section */}
      {onSetNextGoal && (
        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <h4 className="font-bold text-white">What's next?</h4>
          </div>

          <div className="space-y-2">
            {/* Recommendation 1 */}
            <button className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all text-left group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                    Set a new goal
                  </div>
                  <div className="text-xs text-white/60">Keep the momentum going</div>
                </div>
              </div>
            </button>

            {/* Recommendation 2 */}
            <button className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all text-left group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                    Invest this amount
                  </div>
                  <div className="text-xs text-white/60">Let your money grow</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
