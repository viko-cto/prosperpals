import { motion } from "motion/react";
import { Flame, Trophy, Target, Zap } from "lucide-react";

interface StreakBadgeProps {
  type: "7-day" | "30-day" | "first-goal" | "emergency-ready";
  unlocked?: boolean;
  count?: number;
  onClick?: () => void;
}

export function StreakBadge({ type, unlocked = false, count, onClick }: StreakBadgeProps) {
  const badges = {
    "7-day": {
      icon: Flame,
      label: "Week Warrior",
      color: "from-orange-400 to-orange-600",
      emoji: "🔥",
    },
    "30-day": {
      icon: Zap,
      label: "Monthly Master",
      color: "from-yellow-400 to-yellow-600",
      emoji: "⚡",
    },
    "first-goal": {
      icon: Target,
      label: "First Goal",
      color: "from-green-400 to-green-600",
      emoji: "🎯",
    },
    "emergency-ready": {
      icon: Trophy,
      label: "Emergency Ready",
      color: "from-blue-400 to-blue-600",
      emoji: "🛡️",
    },
  };

  const badge = badges[type];
  const Icon = badge.icon;

  return (
    <motion.button
      onClick={onClick}
      whileHover={unlocked ? { scale: 1.05, y: -2 } : {}}
      whileTap={unlocked ? { scale: 0.95 } : {}}
      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
        unlocked
          ? `bg-gradient-to-br ${badge.color} border-white/20 shadow-lg cursor-pointer`
          : "bg-white/5 border-white/10 opacity-50 cursor-default"
      }`}
    >
      {/* Badge Icon */}
      <div className="relative">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center ${
            unlocked ? "bg-white/20" : "bg-white/5"
          }`}
        >
          {unlocked ? (
            <span className="text-3xl">{badge.emoji}</span>
          ) : (
            <Icon className="w-8 h-8 text-white/40" />
          )}
        </div>

        {/* Pulse animation for unlocked badges */}
        {unlocked && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${badge.color} opacity-30`}
          />
        )}

        {/* Count badge */}
        {count && count > 1 && unlocked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white"
          >
            <span className="text-xs font-bold text-white">{count}</span>
          </motion.div>
        )}
      </div>

      {/* Label */}
      <div className="text-center">
        <div className={`text-sm font-bold ${unlocked ? "text-white" : "text-white/40"}`}>
          {badge.label}
        </div>
      </div>

      {/* Lock overlay */}
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>
      )}
    </motion.button>
  );
}

// Badge row component for displaying multiple badges
export function StreakBadgeRow() {
  return (
    <div className="grid grid-cols-4 gap-3">
      <StreakBadge type="7-day" unlocked count={12} />
      <StreakBadge type="30-day" unlocked count={3} />
      <StreakBadge type="first-goal" unlocked />
      <StreakBadge type="emergency-ready" />
    </div>
  );
}
