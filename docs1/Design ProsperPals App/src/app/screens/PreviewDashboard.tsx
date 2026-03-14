import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";

export function PreviewDashboard() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Sample spending data as bubbles
  const spendingBubbles = [
    { category: "Groceries", amount: 245, emoji: "🛒", color: "#A8D5BA", size: 120 },
    { category: "Coffee", amount: 67, emoji: "☕", color: "#F4A259", size: 85 },
    { category: "Transport", amount: 89, emoji: "🚇", color: "#89B5D9", size: 95 },
    { category: "Eating Out", amount: 134, emoji: "🍽️", color: "#E8B4A8", size: 105 },
    { category: "Entertainment", amount: 45, emoji: "🎬", color: "#D4A5D4", size: 75 },
    { category: "Shopping", amount: 178, emoji: "👕", color: "#F7D08A", size: 110 },
  ];

  // Trend data for this week
  const trendData = [
    { day: "Mon", amount: 45 },
    { day: "Tue", amount: 52 },
    { day: "Wed", amount: 38 },
    { day: "Thu", amount: 61 },
    { day: "Fri", amount: 55 },
    { day: "Sat", amount: 72 },
    { day: "Sun", amount: 48 },
  ];

  const totalSpent = spendingBubbles.reduce((sum, bubble) => sum + bubble.amount, 0);
  const savingsRate = 32; // Demo data

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3F0] via-[#F8F6F3] to-[#FAF8F5] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-10 w-40 h-40 bg-[#C9B382] rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-60 h-60 bg-[#A8D5BA] rounded-full blur-3xl" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 px-6 pt-8 pb-32">
        
        {/* Header with Goldie */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between mb-8"
        >
          {/* Goldie Character */}
          <motion.div
            animate={{
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="relative"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E5C68D] via-[#D4AF37] to-[#C9B382] shadow-[0_4px_20px_rgba(212,175,55,0.3)] flex items-center justify-center border-3 border-[#F0E5D0]">
              {/* Face */}
              <div className="relative">
                {/* Eyes */}
                <div className="absolute top-0 left-0 right-0 flex justify-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#3D3D3D] rounded-full" />
                  <div className="w-1.5 h-1.5 bg-[#3D3D3D] rounded-full" />
                </div>
                {/* Smile */}
                <div className="mt-3 w-5 h-2.5 border-b-2 border-[#3D3D3D] rounded-b-full" />
              </div>
              
              {/* Thumbs up emoji */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -right-1 -top-1 text-xl"
              >
                👍
              </motion.div>
            </div>
          </motion.div>

          {/* Date & Streak */}
          <div className="text-right">
            <div className="text-sm text-[#7C7870] mb-1">This Week</div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFA500]/20 to-[#FF6B35]/20 backdrop-blur-sm border border-[#FFA500]/30 rounded-full px-3 py-1.5"
            >
              <span className="text-lg">🔥</span>
              <span className="font-semibold text-[#3D3D3D]">12 days</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Goldie's Message */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-5 mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#E5C68D] to-[#D4AF37] flex items-center justify-center">
              <span className="text-lg">🪙</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[#3D3D3D] mb-1">Goldie</div>
              <p className="text-[#5C5850] text-[15px] leading-relaxed">
                You're doing great! Your savings are up 12% this week, and you're spending mindfully. Keep it up! 🌟
              </p>
            </div>
          </div>
        </motion.div>

        {/* Spending Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-6 mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm text-[#7C7870] mb-1">Total Spent</div>
              <div className="text-3xl font-bold text-[#3D3D3D]">€{totalSpent}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#7C7870] mb-1">Saved</div>
              <div className="text-2xl font-bold text-[#A8D5BA]">{savingsRate}%</div>
            </div>
          </div>

          {/* Spending Bubbles */}
          <div className="relative h-64 mb-6">
            {spendingBubbles.map((bubble, index) => {
              // Calculate bubble positions (organic layout)
              const positions = [
                { x: 15, y: 20 },
                { x: 140, y: 35 },
                { x: 250, y: 25 },
                { x: 60, y: 130 },
                { x: 190, y: 145 },
                { x: 100, y: 240 },
              ];

              return (
                <motion.div
                  key={bubble.category}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: 0.6 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  className="absolute"
                  style={{
                    left: `${positions[index].x}px`,
                    top: `${positions[index].y}px`,
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3 + index * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-full h-full rounded-full flex flex-col items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: bubble.color,
                      opacity: 0.9,
                    }}
                  >
                    <div className="text-2xl mb-1">{bubble.emoji}</div>
                    <div className="text-xs font-medium text-[#3D3D3D] text-center px-2">
                      {bubble.category}
                    </div>
                    <div className="text-sm font-bold text-[#3D3D3D]">
                      €{bubble.amount}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Category Legend */}
          <div className="flex flex-wrap gap-2 justify-center">
            {spendingBubbles.slice(0, 3).map((bubble, index) => (
              <motion.div
                key={bubble.category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/40 backdrop-blur-sm rounded-full"
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: bubble.color }}
                />
                <span className="text-xs text-[#5C5850]">{bubble.category}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-[#3D3D3D]">Daily Spending</h3>
            <div className="flex items-center gap-2 text-[#A8D5BA]">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Improving</span>
            </div>
          </div>

          {/* Simple line chart */}
          <div className="relative h-32">
            <svg className="w-full h-full" viewBox="0 0 350 120" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="30" x2="350" y2="30" stroke="#E5E3E0" strokeWidth="1" opacity="0.3" />
              <line x1="0" y1="60" x2="350" y2="60" stroke="#E5E3E0" strokeWidth="1" opacity="0.3" />
              <line x1="0" y1="90" x2="350" y2="90" stroke="#E5E3E0" strokeWidth="1" opacity="0.3" />

              {/* Area fill */}
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 1, duration: 0.8 }}
                d={`
                  M 0 ${120 - trendData[0].amount}
                  ${trendData.map((point, i) => `L ${(i * 350) / 6} ${120 - point.amount}`).join(' ')}
                  L 350 120
                  L 0 120
                  Z
                `}
                fill="url(#trendGradient)"
              />

              {/* Line */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                d={`
                  M 0 ${120 - trendData[0].amount}
                  ${trendData.map((point, i) => `L ${(i * 350) / 6} ${120 - point.amount}`).join(' ')}
                `}
                stroke="#A8D5BA"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Dots */}
              {trendData.map((point, i) => (
                <motion.circle
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.3 + i * 0.1, type: "spring" }}
                  cx={(i * 350) / 6}
                  cy={120 - point.amount}
                  r="4"
                  fill="#A8D5BA"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}

              <defs>
                <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#A8D5BA" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#A8D5BA" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Day labels */}
            <div className="flex justify-between mt-2">
              {trendData.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 + i * 0.05 }}
                  className="text-xs text-[#7C7870]"
                >
                  {point.day}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Frosted Glass Overlay (Demo indicator) */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30 backdrop-blur-[2px] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Floating CTA */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, type: "spring", stiffness: 100 }}
        className="fixed bottom-8 left-6 right-6 z-50"
      >
        <button
          onClick={() => navigate("/auth")}
          className="group w-full bg-gradient-to-r from-[#D4AF37] via-[#E5C68D] to-[#C9B382] hover:shadow-[0_12px_40px_rgba(212,175,55,0.4)] transition-all duration-300 rounded-[20px] p-5 shadow-[0_8px_32px_rgba(212,175,55,0.3)]"
        >
          <div className="flex items-center justify-between">
            <div className="text-left flex-1">
              <div className="text-white font-bold text-lg mb-1">
                See YOUR Numbers
              </div>
              <div className="text-white/90 text-sm">
                Connect your bank securely
              </div>
            </div>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <ArrowRight className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </button>

        {/* Trust indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="text-center mt-3"
        >
          <div className="text-xs text-[#7C7870]">
            🔒 Bank-level encryption • No sign-up required to explore
          </div>
        </motion.div>
      </motion.div>

      {/* Demo Data Badge (Top) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="bg-white/80 backdrop-blur-md border border-white rounded-full px-4 py-1.5 shadow-lg">
          <div className="text-xs font-medium text-[#7C7870]">
            ✨ Demo Preview
          </div>
        </div>
      </motion.div>

      {/* Custom font loading */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}
