import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "motion/react";
import { 
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Coffee,
  AlertCircle,
  TrendingUp,
  Calendar,
  ArrowLeft,
  X,
  Check,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router";

type Subscription = {
  id: string;
  name: string;
  logo: string;
  cost: number;
  lastUsed: "week" | "month" | "unused"; // green, amber, red
  category: string;
  color: string;
};

export function FlexibleSubscriptions() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: "1",
      name: "Netflix",
      logo: "📺",
      cost: 179,
      lastUsed: "week",
      category: "Entertainment",
      color: "from-[#E50914] to-[#B20710]"
    },
    {
      id: "2",
      name: "Spotify",
      logo: "🎵",
      cost: 119,
      lastUsed: "week",
      category: "Music",
      color: "from-[#1DB954] to-[#1AA34A]"
    },
    {
      id: "3",
      name: "Gym Membership",
      logo: "💪",
      cost: 399,
      lastUsed: "unused",
      category: "Health",
      color: "from-[#FF6B6B] to-[#EE5A52]"
    },
    {
      id: "4",
      name: "Adobe Creative",
      logo: "🎨",
      cost: 599,
      lastUsed: "month",
      category: "Productivity",
      color: "from-[#FF0000] to-[#CC0000]"
    },
    {
      id: "5",
      name: "HelloFresh",
      logo: "🥘",
      cost: 890,
      lastUsed: "unused",
      category: "Food",
      color: "from-[#FF9E16] to-[#FF8800]"
    },
    {
      id: "6",
      name: "The Athletic",
      logo: "⚽",
      cost: 89,
      lastUsed: "unused",
      category: "News",
      color: "from-[#6B7280] to-[#4B5563]"
    },
    {
      id: "7",
      name: "Headspace",
      logo: "🧘",
      cost: 149,
      lastUsed: "month",
      category: "Wellness",
      color: "from-[#F57C00] to-[#E65100]"
    },
  ]);

  const [showCancelHint, setShowCancelHint] = useState(true);

  const totalCost = subscriptions.reduce((sum, sub) => sum + sub.cost, 0);
  const unusedSubscriptions = subscriptions.filter(sub => sub.lastUsed === "unused");
  const unusedCost = unusedSubscriptions.reduce((sum, sub) => sum + sub.cost, 0);
  
  // Coffee context: average coffee = 45 kr
  const coffeesPerWeek = Math.round((totalCost / 45) / 4);

  const handleRemoveSubscription = (id: string) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFF5EB] to-[#FFE8D6] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm px-6 pt-8 pb-6 border-b border-[#FFD9B8]/30">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#8B5A3C] hover:text-[#6B4A2C] transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-[#2C2C2C] mb-2">
            Flexible Subscriptions
          </h1>
          <p className="text-sm text-[#8B5A3C]">
            Your optional recurring expenses
          </p>
        </motion.div>
      </div>

      <div className="px-6 pt-6 space-y-5">
        {/* Total Cost Card with Context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden bg-gradient-to-br from-white to-[#FFF5EB] rounded-[24px] p-6 shadow-[0_4px_20px_rgba(255,145,77,0.12)] border border-[#FFD9B8]/40"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB27D]/10 rounded-full blur-2xl" />
          
          <div className="relative">
            <div className="text-xs font-semibold text-[#D97D3A] mb-2 uppercase tracking-wide flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Monthly Total
            </div>
            <div className="text-4xl font-bold text-[#2C2C2C] mb-3">
              {totalCost.toLocaleString()} kr
            </div>
            <div className="flex items-center gap-2 text-[#8B5A3C]">
              <Coffee className="w-4 h-4" />
              <span className="text-sm">
                That's <span className="font-bold text-[#D97D3A]">{coffeesPerWeek} coffees</span> a week ☕
              </span>
            </div>
          </div>
        </motion.div>

        {/* Horizontal Scrollable Subscription Cards */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-3 px-1"
          >
            <h3 className="text-sm font-bold text-[#6B4A2C] uppercase tracking-wide">
              All Subscriptions ({subscriptions.length})
            </h3>
            <div className="text-xs text-[#A67C52]">Swipe to explore →</div>
          </motion.div>

          <div className="relative -mx-6">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#FFF8F0] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FFE8D6] to-transparent z-10 pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-3 overflow-x-auto px-6 pb-2 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {subscriptions.map((sub, index) => (
                <SubscriptionCard
                  key={sub.id}
                  subscription={sub}
                  index={index}
                  onRemove={handleRemoveSubscription}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Swipe Hint - Only show once or for first unused */}
        {showCancelHint && unusedSubscriptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.5 }}
            className="relative overflow-hidden bg-gradient-to-r from-[#FFE8CC] to-[#FFDDB8] rounded-[20px] p-4 border border-[#FFD9B8]/60"
          >
            <button
              onClick={() => setShowCancelHint(false)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/40 hover:bg-white/60 flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5 text-[#8B5A3C]" />
            </button>

            <div className="flex items-center gap-3">
              <motion.div
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl"
              >
                👉
              </motion.div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#8B5A3C] mb-1">
                  Pro tip: Swipe left to cancel
                </div>
                <div className="text-xs text-[#A67C52]">
                  On unused subscriptions, swipe left to see cancel option
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Goldie's Insight Panel - Curious, Not Judgmental */}
        {unusedSubscriptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden bg-gradient-to-br from-[#FFF5E6] to-[#FFE9CC] rounded-[24px] p-6 shadow-[0_4px_24px_rgba(255,217,61,0.2)] border-2 border-[#FFD93D]/30"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD93D]/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#FFC93D]/10 rounded-full blur-xl" />
            
            <div className="relative flex items-start gap-3">
              {/* Goldie avatar - curious expression */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFD93D] to-[#FFC93D] flex items-center justify-center shadow-lg border-3 border-[#FFED4E] flex-shrink-0"
              >
                {/* Curious, questioning eyes */}
                <div className="relative">
                  <div className="absolute top-0 left-0 right-0 flex justify-center gap-3">
                    <div className="w-2 h-2.5 bg-[#2C2C2C] rounded-full" />
                    <div className="w-2 h-2.5 bg-[#2C2C2C] rounded-full" />
                  </div>
                  {/* Curious smile */}
                  <div className="mt-5 w-7 h-3.5 border-b-[2.5px] border-l-[2.5px] border-[#2C2C2C] rounded-bl-full" />
                </div>
              </motion.div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-xs font-semibold text-[#B8860B] uppercase tracking-wide">
                    Goldie's Observation
                  </div>
                  <Eye className="w-3.5 h-3.5 text-[#D97D3A]" />
                </div>

                <p className="text-[#2C2C2C] leading-relaxed mb-3">
                  I noticed <span className="font-bold text-[#D97D3A]">{unusedSubscriptions.length} subscriptions</span> you haven't used in 30+ days — that's <span className="font-bold">{unusedCost} kr/month</span>.
                </p>

                <p className="text-[#4B5563] text-sm mb-4 leading-relaxed">
                  No judgment! Just curious — want me to flag these for review?
                </p>

                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-[#FFD93D] to-[#FFC93D] hover:from-[#FFC93D] hover:to-[#FFB93D] text-[#2C2C2C] rounded-[16px] py-3 px-4 font-bold text-sm shadow-md hover:shadow-lg transition-all">
                    Flag for review
                  </button>
                  <button className="px-4 bg-white/60 hover:bg-white/80 backdrop-blur-sm text-[#6B4A2C] rounded-[16px] py-3 font-semibold text-sm transition-all border border-[#FFD9B8]/40">
                    Not now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Breakdown by Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/70 backdrop-blur-md border border-[#FFD9B8]/40 rounded-[20px] p-5 shadow-sm"
        >
          <h3 className="text-[#2C2C2C] font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D97D3A]" />
            Usage Breakdown
          </h3>

          <div className="space-y-3">
            {/* Active this week */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="text-sm text-[#4B5563]">Used this week</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#2C2C2C]">
                  {subscriptions.filter(s => s.lastUsed === "week").length}
                </span>
                <span className="text-xs text-[#9CA3AF]">
                  ({subscriptions.filter(s => s.lastUsed === "week").reduce((sum, s) => sum + s.cost, 0)} kr)
                </span>
              </div>
            </div>

            {/* Active this month */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFA726]" />
                <span className="text-sm text-[#4B5563]">Used this month</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#2C2C2C]">
                  {subscriptions.filter(s => s.lastUsed === "month").length}
                </span>
                <span className="text-xs text-[#9CA3AF]">
                  ({subscriptions.filter(s => s.lastUsed === "month").reduce((sum, s) => sum + s.cost, 0)} kr)
                </span>
              </div>
            </div>

            {/* Unused 30+ days */}
            <div className="flex items-center justify-between bg-[#FFF5F5] rounded-[12px] p-3 -mx-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <span className="text-sm text-[#4B5563] font-semibold">Unused 30+ days</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#EF4444]">
                  {unusedSubscriptions.length}
                </span>
                <span className="text-xs text-[#F87171]">
                  ({unusedCost} kr)
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-3"
        >
          <button className="bg-gradient-to-br from-[#FFB27D]/20 to-[#FF9E5E]/10 border border-[#FFB27D]/30 backdrop-blur-xl rounded-[20px] p-4 text-left hover:border-[#FFB27D]/50 transition-all">
            <TrendingUp className="w-6 h-6 text-[#D97D3A] mb-2" />
            <div className="text-[#2C2C2C] text-sm font-bold mb-1">Spending Trends</div>
            <div className="text-[#8B5A3C] text-xs">Last 6 months</div>
          </button>

          <button className="bg-gradient-to-br from-[#FFD93D]/20 to-[#FFC93D]/10 border border-[#FFD93D]/30 backdrop-blur-xl rounded-[20px] p-4 text-left hover:border-[#FFD93D]/50 transition-all">
            <Sparkles className="w-6 h-6 text-[#D97D3A] mb-2" />
            <div className="text-[#2C2C2C] text-sm font-bold mb-1">Add New</div>
            <div className="text-[#8B5A3C] text-xs">Track subscription</div>
          </button>
        </motion.div>

        {/* Helpful Context */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center pb-4"
        >
          <p className="text-xs text-[#A67C52] leading-relaxed">
            These are your fun, flexible expenses. They're worth reviewing, but no guilt here — it's your money, your choices.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Individual Subscription Card Component with Swipe-to-Cancel
function SubscriptionCard({ 
  subscription, 
  index,
  onRemove 
}: { 
  subscription: Subscription;
  index: number;
  onRemove: (id: string) => void;
}) {
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const backgroundColor = useTransform(
    x,
    [-100, 0],
    ["rgba(239, 68, 68, 1)", "rgba(255, 255, 255, 0)"]
  );

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    
    if (info.offset.x < -80) {
      // Swipe threshold reached - show cancel
      setShowCancel(true);
      x.set(-80);
    } else {
      // Snap back
      x.set(0);
      setShowCancel(false);
    }
  };

  const handleCancel = () => {
    // Animate out then remove
    x.set(-200);
    setTimeout(() => {
      onRemove(subscription.id);
    }, 300);
  };

  const lastUsedConfig = {
    week: { color: "bg-[#10B981]", label: "Active", ring: "ring-[#10B981]/20" },
    month: { color: "bg-[#FFA726]", label: "Recent", ring: "ring-[#FFA726]/20" },
    unused: { color: "bg-[#EF4444]", label: "Unused", ring: "ring-[#EF4444]/20" },
  };

  const config = lastUsedConfig[subscription.lastUsed];

  return (
    <div className="relative flex-shrink-0 w-[160px]">
      {/* Cancel button revealed on swipe */}
      {showCancel && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleCancel}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-0 w-12 h-12 rounded-full bg-[#EF4444] flex items-center justify-center shadow-lg"
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>
      )}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + index * 0.05 }}
        style={{ x }}
        drag={subscription.lastUsed === "unused" ? "x" : false}
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        className={`relative bg-white rounded-[20px] p-4 shadow-lg border-2 border-white/80 z-10 ${
          isDragging ? "cursor-grabbing" : subscription.lastUsed === "unused" ? "cursor-grab" : ""
        }`}
      >
        {/* Status indicator */}
        <div className="absolute top-3 right-3">
          <div className={`w-2.5 h-2.5 rounded-full ${config.color} ring-4 ${config.ring}`} />
        </div>

        {/* Logo */}
        <div className={`w-16 h-16 rounded-[16px] bg-gradient-to-br ${subscription.color} flex items-center justify-center text-3xl mb-3 shadow-md`}>
          {subscription.logo}
        </div>

        {/* Info */}
        <div className="mb-2">
          <h4 className="text-[#2C2C2C] font-bold text-sm mb-1 truncate">
            {subscription.name}
          </h4>
          <div className="text-xs text-[#9CA3AF]">{subscription.category}</div>
        </div>

        {/* Cost */}
        <div className="text-[#2C2C2C] font-bold text-lg mb-2">
          {subscription.cost} kr
        </div>

        {/* Last used label */}
        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${
          subscription.lastUsed === "week" ? "bg-[#D1FAE5]" :
          subscription.lastUsed === "month" ? "bg-[#FEF3C7]" :
          "bg-[#FEE2E2]"
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${config.color}`} />
          <span className={`text-[10px] font-semibold ${
            subscription.lastUsed === "week" ? "text-[#059669]" :
            subscription.lastUsed === "month" ? "text-[#D97706]" :
            "text-[#DC2626]"
          }`}>
            {config.label}
          </span>
        </div>

        {/* Swipe hint for unused */}
        {subscription.lastUsed === "unused" && !isDragging && !showCancel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-[#9CA3AF]"
          >
            ← swipe
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
