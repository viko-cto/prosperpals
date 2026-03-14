import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Home as HomeIcon,
  Wallet,
  BarChart3,
  TrendingUp,
  PiggyBank,
  Key,
  CreditCard,
  Trophy,
  Sparkles,
  TrendingUp as TrendingUpIcon,
  TrendingDown,
  Minus,
  UserPlus,
  Crown,
  Target,
  Award,
  Zap,
  Users,
} from "lucide-react";

type LeaderboardUser = {
  rank: number;
  username: string;
  coins: number;
  change: number; // positive = up, negative = down, 0 = no change
  avatar: string;
  trend: number[]; // sparkline data
};

const topThree: LeaderboardUser[] = [
  {
    rank: 1,
    username: "@goldmaster",
    coins: 847293,
    change: 0,
    avatar: "GM",
    trend: [20, 30, 35, 40, 50, 60, 75],
  },
  {
    rank: 2,
    username: "@savequeen",
    coins: 745102,
    change: 1,
    avatar: "SQ",
    trend: [15, 25, 30, 35, 45, 55, 65],
  },
  {
    rank: 3,
    username: "@finmaster",
    coins: 689455,
    change: -1,
    avatar: "FM",
    trend: [10, 20, 30, 35, 40, 50, 60],
  },
];

const leaderboardData: LeaderboardUser[] = [
  { rank: 4, username: "@financefan", coins: 654122, change: 2, avatar: "FF", trend: [30, 35, 40, 45, 50, 55, 65] },
  { rank: 5, username: "@saver_sarah", coins: 612908, change: -1, avatar: "SS", trend: [40, 38, 35, 33, 30, 28, 26] },
  { rank: 6, username: "@investorjoe", coins: 589341, change: 5, avatar: "IJ", trend: [20, 25, 30, 40, 50, 60, 70] },
  { rank: 7, username: "@coinqueen", coins: 567203, change: 1, avatar: "CQ", trend: [25, 30, 35, 40, 42, 45, 48] },
  { rank: 8, username: "@budgetking", coins: 544890, change: 0, avatar: "BK", trend: [30, 30, 31, 30, 30, 31, 30] },
  { rank: 9, username: "@wealthwise", coins: 521677, change: 3, avatar: "WW", trend: [15, 20, 28, 35, 42, 48, 55] },
  { rank: 10, username: "@frugalfiona", coins: 498443, change: -2, avatar: "FI", trend: [45, 40, 38, 35, 32, 30, 28] },
  { rank: 11, username: "@moneyflow", coins: 476210, change: 7, avatar: "MF", trend: [10, 15, 25, 35, 45, 55, 68] },
];

const currentUser = {
  rank: 3847,
  username: "@yourname",
  coins: 4521,
  change: 12,
  avatar: "YN",
  trend: [5, 8, 10, 12, 15, 18, 22],
};

