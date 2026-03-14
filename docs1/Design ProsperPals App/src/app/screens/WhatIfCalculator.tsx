import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

export function WhatIfCalculator() {
  const navigate = useNavigate();
  const [income, setIncome] = useState(2500);
  const [rentCost, setRentCost] = useState(800);
  const [foodCost, setFoodCost] = useState(400);
  const [subscriptionsCost, setSubscriptionsCost] = useState(150);
  const [otherCost, setOtherCost] = useState(300);

  // Calculate potential savings
  const totalExpenses = rentCost + foodCost + subscriptionsCost + otherCost;
  const monthlySavings = Math.max(0, income - totalExpenses);
  const yearlySavings = monthlySavings * 12;
  const savingsRate = income > 0 ? (monthlySavings / income) * 100 : 0;

  // Determine Goldie's reaction
  const getGoldieReaction = () => {
    if (savingsRate >= 30) return { emoji: "🤩", message: "Wow! You're a superstar!" };
    if (savingsRate >= 20) return { emoji: "😊", message: "Looking great!" };
    if (savingsRate >= 10) return { emoji: "😌", message: "Good start!" };
    if (savingsRate > 0) return { emoji: "🙂", message: "Keep going!" };
    return { emoji: "😅", message: "Let's find some savings!" };
  };

  const goldieReaction = getGoldieReaction();

  // Progress ring animation
  const circumference = 2 * Math.PI * 90;
  const progress = Math.min(savingsRate, 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFF5EB] to-[#FFE4D6] p-6 flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 mt-4"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-6 h-6 text-[#FF6B6B]" />
          <h1 className="text-3xl font-bold text-[#2C2C2C]">What If...</h1>
          <Sparkles className="w-6 h-6 text-[#FFD93D]" />
        </div>
        <p className="text-[#666] text-sm leading-relaxed max-w-xs mx-auto">
          Play around with the numbers below and see what you could save!
        </p>
      </motion.div>

      {/* Savings Visualization */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-[24px] shadow-[0_8px_32px_rgba(255,107,107,0.15)] p-8 mb-6 relative overflow-hidden"
      >
        {/* Animated background gradient */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-[#FFD93D]/20 to-transparent rounded-full blur-3xl"
        />

        <div className="relative z-10">
          {/* Progress Ring */}
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg className="transform -rotate-90 w-48 h-48">
                {/* Background ring */}
                <circle
                  cx="96"
                  cy="96"
                  r="90"
                  stroke="#FFE4D6"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Progress ring */}
                <motion.circle
                  cx="96"
                  cy="96"
                  r="90"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{
                    strokeDasharray: circumference,
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B6B" />
                    <stop offset="100%" stopColor="#FFD93D" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  key={yearlySavings}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-sm text-[#999] mb-1">In 12 months</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] bg-clip-text text-transparent">
                    €{yearlySavings.toLocaleString()}
                  </div>
                  <div className="text-xs text-[#666] mt-1">saved</div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Monthly breakdown */}
          <div className="bg-gradient-to-br from-[#FFF8F0] to-[#FFE4D6] rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#666]">Monthly saving potential</span>
              <span className="text-xl font-bold text-[#2C2C2C]">€{monthlySavings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#999]">That's {savingsRate.toFixed(0)}% of your income</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={goldieReaction.emoji}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="text-2xl"
                >
                  {goldieReaction.emoji}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Sliders */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 mb-6 space-y-6"
      >
        <h3 className="font-semibold text-[#2C2C2C] text-lg mb-4">Your Monthly Money</h3>

        {/* Income Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-[#666]">💰 Income</label>
            <span className="text-lg font-bold text-[#2C2C2C]">€{income}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="8000"
            step="100"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-[#FFE4D6] to-[#FFD93D] rounded-full appearance-none cursor-pointer slider-thumb-gold"
          />
        </div>

        {/* Rent Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-[#666]">🏠 Rent</label>
            <span className="text-lg font-bold text-[#2C2C2C]">€{rentCost}</span>
          </div>
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={rentCost}
            onChange={(e) => setRentCost(Number(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-[#FFE4D6] to-[#FF6B6B] rounded-full appearance-none cursor-pointer slider-thumb-coral"
          />
        </div>

        {/* Food Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-[#666]">🍕 Food</label>
            <span className="text-lg font-bold text-[#2C2C2C]">€{foodCost}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="25"
            value={foodCost}
            onChange={(e) => setFoodCost(Number(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-[#FFE4D6] to-[#FF6B6B] rounded-full appearance-none cursor-pointer slider-thumb-coral"
          />
        </div>

        {/* Subscriptions Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-[#666]">📱 Subscriptions</label>
            <span className="text-lg font-bold text-[#2C2C2C]">€{subscriptionsCost}</span>
          </div>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={subscriptionsCost}
            onChange={(e) => setSubscriptionsCost(Number(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-[#FFE4D6] to-[#FF6B6B] rounded-full appearance-none cursor-pointer slider-thumb-coral"
          />
        </div>

        {/* Other Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-[#666]">✨ Other Fun Stuff</label>
            <span className="text-lg font-bold text-[#2C2C2C]">€{otherCost}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="25"
            value={otherCost}
            onChange={(e) => setOtherCost(Number(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-[#FFE4D6] to-[#FF6B6B] rounded-full appearance-none cursor-pointer slider-thumb-coral"
          />
        </div>
      </motion.div>

      {/* Spacer to push CTA to bottom */}
      <div className="flex-1" />

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center pb-8"
      >
        <button
          onClick={() => navigate("/auth")}
          className="group inline-flex items-center gap-2 text-[#666] hover:text-[#2C2C2C] transition-colors text-sm font-medium"
        >
          <span>Want Goldie to make this happen?</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Goldie Character - Bottom Right Corner */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        className="fixed bottom-24 right-6 z-50"
      >
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
          {/* Speech bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={goldieReaction.message}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-full right-0 mb-3 bg-white rounded-2xl shadow-lg px-4 py-2 whitespace-nowrap"
            >
              <div className="text-sm font-medium text-[#2C2C2C]">{goldieReaction.message}</div>
              <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-3 h-3 bg-white" />
            </motion.div>
          </AnimatePresence>

          {/* Goldie coin character */}
          <div className="relative w-20 h-20">
            <motion.div
              animate={{
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full h-full rounded-full bg-gradient-to-br from-[#FFD93D] via-[#FFC93D] to-[#FFB93D] shadow-[0_8px_32px_rgba(255,217,61,0.5)] flex items-center justify-center border-4 border-[#FFED4E]"
            >
              {/* Eyes */}
              <div className="absolute top-6 left-0 right-0 flex justify-center gap-3">
                <motion.div
                  animate={{
                    scaleY: [1, 0.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="w-2 h-2 bg-[#2C2C2C] rounded-full"
                />
                <motion.div
                  animate={{
                    scaleY: [1, 0.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="w-2 h-2 bg-[#2C2C2C] rounded-full"
                />
              </div>

              {/* Smile */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <div className="w-6 h-3 border-b-2 border-[#2C2C2C] rounded-b-full" />
              </div>

              {/* Sparkle effect */}
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
                className="absolute -top-1 -right-1 w-4 h-4 text-white"
              >
                ✨
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Custom slider styles */}
      <style>{`
        /* Gold thumb */
        .slider-thumb-gold::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFD93D 0%, #FFB93D 100%);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(255, 217, 61, 0.4);
          transition: all 0.2s ease;
        }
        
        .slider-thumb-gold::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(255, 217, 61, 0.6);
        }

        .slider-thumb-gold::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFD93D 0%, #FFB93D 100%);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(255, 217, 61, 0.4);
          transition: all 0.2s ease;
        }

        .slider-thumb-gold::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(255, 217, 61, 0.6);
        }

        /* Coral thumb */
        .slider-thumb-coral::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(255, 107, 107, 0.4);
          transition: all 0.2s ease;
        }
        
        .slider-thumb-coral::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.6);
        }

        .slider-thumb-coral::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(255, 107, 107, 0.4);
          transition: all 0.2s ease;
        }

        .slider-thumb-coral::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.6);
        }

        /* Remove default slider track styling */
        input[type="range"]::-webkit-slider-runnable-track {
          height: 12px;
          border-radius: 6px;
        }

        input[type="range"]::-moz-range-track {
          height: 12px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
