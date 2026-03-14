import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles } from "lucide-react";

interface WinToastProps {
  visible: boolean;
  title: string;
  message: string;
  icon?: React.ReactNode;
  coinsEarned?: number;
  onClose: () => void;
  autoDismiss?: boolean;
  duration?: number;
}

export function WinToast({
  visible,
  title,
  message,
  icon = <Sparkles className="w-5 h-5" />,
  coinsEarned,
  onClose,
  autoDismiss = true,
  duration = 4000,
}: WinToastProps) {
  useEffect(() => {
    if (visible && autoDismiss) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, autoDismiss, duration, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed top-6 left-1/2 z-[100] w-full max-w-md px-4"
        >
          <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border-2 border-green-500/30 rounded-2xl shadow-2xl overflow-hidden">
            {/* Progress bar */}
            {autoDismiss && (
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
                className="h-1 bg-gradient-to-r from-yellow-400 to-green-500"
              />
            )}

            {/* Content */}
            <div className="p-4 flex items-start gap-3">
              {/* Icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                {icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 mb-0.5">{title}</div>
                <div className="text-sm text-gray-600">{message}</div>
              </div>

              {/* Coins */}
              {coinsEarned && (
                <div className="flex items-center gap-1 bg-yellow-400/20 px-3 py-1.5 rounded-lg flex-shrink-0">
                  <span className="text-lg">🪙</span>
                  <span className="font-bold text-yellow-700">+{coinsEarned}</span>
                </div>
              )}

              {/* Close button */}
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-900/10 transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Mobile version (top of screen, full width)
export function WinToastMobile({
  visible,
  title,
  message,
  icon = <Sparkles className="w-5 h-5" />,
  coinsEarned,
  onClose,
  autoDismiss = true,
  duration = 4000,
}: WinToastProps) {
  useEffect(() => {
    if (visible && autoDismiss) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, autoDismiss, duration, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed top-0 left-0 right-0 z-[100] px-4 pt-4"
        >
          <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border-2 border-green-500/30 rounded-2xl shadow-2xl overflow-hidden">
            {/* Progress bar */}
            {autoDismiss && (
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
                className="h-1 bg-gradient-to-r from-yellow-400 to-green-500"
              />
            )}

            {/* Content */}
            <div className="p-4 flex items-center gap-3">
              {/* Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                {icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 mb-0.5">{title}</div>
                <div className="text-sm text-gray-600">{message}</div>
              </div>

              {/* Coins */}
              {coinsEarned && (
                <div className="flex items-center gap-1.5 bg-yellow-400/20 px-3 py-2 rounded-lg flex-shrink-0">
                  <span className="text-xl">🪙</span>
                  <span className="font-bold text-yellow-700 text-lg">+{coinsEarned}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
