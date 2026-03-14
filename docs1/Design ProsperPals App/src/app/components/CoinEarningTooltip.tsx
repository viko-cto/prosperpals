import { motion } from "motion/react";

interface CoinEarningAction {
  action: string;
  reward: number;
}

const COIN_ACTIONS: CoinEarningAction[] = [
  { action: "Daily login", reward: 10 },
  { action: "Log a transaction", reward: 25 },
  { action: "Stay under budget (daily)", reward: 15 },
  { action: "Complete a lesson", reward: 50 },
  { action: "7-day streak bonus", reward: 100 },
  { action: "Help a clan member", reward: 30 },
  { action: "Complete a Prosperity Key", reward: 500 },
];

export function CoinEarningTooltip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-2 w-80 bg-[#0f0f1a] border border-yellow-500/30 rounded-xl shadow-[0_0_30px_rgba(255,215,0,0.2)] p-4 z-50"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
        <span className="text-2xl">🪙</span>
        <h3 className="text-lg font-bold text-yellow-400">Earn ProsperCoins</h3>
      </div>

      {/* Actions List */}
      <div className="space-y-2">
        {COIN_ACTIONS.map((item, index) => (
          <motion.div
            key={item.action}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full group-hover:scale-150 transition-transform" />
              <span className="text-sm text-white/80">{item.action}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-yellow-400 font-bold">+{item.reward}</span>
              <span className="text-xs text-white/50">PC</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Tip */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <p className="text-xs text-white/60 text-center">
          💡 Build streaks and complete quests for bonus rewards!
        </p>
      </div>

      {/* Shimmer Effect */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent pointer-events-none"
      />
    </motion.div>
  );
}
