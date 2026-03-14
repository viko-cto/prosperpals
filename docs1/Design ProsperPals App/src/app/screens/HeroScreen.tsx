import { motion } from "motion/react";
import { 
  TrendingUp, 
  Flame, 
  Target, 
  Sparkles,
  Coffee,
  Home as HomeIcon,
  CreditCard,
  PiggyBank,
  Award,
  Calendar,
  ArrowUpRight
} from "lucide-react";

export function HeroScreen() {
  const savingsProgress = 73;
  const streakDays = 12;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] via-[#FFF5EB] to-[#F0F8FB] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#FFD93D]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#98D8C8]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFB27D]/5 rounded-full blur-3xl" />

      <div className="relative z-10 px-6 pt-8 pb-12">
        {/* ProsperPals Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md rounded-[24px] px-6 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-white/80">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl"
              >
                🪙
              </motion.div>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#FFD93D] via-[#FFA726] to-[#4A90E2] bg-clip-text text-transparent">
                ProsperPals
              </div>
            </div>
          </div>
          <p className="text-xs text-[#8B7355] mt-2 font-medium">
            Your AI companions for financial wellness
          </p>
        </motion.div>

        {/* Companion Toggle - Both Visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          {/* Goldie */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-gradient-to-br from-[#FFD93D] to-[#FFC93D] rounded-[20px] px-5 py-3 shadow-[0_6px_24px_rgba(255,217,61,0.3)]"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-10 h-10 rounded-full bg-white border-2 border-[#FFED4E] flex items-center justify-center shadow-md"
            >
              <span className="text-xl">🪙</span>
            </motion.div>
            <div>
              <div className="text-[#2C2C2C] font-bold text-sm">Goldie</div>
              <div className="text-[#8B6914] text-xs">Daily Budget</div>
            </div>
          </motion.div>

          {/* Fin */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-gradient-to-br from-[#4A90E2] to-[#357ABD] rounded-[20px] px-5 py-3 shadow-[0_6px_24px_rgba(74,144,226,0.3)]"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-10 h-10 rounded-[12px] bg-white border-2 border-[#5BA3F5] flex items-center justify-center shadow-md"
            >
              <span className="text-xl">📊</span>
            </motion.div>
            <div>
              <div className="text-white font-bold text-sm">Fin</div>
              <div className="text-[#B8D9F7] text-xs">Investing</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Goldie's Celebration Insight Card - HERO MOMENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#FFD93D] via-[#FFC93D] to-[#FFB27D] rounded-[28px] p-6 mb-6 shadow-[0_12px_48px_rgba(255,217,61,0.4)] border-2 border-[#FFED4E]"
        >
          {/* Decorative sparkles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-4 right-4 text-2xl opacity-30"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-4 left-4 text-xl opacity-20"
          >
            🎉
          </motion.div>

          <div className="relative flex items-start gap-3">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-14 h-14 rounded-full bg-white border-3 border-[#FFED4E] flex items-center justify-center shadow-xl flex-shrink-0"
            >
              <span className="text-3xl">🪙</span>
            </motion.div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#8B6914]" />
                <div className="text-xs font-bold text-[#8B6914] uppercase tracking-wide">
                  This Month's Win
                </div>
              </div>
              <h3 className="text-[#2C2C2C] font-bold text-xl leading-tight mb-2">
                You saved 1,200 kr more than last month! 🎉
              </h3>
              <p className="text-[#4B3D2E] text-sm">
                You're building amazing momentum. Keep it up!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Savings Goal with Progress Ring - Visual Centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-[28px] p-6 mb-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/80"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-[#4A90E2]" />
              <h3 className="text-[#2C2C2C] font-bold">Emergency Fund</h3>
            </div>
            <div className="text-xs text-[#6B7280] bg-[#F3F4F6] px-3 py-1 rounded-full font-semibold">
              Due Dec 2026
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Progress Ring */}
            <div className="relative">
              <svg width="140" height="140" viewBox="0 0 140 140" className="transform -rotate-90">
                {/* Background ring */}
                <circle
                  cx="70"
                  cy="70"
                  r="58"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Progress ring with gradient */}
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A90E2" />
                    <stop offset="50%" stopColor="#98D8C8" />
                    <stop offset="100%" stopColor="#FFD93D" />
                  </linearGradient>
                </defs>
                <motion.circle
                  cx="70"
                  cy="70"
                  r="58"
                  stroke="url(#progressGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 365" }}
                  animate={{ strokeDasharray: `${(savingsProgress / 100) * 365} 365` }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                />
              </svg>
              {/* Center percentage */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="text-4xl font-bold bg-gradient-to-br from-[#4A90E2] to-[#98D8C8] bg-clip-text text-transparent"
                >
                  {savingsProgress}%
                </motion.div>
                <div className="text-xs text-[#9CA3AF] font-medium">Complete</div>
              </div>
            </div>

            {/* Goal details */}
            <div className="flex-1">
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-[#6B7280] mb-1">Current</div>
                  <div className="text-2xl font-bold text-[#2C2C2C]">36,500 kr</div>
                </div>
                <div className="h-px bg-[#E5E7EB]" />
                <div>
                  <div className="text-sm text-[#6B7280] mb-1">Goal</div>
                  <div className="text-lg font-bold text-[#4A90E2]">50,000 kr</div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="text-[#10B981] font-semibold">13,500 kr to go</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-3 mb-5"
        >
          {/* This Week's Spending */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[20px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-white/80">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#FFB27D] to-[#FF9E5E] flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <div className="text-xs text-[#6B7280] font-semibold">This Week</div>
            </div>
            <div className="text-2xl font-bold text-[#2C2C2C] mb-1">2,340 kr</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="w-3 h-3 text-[#10B981]" />
              <span className="text-[#10B981] font-semibold">12% under budget</span>
            </div>
          </div>

          {/* Streak Counter */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[20px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-white/80">
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#FF6B6B] to-[#EE5A52] flex items-center justify-center"
              >
                <Flame className="w-5 h-5 text-white" />
              </motion.div>
              <div className="text-xs text-[#6B7280] font-semibold">Streak</div>
            </div>
            <div className="text-2xl font-bold text-[#2C2C2C] mb-1">{streakDays} days</div>
            <div className="text-xs text-[#6B7280]">
              Longest: 18 days 🔥
            </div>
          </div>
        </motion.div>

        {/* Spending Overview - Clean Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-white/80 mb-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#2C2C2C] font-bold">This Month</h3>
            <Calendar className="w-4 h-4 text-[#9CA3AF]" />
          </div>

          <div className="space-y-3">
            {/* Income */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2C2C2C]">Income</div>
                  <div className="text-xs text-[#9CA3AF]">Salary & bonuses</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#10B981] font-bold">+26,500 kr</div>
              </div>
            </div>

            <div className="h-px bg-[#E5E7EB]" />

            {/* Essential Bills */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#8B9DC3] to-[#7B8DB3] flex items-center justify-center">
                  <HomeIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2C2C2C]">Essential Bills</div>
                  <div className="text-xs text-[#9CA3AF]">Rent, utilities, insurance</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#2C2C2C] font-bold">-12,400 kr</div>
                <div className="text-[#10B981] text-xs font-medium">47%</div>
              </div>
            </div>

            <div className="h-px bg-[#E5E7EB]" />

            {/* Subscriptions */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#FFB27D] to-[#FF9E5E] flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2C2C2C]">Subscriptions</div>
                  <div className="text-xs text-[#9CA3AF]">7 active</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#2C2C2C] font-bold">-2,575 kr</div>
                <div className="text-[#FFA726] text-xs font-medium">3 unused</div>
              </div>
            </div>

            <div className="h-px bg-[#E5E7EB]" />

            {/* Savings */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#98D8C8] to-[#88C8B8] flex items-center justify-center">
                  <PiggyBank className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2C2C2C]">Savings</div>
                  <div className="text-xs text-[#9CA3AF]">Emergency fund</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#4A90E2] font-bold">-4,200 kr</div>
                <div className="text-[#10B981] text-xs font-medium">↑ 40%</div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-4 pt-4 border-t-2 border-[#F3F4F6] flex items-center justify-between">
            <div className="text-sm font-semibold text-[#6B7280]">Remaining</div>
            <div className="text-2xl font-bold text-[#10B981]">7,325 kr</div>
          </div>
        </motion.div>

        {/* Bottom Achievement Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD93D]/20 via-[#98D8C8]/20 to-[#4A90E2]/20 backdrop-blur-md rounded-[20px] px-5 py-3 border border-white/60 shadow-lg">
            <Award className="w-5 h-5 text-[#D97D3A]" />
            <div className="text-sm font-bold bg-gradient-to-r from-[#D97D3A] to-[#4A90E2] bg-clip-text text-transparent">
              Level 7 · Bronze Saver
            </div>
            <div className="text-xs text-[#8B7355]">•</div>
            <div className="flex items-center gap-1">
              <span className="text-xl">🪙</span>
              <span className="text-sm font-bold text-[#2C2C2C]">2,340 coins</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
