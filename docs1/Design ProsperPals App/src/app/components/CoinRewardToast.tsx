import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import { useNotifications } from "../contexts/NotificationContext";

export function CoinRewardToast() {
  const { activeCoinReward, dismissCoinReward } = useNotifications();

  return (
    <AnimatePresence>
      {activeCoinReward && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-6 right-6 z-50"
        >
          <div className="bg-[#1a1a2e]/90 backdrop-blur-lg border border-yellow-500/40 shadow-[0_0_30px_rgba(255,215,0,0.3)] rounded-xl p-4 min-w-[320px]">
            <div className="flex items-start gap-3">
              {/* Animated Coin Icon */}
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }
                  }}
                  className="text-3xl"
                >
                  🪙
                </motion.div>
                
                {/* Sparkle Effects */}
                <motion.div
                  animate={{ 
                    scale: [0, 1.5, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-yellow-400 mb-1"
                >
                  +{activeCoinReward.amount} ProsperCoins
                </motion.div>
                
                <div className="text-sm text-white/90 mb-3">
                  {activeCoinReward.reason}
                </div>

                {/* Progress Bar */}
                {activeCoinReward.currentXP !== undefined && activeCoinReward.xpToNextLevel && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>{activeCoinReward.currentXP}/{activeCoinReward.xpToNextLevel} to next level</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${(activeCoinReward.currentXP / activeCoinReward.xpToNextLevel) * 100}%` 
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full rounded-full relative"
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>

              {/* Dismiss Button */}
              <button
                onClick={dismissCoinReward}
                className="text-white/40 hover:text-white/80 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Gold Particle Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * 100 - 50,
                    y: 0,
                    opacity: 1,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  animate={{ 
                    y: -100,
                    opacity: 0,
                    rotate: Math.random() * 360
                  }}
                  transition={{ 
                    duration: 2 + Math.random(),
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
                  style={{
                    boxShadow: "0 0 10px rgba(255, 215, 0, 0.8)"
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
