import { motion } from "motion/react";
import { Search, Plus, TrendingUp, Heart, Plane, ShoppingBag, GraduationCap, ArrowRight } from "lucide-react";

// EMPTY TRANSACTIONS STATE
export function EmptyTransactions() {
  return (
    <div className="flex items-center justify-center min-h-[500px] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Goldie Character with Magnifying Glass */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [-5, 5, -5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <div className="relative inline-block">
            {/* Goldie Circle */}
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-6xl shadow-[0_0_40px_rgba(255,215,0,0.3)]">
              🪙
            </div>
            
            {/* Magnifying Glass */}
            <motion.div
              animate={{
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -right-4 bottom-0"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-yellow-400" />
              </div>
            </motion.div>

            {/* Sparkles */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-2 -left-2 text-2xl"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                delay: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 -right-6 text-xl"
            >
              ✨
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content */}
        <h3 className="text-3xl font-bold text-white mb-3">
          No transactions yet!
        </h3>
        <p className="text-lg text-white/60 mb-8">
          Connect a bank or add your first transaction to start tracking your money
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-8">
          <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Connect Bank
          </button>
          <button className="px-6 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl text-white font-semibold transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Manually
          </button>
        </div>

        {/* Dotted Lines Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              className="h-12 border-2 border-dashed border-white/10 rounded-lg relative overflow-hidden"
            >
              <motion.div
                animate={{
                  x: ["-100%", "200%"]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent"
              />
              <div className="absolute inset-0 flex items-center px-4 text-white/20 text-sm">
                Your transactions will appear here...
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

// EMPTY GOALS STATE
export function EmptyGoals() {
  const goalSuggestions = [
    {
      icon: "🛡️",
      title: "Emergency Fund",
      description: "Save 3-6 months of expenses",
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-500/30",
      hoverBorder: "hover:border-blue-500/50"
    },
    {
      icon: "✈️",
      title: "Vacation",
      description: "Plan your dream getaway",
      color: "from-purple-500/20 to-purple-600/10",
      borderColor: "border-purple-500/30",
      hoverBorder: "hover:border-purple-500/50"
    },
    {
      icon: "🛍️",
      title: "New Purchase",
      description: "Save for something special",
      color: "from-green-500/20 to-green-600/10",
      borderColor: "border-green-500/30",
      hoverBorder: "hover:border-green-500/50"
    }
  ];

  return (
    <div className="flex items-center justify-center min-h-[500px] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl"
      >
        {/* Goldie and Fin High-Fiving */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-6">
            {/* Goldie */}
            <motion.div
              animate={{
                y: [0, -8, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-5xl shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                  🪙
                </div>
                <motion.div
                  animate={{
                    rotate: [0, 20, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -right-2 top-4 text-3xl"
                >
                  👋
                </motion.div>
              </div>
            </motion.div>

            {/* High Five Effect */}
            <motion.div
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="text-4xl"
            >
              ✨
            </motion.div>

            {/* Fin */}
            <motion.div
              animate={{
                y: [0, -8, 0]
              }}
              transition={{
                duration: 2,
                delay: 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center text-5xl shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  🐋
                </div>
                <motion.div
                  animate={{
                    rotate: [0, -20, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -left-2 top-4 text-3xl"
                >
                  👋
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content */}
        <h3 className="text-3xl font-bold text-white mb-3">
          Ready to set your first goal?
        </h3>
        <p className="text-lg text-white/60 mb-8">
          Choose a goal type below or create your own custom goal
        </p>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {goalSuggestions.map((goal, index) => (
            <motion.button
              key={goal.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${goal.color} backdrop-blur-xl border ${goal.borderColor} ${goal.hoverBorder} rounded-2xl p-6 transition-all cursor-pointer text-left group`}
            >
              <div className="text-5xl mb-4">{goal.icon}</div>
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                {goal.title}
              </h4>
              <p className="text-sm text-white/60">
                {goal.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-white/40 group-hover:text-yellow-400 transition-colors">
                Get started
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Custom Goal Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all flex items-center gap-2 mx-auto"
        >
          <Plus className="w-5 h-5" />
          Create Custom Goal
        </motion.button>

        {/* Encouraging Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">🪙</div>
            <p className="text-sm text-white/70 italic text-left">
              "Goals give your money purpose! Start with something small and achievable — you've got this!" 
              <span className="text-yellow-400 font-semibold"> — Goldie</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// EMPTY PORTFOLIO STATE
export function EmptyPortfolio() {
  return (
    <div className="flex items-center justify-center min-h-[500px] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        {/* Fin as Teacher with Chalkboard */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            {/* Chalkboard Background */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-4 border-yellow-700 shadow-2xl">
              {/* Chalkboard Content */}
              <div className="space-y-4">
                {/* Title on chalkboard */}
                <div className="text-green-400 font-handwriting text-2xl mb-4 border-b-2 border-white/20 pb-2">
                  Investing 101
                </div>
                
                {/* Bullet points */}
                <div className="text-left space-y-2 text-white/80">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span className="text-sm">Buy low, sell high</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span className="text-sm">Diversify your portfolio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span className="text-sm">Think long-term</span>
                  </div>
                </div>

                {/* Simple chart sketch */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <svg width="200" height="60" className="mx-auto">
                    <motion.polyline
                      points="10,50 50,30 90,35 130,15 170,20 190,10"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                  </svg>
                </div>
              </div>

              {/* Fin Character */}
              <motion.div
                animate={{
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -right-16 top-1/2 -translate-y-1/2"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center text-5xl shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                  🐋
                </div>
                {/* Glasses */}
                <motion.div
                  animate={{
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-4 right-2 text-3xl"
                >
                  👓
                </motion.div>
                {/* Pointer stick */}
                <motion.div
                  animate={{
                    rotate: [-10, 10, -10]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -left-12 bottom-2 w-16 h-1 bg-yellow-600 rounded-full origin-right"
                  style={{ transformOrigin: "right center" }}
                />
              </motion.div>
            </div>

            {/* Floating Sparkles */}
            <motion.div
              animate={{
                y: [-5, 5, -5],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 left-8 text-2xl"
            >
              💡
            </motion.div>
            <motion.div
              animate={{
                y: [5, -5, 5],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                delay: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-4 right-12 text-2xl"
            >
              📈
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white mb-3">
            Your investing journey starts here
          </h3>
          <p className="text-lg text-white/60 mb-2">
            Start with <span className="text-yellow-400 font-bold">€100 play money</span> to learn the basics
          </p>
          <p className="text-sm text-white/40 mb-8">
            No real money involved — just pure learning
          </p>

          {/* Features List */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-2xl mb-2">🎮</div>
              <div className="text-sm font-semibold text-white mb-1">Risk-Free</div>
              <div className="text-xs text-white/60">Practice with virtual money</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-2xl mb-2">📚</div>
              <div className="text-sm font-semibold text-white mb-1">Learn by Doing</div>
              <div className="text-xs text-white/60">Real market data</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-sm font-semibold text-white mb-1">Earn Rewards</div>
              <div className="text-xs text-white/60">Get ProsperCoins</div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all flex items-center gap-3 mx-auto group">
            <GraduationCap className="w-6 h-6" />
            Begin Tutorial
            <motion.div
              animate={{
                x: [0, 5, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </button>

          {/* Fin's Encouragement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">🐋</div>
              <p className="text-sm text-white/70 italic text-left">
                "The best time to start investing was yesterday. The second best time is now. Let me show you how!" 
                <span className="text-blue-400 font-semibold"> — Fin</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// EMPTY CLANS STATE
export function EmptyClans() {
  return (
    <div className="flex items-center justify-center min-h-[500px] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <div className="text-8xl mb-4">🏰</div>
        </motion.div>

        <h3 className="text-3xl font-bold text-white mb-3">
          No clan yet!
        </h3>
        <p className="text-lg text-white/60 mb-8">
          Join forces with friends to compete in challenges and earn rewards together
        </p>

        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white font-semibold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Clan
          </button>
          <button className="px-6 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl text-white font-semibold transition-all">
            Browse Clans
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// EMPTY LEADERBOARD STATE
export function EmptyLeaderboard() {
  return (
    <div className="flex items-center justify-center min-h-[500px] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <motion.div
          animate={{
            rotate: [0, 10, 0, -10, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <div className="text-8xl mb-4">🏆</div>
        </motion.div>

        <h3 className="text-3xl font-bold text-white mb-3">
          Leaderboard coming soon!
        </h3>
        <p className="text-lg text-white/60 mb-8">
          Complete your first quest to appear on the leaderboard
        </p>

        <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all">
          Start Your First Quest
        </button>
      </motion.div>
    </div>
  );
}
