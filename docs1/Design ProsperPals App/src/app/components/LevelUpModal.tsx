import { motion, AnimatePresence } from "motion/react";
import { Trophy, Sparkles, Star } from "lucide-react";
import { useNotifications } from "../contexts/NotificationContext";

export function LevelUpModal() {
  const { activeLevelUp, dismissLevelUp } = useNotifications();

  return (
    <AnimatePresence>
      {activeLevelUp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={dismissLevelUp}
        >
          {/* Overlay with radial gradient */}
          <div 
            className="absolute inset-0 bg-[#0f0f1a]/95"
            style={{
              background: "radial-gradient(circle at center, rgba(255, 215, 0, 0.15) 0%, rgba(15, 15, 26, 0.95) 60%)"
            }}
          />

          {/* Falling Coins Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  rotate: Math.random() * 360,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  y: window.innerHeight + 50,
                  rotate: Math.random() * 720,
                }}
                transition={{ 
                  duration: Math.random() * 2 + 2,
                  delay: Math.random() * 0.5,
                  ease: "easeIn"
                }}
                className="absolute text-3xl"
              >
                🪙
              </motion.div>
            ))}
          </div>

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="relative bg-[#1a1a2e] border border-yellow-500/30 rounded-2xl shadow-[0_0_60px_rgba(255,215,0,0.4)] max-w-lg w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-600/5 pointer-events-none" />

            {/* Trophy Icon with Glow */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
              className="relative mx-auto w-24 h-24 mb-6"
            >
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl" />
              <Trophy className="w-24 h-24 text-yellow-400 relative z-10" />
              
              {/* Rotating Sparkles */}
              {[0, 120, 240].map((rotation, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <Sparkles className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 text-yellow-400" />
                </motion.div>
              ))}
            </motion.div>

            {/* Level Number */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-6"
            >
              <motion.h1
                animate={{ 
                  scale: [1, 1.05, 1],
                  textShadow: [
                    "0 0 20px rgba(255, 215, 0, 0.5)",
                    "0 0 40px rgba(255, 215, 0, 0.8)",
                    "0 0 20px rgba(255, 215, 0, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl font-bold mb-2"
                style={{
                  background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 4px 8px rgba(255, 215, 0, 0.3))"
                }}
              >
                LEVEL {activeLevelUp.newLevel}!
              </motion.h1>
              <p className="text-xl text-white/80">Congratulations!</p>
            </motion.div>

            {/* Rewards List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-bold text-white">Rewards Unlocked</h3>
              </div>
              
              <div className="space-y-3">
                {activeLevelUp.rewards.map((reward, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span className="text-white/90">{reward}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* XP Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between text-sm text-white/60 mb-2">
                <span>Progress to Level {activeLevelUp.newLevel + 1}</span>
                <span>0/300 XP</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full rounded-full"
                />
              </div>
            </motion.div>

            {/* Goldie Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-4 mb-6"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">🪙</span>
                <div className="flex-1">
                  <h4 className="font-bold text-yellow-400 mb-1">Goldie says:</h4>
                  <p className="text-white/90 text-sm">{activeLevelUp.message}</p>
                </div>
              </div>
            </motion.div>

            {/* Continue Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={dismissLevelUp}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-[#1a1a2e] font-bold py-4 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(255,215,0,0.4)]"
            >
              Continue Your Journey
            </motion.button>

            {/* Ambient Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -100],
                    x: Math.sin(i) * 50,
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  className="absolute bottom-0 w-1 h-1 bg-yellow-400 rounded-full"
                  style={{
                    left: `${(i / 12) * 100}%`,
                    boxShadow: "0 0 8px rgba(255, 215, 0, 0.8)"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
