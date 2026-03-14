import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  X,
  Share2,
  Building2,
  Plane,
  Home,
  Car,
  Heart,
  TrendingUp,
  Flame,
  Trophy,
  GraduationCap,
  Award,
  ArrowRight,
} from "lucide-react";
import { GoldieHappy, GoldieCelebrating, FinImpressed, FinCelebrating } from "./CompanionEmotions";
import { useAccessibility } from "../contexts/AccessibilityContext";

// Confetti helper
function triggerConfetti(reduceMotion: boolean) {
  if (reduceMotion) return; // Respect accessibility settings

  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

// ============================================
// FIRST BANK CONNECTED
// ============================================
export function FirstBankConnected({
  bankName = "Chase Bank",
  onClose,
  onShare,
}: {
  bankName?: string;
  onClose: () => void;
  onShare?: () => void;
}) {
  const { reduceMotion } = useAccessibility();

  useEffect(() => {
    triggerConfetti(reduceMotion);
  }, [reduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border-2 border-yellow-400/30 rounded-3xl p-8 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Dancing Goldie with Bank Logo */}
        <div className="text-center mb-6">
          <motion.div
            animate={reduceMotion ? {} : {
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            <GoldieCelebrating size="hero" />
          </motion.div>

          {/* Bank Logo Placeholder */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 w-16 h-16 bg-blue-500 rounded-2xl mx-auto flex items-center justify-center"
          >
            <Building2 className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Your financial life, unified! 🎉
        </h2>

        {/* Subtitle */}
        <p className="text-white/60 text-center mb-6">
          {bankName} is now connected to ProsperPals
        </p>

        {/* Reward */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl p-6 mb-6 text-center"
        >
          <div className="text-5xl font-bold text-[#1a1a2e] mb-2">+100 PC</div>
          <div className="text-sm font-semibold text-[#1a1a2e]/80">First Bank Bonus!</div>
        </motion.div>

        {/* Message from Goldie */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🪙</div>
            <div>
              <div className="font-semibold text-white mb-1">Goldie says:</div>
              <div className="text-sm text-white/70">
                "Amazing start! Now I can help you track every penny and make smart money moves together!"
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {onShare && (
            <button
              onClick={onShare}
              className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] rounded-xl font-bold text-[#1a1a2e] transition-all"
          >
            Continue
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// GOAL COMPLETED
// ============================================
export function GoalCompleted({
  goalName = "Greece Trip",
  goalType = "travel",
  amount = 1000,
  onClose,
  onShare,
  onNext,
}: {
  goalName?: string;
  goalType?: "travel" | "home" | "car" | "emergency" | "investment";
  amount?: number;
  onClose: () => void;
  onShare?: () => void;
  onNext?: () => void;
}) {
  const { reduceMotion } = useAccessibility();
  const [showShareCard, setShowShareCard] = useState(false);

  useEffect(() => {
    // Multiple confetti bursts
    const interval = setInterval(() => triggerConfetti(reduceMotion), 300);
    setTimeout(() => clearInterval(interval), 2000);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  const goalIcons = {
    travel: Plane,
    home: Home,
    car: Car,
    emergency: Heart,
    investment: TrendingUp,
  };

  const GoalIcon = goalIcons[goalType];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-green-900/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.5, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 100 }}
        transition={{ type: "spring", duration: 0.7, bounce: 0.4 }}
        className="max-w-lg w-full"
      >
        {/* Main Card */}
        <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-8 text-center mb-4 shadow-2xl">
          {/* Goal Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
          >
            <GoalIcon className="w-12 h-12 text-white" />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Goal Completed! 🎊
            </h1>
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              {goalName}
            </h2>
            <div className="text-5xl font-bold text-gray-900 mb-6">
              €{amount.toLocaleString()}
            </div>
          </motion.div>

          {/* Companions Celebrating */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <motion.div
              animate={reduceMotion ? {} : {
                y: [0, -15, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <GoldieCelebrating size="medium" />
            </motion.div>
            <motion.div
              animate={reduceMotion ? {} : {
                y: [0, -15, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.3,
                ease: "easeInOut",
              }}
            >
              <FinCelebrating size="medium" />
            </motion.div>
          </div>

          {/* Message */}
          <p className="text-gray-600 mb-8">
            You did it! This is a huge accomplishment and you should be incredibly proud! 🌟
          </p>

          {/* Share Card Toggle */}
          <button
            onClick={() => setShowShareCard(!showShareCard)}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2 mb-3"
          >
            <Share2 className="w-5 h-5" />
            Create Share Card
          </button>

          {/* What's Next */}
          {onNext && (
            <button
              onClick={onNext}
              className="w-full px-6 py-4 bg-white/50 hover:bg-white/70 border-2 border-gray-300 rounded-xl text-gray-900 font-bold transition-all flex items-center justify-center gap-2"
            >
              What's next?
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            className="mt-4 text-gray-500 hover:text-gray-700 text-sm font-semibold"
          >
            Close
          </button>
        </div>

        {/* Share Card Preview */}
        <AnimatePresence>
          {showShareCard && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-8 text-center shadow-2xl"
            >
              <div className="text-white mb-4">
                <div className="text-6xl mb-4">{goalType === "travel" ? "✈️" : "🎯"}</div>
                <h3 className="text-3xl font-bold mb-2">I just completed my</h3>
                <h2 className="text-4xl font-bold mb-4">{goalName}!</h2>
                <div className="text-2xl font-semibold opacity-90">€{amount.toLocaleString()} saved</div>
              </div>
              <div className="text-white/80 text-sm">
                Powered by ProsperPals 🪙
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// STREAK MILESTONE
// ============================================
export function StreakMilestone({
  days = 7,
  onClose,
  leaderboardPosition,
  previousPosition,
}: {
  days: 7 | 30 | 100;
  onClose: () => void;
  leaderboardPosition?: number;
  previousPosition?: number;
}) {
  const { reduceMotion } = useAccessibility();

  useEffect(() => {
    triggerConfetti(reduceMotion);
  }, [reduceMotion]);

  const milestoneData = {
    7: {
      title: "Week Warrior",
      badge: "🔥",
      color: "from-orange-400 to-orange-600",
      message: "7 days strong! You're building an amazing habit!",
    },
    30: {
      title: "Monthly Master",
      badge: "⚡",
      color: "from-yellow-400 to-yellow-600",
      message: "30 days of dedication! You're unstoppable!",
    },
    100: {
      title: "Century Champion",
      badge: "👑",
      color: "from-purple-400 to-purple-600",
      message: "100 DAYS! You're a financial wellness legend!",
    },
  };

  const milestone = milestoneData[days];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0.8, rotate: 5 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border-2 border-yellow-400/50 rounded-3xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Badge Unlock Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", duration: 1 }}
          className={`w-32 h-32 bg-gradient-to-br ${milestone.color} rounded-full mx-auto mb-6 flex items-center justify-center text-6xl shadow-2xl relative`}
        >
          {milestone.badge}
          
          {/* Fire Effect */}
          {!reduceMotion && (
            <>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-500/30 to-transparent"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5,
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-t from-yellow-500/30 to-transparent"
              />
            </>
          )}
        </motion.div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          {milestone.title}
        </h2>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Flame className="w-6 h-6 text-orange-500" fill="currentColor" />
          <span className="text-4xl font-bold text-white">{days} Days</span>
          <Flame className="w-6 h-6 text-orange-500" fill="currentColor" />
        </div>

        {/* Message */}
        <p className="text-white/70 text-center mb-6">
          {milestone.message}
        </p>

        {/* Both Companions Celebrate */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <motion.div
            animate={reduceMotion ? {} : {
              y: [0, -15, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <GoldieCelebrating size="medium" />
          </motion.div>
          <motion.div
            animate={reduceMotion ? {} : {
              y: [0, -15, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.3,
              ease: "easeInOut",
            }}
          >
            <FinCelebrating size="medium" />
          </motion.div>
        </div>

        {/* Leaderboard Position */}
        {leaderboardPosition && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-blue-500/20 to-blue-600/10 border border-blue-400/30 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="text-sm text-white/60">Leaderboard</div>
                  <div className="text-xl font-bold text-white">#{leaderboardPosition}</div>
                </div>
              </div>
              {previousPosition && previousPosition > leaderboardPosition && (
                <div className="text-green-400 font-bold">
                  ↑ {previousPosition - leaderboardPosition} spots!
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <button
          onClick={onClose}
          className="w-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] rounded-xl font-bold text-[#1a1a2e] transition-all"
        >
          Keep the Streak Going! 🔥
        </button>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// BUDGET UNDER CONTROL
// ============================================
export function BudgetUnderControl({
  savedAmount = 50,
  onClose,
  onShare,
}: {
  savedAmount?: number;
  onClose: () => void;
  onShare?: () => void;
}) {
  const { reduceMotion } = useAccessibility();

  useEffect(() => {
    triggerConfetti(reduceMotion);
  }, [reduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border-2 border-green-400/30 rounded-3xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Trophy from Goldie */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block relative"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl">
              <Trophy className="w-12 h-12 text-[#1a1a2e]" />
            </div>
            
            {/* Goldie presenting trophy */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-2 -right-2"
            >
              <GoldieHappy size="medium" />
            </motion.div>
          </motion.div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          You're crushing it! 💪
        </h2>
        <p className="text-white/60 text-center mb-6">
          Week finished under budget
        </p>

        {/* Savings */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-6 mb-6 text-center"
        >
          <div className="text-5xl font-bold text-white mb-2">€{savedAmount}</div>
          <div className="text-sm font-semibold text-white/80">saved this week!</div>
        </motion.div>

        {/* Reward */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🪙</div>
            <div>
              <div className="font-semibold text-white">Bonus Reward</div>
              <div className="text-sm text-white/60">Budget Master</div>
            </div>
          </div>
          <div className="text-2xl font-bold text-yellow-400">+50 PC</div>
        </div>

        {/* Goldie's Message */}
        <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🪙</div>
            <div>
              <div className="font-semibold text-white mb-1">Goldie says:</div>
              <div className="text-sm text-white/70">
                "This is how wealth is built! Small wins add up to BIG results! Keep going!"
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {onShare && (
            <button
              onClick={onShare}
              className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-green-400 to-green-600 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] rounded-xl font-bold text-white transition-all"
          >
            Continue
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// FIRST LESSON COMPLETED
// ============================================
export function FirstLessonCompleted({
  lessonTitle = "Understanding Index Funds",
  nextLesson = "Diversification Basics",
  onClose,
  onNextLesson,
}: {
  lessonTitle?: string;
  nextLesson?: string;
  onClose: () => void;
  onNextLesson?: () => void;
}) {
  const { reduceMotion } = useAccessibility();

  useEffect(() => {
    triggerConfetti(reduceMotion);
  }, [reduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, rotateY: -90 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0.8, rotateY: 90 }}
        transition={{ type: "spring", duration: 0.7 }}
        className="bg-gradient-to-br from-white/95 to-white/90 rounded-3xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fin Graduation Ceremony */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block relative"
          >
            <FinImpressed size="hero" />
            
            {/* Graduation Cap */}
            <motion.div
              initial={{ y: -100, rotate: -45 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg"
            >
              <GraduationCap className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        </div>

        {/* Certificate-Style Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-4 border-blue-500 rounded-2xl p-6 mb-6 relative overflow-hidden"
        >
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-yellow-400" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-yellow-400" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-yellow-400" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-yellow-400" />

          <div className="text-center relative z-10">
            <div className="text-sm text-blue-600 font-semibold mb-2">CERTIFICATE OF COMPLETION</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {lessonTitle}
            </h3>
            
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full font-bold mb-4"
            >
              <Award className="w-5 h-5" />
              Index Fund Graduate
            </motion.div>

            <div className="text-sm text-gray-600">
              Awarded by Fin • ProsperPals Academy
            </div>
          </div>
        </motion.div>

        {/* Fin's Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🐋</div>
            <div>
              <div className="font-semibold text-gray-900 mb-1">Fin says:</div>
              <div className="text-sm text-gray-700">
                "Excellent work! You now understand one of the most powerful investment vehicles. Keep learning!"
              </div>
            </div>
          </div>
        </div>

        {/* Next Lesson Preview */}
        {onNextLesson && (
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Up Next</div>
                <div className="font-bold text-gray-900">{nextLesson}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold text-gray-900 transition-all"
          >
            Close
          </button>
          {onNextLesson && (
            <button
              onClick={onNextLesson}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2"
            >
              Next Lesson
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Helper to show celebrations
export function useCelebration() {
  const [celebration, setCelebration] = useState<{
    type: "bank" | "goal" | "streak" | "budget" | "lesson" | null;
    props?: any;
  }>({ type: null });

  const showBankConnected = (props?: any) => {
    setCelebration({ type: "bank", props });
  };

  const showGoalCompleted = (props?: any) => {
    setCelebration({ type: "goal", props });
  };

  const showStreakMilestone = (props?: any) => {
    setCelebration({ type: "streak", props });
  };

  const showBudgetUnderControl = (props?: any) => {
    setCelebration({ type: "budget", props });
  };

  const showLessonCompleted = (props?: any) => {
    setCelebration({ type: "lesson", props });
  };

  const hideCelebration = () => {
    setCelebration({ type: null });
  };

  return {
    celebration,
    showBankConnected,
    showGoalCompleted,
    showStreakMilestone,
    showBudgetUnderControl,
    showLessonCompleted,
    hideCelebration,
  };
}