import { motion } from "motion/react";

interface CircularProgressProps {
  percentage: number; // 0-100
  size?: 120 | 160 | 200; // compact, standard, hero
  centerText?: string;
  centerSubtext?: string;
  variant?: "gold" | "green"; // gold gradient default, green for income/savings
  showGlow?: boolean;
  animate?: boolean;
  strokeWidth?: number;
}

export function CircularProgress({
  percentage,
  size = 160,
  centerText,
  centerSubtext,
  variant = "gold",
  showGlow = true,
  animate = true,
  strokeWidth,
}: CircularProgressProps) {
  const radius = (size - (strokeWidth || getDefaultStrokeWidth(size))) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  function getDefaultStrokeWidth(s: number) {
    if (s === 120) return 10;
    if (s === 160) return 12;
    if (s === 200) return 16;
    return 12;
  }

  const actualStrokeWidth = strokeWidth || getDefaultStrokeWidth(size);

  // Font sizes based on size
  const centerTextSize = size === 120 ? "text-2xl" : size === 160 ? "text-3xl" : "text-4xl";
  const centerSubtextSize = size === 120 ? "text-xs" : "text-sm";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        style={
          showGlow && variant === "gold"
            ? { filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.3))" }
            : showGlow && variant === "green"
            ? { filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.3))" }
            : {}
        }
      >
        <defs>
          <linearGradient id={`goldGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* Background ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={actualStrokeWidth}
          fill="none"
        />

        {/* Progress ring */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          stroke={variant === "gold" ? `url(#goldGradient-${size})` : "#10B981"}
          strokeWidth={actualStrokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={animate ? circumference : offset}
          strokeLinecap="round"
          animate={animate ? { strokeDashoffset: offset } : {}}
          transition={animate ? { duration: 1.5, ease: "easeOut", delay: 0.2 } : {}}
        />
      </svg>

      {/* Center content */}
      {(centerText || centerSubtext) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerText && (
            <div className={`${centerTextSize} font-extrabold text-white leading-none`}>
              {centerText}
            </div>
          )}
          {centerSubtext && (
            <div className={`${centerSubtextSize} text-[#9CA3AF] mt-1`}>
              {centerSubtext}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface LinearProgressProps {
  percentage: number; // 0-100
  variant?: "gold" | "green"; // gold gradient default, green for savings/income
  height?: number; // default 8px
  showLabel?: boolean;
  labelPosition?: "inside" | "outside";
  className?: string;
}

export function LinearProgress({
  percentage,
  variant = "gold",
  height = 8,
  showLabel = false,
  labelPosition = "outside",
  className = "",
}: LinearProgressProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      <div
        className="relative w-full bg-[rgba(255,255,255,0.08)] overflow-hidden"
        style={{
          height: `${height}px`,
          borderRadius: `${height / 2}px`,
        }}
      >
        <motion.div
          className={`h-full ${
            variant === "gold"
              ? "bg-gradient-to-r from-[#FFD700] to-[#F59E0B]"
              : "bg-[#10B981]"
          }`}
          style={{
            borderRadius: `${height / 2}px`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${clampedPercentage}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          {showLabel && labelPosition === "inside" && clampedPercentage > 15 && (
            <div className="absolute inset-0 flex items-center justify-end pr-2">
              <span className="text-xs font-bold text-black">{Math.round(clampedPercentage)}%</span>
            </div>
          )}
        </motion.div>
      </div>
      {showLabel && labelPosition === "outside" && (
        <div className="mt-1 text-right">
          <span className="text-xs font-semibold text-white/70">{Math.round(clampedPercentage)}%</span>
        </div>
      )}
    </div>
  );
}
