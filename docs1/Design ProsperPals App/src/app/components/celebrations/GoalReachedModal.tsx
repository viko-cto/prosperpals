import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, TrendingUp, Target, Share2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useAccessibility } from "../../contexts/AccessibilityContext";

interface GoalReachedModalProps {
  visible: boolean;
  onClose: () => void;
  goalName: string;
  amount: number;
  timeToGoal: number; // in days
  onSetNextGoal?: () => void;
  onInvest?: () => void;
  onShare?: () => void;
}

function triggerConfetti(reduceMotion: boolean) {
  if (reduceMotion) return;

  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ["#FFD700", "#FFA500", "#10B981", "#4A90D9"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ["#FFD700", "#FFA500", "#10B981", "#4A90D9"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

export function GoalReachedModal({
  visible,
  onClose,
  goalName,
  amount,
  timeToGoal,
  onSetNextGoal,
  onInvest,
  onShare,
}: GoalReachedModalProps) {
  const { reduceMotion } = useAccessibility();

  useEffect(() => {
    if (visible) {
      triggerConfetti(reduceMotion);
    }
  }, [visible, reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-green-900/50 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.5, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.5, y: 100, opacity: 0 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.4 }}
              className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-900/10 hover:bg-gray-900/20 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Trophy/Achievement Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
                className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
              >
                <Target className="w-12 h-12 text-white" />
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-6"
              >
                <h1 className="text-4xl font-bold text-gray-900 mb-2">🎉 Goal Reached!</h1>
                <h2 className="text-2xl font-semibold text-green-600 mb-4">{goalName}</h2>
              </motion.div>

              {/* Amount and Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 mb-6"
              >
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    €{amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total saved</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">{timeToGoal}</div>
                    <div className="text-xs text-gray-600">Days to goal</div>
                  </div>
                  <div className="bg-white/50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      €{Math.round(amount / timeToGoal)}
                    </div>
                    <div className="text-xs text-gray-600">Per day saved</div>
                  </div>
                </div>
              </motion.div>

              {/* Companion Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border-2 border-yellow-400/30 rounded-xl p-4 mb-6"
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">🪙</div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Goldie says:</div>
                    <div className="text-sm text-gray-700">
                      "You did it! This is a huge accomplishment. You're building real wealth and proving you can achieve anything you set your mind to!"
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-3"
              >
                {/* Primary CTA - Set Next Goal */}
                {onSetNextGoal && (
                  <button
                    onClick={onSetNextGoal}
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Target className="w-5 h-5" />
                    Set Next Goal
                  </button>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {/* Secondary CTA - Invest */}
                  {onInvest && (
                    <button
                      onClick={onInvest}
                      className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
                    >
                      <TrendingUp className="w-4 h-4" />
                      Invest This
                    </button>
                  )}

                  {/* Tertiary CTA - Share */}
                  {onShare && (
                    <button
                      onClick={onShare}
                      className="px-4 py-3 bg-white/70 hover:bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-900 transition-all flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Share Win
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Fin's Projection (if invest option exists) */}
              {onInvest && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mt-4 bg-gradient-to-r from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🐋</div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Fin says:</div>
                      <div className="text-sm text-gray-700">
                        If you invest €{Math.round(amount / timeToGoal)} daily for 5 years at 7% annual return, you could have{" "}
                        <span className="font-bold text-blue-600">
                          €{Math.round((amount / timeToGoal) * 365 * 5 * 1.07).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
