import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check,
  Lock,
  ChevronRight,
  TrendingUp,
  Users,
  Trophy,
  Sparkles,
  Target,
  Share2,
  ExternalLink,
  Flame,
  Award,
  Crown,
  Zap
} from "lucide-react";

type KeyStatus = "completed" | "in-progress" | "locked";
type RequirementStatus = "completed" | "in-progress" | "locked" | "not-started";

interface Requirement {
  id: string;
  title: string;
  description: string;
  status: RequirementStatus;
  progress?: number;
  maxProgress?: number;
  completedDate?: string;
  coinsEarned?: number;
  actionLabel?: string;
  helperText?: string;
}

interface KeyData {
  id: string;
  name: string;
  tier: "copper" | "silver" | "gold";
  quote: string;
  status: KeyStatus;
  progress: number;
  requirements: Requirement[];
  rewards: string[];
}

export function ProsperityKeys() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [showKeyCompletion, setShowKeyCompletion] = useState(false);
  const [selectedKey, setSelectedKey] = useState<KeyData | null>(null);

  const keys: KeyData[] = [
    {
      id: "copper",
      name: "The Copper Key",
      tier: "copper",
      quote: "First to the key, but not without sacrifice",
      status: "in-progress",
      progress: 50,
      requirements: [
        {
          id: "literacy",
          title: "Complete financial literacy basics",
          description: 'Finished "Budgeting Basics"',
          status: "completed",
          completedDate: "Jan 20",
          coinsEarned: 250
        },
        {
          id: "emergency-fund",
          title: "Build €1,000 emergency fund",
          description: "€330 to go! At your current rate, you'll hit this by March 15.",
          status: "in-progress",
          progress: 670,
          maxProgress: 1000,
          actionLabel: "View Emergency Fund Goal",
          helperText: "Goldie: €330 to go! At your current rate, you'll hit this by March 15."
        },
        {
          id: "first-budget",
          title: "Create first budget that works",
          description: "Budget tracked for 30 days",
          status: "completed",
          completedDate: "Feb 1",
          coinsEarned: 250
        },
        {
          id: "pay-debt",
          title: "Pay off one debt",
          description: "No debts tracked yet",
          status: "not-started",
          actionLabel: "Add a debt to track"
        }
      ],
      rewards: [
        "🥉 Copper avatar frame",
        "📈 'Stable Ground' investment simulations access",
        "💡 Goldie's Advanced Tips",
        "🪙 1,000 ProsperCoins bonus",
        "🏆 Copper Key Soulbound Token (NFT)"
      ]
    },
    {
      id: "silver",
      name: "The Silver Key",
      tier: "silver",
      quote: "A test of character, not of skill",
      status: "locked",
      progress: 0,
      requirements: [
        {
          id: "investment",
          title: "First profitable (virtual) investment",
          description: "Complete Silver Key requirements first",
          status: "locked"
        },
        {
          id: "cash-flow",
          title: "3-month positive cash flow",
          description: "Complete Silver Key requirements first",
          status: "locked"
        },
        {
          id: "help-community",
          title: "Help 5 community members",
          description: "Complete Silver Key requirements first",
          status: "locked"
        },
        {
          id: "mindset",
          title: 'Complete "Wealth Mindset" challenges',
          description: "Complete Silver Key requirements first",
          status: "locked"
        }
      ],
      rewards: [
        "🥈 Silver avatar powers",
        "🚀 'Prosperity Accelerator' tools",
        "🧠 Fin's Elite Strategies",
        "🪙 5,000 ProsperCoins bonus",
        "🏆 Silver Key Soulbound Token (NFT)"
      ]
    },
    {
      id: "gold",
      name: "The Gold Key",
      tier: "gold",
      quote: "The final key requires no fear",
      status: "locked",
      progress: 0,
      requirements: [
        {
          id: "freedom",
          title: "Achieve personal financial freedom metric",
          description: "Complete Silver Key requirements first",
          status: "locked"
        },
        {
          id: "mentor",
          title: "Mentor 10 new players",
          description: "Complete Silver Key requirements first",
          status: "locked"
        },
        {
          id: "passive-income",
          title: "Create passive income stream",
          description: "Complete Silver Key requirements first",
          status: "locked"
        },
        {
          id: "legacy",
          title: 'Complete "Legacy Challenge"',
          description: "Complete Silver Key requirements first",
          status: "locked"
        }
      ],
      rewards: [
        "👑 Gold avatar transformation",
        "⭐ 'Prosperity Master' title",
        "🪙 25,000 ProsperCoins bonus",
        "🏆 Gold Key Soulbound Token (NFT) — Legendary rarity"
      ]
    }
  ];

  const completedRequirements = keys[0].requirements.filter(r => r.status === "completed").length;
  const totalRequirements = keys[0].requirements.length;

  return (
    <div className="flex-1 flex bg-[#0a0a12]">
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-[#1a1a2e] via-[#0f0f1a] to-[#0a0a12] p-12 overflow-hidden">
          {/* Animated Particles Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Floating Key Illustration */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-8"
            >
              <div className="relative inline-block">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full scale-150" />
                {/* Key icon */}
                <div className="relative text-8xl filter drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">
                  🔑
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]">
              The Prosperity Keys
            </h1>
            <p className="text-xl text-white/70 mb-6">
              Your journey from foundation to financial freedom
            </p>

            {/* Current Status */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-transparent border border-yellow-500/30 rounded-full px-6 py-3 mb-6">
              <span className="text-2xl">🔑</span>
              <span className="text-white font-semibold">Pursuing: The Copper Key</span>
            </div>

            {/* Overall Progress */}
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between text-sm text-white/70 mb-2">
                <span>{completedRequirements} of {totalRequirements} requirements completed</span>
                <span>{Math.round((completedRequirements / totalRequirements) * 100)}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedRequirements / totalRequirements) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-[0_0_20px_rgba(255,215,0,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Three Keys Journey Map */}
        <div className="max-w-5xl mx-auto px-8 py-12">
          <div className="space-y-8">
            {keys.map((key, index) => (
              <KeyCard
                key={key.id}
                keyData={key}
                index={index}
                onRequirementComplete={() => setShowCelebration(true)}
                onKeyComplete={() => {
                  setSelectedKey(key);
                  setShowKeyCompletion(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <RightPanel />

      {/* Celebration Overlays */}
      <AnimatePresence>
        {showCelebration && (
          <RequirementCelebrationOverlay onClose={() => setShowCelebration(false)} />
        )}
        {showKeyCompletion && selectedKey && (
          <KeyCompletionOverlay 
            keyData={selectedKey}
            onClose={() => setShowKeyCompletion(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Key Card Component
function KeyCard({
  keyData,
  index,
  onRequirementComplete,
  onKeyComplete
}: {
  keyData: KeyData;
  index: number;
  onRequirementComplete: () => void;
  onKeyComplete: () => void;
}) {
  const getBorderColor = () => {
    if (keyData.status === "locked") {
      return keyData.tier === "silver" 
        ? "border-gray-400/20" 
        : "border-yellow-500/20";
    }
    return keyData.tier === "copper" 
      ? "border-yellow-600/50" 
      : keyData.tier === "silver" 
      ? "border-gray-400/50" 
      : "border-yellow-400/50";
  };

  const getGlowEffect = () => {
    if (keyData.status === "in-progress") {
      return "shadow-[0_0_40px_rgba(255,215,0,0.2)]";
    }
    if (keyData.status === "locked") {
      return keyData.tier === "silver"
        ? "shadow-[0_0_20px_rgba(192,192,192,0.1)]"
        : "shadow-[0_0_20px_rgba(255,215,0,0.1)]";
    }
    return "";
  };

  const getIcon = () => {
    switch (keyData.tier) {
      case "copper": return "🔑";
      case "silver": return "🔑";
      case "gold": return "🔑";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className={`relative bg-gradient-to-br from-white/5 via-white/5 to-transparent backdrop-blur-xl border-2 ${getBorderColor()} rounded-2xl p-8 ${getGlowEffect()} ${
        keyData.status === "in-progress" ? "animate-pulse-subtle" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{getIcon()}</div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {keyData.name} — "{keyData.tier.charAt(0).toUpperCase() + keyData.tier.slice(1)}"
            </h2>
            <p className="text-[14px] text-[#9CA3AF] italic" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontStyle: 'italic' }}>
              "{keyData.quote}"
            </p>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
          keyData.status === "completed" 
            ? "bg-green-500/20 text-green-400 border border-green-500/30" 
            : keyData.status === "in-progress"
            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
            : "bg-white/5 text-white/50 border border-white/10"
        }`}>
          {keyData.status === "completed" ? "COMPLETED" : keyData.status === "in-progress" ? `IN PROGRESS (${keyData.progress}%)` : "LOCKED"}
        </div>
      </div>

      {/* Requirements */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-semibold text-white/70 mb-3">Requirements:</h3>
        {keyData.requirements.map((req) => (
          <RequirementRow key={req.id} requirement={req} locked={keyData.status === "locked"} />
        ))}
      </div>

      {/* Rewards Preview */}
      <div className="border-t border-white/10 pt-6">
        <h3 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          Rewards:
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {keyData.rewards.map((reward, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                keyData.status === "locked"
                  ? "bg-white/5 border-white/10 text-white/40 blur-[1px]"
                  : "bg-white/5 border-white/10 text-white/80 hover:border-yellow-500/30 hover:bg-yellow-500/5"
              }`}
            >
              {keyData.status === "locked" && <Lock className="w-4 h-4" />}
              <span className="text-sm">{reward}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Requirement Row Component
function RequirementRow({
  requirement,
  locked
}: {
  requirement: Requirement;
  locked: boolean;
}) {
  const getIcon = () => {
    if (locked || requirement.status === "locked") {
      return <Lock className="w-5 h-5 text-white/30" />;
    }
    if (requirement.status === "completed") {
      return <Check className="w-5 h-5 text-green-400" />;
    }
    if (requirement.status === "in-progress") {
      return <div className="w-5 h-5 border-2 border-yellow-400 rounded-full border-t-transparent animate-spin" />;
    }
    return <div className="w-5 h-5 border-2 border-white/30 rounded-full" />;
  };

  return (
    <div className={`p-4 rounded-xl border transition-all ${
      requirement.status === "completed"
        ? "bg-green-500/10 border-green-500/30"
        : requirement.status === "in-progress"
        ? "bg-yellow-500/10 border-yellow-500/30"
        : "bg-white/5 border-white/10"
    } ${locked ? "opacity-50" : ""}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{getIcon()}</div>
        <div className="flex-1">
          <div className="font-semibold text-white mb-1">{requirement.title}</div>
          <div className="text-sm text-white/60 mb-2">{requirement.description}</div>

          {/* Progress Bar */}
          {requirement.progress !== undefined && requirement.maxProgress && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                <span>€{requirement.progress} / €{requirement.maxProgress}</span>
                <span>{Math.round((requirement.progress / requirement.maxProgress) * 100)}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(requirement.progress / requirement.maxProgress) * 100}%` }}
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                />
              </div>
            </div>
          )}

          {/* Helper Text */}
          {requirement.helperText && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2 mb-2">
              <div className="flex items-start gap-2">
                <span className="text-lg">🪙</span>
                <p className="text-xs text-yellow-400">{requirement.helperText}</p>
              </div>
            </div>
          )}

          {/* Completed Badge */}
          {requirement.status === "completed" && (
            <div className="flex items-center gap-4 text-sm">
              <span className="text-green-400">Completed {requirement.completedDate}</span>
              {requirement.coinsEarned && (
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-semibold">
                  🪙 +{requirement.coinsEarned} PC earned
                </span>
              )}
            </div>
          )}

          {/* Action Button */}
          {requirement.actionLabel && requirement.status !== "completed" && !locked && (
            <button className="mt-2 text-sm text-yellow-400 hover:text-yellow-300 flex items-center gap-1 transition-colors">
              {requirement.actionLabel}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Right Panel Component
function RightPanel() {
  return (
    <div className="w-80 border-l border-white/10 bg-[#0a0a12] p-6 space-y-6 overflow-auto">
      {/* Quest Stats */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Your Quest Stats</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">Days on journey</span>
            <span className="text-white font-semibold">28</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">Total ProsperCoins earned</span>
            <span className="text-yellow-400 font-semibold">4,200 PC</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">Achievements unlocked</span>
            <span className="text-white font-semibold">3/24</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">Current streak</span>
            <span className="text-orange-400 font-semibold flex items-center gap-1">
              <Flame className="w-4 h-4" />
              12 days
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">Rank among friends</span>
            <span className="text-white font-semibold">#3 of 12</span>
          </div>
        </div>
      </div>

      {/* Key Keeper Tips */}
      <div className="bg-gradient-to-br from-yellow-500/10 via-white/5 to-transparent border border-yellow-500/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Key Keeper Tips
        </h3>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-xl flex-shrink-0">
            🪙
          </div>
          <div className="flex-1">
            <p className="text-sm text-white/90 mb-3">
              Focus on your emergency fund this week! €330 to go. Try the 'No-Spend Day' challenge to accelerate! 🏃‍♀️
            </p>
            <button className="w-full py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg text-[#1a1a2e] text-sm font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all">
              Start No-Spend Challenge
            </button>
          </div>
        </div>
      </div>

      {/* Community Progress */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Community Progress
        </h3>
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Pursuing Copper Key</span>
            <span className="text-yellow-400 font-semibold">12,450 users</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Pursuing Silver Key</span>
            <span className="text-gray-400 font-semibold">2,300 users</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Prosperity Masters</span>
            <span className="text-yellow-500 font-semibold flex items-center gap-1">
              <Crown className="w-4 h-4" />
              89
            </span>
          </div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <p className="text-sm text-blue-400 text-center">
            You're in the top 25% of Copper Key seekers! 🎯
          </p>
        </div>
      </div>
    </div>
  );
}

// Requirement Celebration Overlay
function RequirementCelebrationOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Radial Light Burst */}
        <div className="absolute inset-0 bg-gradient-radial from-yellow-400/20 via-transparent to-transparent blur-3xl scale-150" />

        {/* Content */}
        <div className="relative bg-gradient-to-br from-yellow-500/20 via-white/10 to-transparent border-2 border-yellow-500/50 rounded-2xl p-8 text-center">
          {/* Key Fragment Animation */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-6xl mb-6"
          >
            🔑
          </motion.div>

          <h2 className="text-3xl font-bold text-yellow-400 mb-2">
            REQUIREMENT UNLOCKED!
          </h2>
          <p className="text-xl text-white mb-4">Build €1,000 emergency fund ✅</p>

          {/* Coin Shower */}
          <div className="relative h-20 mb-4 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, x: Math.random() * 200 - 100, opacity: 0 }}
                animate={{ y: 100, opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
                className="absolute text-2xl"
                style={{ left: "50%" }}
              >
                🪙
              </motion.div>
            ))}
          </div>

          <div className="text-4xl font-bold text-yellow-400 mb-4">+250 ProsperCoins</div>

          <div className="bg-white/10 border border-white/20 rounded-lg p-3 mb-6">
            <p className="text-white/80">Progress update: 3/4 → you're almost there!</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all"
            >
              Continue Quest
            </button>
            <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Key Completion Overlay
function KeyCompletionOverlay({ 
  keyData, 
  onClose 
}: { 
  keyData: KeyData;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Epic Glow */}
        <div className="absolute inset-0 bg-gradient-radial from-yellow-400/30 via-yellow-400/10 to-transparent blur-3xl scale-150" />

        {/* Content */}
        <div className="relative bg-gradient-to-br from-yellow-500/20 via-white/10 to-transparent border-4 border-yellow-500/70 rounded-3xl p-12 text-center">
          {/* 3D Key Animation */}
          <motion.div
            animate={{
              rotateY: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-9xl mb-8 filter drop-shadow-[0_0_40px_rgba(255,215,0,0.8)]"
          >
            🔑
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent"
          >
            THE {keyData.name.toUpperCase()} IS YOURS!
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-white/80 mb-6"
          >
            You've proven your financial foundation. The next challenge awaits...
          </motion.p>

          {/* SBT Minting Notification */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-semibold">NFT Minting</span>
            </div>
            <p className="text-sm text-white/70">
              Your {keyData.name} NFT is being created on Base L2...
            </p>
          </motion.div>

          {/* Coin Celebration */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
            className="text-5xl font-bold text-yellow-400 mb-8"
          >
            +1,000 ProsperCoins! 🎉
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex gap-4"
          >
            <button className="flex-1 py-4 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-400 font-semibold hover:bg-purple-500/30 transition-all flex items-center justify-center gap-2">
              <ExternalLink className="w-5 h-5" />
              View Your NFT
            </button>
            <button className="flex-1 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-semibold hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all">
              Continue to Silver Key
            </button>
            <button className="px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all flex items-center gap-2">
              <Share2 className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}