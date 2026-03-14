import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface MilestoneStripProps {
  milestone: 50 | 75;
  goalName: string;
  message: string;
  intensity?: "subtle" | "strong";
}

export function MilestoneStrip({ milestone, goalName, message, intensity = "subtle" }: MilestoneStripProps) {
  const isSubtle = intensity === "subtle";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 20 }}
      className={`relative overflow-hidden rounded-xl border-2 ${
        isSubtle 
          ? "bg-gradient-to-r from-yellow-400/10 to-yellow-500/5 border-yellow-400/20" 
          : "bg-gradient-to-r from-yellow-400/20 to-orange-500/10 border-yellow-400/40"
      }`}
    >
      {/* Animated background sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isSubtle ? 3 : 6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 flex items-center gap-4">
        {/* Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.2 }}
          className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
            isSubtle
              ? "bg-gradient-to-br from-yellow-400 to-yellow-500"
              : "bg-gradient-to-br from-yellow-400 to-orange-500"
          }`}
        >
          <div className="text-2xl font-bold text-white">{milestone}%</div>
        </motion.div>

        {/* Text */}
        <div className="flex-1">
          <div className="font-bold text-white text-lg mb-1">
            {milestone === 50 ? "Halfway there!" : "Almost done!"}
          </div>
          <div className="text-white/80 text-sm mb-1">{goalName}</div>
          <div className="text-white/60 text-xs">{message}</div>
        </div>

        {/* Percentage ring */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-14 h-14 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-white/20"
            />
            {/* Progress circle */}
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-white"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 151 }}
              animate={{ strokeDashoffset: 151 - (151 * milestone) / 100 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                strokeDasharray: 151,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs font-bold">{milestone}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
