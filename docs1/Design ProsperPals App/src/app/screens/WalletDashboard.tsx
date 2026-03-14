import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  TrendingDown, 
  ChevronRight,
  Lock,
  Sparkles,
  ShoppingBag,
  BarChart3,
  Gift,
  Trophy,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  ExternalLink,
  RefreshCw,
  Check
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CircularProgress } from "../components/CircularProgress";
import { GoldieAvatar } from "../components/GoldieAvatar";

/**
 * MICRO-INTERACTION ANNOTATIONS FOR WALLET DASHBOARD
 * 
 * SCREEN ENTRY:
 *   - Tab bar: instant visibility
 *   - Active tab content: opacity 0→1, 250ms ease-out-quart
 *   - Stat tiles: stagger translateX(-8px)→0, opacity 0→1, 40ms between, 300ms
 * 
 * TAB BAR:
 *   - Tab switching: outgoing opacity 1→0, translateX→(-20px), 150ms
 *   - Incoming: opacity 0→1, translateX(+20px)→0, 250ms, delay 50ms
 *   - Active pill: slides to new position, 200ms ease-in-out
 * 
 * BALANCE HERO:
 *   - Entry: count up 0→value, 1000ms ease-out
 *   - Tab switch: cross-fade old/new values
 * 
 * STAT TILES:
 *   - Hover: background brightens, border brightens, translateY(-2px), 180ms
 *   - Tooltip: "As of today, 10:41 AM"
 * 
 * BANK ACCOUNT CARDS:
 *   - Hover: translateY(-3px), shadow deepens, 180ms
 *   - Sync status dot: green pulse animation, 3000ms infinite
 *   - Sync button: spinner on loading, checkmark on complete
 * 
 * VIRTUAL ASSETS:
 *   - Coin count: 0→4,521 over 1000ms ease-out
 *   - Balance card hover: sparkle rotates 360deg
 *   - NFT badges: scale hover, modal expansion on tap
 */

export function WalletDashboard() {
  const [activeTab, setActiveTab] = useState<"cashflow" | "virtual">("cashflow");

  const easeOutQuart = [0.25, 1, 0.5, 1];

  return (
    <div className="flex-1 flex">
      {/* Main Content Area */}
      <div className="flex-1 bg-[#0f0f1a] overflow-auto">
        <div className="max-w-6xl mx-auto p-8 space-y-6">
          {/* Header - Instant */}
          <div className="space-y-2">
            <h1 
              className="text-3xl font-bold text-white flex items-center gap-2"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              Your Wallet 👛
            </h1>
            <p 
              className="text-white/60"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              Real money meets rewards
            </p>
          </div>

          {/* TAB TOGGLE - Instant with sliding indicator */}
          <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* TAB CONTENT - Animated transitions */}
          <AnimatePresence mode="wait">
            {activeTab === "cashflow" ? (
              <CashFlowTab key="cashflow" />
            ) : (
              <VirtualAssetsTab key="virtual" />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Panel - Wallet Health Score */}
      <WalletHealthPanel />
    </div>
  );
}

/**
 * TAB BAR with sliding indicator
 */
function TabBar({
  activeTab,
  setActiveTab
}: {
  activeTab: "cashflow" | "virtual";
  setActiveTab: (tab: "cashflow" | "virtual") => void;
}) {
  return (
    <div className="relative flex gap-2 bg-[rgba(26,26,46,0.6)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-[14px] p-1 w-fit">
      {/* Sliding indicator background */}
      <motion.div
        className="absolute top-1 bottom-1 bg-gradient-to-br from-[#FFD700] to-[#F59E0B] rounded-[10px]"
        initial={false}
        animate={{
          left: activeTab === "cashflow" ? 4 : "calc(50% + 2px)",
          right: activeTab === "cashflow" ? "calc(50% + 2px)" : 4
        }}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
      />

      {/* Cash Flow Tab */}
      <motion.button
        onClick={() => setActiveTab("cashflow")}
        className="relative z-10 flex items-center gap-2 px-[18px] py-2 rounded-[10px] h-[36px] transition-colors duration-120"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: activeTab === "cashflow" ? 600 : 400,
          color: activeTab === "cashflow" ? "#000000" : "#9CA3AF"
        }}
        whileHover={activeTab !== "cashflow" ? {
          backgroundColor: "rgba(255,255,255,0.06)",
          color: "#FFFFFF",
          transition: { duration: 0.12 }
        } : {}}
      >
        <span className="text-base">💰</span>
        Cash Flow
      </motion.button>

      {/* Virtual Assets Tab */}
      <motion.button
        onClick={() => setActiveTab("virtual")}
        className="relative z-10 flex items-center gap-2 px-[18px] py-2 rounded-[10px] h-[36px] transition-colors duration-120"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: activeTab === "virtual" ? 600 : 400,
          color: activeTab === "virtual" ? "#000000" : "#9CA3AF"
        }}
        whileHover={activeTab !== "virtual" ? {
          backgroundColor: "rgba(255,255,255,0.06)",
          color: "#FFFFFF",
          transition: { duration: 0.12 }
        } : {}}
      >
        <span className="text-base">✨</span>
        Virtual Assets
      </motion.button>
    </div>
  );
}

