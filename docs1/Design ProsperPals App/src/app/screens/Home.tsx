import { MessageCircle, Menu, User } from "lucide-react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { GoldieAvatar } from "../components/GoldieAvatar";
import { FinAvatar } from "../components/FinAvatar";

/**
 * MICRO-INTERACTION ANNOTATIONS FOR HOME DASHBOARD
 * 
 * SCREEN ENTRY ANIMATION:
 *   1. Top bar: instant, no animation
 *   2. Page greeting: opacity 0→1, translateY(-8px)→0, delay 0ms, 350ms ease-out-quart
 *   3. Today's Financial Pulse: opacity 0→1, translateY(+16px)→0, delay 80ms, 400ms
 *   4. Chat cards: stagger — Goldie: delay 160ms, Fin: delay 220ms
 *   5. Recent Conversations: opacity 0→1, translateY(+16px)→0, delay 300ms, 350ms
 * 
 * PROSPER COIN BALANCE:
 *   - Entry: count up 0→2,450 over 800ms ease-out
 *   - New coins: number rolls up, gold flash, 600ms
 *   - Hover: scale 1.05, glow, tooltip
 *   - Tap: navigate to Wallet
 * 
 * USER AVATAR:
 *   - Hover: ring brightens, scale 1.06, 150ms
 *   - Tap: dropdown menu slides down
 * 
 * TODAY'S FINANCIAL PULSE CARD:
 *   - Entry: numbers count up from 0, 600ms
 *   - Streak flame: pulse scale 1.0→1.15→1.0, 2000ms loop
 *   - Goldie bubble: typewriter effect, 800ms
 * 
 * CHAT WITH GOLDIE/FIN CARDS:
 *   - Hover: translateY(-4px), shadow, border brightens, avatar scales
 *   - Active: scale 0.97, 80ms
 *   - Release: spring bounce
 * 
 * RECENT CONVERSATIONS:
 *   - Hover: background, left accent line slides in
 *   - Tap: background flash, navigate
 */

interface RecentChat {
  companion: "Goldie" | "Fin";
  message: string;
  time: string;
  fullTimestamp: string;
}

export function Home() {
  const navigate = useNavigate();
  const [coinBalance, setCoinBalance] = useState(2450);
  const [showCoinTooltip, setShowCoinTooltip] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hoveredChat, setHoveredChat] = useState<number | null>(null);

  const recentChats: RecentChat[] = [
    { 
      companion: "Goldie", 
      message: "Great job staying under budget today! You saved €15 🎉",
      time: "2m ago",
      fullTimestamp: "Today at 2:45 PM"
    },
    { 
      companion: "Fin", 
      message: "Ready to learn about compound interest? It's game-changing!",
      time: "1h ago",
      fullTimestamp: "Today at 1:47 PM"
    },
  ];

  const easeOutQuart = [0.25, 1, 0.5, 1];
  const springBounce = [0.34, 1.56, 0.64, 1];

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      {/* TOP BAR - Instant, no animation */}
      <TopBar 
        coinBalance={coinBalance}
        showCoinTooltip={showCoinTooltip}
        setShowCoinTooltip={setShowCoinTooltip}
        showUserMenu={showUserMenu}
        setShowUserMenu={setShowUserMenu}
        onCoinClick={() => navigate("/wallet")}
      />

      <div className="p-8">
        {/* PAGE GREETING - Element 2 */}
        <motion.div
          className="max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: easeOutQuart, delay: 0 }}
        >
          <h1 
            className="text-[28px] font-bold text-white mb-2" 
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            Good morning, Niko 👋
          </h1>
          <p 
            className="text-[#9CA3AF] text-[16px]" 
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            Your financial wellness hub
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* TODAY'S FINANCIAL PULSE - Element 3 */}
          <FinancialPulseCard />

          {/* CHAT WITH COMPANIONS - Elements 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CompanionCard
              companion="goldie"
              title="Chat with Goldie"
              subtitle="Get budgeting advice"
              delay={0.16}
              onClick={() => navigate("/chat-goldie")}
            />
            
            <CompanionCard
              companion="fin"
              title="Chat with Fin"
              subtitle="Learn about investing"
              delay={0.22}
              onClick={() => navigate("/chat-fin")}
            />
          </div>

          {/* RECENT CONVERSATIONS - Element 5 */}
          <motion.div
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: easeOutQuart, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 
                className="text-xl font-bold text-white" 
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                Recent Conversations
              </h2>
              <MessageCircle className="w-5 h-5 text-white/40" />
            </div>

            <div className="space-y-4">
              {recentChats.map((chat, index) => (
                <ConversationRow
                  key={index}
                  chat={chat}
                  index={index}
                  isHovered={hoveredChat === index}
                  onHover={() => setHoveredChat(index)}
                  onLeave={() => setHoveredChat(null)}
                  onClick={() => navigate(`/chat-${chat.companion.toLowerCase()}`)}
                />
              ))}
            </div>
          </motion.div>

          {/* TODAY'S SNAPSHOT */}
          <SnapshotSection />
        </div>
      </div>
    </div>
  );
}

