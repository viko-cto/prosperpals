import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Heart } from "lucide-react";
import { useNavigate } from "react-router";

export function MeetGoldie() {
  const navigate = useNavigate();
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const personalities = [
    { 
      id: "saver", 
      label: "I'm a saver", 
      emoji: "🐿️",
      gradient: "from-[#A8D5BA] to-[#98D8C8]",
      hoverGradient: "from-[#98D8C8] to-[#88C8B8]",
    },
    { 
      id: "spender", 
      label: "I'm a spender", 
      emoji: "💸",
      gradient: "from-[#FFB8A5] to-[#FFA07A]",
      hoverGradient: "from-[#FFA07A] to-[#FF906A]",
    },
    { 
      id: "unsure", 
      label: "I have no idea", 
      emoji: "🤷",
      gradient: "from-[#D4A5D4] to-[#C495C4]",
      hoverGradient: "from-[#C495C4] to-[#B485B4]",
    },
  ];

  const handlePersonalitySelect = (personalityId: string) => {
    setSelectedPersonality(personalityId);
    setIsTransitioning(true);
    
    // Goldie celebrates the choice
    setTimeout(() => {
      // Move to next screen (bank connection or next onboarding step)
      navigate("/bank-connection");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFF5E6] to-[#FFE8B8] relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-80 h-80 bg-[#FFD93D] rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-40 right-10 w-96 h-96 bg-[#FFC93D] rounded-full blur-3xl"
      />

      {/* Floating sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
          className="absolute text-2xl"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
        >
          ✨
        </motion.div>
      ))}

      <div className="relative z-10 px-6 pt-12 pb-8 flex flex-col min-h-screen">
        
        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <div className="w-8 h-2 rounded-full bg-[#D4AF37]" />
          <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
          <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
        </motion.div>

        {/* Spacer to center content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          
          {/* Goldie Character - Extra Large */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 0.3,
              type: "spring", 
              stiffness: 200,
              damping: 15
            }}
            className="relative mb-8"
          >
            {/* Glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-radial from-[#FFD93D] to-transparent blur-2xl"
            />

            {/* Main Goldie Character */}
            <motion.div
              animate={
                isTransitioning
                  ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 10, 0],
                    }
                  : {
                      y: [0, -15, 0],
                      rotate: [0, 2, -2, 2, 0],
                    }
              }
              transition={
                isTransitioning
                  ? { duration: 0.6 }
                  : {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
              }
              className="relative w-40 h-40 rounded-full bg-gradient-to-br from-[#FFD93D] via-[#FFC93D] to-[#FFB93D] shadow-[0_20px_60px_rgba(255,217,61,0.5)] flex items-center justify-center border-[6px] border-[#FFED4E]"
            >
              {/* Face */}
              <div className="relative">
                {/* Eyes - Gentle, warm */}
                <div className="absolute top-3 left-0 right-0 flex justify-center gap-5">
                  <motion.div
                    animate={{
                      scaleY: [1, 0.1, 1],
                    }}
                    transition={{
                      duration: 0.2,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                    className="w-3 h-3 bg-[#2C2C2C] rounded-full relative"
                  >
                    {/* Shine in eyes */}
                    <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full" />
                  </motion.div>
                  <motion.div
                    animate={{
                      scaleY: [1, 0.1, 1],
                    }}
                    transition={{
                      duration: 0.2,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                    className="w-3 h-3 bg-[#2C2C2C] rounded-full relative"
                  >
                    {/* Shine in eyes */}
                    <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full" />
                  </motion.div>
                </div>
                {/* Big friendly smile */}
                <div className="mt-8 w-10 h-5 border-b-[3px] border-[#2C2C2C] rounded-b-full" />
              </div>

              {/* Waving hand */}
              <motion.div
                animate={{
                  rotate: [0, 14, -8, 14, -8, 14, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
                className="absolute -right-4 -top-2 text-5xl origin-bottom-right"
                style={{ transformOrigin: "bottom right" }}
              >
                👋
              </motion.div>

              {/* Celebration hearts when selected */}
              {isTransitioning && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: [0, Math.cos((i * Math.PI) / 4) * 80],
                        y: [0, Math.sin((i * Math.PI) / 4) * 80],
                        opacity: [1, 1, 0],
                      }}
                      transition={{
                        duration: 1,
                        ease: "easeOut"
                      }}
                      className="absolute"
                    >
                      <Heart className="w-6 h-6 text-[#FF6B9D] fill-[#FF6B9D]" />
                    </motion.div>
                  ))}
                </>
              )}

              {/* Sparkle accent */}
              <motion.div
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles className="w-8 h-8 text-[#FFE55C]" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Speech Bubble */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative max-w-sm mb-8"
          >
            {/* Triangle pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-1">
              <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-white" />
            </div>
            
            {/* Bubble content */}
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-white rounded-[32px] px-7 py-6 shadow-[0_12px_48px_rgba(0,0,0,0.12)] border-2 border-white/80"
            >
              <div className="text-center">
                <p className="text-[#2C2C2C] leading-relaxed text-lg">
                  <span className="font-bold">Hey! I'm Goldie 🪙</span>
                </p>
                <p className="text-[#3D3D3D] leading-relaxed mt-2">
                  I'm going to help you feel good about your money. No judgment, no lectures — just us figuring it out together.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Personality Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="w-full max-w-sm space-y-3 mb-6"
          >
            {personalities.map((personality, index) => (
              <motion.button
                key={personality.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                onClick={() => handlePersonalitySelect(personality.id)}
                disabled={isTransitioning}
                className={`w-full bg-gradient-to-r ${
                  selectedPersonality === personality.id
                    ? personality.hoverGradient
                    : personality.gradient
                } hover:${personality.hoverGradient} transition-all duration-300 rounded-[24px] p-5 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden`}
              >
                {/* Shimmer effect on hover */}
                <motion.div
                  animate={{
                    x: [-200, 200],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.span
                      animate={{
                        rotate: [0, 10, -10, 10, 0],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                      className="text-3xl"
                    >
                      {personality.emoji}
                    </motion.span>
                    <span className="text-white font-bold text-lg">
                      {personality.label}
                    </span>
                  </div>
                  
                  {/* Check mark when selected */}
                  {selectedPersonality === personality.id && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-7 h-7 rounded-full bg-white flex items-center justify-center"
                    >
                      <span className="text-lg">✓</span>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Reassuring text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="text-center text-sm text-[#7C7870] px-6 max-w-xs"
          >
            This helps me understand you. You can change this anytime.
          </motion.div>
        </div>

        {/* Extra personality - subtle footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center mt-8"
        >
          <div className="text-xs text-[#999] flex items-center justify-center gap-1">
            <span>Made with</span>
            <motion.span
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              💛
            </motion.span>
            <span>for your financial wellness</span>
          </div>
        </motion.div>
      </div>

      {/* Goldie's reaction text */}
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-x-6 top-1/3 z-50 text-center"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
            }}
            className="bg-gradient-to-r from-[#FFD93D] to-[#FFC93D] text-[#2C2C2C] font-bold text-xl px-8 py-4 rounded-[24px] shadow-2xl inline-block"
          >
            {selectedPersonality === "saver" && "Love it! Let's grow that nest egg! 🐿️"}
            {selectedPersonality === "spender" && "Awesome! Let's make every dollar count! 💸"}
            {selectedPersonality === "unsure" && "Perfect! We'll figure it out together! 🤷"}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
