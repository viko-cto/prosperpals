import { motion } from "motion/react";
import { Loader2, RefreshCw } from "lucide-react";

// SHIMMER EFFECT KEYFRAMES
const shimmerAnimation = {
  backgroundPosition: ["200% 0", "-200% 0"],
};

// SKELETON CARD - Generic placeholder with shimmer
export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#2a2a3a] rounded-xl overflow-hidden ${className}`}>
      <motion.div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={shimmerAnimation}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// SKELETON TEXT LINE
export function SkeletonText({ 
  width = "100%", 
  height = "16px",
  className = "" 
}: { 
  width?: string; 
  height?: string;
  className?: string;
}) {
  return (
    <div 
      className={`bg-[#2a2a3a] rounded overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <motion.div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={shimmerAnimation}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// SKELETON TRANSACTION ROW
export function SkeletonTransaction() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {/* Icon placeholder */}
          <SkeletonCard className="w-12 h-12 rounded-full flex-shrink-0" />
          
          {/* Text placeholders */}
          <div className="flex-1 space-y-2">
            <SkeletonText width="40%" height="18px" />
            <SkeletonText width="25%" height="14px" />
          </div>
        </div>
        
        {/* Amount placeholder */}
        <SkeletonText width="80px" height="20px" />
      </div>
    </div>
  );
}

// SKELETON GOAL CARD
export function SkeletonGoal() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="flex items-start gap-4 mb-4">
        <SkeletonCard className="w-16 h-16 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <SkeletonText width="60%" height="20px" />
          <SkeletonText width="40%" height="14px" />
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <SkeletonText width="30%" height="12px" />
          <SkeletonText width="20%" height="12px" />
        </div>
        <SkeletonCard className="h-2 rounded-full" />
      </div>
    </div>
  );
}

// SKELETON ACCOUNT CARD
export function SkeletonAccount() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <SkeletonCard className="w-12 h-12 rounded-full" />
          <div className="space-y-2">
            <SkeletonText width="150px" height="16px" />
            <SkeletonText width="100px" height="12px" />
          </div>
        </div>
        <SkeletonText width="100px" height="24px" />
      </div>
      
      <div className="pt-4 border-t border-white/10">
        <SkeletonText width="70%" height="12px" />
      </div>
    </div>
  );
}

// COMPANION THINKING STATE
export function CompanionThinking({ 
  companion = "goldie",
  message 
}: { 
  companion?: "goldie" | "fin";
  message?: string;
}) {
  const isGoldie = companion === "goldie";
  const bgGradient = isGoldie 
    ? "from-yellow-400 to-yellow-600" 
    : "from-blue-400 to-blue-700";
  const dotColor = isGoldie ? "#fbbf24" : "#3b82f6";
  const companionName = isGoldie ? "Goldie" : "Fin";
  const emoji = isGoldie ? "🪙" : "🐋";

  return (
    <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl max-w-md">
      {/* Avatar */}
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${bgGradient} flex items-center justify-center flex-shrink-0 text-2xl shadow-lg`}>
        {emoji}
      </div>
      
      {/* Thinking content */}
      <div className="flex-1">
        <div className="text-sm text-white/60 mb-2">
          {message || `${companionName} is thinking...`}
        </div>
        
        {/* Bouncing dots */}
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: dotColor }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// BANK SYNC LOADING
export function BankSyncLoading({
  bankName = "Nordea",
  bankLogo = "🏦",
  transactionCount = 847,
  progress = 45,
  estimatedTime = "30 seconds"
}: {
  bankName?: string;
  bankLogo?: string;
  transactionCount?: number;
  progress?: number;
  estimatedTime?: string;
}) {
  return (
    <div className="bg-gradient-to-br from-blue-500/10 via-white/5 to-transparent border border-blue-500/20 rounded-2xl p-8 max-w-lg mx-auto">
      {/* Bank logo with pulse */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-6xl text-center mb-6"
      >
        {bankLogo}
      </motion.div>

      {/* Status text */}
      <div className="text-center mb-2">
        <h3 className="text-xl font-bold text-white mb-1">
          Syncing {bankName}
        </h3>
        <p className="text-sm text-white/60">
          Processing {transactionCount.toLocaleString()} transactions...
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-white/60 mb-2">
          <span>{progress}% complete</span>
          <span>~{estimatedTime} remaining</span>
        </div>
        
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2">
        {[
          { label: "Checking account", status: progress > 30 ? "✓ Complete" : "In progress..." },
          { label: "Savings account", status: progress > 60 ? "✓ Complete" : "Pending..." },
          { label: "Credit cards", status: progress > 80 ? "✓ Complete" : "Pending..." },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center justify-between text-sm p-2 bg-white/5 rounded-lg"
          >
            <span className="text-white/80">{item.label}</span>
            <span className={progress > (30 + index * 30) ? "text-green-400" : "text-white/40"}>
              {item.status}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Cancel button */}
      <button className="w-full mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 text-sm transition-colors">
        Cancel sync
      </button>
    </div>
  );
}

// DATA REFRESH SPINNER - Gold/Blue gradient
export function DataRefreshSpinner({ 
  variant = "gold",
  size = "md" 
}: { 
  variant?: "gold" | "blue";
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const gradientId = `gradient-${variant}`;
  const colors = variant === "gold" 
    ? ["#fbbf24", "#f59e0b", "#fbbf24"] 
    : ["#3b82f6", "#1d4ed8", "#3b82f6"];

  return (
    <div className="flex items-center justify-center">
      <svg className={sizeClasses[size]} viewBox="0 0 50 50">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="50%" stopColor={colors[1]} />
            <stop offset="100%" stopColor={colors[2]} />
          </linearGradient>
        </defs>
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="90 150"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
}

// PULL TO REFRESH INDICATOR (Mobile)
export function PullToRefreshIndicator({ 
  progress = 0,
  variant = "gold" 
}: { 
  progress?: number;
  variant?: "gold" | "blue";
}) {
  const color = variant === "gold" ? "#fbbf24" : "#3b82f6";
  const isActive = progress >= 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ 
        opacity: progress > 0 ? 1 : 0,
        y: progress > 0 ? 0 : -40 
      }}
      className="flex flex-col items-center justify-center py-4"
    >
      {/* Circular progress */}
      <div className="relative w-12 h-12 mb-2">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 50 50">
          {/* Background circle */}
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="3"
          />
          {/* Progress circle */}
          <motion.circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${(Math.min(progress, 100) / 100) * 125.6} 125.6`}
            animate={isActive ? { rotate: 360 } : {}}
            transition={isActive ? {
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            } : {}}
          />
        </svg>
        
        {/* Icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isActive ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-5 h-5" style={{ color }} />
            </motion.div>
          ) : (
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              ↓
            </motion.div>
          )}
        </div>
      </div>

      {/* Status text */}
      <div className="text-xs text-white/60">
        {isActive ? "Release to refresh" : "Pull to refresh"}
      </div>
    </motion.div>
  );
}

// FULL PAGE LOADING
export function FullPageLoading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-[#0f0f1a] flex items-center justify-center z-50">
      <div className="text-center">
        <DataRefreshSpinner variant="gold" size="lg" />
        <p className="text-white/60 mt-4">{message}</p>
      </div>
    </div>
  );
}

// INLINE LOADING SPINNER
export function InlineSpinner({ 
  variant = "gold",
  size = "sm",
  className = "" 
}: { 
  variant?: "gold" | "blue";
  size?: "sm" | "md";
  className?: string;
}) {
  const color = variant === "gold" ? "#fbbf24" : "#3b82f6";
  const sizeClass = size === "sm" ? "w-4 h-4" : "w-6 h-6";

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizeClass} ${className}`}
    >
      <Loader2 style={{ color, width: "100%", height: "100%" }} />
    </motion.div>
  );
}

// SKELETON DASHBOARD LAYOUT
export function SkeletonDashboard() {
  return (
    <div className="space-y-6 p-8">
      {/* Header */}
      <div className="space-y-2">
        <SkeletonText width="300px" height="32px" />
        <SkeletonText width="200px" height="16px" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} className="h-32" />
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <SkeletonText width="150px" height="20px" />
          {[1, 2, 3].map((i) => (
            <SkeletonTransaction key={i} />
          ))}
        </div>
        <SkeletonCard className="h-96" />
      </div>
    </div>
  );
}

// SKELETON LEADERBOARD
export function SkeletonLeaderboard() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <SkeletonCard className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <SkeletonText width="40%" height="16px" />
              <SkeletonText width="25%" height="12px" />
            </div>
            <SkeletonText width="60px" height="20px" />
          </div>
        </div>
      ))}
    </div>
  );
}