export function Leaderboard() {
  const [scopeFilter, setScopeFilter] = useState("global");
  const [periodFilter, setPeriodFilter] = useState("all-time");
  const [confettiParticles, setConfettiParticles] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    // Generate confetti particles
    const particles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setConfettiParticles(particles);
  }, []);

  const userProgress = (currentUser.coins / 1000000) * 100;

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex">
      {/* LEFT SIDEBAR */}
      <aside className="w-[240px] bg-[#1a1a2e] border-r border-[rgba(255,255,255,0.1)] flex-shrink-0">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl">🗝️</span>
            <span className="text-white font-bold text-xl">ProsperPals</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <NavItem icon={HomeIcon} label="Dashboard" active={false} />
            <NavItem icon={Wallet} label="Wallet" active={false} />
            <NavItem icon={BarChart3} label="Budget Central" active={false} />
            <NavItem icon={TrendingUp} label="Investments" active={false} />
            <NavItem icon={PiggyBank} label="Goals" active={false} />
            <NavItem icon={Key} label="The Keys" active={false} />
            <NavItem icon={Trophy} label="Leaderboard" active={true} />
            <NavItem icon={CreditCard} label="Transactions" active={false} />
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-[1600px] mx-auto">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative backdrop-blur-[20px] bg-gradient-to-br from-[rgba(255,215,0,0.1)] to-[rgba(245,158,11,0.05)] border border-[rgba(255,215,0,0.2)] rounded-[24px] p-8 mb-6 overflow-hidden"
          >
            {/* Animated confetti particles */}
            {confettiParticles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1.5 h-1.5 rounded-full bg-[#FFD700]"
                style={{
                  left: `${particle.x}%`,
                  bottom: 0,
                }}
                animate={{
                  y: [-500, -100],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 4,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h1 className="mb-2">
                  <div className="flex items-center gap-3 mb-1">
                    <Trophy className="w-10 h-10 text-[#FFD700]" />
                    <span className="text-white font-extrabold text-[36px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
                      First to a
                    </span>
                  </div>
                  <div className="text-[#FFD700] font-extrabold text-[52px] leading-none" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
                    Million
                  </div>
                </h1>
                <p className="text-white text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>The Global Race to 1,000,000 ProsperCoins</p>
              </div>

              {/* User's rank badge */}
              <div className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.6)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 min-w-[280px]">
                <div className="text-white font-bold text-xl mb-2">
                  Your Rank: <span className="text-[#FFD700]">#{currentUser.rank.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-6 h-6 text-[#FFD700]" />
                  <div className="text-[#FFD700] font-extrabold text-[28px]">
                    {currentUser.coins.toLocaleString()} PC
                  </div>
                </div>
                <div className="mb-2">
                  <div className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FFD700] to-[#F59E0B]"
                      style={{ width: `${Math.min(userProgress, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9CA3AF]">{userProgress.toFixed(2)}% to 1,000,000 PC</span>
                  <span className="text-[#10B981] font-semibold">Keep climbing! ↗</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 space-y-3"
          >
            {/* Row 1: Scope */}
            <div className="flex items-center gap-2">
              <FilterChip
                icon="🌍"
                label="Global"
                active={scopeFilter === "global"}
                onClick={() => setScopeFilter("global")}
              />
              <FilterChip
                icon="👥"
                label="Friends"
                active={scopeFilter === "friends"}
                onClick={() => setScopeFilter("friends")}
              />
              <FilterChip
                icon="🇪🇺"
                label="Europe"
                active={scopeFilter === "europe"}
                onClick={() => setScopeFilter("europe")}
              />
            </div>

            {/* Row 2: Period */}
            <div className="flex items-center gap-2">
              <FilterChip
                label="Daily"
                active={periodFilter === "daily"}
                onClick={() => setPeriodFilter("daily")}
              />
              <FilterChip
                label="Weekly"
                active={periodFilter === "weekly"}
                onClick={() => setPeriodFilter("weekly")}
              />
              <FilterChip
                label="Monthly"
                active={periodFilter === "monthly"}
                onClick={() => setPeriodFilter("monthly")}
              />
              <FilterChip
                label="All-Time"
                active={periodFilter === "all-time"}
                onClick={() => setPeriodFilter("all-time")}
              />
            </div>
          </motion.div>

          <div className="flex gap-8">
            {/* LEFT COLUMN (70%) */}
            <div className="flex-1" style={{ maxWidth: "70%" }}>
              {/* Top 3 Podium */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative mb-8"
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-radial from-[rgba(255,215,0,0.15)] via-transparent to-transparent blur-3xl" />

                <div className="relative flex items-end justify-center gap-6 px-12 py-8">
                  {/* 2nd Place (Left) */}
                  <PodiumPosition user={topThree[1]} position={2} color="silver" delay={0.5} />

                  {/* 1st Place (Center) */}
                  <PodiumPosition user={topThree[0]} position={1} color="gold" delay={0.4} />

                  {/* 3rd Place (Right) */}
                  <PodiumPosition user={topThree[2]} position={3} color="bronze" delay={0.6} />
                </div>
              </motion.div>

              {/* Rank List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.4)] border border-[rgba(255,255,255,0.1)] rounded-[20px] overflow-hidden"
              >
                {/* Table Header */}
                <div className="grid grid-cols-[80px_80px_1fr_180px_120px_140px] gap-4 px-6 py-4 border-b border-[rgba(255,255,255,0.1)] bg-[rgba(26,26,46,0.6)] sticky top-0 z-10">
                  <div className="text-[#9CA3AF] text-xs uppercase font-semibold tracking-wider">Rank</div>
                  <div className="text-[#9CA3AF] text-xs uppercase font-semibold tracking-wider">Change</div>
                  <div className="text-[#9CA3AF] text-xs uppercase font-semibold tracking-wider">Player</div>
                  <div className="text-[#9CA3AF] text-xs uppercase font-semibold tracking-wider">ProsperCoins</div>
                  <div className="text-[#9CA3AF] text-xs uppercase font-semibold tracking-wider">7-Day Trend</div>
                  <div className="text-[#9CA3AF] text-xs uppercase font-semibold tracking-wider">Action</div>
                </div>

                {/* Rank Rows */}
                <div>
                  {leaderboardData.map((user, index) => (
                    <RankRow key={user.rank} user={user} index={index} />
                  ))}
                </div>

                {/* Separator */}
                <div className="px-6 py-3 bg-[rgba(26,26,46,0.3)]">
                  <div className="text-center text-[#9CA3AF] text-sm">
                    ... 3,836 more users ...
                  </div>
                </div>

                {/* User's Own Row */}
                <div className="bg-[rgba(255,215,0,0.1)] border-l-4 border-[#FFD700]">
                  <RankRow user={currentUser} index={-1} isCurrentUser />
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDEBAR (30%) */}
            <div className="w-[30%] space-y-6 sticky top-8 self-start">
              {/* Your Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.6)] border border-[rgba(255,215,0,0.3)] rounded-[16px] p-6"
              >
                <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FFD700]" />
                  Your Stats
                </h3>

                <div className="space-y-4">
                  <StatRow label="Current Rank" value={`#${currentUser.rank.toLocaleString()}`} />
                  <StatRow label="Total PC Earned" value={`${currentUser.coins.toLocaleString()} PC`} gold />
                  <StatRow label="This Week" value="+487 PC" trend="up" />
                  <StatRow label="Best Rank" value="#3,201" />
                  <StatRow label="Days Active" value="42 days" />
                </div>

                <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.1)]">
                  <div className="text-[#9CA3AF] text-xs mb-2">To reach Top 100:</div>
                  <div className="text-white font-bold text-2xl mb-1">471,689 PC</div>
                  <div className="text-[#9CA3AF] text-xs">You're getting there! 🚀</div>
                </div>
              </motion.div>

              {/* How to Climb Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-gradient-to-br from-[rgba(255,215,0,0.15)] to-[rgba(245,158,11,0.1)] border-2 border-[rgba(255,215,0,0.3)] rounded-[16px] p-6"
              >
                <h3 className="text-[#FFD700] font-bold text-lg mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  How to Climb
                </h3>

                <div className="space-y-3">
                  <ClimbTip icon="💰" text="Log expenses daily for streak bonuses" pc="+20 PC/day" />
                  <ClimbTip icon="📚" text="Complete learning modules" pc="+100 PC each" />
                  <ClimbTip icon="🎯" text="Hit your budget goals" pc="+250 PC" />
                  <ClimbTip icon="📈" text="Make smart virtual investments" pc="+500 PC" />
                  <ClimbTip icon="👥" text="Invite friends to join" pc="+300 PC each" />
                </div>

                <button className="w-full mt-5 h-11 bg-gradient-to-r from-[#FFD700] to-[#F59E0B] text-black font-bold rounded-xl hover:brightness-110 transition-all">
                  Earn More PC Now
                </button>
              </motion.div>

              {/* Competition Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.6)] border border-[rgba(255,255,255,0.1)] rounded-[16px] p-6"
              >
                <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#FFA726]" />
                  Competition Ends In
                </h3>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <TimeUnit value="42" label="Days" />
                  <TimeUnit value="15" label="Hours" />
                  <TimeUnit value="33" label="Mins" />
                </div>

                <div className="text-[#9CA3AF] text-xs leading-relaxed">
                  First place wins <span className="text-[#FFD700] font-bold">€1,000</span> cash prize + exclusive Gold Champion Badge!
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Navigation Item
function NavItem({ icon: Icon, label, active }: { icon: any; label: string; active: boolean }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
        active
          ? "text-[#FFD700] bg-[rgba(255,215,0,0.08)]"
          : "text-[#9CA3AF] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
      }`}
    >
      {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFD700] rounded-r" />}
      <Icon className="w-5 h-5" />
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

// Filter Chip Component
function FilterChip({
  icon,
  label,
  active,
  onClick,
}: {
  icon?: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`h-[36px] px-[18px] rounded-[10px] transition-all duration-200 flex items-center gap-2 ${
        active
          ? "bg-gradient-to-br from-[#FFD700] to-[#F59E0B] text-[#000000] font-semibold"
          : "bg-[rgba(255,255,255,0.08)] text-[#9CA3AF] hover:bg-[rgba(255,255,255,0.12)] hover:text-white"
      }`}
      style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: active ? 600 : 400 }}
    >
      {icon && <span>{icon}</span>}
      {label}
    </motion.button>
  );
}

// Podium Position Component
function PodiumPosition({
  user,
  position,
  color,
  delay,
}: {
  user: LeaderboardUser;
  position: number;
  color: "gold" | "silver" | "bronze";
  delay: number;
}) {
  const colors = {
    gold: {
      ring: "#FFD700",
      text: "#FFD700",
      gradient: "from-[#FFD700] to-[#F59E0B]",
      shadow: "0 0 30px rgba(255,215,0,0.6)",
    },
    silver: {
      ring: "#C0C0C0",
      text: "#C0C0C0",
      gradient: "from-[#E8E8E8] to-[#A8A8A8]",
      shadow: "0 0 20px rgba(192,192,192,0.4)",
    },
    bronze: {
      ring: "#CD7F32",
      text: "#CD7F32",
      gradient: "from-[#CD7F32] to-[#8B5A2B]",
      shadow: "0 0 20px rgba(205,127,50,0.4)",
    },
  };

  const heightClass = position === 1 ? "h-48" : position === 2 ? "h-36" : "h-28";
  const avatarSize = position === 1 ? "w-20 h-20" : "w-16 h-16";
  const theme = colors[color];
  const progress = (user.coins / 1000000) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      className="flex flex-col items-center"
    >
      {/* Avatar with progress ring */}
      <div className="relative mb-3">
        {position === 1 && (
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl"
          >
            👑
          </motion.div>
        )}
        {position === 2 && <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl">🥈</div>}
        {position === 3 && <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl">🥉</div>}

        {/* Progress ring for 1st place */}
        {position === 1 && (
          <svg className="absolute -inset-2" width="96" height="96" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="44" stroke="rgba(255,215,0,0.2)" strokeWidth="3" fill="none" />
            <circle
              cx="48"
              cy="48"
              r="44"
              stroke="#FFD700"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${(progress / 100) * 276} 276`}
              transform="rotate(-90 48 48)"
              style={{ filter: "drop-shadow(0 0 6px rgba(255,215,0,0.8))" }}
            />
          </svg>
        )}

        <div
          className={`${avatarSize} rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-black font-bold border-[3px] relative z-10`}
          style={{ borderColor: theme.ring, boxShadow: theme.shadow }}
        >
          {user.avatar}
        </div>
      </div>

      {/* Username */}
      <div className="text-white font-extrabold mb-1" style={{ fontSize: position === 1 ? "18px" : "16px" }}>
        {user.username}
      </div>

      {/* Coin count */}
      <div
        className="font-extrabold mb-4 flex items-center gap-1"
        style={{ color: theme.text, fontSize: position === 1 ? "22px" : "20px" }}
      >
        {user.coins.toLocaleString()} PC
      </div>

      {/* Percentage */}
      {position === 1 && (
        <div className="text-[#FFD700] text-sm font-semibold mb-4">
          {progress.toFixed(0)}% to goal
        </div>
      )}

      {/* Pedestal */}
      <div
        className={`w-32 ${heightClass} bg-gradient-to-b ${theme.gradient} rounded-t-xl flex items-center justify-center border-t-4`}
        style={{ borderColor: theme.ring, boxShadow: `inset 0 -20px 40px rgba(0,0,0,0.3)` }}
      >
        <div className="text-white font-bold text-[32px] opacity-80">{position}</div>
      </div>
    </motion.div>
  );
}

// Rank Row Component
function RankRow({
  user,
  index,
  isCurrentUser,
}: {
  user: LeaderboardUser;
  index: number;
  isCurrentUser?: boolean;
}) {
  const trendPositive = user.trend[user.trend.length - 1] > user.trend[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 + index * 0.05 }}
      className={`grid grid-cols-[80px_80px_1fr_180px_120px_140px] gap-4 px-6 py-4 transition-all ${
        !isCurrentUser &&
        "hover:bg-[rgba(255,215,0,0.04)] hover:rounded-xl border-b border-[rgba(255,255,255,0.03)]"
      }`}
    >
      {/* Rank */}
      <div className="text-white font-bold text-base flex items-center">
        {user.rank}
      </div>

      {/* Change */}
      <div className="flex items-center">
        {user.change > 0 ? (
          <div className="flex items-center gap-1 text-[#10B981] text-sm font-semibold">
            <TrendingUpIcon className="w-4 h-4" />
            {user.change}
          </div>
        ) : user.change < 0 ? (
          <div className="flex items-center gap-1 text-[#EF4444] text-sm font-semibold">
            <TrendingDown className="w-4 h-4" />
            {Math.abs(user.change)}
          </div>
        ) : (
          <div className="text-[#9CA3AF] text-sm">
            <Minus className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Player */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4A90D9] to-[#2563EB] flex items-center justify-center text-white text-xs font-bold">
          {user.avatar}
        </div>
        <span className="text-white text-[15px] font-medium">{user.username}</span>
      </div>

      {/* ProsperCoins */}
      <div className="flex items-center gap-2 text-white text-[15px]">
        <Sparkles className="w-4 h-4 text-[#FFD700]" />
        {user.coins.toLocaleString()} PC
      </div>

      {/* 7-Day Trend (Sparkline) */}
      <div className="flex items-center">
        <Sparkline data={user.trend} color={trendPositive ? "#10B981" : "#EF4444"} />
      </div>

      {/* Action */}
      <div className="flex items-center">
        {!isCurrentUser && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-8 px-3 border border-[#9CA3AF] text-white text-xs font-semibold rounded-lg hover:border-[#FFD700] hover:text-[#FFD700] transition-all flex items-center gap-1"
          >
            <UserPlus className="w-3 h-3" />
            Add Friend
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

// Sparkline Component
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const width = 40;
  const height = 20;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Stat Row Component
function StatRow({
  label,
  value,
  gold,
  trend,
}: {
  label: string;
  value: string;
  gold?: boolean;
  trend?: "up" | "down";
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-[#9CA3AF] text-sm">{label}</div>
      <div className={`font-bold text-base flex items-center gap-1 ${gold ? "text-[#FFD700]" : "text-white"}`}>
        {trend === "up" && <TrendingUpIcon className="w-4 h-4 text-[#10B981]" />}
        {trend === "down" && <TrendingDown className="w-4 h-4 text-[#EF4444]" />}
        {value}
      </div>
    </div>
  );
}

// Climb Tip Component
function ClimbTip({ icon, text, pc }: { icon: string; text: string; pc: string }) {
  return (
    <div className="flex items-start gap-3 bg-[rgba(0,0,0,0.2)] rounded-lg p-3 border border-[rgba(255,215,0,0.2)]">
      <div className="text-2xl flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <div className="text-white text-sm mb-1">{text}</div>
        <div className="text-[#FFD700] text-xs font-bold">{pc}</div>
      </div>
    </div>
  );
}

// Time Unit Component
function TimeUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.3)] rounded-lg p-3 text-center">
      <div className="text-[#FFD700] font-bold text-2xl mb-1">{value}</div>
      <div className="text-[#9CA3AF] text-[10px] uppercase">{label}</div>
    </div>
  );
}