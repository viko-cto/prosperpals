import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, Sparkles } from "lucide-react";

// COACH MARK / SPOTLIGHT TUTORIAL
export function CoachMark({
  title,
  message,
  companion = "goldie",
  position = "bottom",
  targetElement,
  currentStep = 1,
  totalSteps = 5,
  onNext,
  onSkip,
  isVisible = true
}: {
  title: string;
  message: string;
  companion?: "goldie" | "fin";
  position?: "top" | "bottom" | "left" | "right";
  targetElement?: { x: number; y: number; width: number; height: number };
  currentStep?: number;
  totalSteps?: number;
  onNext?: () => void;
  onSkip?: () => void;
  isVisible?: boolean;
}) {
  const isGoldie = companion === "goldie";
  const emoji = isGoldie ? "🪙" : "🐋";
  const bgGradient = isGoldie 
    ? "from-yellow-400 to-yellow-600" 
    : "from-blue-400 to-blue-700";

  // Default target if none provided (center of screen)
  const target = targetElement || { x: 300, y: 200, width: 200, height: 100 };

  // Calculate tooltip position
  const getTooltipPosition = () => {
    const padding = 20;
    switch (position) {
      case "bottom":
        return { top: target.y + target.height + padding, left: target.x };
      case "top":
        return { bottom: window.innerHeight - target.y + padding, left: target.x };
      case "left":
        return { top: target.y, right: window.innerWidth - target.x + padding };
      case "right":
        return { top: target.y, left: target.x + target.width + padding };
      default:
        return { top: target.y + target.height + padding, left: target.x };
    }
  };

  const tooltipPos = getTooltipPosition();

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Dimmed Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onSkip}
          />

          {/* Spotlight Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed z-[51] pointer-events-none"
            style={{
              left: target.x - 8,
              top: target.y - 8,
              width: target.width + 16,
              height: target.height + 16,
            }}
          >
            <div className="w-full h-full rounded-xl ring-4 ring-yellow-400 ring-offset-4 ring-offset-black/50 shadow-[0_0_60px_20px_rgba(251,191,36,0.3)]" />
          </motion.div>

          {/* Pulsing Ring Animation */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="fixed z-[51] pointer-events-none"
            style={{
              left: target.x - 8,
              top: target.y - 8,
              width: target.width + 16,
              height: target.height + 16,
            }}
          >
            <div className="w-full h-full rounded-xl ring-2 ring-yellow-400/50" />
          </motion.div>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: position === "bottom" ? -20 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === "bottom" ? -20 : 20 }}
            className="fixed z-[52] max-w-sm"
            style={tooltipPos}
          >
            {/* Arrow */}
            <div
              className={`absolute ${
                position === "bottom" ? "-top-2 left-8" :
                position === "top" ? "-bottom-2 left-8" :
                position === "left" ? "-right-2 top-8" :
                "-left-2 top-8"
              }`}
            >
              <div className={`w-4 h-4 bg-gradient-to-br ${bgGradient} transform rotate-45`} />
            </div>

            {/* Tooltip Content */}
            <div className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-6 shadow-2xl`}>
              {/* Header with Avatar */}
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-5xl"
                >
                  {emoji}
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-[#1a1a2e]">
                      {title}
                    </h3>
                    <button
                      onClick={onSkip}
                      className="text-[#1a1a2e]/60 hover:text-[#1a1a2e] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-[#1a1a2e]/80">
                    {message}
                  </p>
                </div>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1.5">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i + 1 <= currentStep
                          ? "w-8 bg-[#1a1a2e]"
                          : "w-1.5 bg-[#1a1a2e]/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#1a1a2e]/60">
                  {currentStep}/{totalSteps}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onSkip}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold text-[#1a1a2e] transition-all"
                >
                  Skip Tour
                </button>
                <button
                  onClick={onNext}
                  className="flex-1 px-4 py-2 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 rounded-lg text-sm font-semibold text-white transition-all flex items-center justify-center gap-2"
                >
                  {currentStep === totalSteps ? "Get Started" : "Next"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// CELEBRATION COMPONENT
export function CelebrationMoment({
  isVisible = false,
  coinsEarned = 25,
  title = "You're off to a great start!",
  message = "Keep going to unlock more rewards",
  onComplete,
  showProgressBar = true,
  currentProgress = 25,
  nextMilestone = 100
}: {
  isVisible?: boolean;
  coinsEarned?: number;
  title?: string;
  message?: string;
  onComplete?: () => void;
  showProgressBar?: boolean;
  currentProgress?: number;
  nextMilestone?: number;
}) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={onComplete}
          />

          {/* Confetti */}
          {showConfetti && <ConfettiEffect />}

          {/* Celebration Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="fixed z-[51] max-w-md w-full mx-4"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
              
              {/* Animated Coin */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2, duration: 0.8 }}
                className="mb-6"
              >
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-block relative"
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-7xl shadow-[0_0_60px_20px_rgba(251,191,36,0.4)]">
                    🪙
                  </div>
                  
                  {/* +PC Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.5 }}
                    className="absolute -top-2 -right-2 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg"
                  >
                    +{coinsEarned} PC
                  </motion.div>

                  {/* Sparkles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [0, Math.cos(i * 60 * Math.PI / 180) * 60],
                        y: [0, Math.sin(i * 60 * Math.PI / 180) * 60],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 0.6 + i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                      className="absolute top-1/2 left-1/2 text-2xl"
                    >
                      ✨
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold text-white mb-3"
              >
                {title}
              </motion.h2>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-white/70 mb-6"
              >
                {message}
              </motion.p>

              {/* Progress Bar */}
              {showProgressBar && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6"
                >
                  <div className="flex items-center justify-between text-sm text-white/60 mb-2">
                    <span>Progress to next reward</span>
                    <span className="font-semibold text-yellow-400">
                      {currentProgress}/{nextMilestone} PC
                    </span>
                  </div>
                  
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentProgress / nextMilestone) * 100}%` }}
                      transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full relative overflow-hidden"
                    >
                      {/* Shine effect */}
                      <motion.div
                        animate={{
                          x: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 1,
                          ease: "linear",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>
                  </div>
                  
                  <p className="text-xs text-white/40 mt-2">
                    {nextMilestone - currentProgress} more coins to unlock the next reward!
                  </p>
                </motion.div>
              )}

              {/* Continue Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onClick={onComplete}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-bold text-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all"
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// CONFETTI EFFECT
function ConfettiEffect() {
  const confettiCount = 50;
  const colors = ["#fbbf24", "#f59e0b", "#3b82f6", "#8b5cf6", "#ec4899", "#10b981"];

  return (
    <div className="fixed inset-0 z-[51] pointer-events-none overflow-hidden">
      {[...Array(confettiCount)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: window.innerHeight + 20,
            rotate: Math.random() * 360 + 720,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 0.5,
            ease: "linear",
          }}
          className="absolute"
        >
          <div
            className="w-3 h-3 rounded-sm"
            style={{
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              opacity: 0.8,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ONBOARDING TOUR MANAGER
export function OnboardingTour({
  isActive = false,
  onComplete
}: {
  isActive?: boolean;
  onComplete?: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCelebration, setShowCelebration] = useState(false);

  const steps = [
    {
      title: "Welcome to ProsperPals! 🎉",
      message: "This is your ProsperCoin balance - earn coins by completing actions like setting budgets and tracking expenses!",
      companion: "goldie" as const,
      position: "bottom" as const,
      target: { x: 100, y: 20, width: 200, height: 60 },
    },
    {
      title: "Meet Goldie!",
      message: "Chat with Goldie anytime for budget help, spending tips, and financial guidance. She's always here to support you!",
      companion: "goldie" as const,
      position: "bottom" as const,
      target: { x: 50, y: 200, width: 180, height: 80 },
    },
    {
      title: "Your Financial Dashboard",
      message: "Your financial dashboard lives here. See your spending, income, and savings at a glance!",
      companion: "goldie" as const,
      position: "right" as const,
      target: { x: 300, y: 150, width: 300, height: 200 },
    },
    {
      title: "Set Goals, Stay Motivated",
      message: "Set goals to stay motivated! Whether it's an emergency fund or a dream vacation, we'll help you get there.",
      companion: "fin" as const,
      position: "bottom" as const,
      target: { x: 400, y: 100, width: 250, height: 150 },
    },
    {
      title: "Connect Your Banks",
      message: "Connect banks for automatic tracking. We'll sync your transactions securely and keep everything organized!",
      companion: "fin" as const,
      position: "left" as const,
      target: { x: 600, y: 250, width: 200, height: 100 },
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Tour complete - show celebration
      setShowCelebration(true);
    }
  };

  const handleSkip = () => {
    setShowCelebration(true);
  };

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
    onComplete?.();
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <>
      {isActive && !showCelebration && currentStepData && (
        <CoachMark
          title={currentStepData.title}
          message={currentStepData.message}
          companion={currentStepData.companion}
          position={currentStepData.position}
          targetElement={currentStepData.target}
          currentStep={currentStep}
          totalSteps={steps.length}
          onNext={handleNext}
          onSkip={handleSkip}
          isVisible={true}
        />
      )}

      <CelebrationMoment
        isVisible={showCelebration}
        coinsEarned={25}
        title="You're off to a great start!"
        message="Keep exploring to unlock more rewards and build better financial habits!"
        onComplete={handleCelebrationComplete}
        showProgressBar={true}
        currentProgress={25}
        nextMilestone={100}
      />
    </>
  );
}

// QUICK TIP TOOLTIP (non-blocking)
export function QuickTip({
  message,
  companion = "goldie",
  isVisible = true,
  position = { x: 100, y: 100 },
  onDismiss
}: {
  message: string;
  companion?: "goldie" | "fin";
  isVisible?: boolean;
  position?: { x: number; y: number };
  onDismiss?: () => void;
}) {
  const isGoldie = companion === "goldie";
  const emoji = isGoldie ? "🪙" : "🐋";
  const bgGradient = isGoldie 
    ? "from-yellow-400 to-yellow-600" 
    : "from-blue-400 to-blue-700";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          className="fixed z-50 max-w-xs"
          style={{ left: position.x, top: position.y }}
        >
          <div className={`bg-gradient-to-br ${bgGradient} rounded-xl p-4 shadow-xl flex items-start gap-3`}>
            <div className="text-3xl">{emoji}</div>
            <div className="flex-1">
              <p className="text-sm text-[#1a1a2e] font-medium">{message}</p>
            </div>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-[#1a1a2e]/60 hover:text-[#1a1a2e] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// FEATURE HIGHLIGHT BADGE
export function FeatureHighlight({
  label = "NEW",
  color = "yellow"
}: {
  label?: string;
  color?: "yellow" | "blue" | "purple" | "green";
}) {
  const colors = {
    yellow: "from-yellow-400 to-yellow-600",
    blue: "from-blue-400 to-blue-600",
    purple: "from-purple-400 to-purple-600",
    green: "from-green-400 to-green-600",
  };

  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r ${colors[color]} rounded-full text-xs font-bold text-white shadow-lg`}
    >
      <Sparkles className="w-3 h-3" />
      {label}
    </motion.div>
  );
}

// PROGRESS CHECKPOINT
export function ProgressCheckpoint({
  isVisible = false,
  message = "Checkpoint reached!",
  coinsEarned = 10,
  onDismiss
}: {
  isVisible?: boolean;
  message?: string;
  coinsEarned?: number;
  onDismiss?: () => void;
}) {
  useEffect(() => {
    if (isVisible && onDismiss) {
      const timer = setTimeout(onDismiss, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-4">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="text-4xl"
            >
              🪙
            </motion.div>
            
            <div>
              <div className="text-white font-bold text-lg">{message}</div>
              <div className="text-white/80 text-sm">+{coinsEarned} ProsperCoins</div>
            </div>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: 2,
              }}
              className="text-2xl"
            >
              ✨
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