/**
 * CASH FLOW TAB
 * Staggered entry animations for stat tiles
 */
function CashFlowTab() {
  const [expandedAccount, setExpandedAccount] = useState<number | null>(null);

  const monthlyData = [
    { month: "Sep", income: 2500, expenses: 1850 },
    { month: "Oct", income: 2500, expenses: 1920 },
    { month: "Nov", income: 2500, expenses: 1780 },
    { month: "Dec", income: 3200, expenses: 2100 },
    { month: "Jan", income: 2500, expenses: 1850 },
    { month: "Feb", income: 2500, expenses: 1850 },
  ];

  const accounts = [
    {
      id: 1,
      icon: "🏦",
      name: "Nordea — Checking",
      balance: 3240.00,
      lastSync: "2 min ago",
      syncStatus: "active" as const,
      income: 2500,
      outflow: 1720,
    },
    {
      id: 2,
      icon: "🏦",
      name: "Danske Bank — Savings",
      balance: 4200.00,
      lastSync: "5 min ago",
      syncStatus: "active" as const,
      interestRate: 2.1,
      transferred: 200,
    },
    {
      id: 3,
      icon: "💳",
      name: "Revolut — Card",
      balance: 1010.32,
      lastSync: "1 hour ago",
      syncStatus: "active" as const,
      creditLimit: 3000,
      spent: 890,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
      className="space-y-6"
    >
      {/* TOP SUMMARY ROW - Staggered stat tiles */}
      <div className="grid grid-cols-4 gap-4">
        <StatTile
          label="Total Balance"
          value={8450.32}
          subtitle="Across all accounts"
          variant="green"
          delay={0}
        />
        <StatTile
          label="Monthly Income"
          value={2500.00}
          variant="green"
          icon={<TrendingUp className="w-4 h-4 text-green-400" />}
          delay={0.04}
        />
        <StatTile
          label="Monthly Expenses"
          value={1850.00}
          variant="red"
          icon={<TrendingDown className="w-4 h-4 text-red-400" />}
          delay={0.08}
        />
        <StatTile
          label="Disposable"
          value={500.00}
          subtitle="After fixed expenses & savings"
          variant="gold"
          delay={0.12}
        />
      </div>

      {/* DISPOSABLE INCOME BREAKDOWN */}
      <DisposableBreakdown />

      {/* ACCOUNTS OVERVIEW */}
      <div className="space-y-3">
        <h3 
          className="text-lg font-semibold text-white"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          Accounts Overview
        </h3>
        
        {accounts.map((account, index) => (
          <BankAccountCard
            key={account.id}
            account={account}
            isExpanded={expandedAccount === account.id}
            onToggle={() => setExpandedAccount(expandedAccount === account.id ? null : account.id)}
            delay={0.16 + index * 0.05}
          />
        ))}
      </div>

      {/* MONTHLY CASH FLOW CHART */}
      <motion.div
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
      >
        <h3 
          className="text-lg font-semibold text-white mb-6"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          Monthly Cash Flow
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(26, 26, 46, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Bar dataKey="income" fill="#22c55e" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span className="text-white/70" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded" />
            <span className="text-white/70" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>Expenses</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * STAT TILE with count-up, hover, and tooltip
 */
function StatTile({
  label,
  value,
  subtitle,
  variant,
  icon,
  delay = 0
}: {
  label: string;
  value: number;
  subtitle?: string;
  variant: "green" | "red" | "gold";
  icon?: React.ReactNode;
  delay?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  // Count-up animation
  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const variantStyles = {
    green: "from-green-500/10 via-white/5 to-transparent border-green-500/20",
    red: "from-red-500/10 via-white/5 to-transparent border-red-500/20",
    gold: "from-yellow-500/10 via-white/5 to-transparent border-yellow-500/30 shadow-[0_0_30px_rgba(255,215,0,0.1)]"
  };

  const textColor = {
    green: "text-green-400",
    red: "text-red-400",
    gold: "text-yellow-400"
  };

  return (
    <motion.div
      className={`relative bg-gradient-to-br ${variantStyles[variant]} backdrop-blur-xl border rounded-xl p-6 cursor-pointer`}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1], delay }}
      whileHover={{
        backgroundColor: "rgba(255,255,255,0.04)",
        borderColor: "rgba(255,255,255,0.18)",
        y: -2,
        transition: { duration: 0.18, ease: [0.25, 1, 0.5, 1] }
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
        {label}
        {icon}
      </div>
      <div 
        className={`text-3xl font-bold ${textColor[variant]} mb-1`}
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
      >
        €{displayValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      {subtitle && (
        <div 
          className="text-xs text-white/50"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
        >
          {subtitle}
        </div>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1a1a2e] border border-white/10 rounded-lg text-xs text-white whitespace-nowrap z-10"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            As of today, 10:41 AM
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * DISPOSABLE BREAKDOWN with Goldie suggestion
 */
function DisposableBreakdown() {
  return (
    <motion.div
      className="bg-gradient-to-br from-yellow-500/10 via-white/5 to-transparent backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(255,215,0,0.1)]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
    >
      <h3 
        className="text-xl font-semibold text-white mb-6"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
      >
        How your disposable €500 breaks down this month
      </h3>

      {/* Horizontal Stacked Bar */}
      <div className="mb-6">
        <div className="flex h-16 rounded-xl overflow-hidden border border-white/10">
          <div 
            className="bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center relative group"
            style={{ width: "62.4%" }}
          >
            <span className="text-sm font-semibold text-white">€312 spent</span>
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Already spent this month
            </div>
          </div>
          <div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center relative group"
            style={{ width: "37.6%" }}
          >
            <span className="text-sm font-semibold text-[#1a1a2e]">€188 remaining</span>
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Available for fun
            </div>
          </div>
        </div>
      </div>

      {/* Goldie Note */}
      <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <GoldieAvatar size={40} animate />
          <div className="flex-1">
            <p 
              className="text-white/90 mb-3"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              You have <span className="font-bold text-yellow-400">€188</span> left for fun this month. Want to set aside €50 for your Greece trip?
            </p>
            <div className="flex items-center gap-3">
              <QuickActionButton variant="primary">
                Yes, sweep it!
              </QuickActionButton>
              <QuickActionButton variant="secondary">
                No thanks
              </QuickActionButton>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * QUICK ACTION BUTTON
 */
function QuickActionButton({
  children,
  variant,
  onClick
}: {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  onClick?: () => void;
}) {
  return (
    <motion.button
      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
        variant === "primary"
          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1a1a2e]"
          : "bg-white/5 border border-white/10 text-white/80"
      }`}
      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
      whileHover={
        variant === "primary"
          ? {
              boxShadow: "0 0 15px rgba(255,215,0,0.3)",
              transition: { duration: 0.15 }
            }
          : {
              backgroundColor: "rgba(255,255,255,0.06)",
              borderColor: "rgba(255,255,255,0.18)",
              scale: 1.02,
              transition: { duration: 0.15, ease: [0.25, 1, 0.5, 1] }
            }
      }
      whileTap={{
        scale: 0.97,
        transition: { duration: 0.08 }
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

/**
 * BANK ACCOUNT CARD with hover, sync animation
 */
function BankAccountCard({
  account,
  isExpanded,
  onToggle,
  delay
}: {
  account: any;
  isExpanded: boolean;
  onToggle: () => void;
  delay: number;
}) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncComplete(true);
      setTimeout(() => setSyncComplete(false), 2000);
    }, 1500);
  };

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1], delay }}
      whileHover={{
        y: -3,
        borderColor: "rgba(255,255,255,0.20)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        transition: { duration: 0.18, ease: [0.25, 1, 0.5, 1] }
      }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-3xl">{account.icon}</span>
            <div>
              <div 
                className="font-semibold text-white mb-1"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {account.name}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span 
                  className="text-white/50"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  Last sync: {account.lastSync}
                </span>
                <span className="flex items-center gap-1">
                  {/* Connected status dot with pulse */}
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [1, 0.6, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </span>
                {/* Sync button */}
                <motion.button
                  className="text-white/50 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSync}
                >
                  {isSyncing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </motion.div>
                  ) : syncComplete ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <Check className="w-4 h-4 text-green-400" />
                    </motion.div>
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div 
              className="text-2xl font-bold text-white"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              €{account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            {account.income !== undefined && (
              <span 
                className="text-white/70"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                This month: <span className="text-green-400">+€{account.income} income</span>, <span className="text-red-400">-€{account.outflow} out</span>
              </span>
            )}
            {account.interestRate !== undefined && (
              <span 
                className="text-white/70"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Interest rate: <span className="text-green-400">{account.interestRate}% APY</span>
              </span>
            )}
            {account.creditLimit !== undefined && (
              <span 
                className="text-white/70"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Credit limit: €{account.creditLimit.toLocaleString()}
              </span>
            )}
            <motion.button 
              onClick={onToggle}
              className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors"
              whileHover={{
                x: 3,
                transition: { duration: 0.12, ease: [0.25, 1, 0.5, 1] }
              }}
            >
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>View transactions</span>
              <motion.div
                animate={{ x: isExpanded ? 0 : 3 }}
                transition={{ duration: 0.12 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * VIRTUAL ASSETS TAB
 * Coin count-up, NFT badge grid, sparkle rotation
 */
function VirtualAssetsTab() {
  const [coinBalance, setCoinBalance] = useState(0);
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);

  const nftBadges = [
    { id: 1, name: "First Budget", rarity: "Common", earned: "Jan 15, 2026", icon: "🥉", unlocked: true },
    { id: 2, name: "Perfect Week", rarity: "Uncommon", earned: "Jan 22, 2026", icon: "⭐", unlocked: true },
    { id: 3, name: "30-Day Streak", rarity: "Rare", earned: "Feb 10, 2026", icon: "🥈", unlocked: true },
    { id: 4, name: "Budget Master", rarity: "Epic", requirement: "Stay under budget for 60 days", icon: "🏅", unlocked: false },
    { id: 5, name: "Investor Pro", rarity: "Legendary", requirement: "Complete all investing lessons", icon: "🏆", unlocked: false },
  ];

  // Coin count-up animation
  useEffect(() => {
    const target = 4521;
    const duration = 1000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCoinBalance(target);
        clearInterval(timer);
      } else {
        setCoinBalance(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
      className="space-y-6"
    >
      {/* TOP SUMMARY ROW */}
      <div className="grid grid-cols-3 gap-4">
        {/* ProsperCoins with sparkle rotation on hover */}
        <motion.div
          className="bg-gradient-to-br from-yellow-500/10 via-white/5 to-transparent backdrop-blur-xl border border-yellow-500/30 rounded-xl p-6 shadow-[0_0_30px_rgba(255,215,0,0.1)] cursor-pointer"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1], delay: 0 }}
          whileHover={{
            boxShadow: "0 0 40px rgba(255,215,0,0.2)",
            transition: { duration: 0.2 }
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <motion.span 
              className="text-3xl"
              whileHover={{
                rotate: 360,
                transition: { duration: 0.6, ease: "easeOut" }
              }}
            >
              ✨
            </motion.span>
            <div 
              className="text-sm text-white/60"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              ProsperCoins
            </div>
          </div>
          <div 
            className="text-4xl font-bold text-yellow-400 mb-2"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            {coinBalance.toLocaleString()} PC
          </div>
          <motion.div 
            className="flex items-center gap-1 text-sm text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.2 }}
          >
            <TrendingUp className="w-4 h-4" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>+350 this week</span>
          </motion.div>
        </motion.div>

        {/* ProsperGold */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1], delay: 0.04 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">🏆</span>
            <div 
              className="text-sm text-white/60"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              ProsperGold
            </div>
          </div>
          <div 
            className="text-4xl font-bold text-gray-400 mb-2 flex items-center gap-2"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            0 PG
            <Lock className="w-5 h-5" />
          </div>
          <div 
            className="text-xs text-white/50"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            Earn by completing Prosperity Keys
          </div>
        </motion.div>

        {/* NFT Achievements */}
        <motion.div
          className="bg-gradient-to-br from-purple-500/10 via-white/5 to-transparent backdrop-blur-xl border border-purple-500/20 rounded-xl p-6"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1], delay: 0.08 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">🎖️</span>
            <div 
              className="text-sm text-white/60"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              NFT Achievements
            </div>
          </div>
          <div 
            className="text-4xl font-bold text-purple-400 mb-2"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            3 earned
          </div>
          <div className="flex items-center gap-1">
            {nftBadges.filter(b => b.unlocked).map((badge) => (
              <div key={badge.id} className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-lg">
                {badge.icon}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* NFT ACHIEVEMENT SHOWCASE with modal expansion */}
      <motion.div
        className="bg-gradient-to-br from-purple-500/10 via-white/5 to-transparent backdrop-blur-xl border border-purple-500/20 rounded-xl p-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
      >
        <h3 
          className="text-xl font-semibold text-white mb-2 flex items-center gap-2"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          <Trophy className="w-6 h-6 text-purple-400" />
          Your Soulbound Tokens
        </h3>
        <p 
          className="text-xs text-white/50 mb-6"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
        >
          These are non-transferable achievements permanently on Base L2
        </p>

        <div className="grid grid-cols-5 gap-4">
          {nftBadges.map((badge) => (
            <NFTBadgeCard
              key={badge.id}
              badge={badge}
              isSelected={selectedBadge === badge.id}
              onSelect={() => setSelectedBadge(badge.id)}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * NFT BADGE CARD with hover scale and tooltip
 */
function NFTBadgeCard({
  badge,
  isSelected,
  onSelect
}: {
  badge: any;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      className={`relative rounded-xl p-4 border transition-all cursor-${badge.unlocked ? 'pointer' : 'not-allowed'} ${
        badge.unlocked
          ? "bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30"
          : "bg-white/5 border-white/10 opacity-40"
      }`}
      whileHover={badge.unlocked ? {
        scale: 1.1,
        y: -4,
        boxShadow: "0 0 0 2px rgba(255,215,0,0.6)",
        transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }
      } : badge.unlocked ? {} : {
        scale: 1.04,
        transition: { duration: 0.2 }
      }}
      whileTap={badge.unlocked ? {
        scale: 0.95,
        transition: { duration: 0.08 }
      } : {}}
      onClick={badge.unlocked ? onSelect : undefined}
      onMouseEnter={() => setShowTooltip(!badge.unlocked)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {!badge.unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl backdrop-blur-sm">
          <Lock className="w-8 h-8 text-white/50" />
        </div>
      )}
      
      <div className="text-4xl mb-3 text-center">
        {badge.icon}
      </div>
      <div 
        className="text-sm font-semibold text-white mb-1 text-center"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
      >
        {badge.name}
      </div>
      <div className={`text-xs mb-2 text-center ${
        badge.rarity === "Common" ? "text-gray-400" :
        badge.rarity === "Uncommon" ? "text-green-400" :
        badge.rarity === "Rare" ? "text-blue-400" :
        badge.rarity === "Epic" ? "text-purple-400" :
        "text-yellow-400"
      }`}>
        {badge.rarity}
      </div>
      {badge.unlocked ? (
        <div 
          className="text-xs text-white/50 text-center"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
        >
          Earned {badge.earned}
        </div>
      ) : (
        <div 
          className="text-xs text-white/50 text-center"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
        >
          {badge.requirement}
        </div>
      )}

      {/* Tooltip for locked badges */}
      <AnimatePresence>
        {showTooltip && !badge.unlocked && (
          <motion.div
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1a1a2e] border border-white/10 rounded-lg text-xs text-white whitespace-nowrap z-10"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            Complete more quests to unlock this badge
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * WALLET HEALTH PANEL
 */
function WalletHealthPanel() {
  const healthFactors = [
    { name: "Emergency fund", status: "good", icon: CheckCircle },
    { name: "Debt ratio", status: "good", icon: CheckCircle },
    { name: "Savings rate", status: "warning", icon: AlertCircle },
    { name: "Investment", status: "bad", icon: XCircle },
  ];

  return (
    <div className="w-80 border-l border-white/10 bg-[#1a1a2e]/50 p-6">
      <div className="bg-gradient-to-br from-yellow-500/10 via-white/5 to-transparent backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(255,215,0,0.1)]">
        <h3 
          className="text-lg font-semibold text-white mb-6"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          Wallet Health Score
        </h3>

        {/* Circular Progress */}
        <div className="flex justify-center mb-6">
          <CircularProgress
            percentage={78}
            size={200}
            centerText="78"
            centerSubtext="/100"
            variant="gold"
            strokeWidth={16}
          />
        </div>

        {/* Health Factors */}
        <div className="space-y-3 mb-6">
          {healthFactors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between">
              <span 
                className="text-sm text-white/80"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                {factor.name}
              </span>
              <factor.icon className={`w-5 h-5 ${
                factor.status === "good" ? "text-green-400" :
                factor.status === "warning" ? "text-yellow-400" :
                "text-red-400"
              }`} />
            </div>
          ))}
        </div>

        {/* Goldie Advice */}
        <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <GoldieAvatar size={32} />
            <p 
              className="text-sm text-white/90"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              Your wallet health is good! Start investing to hit 90+.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
