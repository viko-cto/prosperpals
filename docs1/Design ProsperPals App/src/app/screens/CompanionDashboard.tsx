import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingDown, 
  TrendingUp, 
  Calendar, 
  PiggyBank, 
  Target, 
  Award,
  Coffee,
  Zap,
  Home as HomeIcon,
  ChevronRight,
  Sparkles,
  BarChart3,
  Wallet
} from "lucide-react";

type CompanionView = "goldie" | "fin";

export function CompanionDashboard() {
  const [activeCompanion, setActiveCompanion] = useState<CompanionView>("goldie");

  const switchCompanion = (companion: CompanionView) => {
    setActiveCompanion(companion);
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] pb-24">
      {/* Header with Companion Selector - Coin Flip Style */}
      <div className="sticky top-0 z-40 bg-[#0f0f1a]/95 backdrop-blur-xl border-b border-white/5">
        <div className="px-6 pt-6 pb-4">
          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-1">
              Good morning, Alex ✨
            </h1>
            <p className="text-[#999] text-sm">
              {activeCompanion === "goldie" 
                ? "Let's check your spending today"
                : "Your investments are looking good"
              }
            </p>
          </div>

          {/* Coin Flip Selector */}
          <div className="relative bg-[#1a1a2e] rounded-[24px] p-1.5 flex gap-1.5">
            {/* Animated background slider */}
            <motion.div
              animate={{
                x: activeCompanion === "goldie" ? 0 : "100%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`absolute top-1.5 left-1.5 right-1.5 h-[calc(100%-12px)] w-[calc(50%-6px)] rounded-[20px] ${
                activeCompanion === "goldie"
                  ? "bg-gradient-to-br from-[#FFD93D] to-[#FFC93D]"
                  : "bg-gradient-to-br from-[#4A90E2] to-[#357ABD]"
              }`}
            />

            {/* Goldie Tab */}
            <button
              onClick={() => switchCompanion("goldie")}
              className="relative flex-1 py-3.5 rounded-[20px] transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-2">
                {/* Goldie Avatar */}
                <motion.div
                  animate={{
                    rotate: activeCompanion === "goldie" ? [0, -10, 10, 0] : 0,
                    scale: activeCompanion === "goldie" ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`w-8 h-8 rounded-full ${
                    activeCompanion === "goldie"
                      ? "bg-white"
                      : "bg-[#FFD93D]"
                  } flex items-center justify-center border-2 ${
                    activeCompanion === "goldie" ? "border-[#FFD93D]" : "border-[#FFD93D]/30"
                  }`}
                >
                  <span className="text-lg">🪙</span>
                </motion.div>
                <span className={`font-bold text-sm ${
                  activeCompanion === "goldie" ? "text-[#2C2C2C]" : "text-[#999]"
                }`}>
                  Goldie
                </span>
              </div>
            </button>

            {/* Fin Tab */}
            <button
              onClick={() => switchCompanion("fin")}
              className="relative flex-1 py-3.5 rounded-[20px] transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-2">
                {/* Fin Avatar */}
                <motion.div
                  animate={{
                    rotate: activeCompanion === "fin" ? [0, -10, 10, 0] : 0,
                    scale: activeCompanion === "fin" ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`w-8 h-8 rounded-full ${
                    activeCompanion === "fin"
                      ? "bg-white"
                      : "bg-[#4A90E2]"
                  } flex items-center justify-center border-2 ${
                    activeCompanion === "fin" ? "border-[#4A90E2]" : "border-[#4A90E2]/30"
                  }`}
                >
                  <span className="text-lg">📊</span>
                </motion.div>
                <span className={`font-bold text-sm ${
                  activeCompanion === "fin" ? "text-[#2C2C2C]" : "text-[#999]"
                }`}>
                  Fin
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area with Flip Animation */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeCompanion === "goldie" ? (
            <motion.div
              key="goldie"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <GoldieView />
            </motion.div>
          ) : (
            <motion.div
              key="fin"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <FinView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Goldie's View - Warm, Daily Budgeting Focus
function GoldieView() {
  return (
    <div className="px-6 pt-6 space-y-4">
      {/* Goldie's Insight Card - Featured */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-[#FFD93D] via-[#FFC93D] to-[#FFB93D] rounded-[28px] p-6 shadow-[0_12px_48px_rgba(255,217,61,0.3)]"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        
        <div className="relative">
          {/* Goldie avatar */}
          <div className="flex items-start gap-3 mb-4">
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-12 h-12 rounded-full bg-white border-3 border-[#FFED4E] flex items-center justify-center shadow-lg"
            >
              <span className="text-2xl">🪙</span>
            </motion.div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-[#8B6914] mb-1">GOLDIE'S INSIGHT</div>
              <h3 className="text-[#2C2C2C] font-bold text-lg leading-snug">
                You're 340 kr under budget this week 🎉
              </h3>
            </div>
          </div>

          <p className="text-[#3D3D3D] mb-4 leading-relaxed">
            Want me to move it to savings?
          </p>

          <div className="flex gap-2">
            <button className="flex-1 bg-[#2C2C2C] hover:bg-[#1C1C1C] text-white rounded-[16px] py-3 px-4 font-bold text-sm transition-colors">
              Yes, save it! 💰
            </button>
            <button className="px-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-[#2C2C2C] rounded-[16px] py-3 font-bold text-sm transition-colors">
              Not now
            </button>
          </div>
        </div>
      </motion.div>

      {/* Budget Status - Soft Rounded Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#1a1a2e]/60 backdrop-blur-xl border border-white/5 rounded-[24px] p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#FFD93D] to-[#FFC93D] flex items-center justify-center">
              <Wallet className="w-5 h-5 text-[#2C2C2C]" />
            </div>
            <div>
              <div className="text-xs text-[#999]">This Week's Budget</div>
              <div className="text-white font-bold">2,160 kr left</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#666]" />
        </div>

        {/* Progress bar */}
        <div className="relative h-3 bg-[#0f0f1a] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "68%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FFD93D] to-[#FFC93D] rounded-full"
          />
        </div>

        <div className="flex items-center justify-between mt-2 text-xs">
          <span className="text-[#FFD93D] font-semibold">68% remaining</span>
          <span className="text-[#666]">of 3,500 kr</span>
        </div>
      </motion.div>

      {/* Today's Spending - Warm Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#1a1a2e]/60 backdrop-blur-xl border border-white/5 rounded-[24px] p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold">Today's Spending</h3>
          <TrendingDown className="w-5 h-5 text-[#A8D5BA]" />
        </div>

        <div className="space-y-3">
          {/* Transaction 1 */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#FFB8A5] to-[#FF9B7A] flex items-center justify-center">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-semibold">Coffee & Pastry</div>
              <div className="text-[#999] text-xs">Espresso House • 8:24 AM</div>
            </div>
            <div className="text-white font-bold">-67 kr</div>
          </div>

          {/* Transaction 2 */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#98D8C8] to-[#88C8B8] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-semibold">City Transport</div>
              <div className="text-[#999] text-xs">SL Monthly Pass • 7:15 AM</div>
            </div>
            <div className="text-white font-bold">-970 kr</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-[#999] text-sm">Total today</span>
          <span className="text-white font-bold text-lg">1,037 kr</span>
        </div>
      </motion.div>

      {/* Upcoming Bills - Warm Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#1a1a2e]/60 backdrop-blur-xl border border-white/5 rounded-[24px] p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#FFD93D]" />
            <h3 className="text-white font-bold">Upcoming Bills</h3>
          </div>
          <span className="text-[#FFD93D] text-xs font-semibold">3 this week</span>
        </div>

        <div className="space-y-3">
          {/* Bill 1 */}
          <div className="bg-[#0f0f1a]/50 rounded-[16px] p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#FFB93D]" />
              <div>
                <div className="text-white text-sm font-semibold">Spotify</div>
                <div className="text-[#999] text-xs">Due in 2 days</div>
              </div>
            </div>
            <div className="text-white font-bold">119 kr</div>
          </div>

          {/* Bill 2 */}
          <div className="bg-[#0f0f1a]/50 rounded-[16px] p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#FFB93D]" />
              <div>
                <div className="text-white text-sm font-semibold">Internet</div>
                <div className="text-[#999] text-xs">Due in 5 days</div>
              </div>
            </div>
            <div className="text-white font-bold">299 kr</div>
          </div>

          {/* Bill 3 */}
          <div className="bg-[#0f0f1a]/50 rounded-[16px] p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#FFD93D]" />
              <div>
                <div className="text-white text-sm font-semibold">Rent</div>
                <div className="text-[#999] text-xs">Due in 6 days</div>
              </div>
            </div>
            <div className="text-white font-bold">8,500 kr</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions - Warm */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 gap-3"
      >
        <button className="bg-gradient-to-br from-[#FFD93D]/20 to-[#FFC93D]/10 border border-[#FFD93D]/20 backdrop-blur-xl rounded-[20px] p-4 text-left hover:border-[#FFD93D]/40 transition-all">
          <PiggyBank className="w-6 h-6 text-[#FFD93D] mb-2" />
          <div className="text-white text-sm font-bold mb-1">Save More</div>
          <div className="text-[#999] text-xs">Set savings goal</div>
        </button>

        <button className="bg-gradient-to-br from-[#FFB8A5]/20 to-[#FF9B7A]/10 border border-[#FFB8A5]/20 backdrop-blur-xl rounded-[20px] p-4 text-left hover:border-[#FFB8A5]/40 transition-all">
          <Award className="w-6 h-6 text-[#FFB8A5] mb-2" />
          <div className="text-white text-sm font-bold mb-1">Challenges</div>
          <div className="text-[#999] text-xs">Earn rewards</div>
        </button>
      </motion.div>
    </div>
  );
}

// Fin's View - Cool, Investment Focus
function FinView() {
  return (
    <div className="px-6 pt-6 space-y-4">
      {/* Fin's Insight Card - Featured */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-[#4A90E2] via-[#357ABD] to-[#2B6BA8] rounded-[24px] p-6 shadow-[0_12px_48px_rgba(74,144,226,0.3)]"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        
        <div className="relative">
          {/* Fin avatar */}
          <div className="flex items-start gap-3 mb-4">
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-12 h-12 rounded-2xl bg-white border-3 border-[#5BA3F5] flex items-center justify-center shadow-lg"
            >
              <span className="text-2xl">📊</span>
            </motion.div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-[#1C3D5C] mb-1">FIN'S ANALYSIS</div>
              <h3 className="text-white font-bold text-lg leading-snug">
                Your portfolio is up 12.4% this month
              </h3>
            </div>
          </div>

          <p className="text-white/90 mb-4 leading-relaxed">
            Strong performance! Consider rebalancing to maintain your target allocation.
          </p>

          <div className="flex gap-2">
            <button className="flex-1 bg-white hover:bg-white/90 text-[#2B6BA8] rounded-[14px] py-3 px-4 font-bold text-sm transition-colors">
              View Details 📈
            </button>
            <button className="px-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-[14px] py-3 font-bold text-sm transition-colors">
              Later
            </button>
          </div>
        </div>
      </motion.div>

      {/* Net Worth - Cool Angular Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#1a1a2e]/60 backdrop-blur-xl border border-white/5 rounded-[20px] p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#4A90E2] to-[#357ABD] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs text-[#999]">Net Worth</div>
              <div className="text-white font-bold">127,450 kr</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[#A8D5BA] text-sm font-bold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +12.4%
            </div>
            <div className="text-[#666] text-xs">This month</div>
          </div>
        </div>

        {/* Mini chart representation */}
        <div className="flex items-end gap-1 h-16">
          {[30, 35, 32, 40, 45, 43, 48, 52, 55, 60, 58, 65].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              className="flex-1 bg-gradient-to-t from-[#4A90E2] to-[#5BA3F5] rounded-t-sm"
            />
          ))}
        </div>
      </motion.div>

      {/* Portfolio Breakdown - Cool Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#1a1a2e]/60 backdrop-blur-xl border border-white/5 rounded-[20px] p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold">Investment Portfolio</h3>
          <BarChart3 className="w-5 h-5 text-[#4A90E2]" />
        </div>

        <div className="space-y-3">
          {/* Investment 1 */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-[#4A90E2] to-[#357ABD] flex items-center justify-center">
              <span className="text-white text-xs font-bold">ETF</span>
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-semibold">Global Index Fund</div>
              <div className="text-[#999] text-xs">45% of portfolio</div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-sm">57,300 kr</div>
              <div className="text-[#A8D5BA] text-xs">+8.2%</div>
            </div>
          </div>

          {/* Investment 2 */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-[#98D8C8] to-[#88C8B8] flex items-center justify-center">
              <span className="text-white text-xs font-bold">BOND</span>
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-semibold">Fixed Income</div>
              <div className="text-[#999] text-xs">30% of portfolio</div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-sm">38,200 kr</div>
              <div className="text-[#A8D5BA] text-xs">+3.1%</div>
            </div>
          </div>

          {/* Investment 3 */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-[#D4A5D4] to-[#C495C4] flex items-center justify-center">
              <span className="text-white text-xs font-bold">TECH</span>
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-semibold">Tech Stocks</div>
              <div className="text-[#999] text-xs">25% of portfolio</div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-sm">31,950 kr</div>
              <div className="text-[#A8D5BA] text-xs">+15.7%</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Savings Goals Progress - Cool Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#1a1a2e]/60 backdrop-blur-xl border border-white/5 rounded-[20px] p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[#4A90E2]" />
            <h3 className="text-white font-bold">Savings Goals</h3>
          </div>
          <span className="text-[#4A90E2] text-xs font-semibold">2 active</span>
        </div>

        <div className="space-y-3">
          {/* Goal 1 */}
          <div className="bg-[#0f0f1a]/50 rounded-[14px] p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-white text-sm font-semibold">Emergency Fund</div>
                <div className="text-[#999] text-xs">24,300 of 50,000 kr</div>
              </div>
              <div className="text-[#4A90E2] font-bold text-lg">49%</div>
            </div>
            <div className="relative h-2 bg-[#0f0f1a] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "49%" }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] rounded-full"
              />
            </div>
          </div>

          {/* Goal 2 */}
          <div className="bg-[#0f0f1a]/50 rounded-[14px] p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-white text-sm font-semibold">Summer Vacation</div>
                <div className="text-[#999] text-xs">12,800 of 20,000 kr</div>
              </div>
              <div className="text-[#4A90E2] font-bold text-lg">64%</div>
            </div>
            <div className="relative h-2 bg-[#0f0f1a] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "64%" }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] rounded-full"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions - Cool */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 gap-3"
      >
        <button className="bg-gradient-to-br from-[#4A90E2]/20 to-[#357ABD]/10 border border-[#4A90E2]/20 backdrop-blur-xl rounded-[18px] p-4 text-left hover:border-[#4A90E2]/40 transition-all">
          <Sparkles className="w-6 h-6 text-[#4A90E2] mb-2" />
          <div className="text-white text-sm font-bold mb-1">Learn</div>
          <div className="text-[#999] text-xs">Investment basics</div>
        </button>

        <button className="bg-gradient-to-br from-[#98D8C8]/20 to-[#88C8B8]/10 border border-[#98D8C8]/20 backdrop-blur-xl rounded-[18px] p-4 text-left hover:border-[#98D8C8]/40 transition-all">
          <Target className="w-6 h-6 text-[#98D8C8] mb-2" />
          <div className="text-white text-sm font-bold mb-1">New Goal</div>
          <div className="text-[#999] text-xs">Start saving</div>
        </button>
      </motion.div>
    </div>
  );
}