/**
 * TOP BAR COMPONENT
 * Coin balance with count-up, hover tooltip, and user avatar
 */
function TopBar({
  coinBalance,
  showCoinTooltip,
  setShowCoinTooltip,
  showUserMenu,
  setShowUserMenu,
  onCoinClick
}: {
  coinBalance: number;
  showCoinTooltip: boolean;
  setShowCoinTooltip: (show: boolean) => void;
  showUserMenu: boolean;
  setShowUserMenu: (show: boolean) => void;
  onCoinClick: () => void;
}) {
  const [displayedCoins, setDisplayedCoins] = useState(0);

  // Count up animation on mount
  useEffect(() => {
    const duration = 800;
    const steps = 60;
    const increment = coinBalance / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= coinBalance) {
        setDisplayedCoins(coinBalance);
        clearInterval(timer);
      } else {
        setDisplayedCoins(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [coinBalance]);

  return (
    <div className="bg-[#1a1a2e] border-b border-white/10 px-8 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo / Title */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <h1 
            className="text-xl font-bold text-white"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            ProsperPals
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* PROSPER COIN BALANCE */}
          <motion.button
            className="relative flex items-center gap-2 px-4 py-2 bg-[rgba(26,26,46,0.6)] border border-white/10 rounded-lg cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 8px rgba(255,215,0,0.4)",
              transition: { duration: 0.15, ease: [0.25, 1, 0.5, 1] }
            }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setShowCoinTooltip(true)}
            onMouseLeave={() => setShowCoinTooltip(false)}
            onClick={onCoinClick}
          >
            <span className="text-xl">🪙</span>
            <span 
              className="text-[#FFD700] text-lg font-bold"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              {displayedCoins.toLocaleString()}
            </span>

            {/* Tooltip */}
            <AnimatePresence>
              {showCoinTooltip && (
                <motion.div
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1a1a2e] border border-white/10 rounded-lg text-xs text-white whitespace-nowrap"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                >
                  Your ProsperCoin balance
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* USER AVATAR */}
          <div className="relative">
            <motion.button
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#F59E0B] flex items-center justify-center border-2 border-white/40"
              whileHover={{ 
                scale: 1.06,
                borderColor: "rgba(255,215,0,0.6)",
                transition: { duration: 0.15, ease: [0.25, 1, 0.5, 1] }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <User className="w-5 h-5 text-[#1a1a2e]" />
            </motion.button>

            {/* User Menu Dropdown */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-48 bg-[#1a1a2e] border border-white/10 rounded-lg shadow-xl overflow-hidden"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                >
                  <button className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors">
                    Profile
                  </button>
                  <button className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors">
                    Settings
                  </button>
                  <button className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors border-t border-white/10">
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * FINANCIAL PULSE CARD
 * Count-up numbers, flame pulse, typewriter effect
 */
function FinancialPulseCard() {
  const [spendingAmount, setSpendingAmount] = useState(0);
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [typedText, setTypedText] = useState("");

  const fullText = "You're tracking great this week! €188 left for the fun stuff. 🎯 You're 25 PC away from your Copper Key!";

  useEffect(() => {
    // Count up animations
    const duration = 600;
    const steps = 30;
    
    const spendingTarget = 67;
    const budgetTarget = 188;
    const streakTarget = 7;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setSpendingAmount(Math.floor(spendingTarget * progress));
      setBudgetAmount(Math.floor(budgetTarget * progress));
      setStreakDays(Math.floor(streakTarget * progress));

      if (currentStep >= steps) {
        setSpendingAmount(spendingTarget);
        setBudgetAmount(budgetTarget);
        setStreakDays(streakTarget);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const charDelay = 800 / fullText.length; // 800ms total / number of characters
    let currentIndex = 0;

    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, charDelay);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="bg-[rgba(26,26,46,0.6)] backdrop-blur-lg border border-[rgba(255,255,255,0.1)] rounded-2xl p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1], delay: 0.08 }}
    >
      <div className="flex items-center justify-between gap-8 flex-col lg:flex-row">
        {/* Left: Three stat mini-tiles */}
        <div className="flex items-center gap-8 flex-1">
          {/* Today's Spending */}
          <div>
            <div 
              className="text-[#9CA3AF] text-[12px] font-semibold uppercase tracking-wide mb-1" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Today's Spending
            </div>
            <div 
              className="text-white text-[24px] font-extrabold mb-0.5" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}
            >
              €{spendingAmount}
            </div>
            <div 
              className="text-[#10B981] text-[13px]" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              ↓ 12% vs yesterday
            </div>
          </div>

          {/* Budget Left */}
          <div>
            <div 
              className="text-[#9CA3AF] text-[12px] font-semibold uppercase tracking-wide mb-1" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Budget Left
            </div>
            <div 
              className="text-[#FFD700] text-[24px] font-extrabold mb-0.5" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}
            >
              €{budgetAmount}
            </div>
            <div 
              className="text-[#9CA3AF] text-[13px]" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              for fun this month
            </div>
          </div>

          {/* Streak with pulsing flame */}
          <div>
            <div 
              className="text-[#9CA3AF] text-[12px] font-semibold uppercase tracking-wide mb-1" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Streak
            </div>
            <div 
              className="text-[#F59E0B] text-[24px] font-extrabold mb-0.5 flex items-center gap-1" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}
            >
              <motion.span
                animate={{
                  scale: [1.0, 1.15, 1.0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🔥
              </motion.span>
              {streakDays} days
            </div>
            <div 
              className="text-[#9CA3AF] text-[13px]" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              Log today to keep it!
            </div>
          </div>
        </div>

        {/* Right: Goldie insight bubble with typewriter */}
        <div className="flex items-start gap-3 flex-shrink-0 max-w-md">
          <GoldieAvatar size={40} animate />
          <div className="bg-[rgba(26,26,46,0.8)] border border-[rgba(255,215,0,0.2)] rounded-xl p-4">
            <p 
              className="text-white text-[14px] leading-relaxed" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              {typedText}
              {typedText.length < fullText.length && (
                <motion.span
                  className="inline-block w-0.5 h-4 bg-[#FFD700] ml-0.5"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * COMPANION CARD (Goldie/Fin)
 * Hover: lift, shadow, avatar scale, border brighten
 * Active/Release: spring bounce
 */
function CompanionCard({
  companion,
  title,
  subtitle,
  delay,
  onClick
}: {
  companion: "goldie" | "fin";
  title: string;
  subtitle: string;
  delay: number;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isGoldie = companion === "goldie";

  const bgColor = isGoldie ? "rgba(45,26,0,0.4)" : "rgba(74,144,217,0.15)";
  const borderColor = isGoldie ? "#FFD700" : "#4A90D9";
  const borderColorFaded = isGoldie ? "rgba(255,215,0,0.5)" : "rgba(74,144,217,0.5)";
  const shadowColor = isGoldie 
    ? "0 8px 24px rgba(255,215,0,0.25)" 
    : "0 8px 24px rgba(74,144,217,0.25)";

  return (
    <motion.button
      className="rounded-xl p-6 text-left relative overflow-hidden"
      style={{
        backgroundColor: bgColor,
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderTopColor: isHovered ? borderColor : borderColorFaded,
        borderRightWidth: '1px',
        borderRightStyle: 'solid',
        borderRightColor: isHovered ? borderColor : borderColorFaded,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: isHovered ? borderColor : borderColorFaded,
        borderLeftWidth: '4px',
        borderLeftStyle: 'solid',
        borderLeftColor: borderColor,
        transition: 'border-top-color 0.2s ease-out, border-right-color 0.2s ease-out, border-bottom-color 0.2s ease-out'
      }}
      initial={{ opacity: 0, x: isGoldie ? -12 : 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1], delay }}
      whileHover={{
        y: -4,
        boxShadow: shadowColor,
        transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] }
      }}
      whileTap={{
        scale: 0.97,
        y: -2,
        transition: { duration: 0.08 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Avatar with scale on hover */}
      <motion.div 
        className="flex items-center gap-3 mb-3"
        animate={{
          scale: isHovered ? 1.08 : 1.0
        }}
        transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {isGoldie ? (
          <GoldieAvatar size={48} animate={isHovered} />
        ) : (
          <FinAvatar size={48} />
        )}
      </motion.div>

      <h3 
        className="text-lg font-bold text-white mb-1" 
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
      >
        {title}
      </h3>
      <p 
        className="text-sm text-white/60" 
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
      >
        {subtitle}
      </p>
    </motion.button>
  );
}

/**
 * CONVERSATION ROW
 * Hover: background, left accent line, tooltip
 * Tap: flash, navigate
 */
function ConversationRow({
  chat,
  index,
  isHovered,
  onHover,
  onLeave,
  onClick
}: {
  chat: RecentChat;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const [isFlashing, setIsFlashing] = useState(false);
  const isGoldie = chat.companion === "Goldie";
  const accentColor = isGoldie ? "#FFD700" : "#4A90D9";

  const handleClick = () => {
    setIsFlashing(true);
    setTimeout(() => {
      onClick();
    }, 150);
  };

  return (
    <motion.div
      className="relative rounded-lg p-4 cursor-pointer"
      style={{
        backgroundColor: isFlashing 
          ? "rgba(255,215,0,0.08)" 
          : isHovered 
          ? "rgba(255,255,255,0.04)" 
          : "transparent",
        transition: "background-color 0.15s ease-out"
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={handleClick}
    >
      {/* Left accent line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
        style={{ backgroundColor: accentColor }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
      />

      <div className="flex items-start gap-3 pl-2">
        {isGoldie ? (
          <GoldieAvatar size={32} />
        ) : (
          <FinAvatar size={32} />
        )}
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span 
              className="font-bold text-white" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              {chat.companion}
            </span>
            
            {/* Timestamp with tooltip */}
            <div className="relative group">
              <span 
                className="text-xs text-white/50" 
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                {chat.time}
              </span>
              
              {/* Tooltip showing full timestamp */}
              <motion.div
                className="absolute top-full right-0 mt-1 px-2 py-1 bg-[#1a1a2e] border border-white/10 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.15 }}
              >
                {chat.fullTimestamp}
              </motion.div>
            </div>
          </div>
          
          <p 
            className="text-sm text-white/80" 
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            {chat.message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * SNAPSHOT SECTION
 */
function SnapshotSection() {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
    >
      <h2 
        className="text-xl font-bold text-white mb-6" 
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
      >
        Today's Snapshot
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SnapshotCard
          emoji="💰"
          label="Spent Today"
          value="€42.50"
        />
        
        <SnapshotCard
          emoji="🎯"
          label="Budget Left"
          value="€157.50"
          valueColor="text-green-400"
        />
        
        <SnapshotCard
          emoji="🪙"
          label="PC Earned"
          value="+125"
          valueColor="text-yellow-400"
        />
      </div>
    </motion.div>
  );
}

/**
 * SNAPSHOT CARD
 */
function SnapshotCard({
  emoji,
  label,
  value,
  valueColor = "text-white"
}: {
  emoji: string;
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <motion.div
      className="bg-white/5 rounded-lg p-4 text-center cursor-pointer"
      whileHover={{
        backgroundColor: "rgba(255,255,255,0.08)",
        y: -2,
        transition: { duration: 0.15 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="text-2xl mb-2">{emoji}</div>
      <div 
        className="text-sm text-white/60 mb-1" 
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
      >
        {label}
      </div>
      <div 
        className={`text-xl font-bold ${valueColor}`} 
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
      >
        {value}
      </div>
    </motion.div>
  );
}