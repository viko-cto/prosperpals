import React, { useState } from 'react';
import { Plus, DollarSign, Target, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: 'gold' | 'blue' | 'purple';
}

interface FloatingActionButtonProps {
  onAddTransaction?: () => void;
  onSetGoal?: () => void;
  onAskGoldie?: () => void;
  className?: string;
}

const spring = {
  type: "spring",
  stiffness: 260,
  damping: 20
};

export function FloatingActionButton({
  onAddTransaction,
  onSetGoal,
  onAskGoldie,
  className = ''
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions: QuickAction[] = [
    {
      id: 'transaction',
      label: 'Add Transaction',
      icon: <DollarSign className="w-5 h-5" />,
      onClick: () => {
        onAddTransaction?.();
        setIsOpen(false);
      },
      color: 'purple'
    },
    {
      id: 'goal',
      label: 'Set Goal',
      icon: <Target className="w-5 h-5" />,
      onClick: () => {
        onSetGoal?.();
        setIsOpen(false);
      },
      color: 'blue'
    },
    {
      id: 'goldie',
      label: 'Ask Goldie',
      icon: <MessageCircle className="w-5 h-5" />,
      onClick: () => {
        onAskGoldie?.();
        setIsOpen(false);
      },
      color: 'gold'
    }
  ];

  const getActionButtonStyles = (color: QuickAction['color']) => {
    const baseStyles = "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110";
    
    switch (color) {
      case 'gold':
        return `${baseStyles} bg-gradient-to-br from-yellow-400 to-amber-500 text-white hover:shadow-[0_0_20px_rgba(251,191,36,0.5)]`;
      case 'blue':
        return `${baseStyles} bg-gradient-to-br from-blue-500 to-cyan-500 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]`;
      case 'purple':
        return `${baseStyles} bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]`;
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Quick Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3 items-end mb-2"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  x: 0,
                  transition: {
                    ...spring,
                    delay: index * 0.05
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  y: 20, 
                  x: 20,
                  transition: {
                    duration: 0.2,
                    delay: (quickActions.length - index - 1) * 0.05
                  }
                }}
                className="flex items-center gap-3"
              >
                {/* Label */}
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: {
                      delay: index * 0.05 + 0.1
                    }
                  }}
                  exit={{ opacity: 0, x: 10 }}
                  className="px-4 py-2 bg-[var(--theme-card)] backdrop-blur-lg border border-[var(--theme-border)] rounded-full shadow-lg text-sm font-medium whitespace-nowrap text-[var(--theme-text)]"
                  style={{
                    boxShadow: 'var(--theme-shadow-lg)'
                  }}
                >
                  {action.label}
                </motion.span>

                {/* Action Button */}
                <button
                  onClick={action.onClick}
                  className={`${getActionButtonStyles(action.color)} haptic-feedback`}
                  onMouseDown={(e) => {
                    e.currentTarget.classList.add('haptic-tap');
                    setTimeout(() => e.currentTarget.classList.remove('haptic-tap'), 300);
                  }}
                  aria-label={action.label}
                >
                  {action.icon}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 rounded-full 
          bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600
          shadow-2xl
          flex items-center justify-center
          text-white
          transition-all duration-300
          hover:shadow-[0_0_30px_rgba(251,191,36,0.6)]
          relative
          overflow-hidden
          haptic-feedback
        `}
        onMouseDown={(e) => {
          e.currentTarget.classList.add('haptic-tap');
          setTimeout(() => e.currentTarget.classList.remove('haptic-tap'), 300);
        }}
        aria-label={isOpen ? "Close quick actions" : "Open quick actions"}
        aria-expanded={isOpen}
      >
        {/* Gradient Overlay Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Icon */}
        <motion.div
          animate={{
            rotate: isOpen ? 45 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-10"
        >
          {isOpen ? (
            <X className="w-7 h-7" strokeWidth={2.5} />
          ) : (
            <Plus className="w-7 h-7" strokeWidth={2.5} />
          )}
        </motion.div>

        {/* Ripple Effect */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
            }}
          />
        )}
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 -z-10"
            style={{ background: 'rgba(0, 0, 0, 0.2)' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Hook for using FAB with haptic feedback
export function useHapticFeedback() {
  const triggerHaptic = (type: 'success' | 'error' | 'tap' | 'celebration', element?: HTMLElement) => {
    if (!element) return;

    // Remove any existing haptic classes
    element.classList.remove('haptic-success', 'haptic-error', 'haptic-tap', 'haptic-celebration');
    
    // Add the haptic class
    element.classList.add('haptic-feedback', `haptic-${type}`);

    // Remove after animation completes
    const duration = type === 'celebration' ? 800 : type === 'error' ? 500 : type === 'success' ? 400 : 200;
    setTimeout(() => {
      element.classList.remove(`haptic-${type}`);
    }, duration);
  };

  return { triggerHaptic };
}
