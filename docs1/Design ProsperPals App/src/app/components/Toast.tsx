import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useEffect } from "react";

export interface ToastProps {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  showUndo?: boolean;
  onUndo?: () => void;
  onClose?: () => void;
}

export function Toast({
  message,
  type = "success",
  duration = 10000,
  showUndo = false,
  onUndo,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!showUndo && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, showUndo, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const colors = {
    success: "from-green-500/20 to-emerald-500/10 border-green-500/30 text-green-400",
    error: "from-red-500/20 to-red-600/10 border-red-500/30 text-red-400",
    info: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`
        flex items-center gap-3 min-w-[320px] max-w-md
        bg-gradient-to-br backdrop-blur-xl border rounded-xl p-4
        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        ${colors[type]}
      `}
    >
      {/* Icon */}
      <div className="flex-shrink-0">{icons[type]}</div>

      {/* Message */}
      <div className="flex-1 text-sm font-medium text-white">
        {message}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {showUndo && onUndo && (
          <button
            onClick={onUndo}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-semibold transition-colors"
          >
            Undo
          </button>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export function ToastContainer({ 
  toasts 
}: { 
  toasts: ToastProps[] 
}) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
