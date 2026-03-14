import { useState, useEffect } from "react";
import { motion, useAnimation } from "motion/react";
import { Plane, Calendar, TrendingUp, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

export function SubscriptionRealityCheck() {
  const navigate = useNavigate();
  const [showReframing, setShowReframing] = useState(false);
  const [showGoldie, setShowGoldie] = useState(false);
  const controls = useAnimation();

  // Subscription data (from previous step)
  const subscriptions = [
    { name: "Netflix", amount: 119, emoji: "🎬" },
    { name: "Spotify", amount: 109, emoji: "🎵" },
    { name: "Gym", amount: 459, emoji: "💪" },
    { name: "Adobe", amount: 99, emoji: "🎨" },
    { name: "iCloud", amount: 29, emoji: "☁️" },
    { name: "YouTube Premium", amount: 32, emoji: "📺" },
  ];

  const monthlyTotal = 847; // kr
  const yearlyTotal = monthlyTotal * 12;
  const fiveYearTotal = yearlyTotal * 5;

  // Shake animation for the big number
  const shakeAnimation = async () => {
    await controls.start({
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.5 }
    });
  };

  useEffect(() => {
    // Sequence the reveals
    const timer1 = setTimeout(() => {
      shakeAnimation();
    }, 800);

    const timer2 = setTimeout(() => {
      setShowReframing(true);
    }, 1500);

    const timer3 = setTimeout(() => {
      setShowGoldie(true);
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFF5EB] to-[#FFEFD5] relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-20 right-10 w-40 h-40 bg-[#FF9500] rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-60 h-60 bg-[#FFB800] rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pt-12 pb-8 flex flex-col min-h-screen">
        
        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <div className="w-8 h-2 rounded-full bg-[#D4AF37]" />
          <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-[#2C2C2C] mb-2">
            Your Subscription Reality
          </h1>
          <p className="text-[#666] text-sm">
            Based on what you told us...
          </p>
        </motion.div>

        {/* Subscription Pills - Quick Reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {subscriptions.map((sub, index) => (
            <motion.div
              key={sub.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
              className="bg-white/70 backdrop-blur-sm border border-white rounded-full px-3 py-1.5 shadow-sm"
            >
              <span className="text-sm">
                {sub.emoji} {sub.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* The Big Number - Primary Impact */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-lg border-2 border-[#FF9500]/20 rounded-[32px] p-8 mb-6 shadow-[0_12px_48px_rgba(255,149,0,0.15)] relative overflow-hidden"
        >
          {/* Animated glow background */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-radial from-[#FF9500]/20 to-transparent"
          />

          <div className="relative z-10">
            <motion.div className="text-center">
              <div className="text-sm text-[#7C7870] mb-3">
                You spend on subscriptions
              </div>
              
              <motion.div
                animate={controls}
                className="mb-4"
              >
                <div className="text-6xl font-bold bg-gradient-to-r from-[#FF9500] via-[#FFB800] to-[#FF9500] bg-clip-text text-transparent leading-tight">
                  {monthlyTotal} kr
                </div>
                <div className="text-lg text-[#FF9500] font-semibold">
                  per month
                </div>
              </motion.div>

              {/* Subtle emphasis */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ delay: 1, duration: 0.6 }}
                className="h-1 bg-gradient-to-r from-transparent via-[#FF9500]/40 to-transparent mx-auto rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Reframing Cards */}
        {showReframing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 mb-8"
          >
            {/* Berlin Trip Reframe */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-[#89CFF0]/20 to-[#7FCDCD]/20 backdrop-blur-sm border border-[#89CFF0]/40 rounded-3xl p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#89CFF0] to-[#7FCDCD] rounded-2xl flex items-center justify-center shadow-lg">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-[#3D3D3D] font-medium mb-1">
                    That's a weekend trip to Berlin
                  </div>
                  <div className="text-sm text-[#5C5850]">
                    Every single month ✈️
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 5 Year Projection */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-[#FFB8A5]/20 to-[#FFA07A]/20 backdrop-blur-sm border border-[#FFB8A5]/40 rounded-3xl p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#FFB8A5] to-[#FFA07A] rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-[#3D3D3D] font-medium mb-1">
                    In 5 years: {fiveYearTotal.toLocaleString()} kr
                  </div>
                  <div className="text-sm text-[#5C5850]">
                    That could be a down payment 🏡
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Yearly Total */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-[#A8D5BA]/20 to-[#98D8C8]/20 backdrop-blur-sm border border-[#A8D5BA]/40 rounded-3xl p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#A8D5BA] to-[#98D8C8] rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-[#3D3D3D] font-medium mb-1">
                    This year alone: {yearlyTotal.toLocaleString()} kr
                  </div>
                  <div className="text-sm text-[#5C5850]">
                    That's serious money 💰
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Goldie's Non-Judgmental Message */}
        {showGoldie && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            {/* Goldie Character */}
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                {/* Goldie Coin */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFD93D] via-[#FFC93D] to-[#FFB93D] shadow-[0_8px_32px_rgba(255,217,61,0.5)] flex items-center justify-center border-4 border-[#FFED4E] relative">
                  {/* Face */}
                  <div className="relative">
                    {/* Eyes */}
                    <div className="absolute top-0 left-0 right-0 flex justify-center gap-3">
                      <div className="w-2 h-2 bg-[#2C2C2C] rounded-full" />
                      <div className="w-2 h-2 bg-[#2C2C2C] rounded-full" />
                    </div>
                    {/* Gentle smile */}
                    <div className="mt-4 w-6 h-3 border-b-2 border-[#2C2C2C] rounded-b-full" />
                  </div>

                  {/* Sparkle */}
                  <motion.div
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles className="w-5 h-5 text-[#FFE55C]" />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Speech Bubble */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              {/* Triangle pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-white" />
              
              {/* Bubble content */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/80">
                <div className="text-center">
                  <div className="text-sm font-semibold text-[#D4AF37] mb-2">
                    Goldie here 👋
                  </div>
                  <p className="text-[#3D3D3D] leading-relaxed mb-1">
                    No judgment — but want me to find the ones you <span className="font-semibold">forgot about</span>?
                  </p>
                  <p className="text-sm text-[#666]">
                    Most people discover 2-3 more subscriptions they didn't remember
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA Button */}
        {showGoldie && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pb-8"
          >
            <button
              onClick={() => navigate("/auth")}
              className="w-full bg-gradient-to-r from-[#D4AF37] via-[#E5C68D] to-[#C9B382] hover:shadow-[0_16px_48px_rgba(212,175,55,0.4)] transition-all duration-300 rounded-[20px] p-5 shadow-[0_8px_32px_rgba(212,175,55,0.3)] group"
            >
              <div className="flex items-center justify-center gap-3">
                <span className="text-white font-bold text-lg">
                  Let Goldie audit my subscriptions
                </span>
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  🔍
                </motion.div>
              </div>
            </button>

            {/* Skip option */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => navigate("/auth")}
              className="w-full mt-4 text-[#666] text-sm hover:text-[#3D3D3D] transition-colors"
            >
              I'll do this later
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Clarity statement at bottom */}
      {showGoldie && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-2 left-0 right-0 text-center z-0"
        >
          <div className="text-xs text-[#999]">
            Clarity, not guilt • Your money, your choice
          </div>
        </motion.div>
      )}
    </div>
  );
}
