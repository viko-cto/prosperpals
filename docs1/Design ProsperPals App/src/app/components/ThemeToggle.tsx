import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle({ variant = "compact" }: { variant?: "compact" | "detailed" }) {
  const { theme, effectiveTheme, setTheme } = useTheme();
  const [showPreview, setShowPreview] = useState(false);

  if (variant === "compact") {
    return (
      <button
        onClick={() => setTheme(effectiveTheme === "dark" ? "light" : "dark")}
        className="relative w-14 h-7 bg-white/10 hover:bg-white/15 rounded-full transition-all border border-white/20"
      >
        <motion.div
          animate={{ x: effectiveTheme === "dark" ? 2 : 26 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-lg flex items-center justify-center"
        >
          {effectiveTheme === "dark" ? (
            <Moon className="w-3 h-3 text-[#1a1a2e]" />
          ) : (
            <Sun className="w-3 h-3 text-[#1a1a2e]" />
          )}
        </motion.div>
      </button>
    );
  }

  return (
    <div className="bg-theme-card border border-theme-border rounded-2xl p-6">
      <h3 className="text-lg font-bold text-theme-text mb-4">Appearance</h3>

      {/* Theme Options */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { id: "light" as const, icon: Sun, label: "Light" },
          { id: "dark" as const, icon: Moon, label: "Dark" },
          { id: "system" as const, icon: Monitor, label: "System" },
        ].map((option) => {
          const Icon = option.icon;
          const isSelected = theme === option.id;

          return (
            <button
              key={option.id}
              onClick={() => setTheme(option.id)}
              className={`relative px-4 py-3 rounded-xl font-semibold transition-all ${
                isSelected
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1a1a2e] shadow-lg"
                  : "bg-white/5 border border-white/10 text-theme-text-secondary hover:bg-white/10"
              }`}
            >
              <Icon className="w-5 h-5 mx-auto mb-1" />
              <div className="text-sm">{option.label}</div>
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </button>
          );
        })}
      </div>

      {/* Preview Toggle */}
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-theme-text-secondary transition-all"
      >
        {showPreview ? "Hide Preview" : "Show Preview"}
      </button>

      {/* Preview */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <ThemePreview />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ThemePreview() {
  const { effectiveTheme } = useTheme();

  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-theme-text-secondary mb-2">
        Preview ({effectiveTheme} mode)
      </div>

      {/* Mini App Preview */}
      <div className="bg-theme-bg rounded-xl p-4 border border-theme-border">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full" />
            <div>
              <div className="text-xs font-bold text-theme-text">ProsperPals</div>
              <div className="text-[10px] text-theme-text-secondary">1,250 PC</div>
            </div>
          </div>
          <div className="w-6 h-6 bg-theme-card rounded-lg" />
        </div>

        {/* Cards */}
        <div className="space-y-2">
          <div className="bg-theme-card border border-theme-border rounded-lg p-3">
            <div className="text-xs font-semibold text-theme-text mb-1">
              Budget Overview
            </div>
            <div className="flex items-baseline gap-1">
              <div className="text-lg font-bold text-green-500">€1,234</div>
              <div className="text-[10px] text-theme-text-secondary">saved</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-lg p-3">
            <div className="text-xs font-semibold text-theme-text">
              🪙 Quick Tip from Goldie
            </div>
            <div className="text-[10px] text-theme-text-secondary mt-1">
              Great job tracking your expenses!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Animated Theme Transition Component
export function ThemeTransition() {
  const { effectiveTheme } = useTheme();

  return (
    <motion.div
      key={effectiveTheme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 pointer-events-none z-[100]"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full ${
          effectiveTheme === "dark"
            ? "bg-[#0f0f1a]"
            : "bg-[#F8FAFC]"
        }`}
      />
    </motion.div>
  );
}
