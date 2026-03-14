import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  Crown,
  Zap,
  Users,
  MessageCircle,
  UserPlus,
  Target,
  Award,
  Clock,
  Flame,
  Brain,
  Heart,
  ChevronRight,
  Globe,
  MapPin,
  Swords
} from "lucide-react";

type LeaderboardTab = "global" | "regional" | "friends" | "clans";

interface LeaderboardUser {
  rank: number;
  username: string;
  avatar: string;
  level: number;
  coins: number;
  country?: string;
  flag?: string;
  trend: "up" | "down" | "same";
  trendValue: number;
  progress: number; // percentage to 1M
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  progress: number;
  maxProgress: number;
}

export function LeaderboardNew() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("global");
  const [totalCoins, setTotalCoins] = useState(124567890);

  // Animated counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalCoins(prev => prev + Math.floor(Math.random() * 100));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const top3: LeaderboardUser[] = [
    {
      rank: 1,
      username: "ProsperoKing",
      avatar: "👑",
      level: 24,
      coins: 847200,
      country: "Denmark",
      flag: "🇩🇰",
      trend: "up",
      trendValue: 3,
      progress: 84.7
    },
    {
      rank: 2,
      username: "SavvySarah",
      avatar: "💎",
      level: 21,
      coins: 723400,
      country: "Sweden",
      flag: "🇸🇪",
      trend: "same",
      trendValue: 0,
      progress: 72.3
    },
    {
      rank: 3,
      username: "InvestorMax",
      avatar: "📈",
      level: 19,
      coins: 698100,
      country: "Germany",
      flag: "🇩🇪",
      trend: "up",
      trendValue: 1,
      progress: 69.8
    }
  ];

  const rankedUsers: LeaderboardUser[] = [
    { rank: 4, username: "BudgetBoss", avatar: "🎯", level: 18, coins: 645300, trend: "up", trendValue: 2, progress: 64.5 },
    { rank: 5, username: "CoinCollector", avatar: "💰", level: 17, coins: 612800, trend: "down", trendValue: 1, progress: 61.3 },
    { rank: 6, username: "DataDriven", avatar: "📊", level: 17, coins: 598200, trend: "same", trendValue: 0, progress: 59.8 },
    { rank: 7, username: "StreakMaster", avatar: "🔥", level: 16, coins: 567100, trend: "up", trendValue: 5, progress: 56.7 },
    { rank: 8, username: "GoldenPath", avatar: "🌟", level: 16, coins: 534900, trend: "up", trendValue: 1, progress: 53.5 },
    { rank: 9, username: "WealthWizard", avatar: "🧙", level: 15, coins: 512300, trend: "down", trendValue: 2, progress: 51.2 },
    { rank: 10, username: "MoneyMaker", avatar: "💵", level: 15, coins: 498700, trend: "up", trendValue: 4, progress: 49.9 },
  ];

  const currentUser: LeaderboardUser = {
    rank: 847,
    username: "YourUsername",
    avatar: "⭐",
    level: 7,
    coins: 2450,
    trend: "up",
    trendValue: 23,
    progress: 0.25
  };

  const badges: Badge[] = [
    { id: "speed", name: "Speed Runner", icon: "🏃", description: "Fastest to milestones", progress: 3, maxProgress: 10 },
    { id: "community", name: "Community Hero", icon: "🤝", description: "Most members helped", progress: 12, maxProgress: 50 },
    { id: "trading", name: "Trading Ace", icon: "📈", description: "Best virtual portfolio returns", progress: 7, maxProgress: 15 },
    { id: "knowledge", name: "Knowledge Seeker", icon: "💡", description: "Most lessons completed", progress: 18, maxProgress: 30 }
  ];

  return (
    <div className="flex-1 flex bg-[#0a0a12]">
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-yellow-500/20 via-[#1a1a2e] to-[#0f0f1a] p-12 overflow-hidden border-b border-yellow-500/20">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.6, 0.3],
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
              >
                🏆
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]"
            >
              First to a Million 🏆
            </motion.h1>
            <p className="text-xl text-white/70 mb-6">
              Race to 1,000,000 ProsperCoins — every financial action counts
            </p>

            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-white/60">Live counter:</span>
                <span className="text-white font-semibold">345 days since launch</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-white/60">Total community coins:</span>
                <motion.span
                  key={totalCoins}
                  initial={{ scale: 1.2, color: "#fbbf24" }}
                  animate={{ scale: 1, color: "#ffffff" }}
                  className="font-bold"
                >
                  {totalCoins.toLocaleString()} PC
                </motion.span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="sticky top-0 z-20 bg-[#0f0f1a]/95 backdrop-blur-xl border-b border-white/10 px-8">
          <div className="flex gap-6">
            <TabButton
              icon={<Globe className="w-4 h-4" />}
              label="Global"
              active={activeTab === "global"}
              onClick={() => setActiveTab("global")}
            />
            <TabButton
              icon={<MapPin className="w-4 h-4" />}
              label="Regional"
              active={activeTab === "regional"}
              onClick={() => setActiveTab("regional")}
            />
            <TabButton
              icon={<Users className="w-4 h-4" />}
              label="Friends"
              active={activeTab === "friends"}
              onClick={() => setActiveTab("friends")}
            />
            <TabButton
              icon={<Swords className="w-4 h-4" />}
              label="Clans"
              active={activeTab === "clans"}
              onClick={() => setActiveTab("clans")}
            />
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="p-8">
          {activeTab === "global" && (
            <GlobalLeaderboard
              top3={top3}
              rankedUsers={rankedUsers}
              currentUser={currentUser}
            />
          )}
          {activeTab === "regional" && <RegionalLeaderboard />}
          {activeTab === "friends" && <FriendsLeaderboard />}
          {activeTab === "clans" && <ClansLeaderboard />}
        </div>
      </div>

      {/* Right Panel */}
      <RightPanel badges={badges} />
    </div>
  );
}

// Tab Button Component
function TabButton({
  icon,
  label,
  active,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-4 py-4 font-semibold transition-all ${
        active
          ? "text-yellow-400"
          : "text-white/60 hover:text-white/80"
      }`}
    >
      {icon}
      {label}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500"
        />
      )}
    </button>
  );
}

// Global Leaderboard Component
function GlobalLeaderboard({
  top3,
  rankedUsers,
  currentUser
}: {
  top3: LeaderboardUser[];
  rankedUsers: LeaderboardUser[];
  currentUser: LeaderboardUser;
}) {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top 3 Podium */}
      <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
        <div className="grid grid-cols-3 gap-6 items-end">
          {/* 2nd Place */}
          <PodiumCard user={top3[1]} place={2} />
          
          {/* 1st Place */}
          <PodiumCard user={top3[0]} place={1} />
          
          {/* 3rd Place */}
          <PodiumCard user={top3[2]} place={3} />
        </div>
      </div>

      {/* Your Position Card - Sticky */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="sticky top-24 z-10 bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-transparent backdrop-blur-xl border-2 border-yellow-500/50 rounded-xl p-4 shadow-[0_0_30px_rgba(255,215,0,0.2)]"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-2xl font-bold text-yellow-400">#{currentUser.rank}</div>
            <div className="text-4xl">{currentUser.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{currentUser.username}</span>
                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-xs font-semibold">
                  Level {currentUser.level}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-yellow-400 font-bold">{currentUser.coins.toLocaleString()} PC</span>
                <div className="flex-1 max-w-xs">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                      style={{ width: `${currentUser.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-white/50">{currentUser.progress}%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-semibold">{currentUser.trendValue} positions this week 📈</span>
          </div>
        </div>
      </motion.div>

      {/* Ranked List */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[80px_1fr_100px_150px_100px] gap-4 p-4 bg-white/5 border-b border-white/10 text-sm font-semibold text-white/70">
          <div>Rank</div>
          <div>User</div>
          <div>Level</div>
          <div>ProsperCoins</div>
          <div>Trend</div>
        </div>

        {/* Ranked Users */}
        <div className="divide-y divide-white/5">
          {rankedUsers.map((user) => (
            <UserRow key={user.rank} user={user} />
          ))}

          {/* Ellipsis */}
          <div className="p-4 text-center text-white/30 text-sm">
            • • •
          </div>

          {/* Users around current user */}
          <UserRow user={{ rank: 845, username: "NewSaver", avatar: "🌱", level: 7, coins: 2510, trend: "up", trendValue: 12, progress: 0.25 }} />
          <UserRow user={{ rank: 846, username: "FinFan", avatar: "🎮", level: 7, coins: 2480, trend: "down", trendValue: 3, progress: 0.25 }} />
          <UserRow user={currentUser} isCurrentUser />
          <UserRow user={{ rank: 848, username: "SmartSpender", avatar: "💡", level: 7, coins: 2420, trend: "up", trendValue: 8, progress: 0.24 }} />
        </div>
      </div>
    </div>
  );
}

// Podium Card Component
function PodiumCard({ user, place }: { user: LeaderboardUser; place: 1 | 2 | 3 }) {
  const getMedalIcon = () => {
    switch (place) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
    }
  };

  const getBorderColor = () => {
    switch (place) {
      case 1: return "border-yellow-400/50 shadow-[0_0_30px_rgba(255,215,0,0.3)]";
      case 2: return "border-gray-400/50 shadow-[0_0_20px_rgba(192,192,192,0.2)]";
      case 3: return "border-orange-600/50 shadow-[0_0_20px_rgba(205,127,50,0.2)]";
    }
  };

  const getHeight = () => {
    switch (place) {
      case 1: return "pb-12";
      case 2: return "pb-6";
      case 3: return "pb-4";
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: place * 0.1 }}
      className={`relative ${getHeight()}`}
    >
      <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 ${getBorderColor()} rounded-xl p-6 text-center`}>
        {/* Medal */}
        <div className="text-5xl mb-3">{getMedalIcon()}</div>
        
        {/* Avatar */}
        <div className="text-6xl mb-3">{user.avatar}</div>
        
        {/* Username */}
        <div className={`font-bold mb-2 ${place === 1 ? "text-xl" : "text-lg"} text-white`}>
          {user.username}
        </div>
        
        {/* Level & Country */}
        <div className="text-sm text-white/60 mb-3">
          Level {user.level} • {user.flag} {user.country}
        </div>
        
        {/* Coins */}
        <div className={`font-bold mb-3 ${place === 1 ? "text-2xl text-yellow-400" : "text-xl text-white"}`}>
          {user.coins.toLocaleString()} PC
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${user.progress}%` }}
              transition={{ duration: 1, delay: 0.5 + place * 0.1 }}
              className={`h-full ${
                place === 1
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                  : place === 2
                  ? "bg-gradient-to-r from-gray-400 to-gray-500"
                  : "bg-gradient-to-r from-orange-600 to-orange-700"
              }`}
            />
          </div>
          <div className="text-xs text-white/50">{user.progress}%</div>
        </div>
      </div>
    </motion.div>
  );
}

// User Row Component
function UserRow({ user, isCurrentUser }: { user: LeaderboardUser; isCurrentUser?: boolean }) {
  const getTrendIcon = () => {
    if (user.trend === "up") return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (user.trend === "down") return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-white/30" />;
  };

  return (
    <div className={`grid grid-cols-[80px_1fr_100px_150px_100px] gap-4 p-4 hover:bg-white/5 transition-colors ${
      isCurrentUser ? "bg-yellow-500/10 border-l-4 border-l-yellow-400" : ""
    }`}>
      {/* Rank */}
      <div className={`font-semibold ${isCurrentUser ? "text-yellow-400" : "text-white/70"}`}>
        #{user.rank}
      </div>
      
      {/* User */}
      <div className="flex items-center gap-3">
        <div className="text-2xl">{user.avatar}</div>
        <span className={`font-semibold ${isCurrentUser ? "text-yellow-400" : "text-white"}`}>
          {isCurrentUser ? "YOU" : user.username}
        </span>
      </div>
      
      {/* Level */}
      <div className="text-white/70">{user.level}</div>
      
      {/* Coins */}
      <div className="font-semibold text-white">{user.coins.toLocaleString()}</div>
      
      {/* Trend */}
      <div className="flex items-center gap-2">
        {getTrendIcon()}
        {user.trend !== "same" && (
          <span className={`text-sm ${user.trend === "up" ? "text-green-400" : "text-red-400"}`}>
            {user.trendValue}
          </span>
        )}
      </div>
    </div>
  );
}

// Regional Leaderboard Component
function RegionalLeaderboard() {
  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      <div className="text-6xl mb-4">🌍</div>
      <h2 className="text-2xl font-bold text-white mb-2">Regional Leaderboard</h2>
      <p className="text-white/60">Coming soon! Compete with users in your region.</p>
    </div>
  );
}

// Friends Leaderboard Component
function FriendsLeaderboard() {
  const friends = [
    { rank: 1, username: "BestFriend", avatar: "🎮", level: 9, coins: 5200, trend: "up" as const },
    { rank: 2, username: "Colleague", avatar: "💼", level: 8, coins: 4800, trend: "same" as const },
    { rank: 3, username: "Roommate", avatar: "🏠", level: 6, coins: 2100, trend: "down" as const },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        <div className="divide-y divide-white/5">
          {friends.map((friend) => (
            <div key={friend.rank} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
              <div className="text-xl font-bold text-yellow-400">#{friend.rank}</div>
              <div className="text-3xl">{friend.avatar}</div>
              <div className="flex-1">
                <div className="font-semibold text-white">{friend.username}</div>
                <div className="text-sm text-white/60">Level {friend.level} • {friend.coins.toLocaleString()} PC</div>
              </div>
              <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Chat
              </button>
              <button className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition-all flex items-center gap-2">
                <Target className="w-4 h-4" />
                Challenge
              </button>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all flex items-center justify-center gap-2">
        <UserPlus className="w-5 h-5" />
        Invite Friends
      </button>
    </div>
  );
}

// Clans Leaderboard Component
function ClansLeaderboard() {
  const clans = [
    { rank: 1, name: "Golden Warriors", emblem: "⚔️", totalCoins: 5420000, members: 124, challenge: "1st" },
    { rank: 2, name: "Prosperity Guild", emblem: "🏰", totalCoins: 4890000, members: 98, challenge: "2nd" },
    { rank: 3, name: "Coin Collectors", emblem: "💰", totalCoins: 4230000, members: 156, challenge: "3rd" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        <div className="divide-y divide-white/5">
          {clans.map((clan) => (
            <div key={clan.rank} className="p-6 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-yellow-400">#{clan.rank}</div>
                <div className="text-5xl">{clan.emblem}</div>
                <div className="flex-1">
                  <div className="text-xl font-bold text-white mb-1">{clan.name}</div>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span>{clan.members} members</span>
                    <span>•</span>
                    <span className="text-yellow-400 font-semibold">{clan.totalCoins.toLocaleString()} PC</span>
                    <span>•</span>
                    <span>Weekly challenge: {clan.challenge}</span>
                  </div>
                </div>
                <button className="px-6 py-3 bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-yellow-400 hover:bg-yellow-500/30 transition-all font-semibold">
                  View Clan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Right Panel Component
function RightPanel({ badges }: { badges: Badge[] }) {
  return (
    <div className="w-80 border-l border-white/10 bg-[#0a0a12] p-6 space-y-6 overflow-auto">
      {/* The High Five */}
      <div className="bg-gradient-to-br from-yellow-500/10 via-white/5 to-transparent border border-yellow-500/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-400" />
          The High Five
        </h3>
        <p className="text-sm text-white/60 mb-4">This month's top earners — featured on the wall of fame</p>
        
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
              <div className="text-2xl">👑</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-sm">ProsperoKing</div>
                <p className="text-xs text-white/60 line-clamp-2 mt-1">
                  "Consistency is key. Daily actions compound!"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Path to the Top */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          Your Path to the Top
        </h3>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Current rate:</span>
            <span className="text-white font-semibold">350 PC/week</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Time to 1M:</span>
            <span className="text-white font-semibold">~8 years</span>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-400">
            💡 Pro tip: Complete Prosperity Keys to 10x your earnings!
          </p>
        </div>

        <div>
          <div className="text-sm font-medium text-white/70 mb-3">Boost strategies:</div>
          <div className="space-y-2">
            <button className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-all flex items-center justify-between">
              <span>Daily challenges</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-all flex items-center justify-between">
              <span>Clan bonuses</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-all flex items-center justify-between">
              <span>Streak multipliers</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Gunter Gathering */}
      <div className="bg-gradient-to-br from-purple-500/10 via-white/5 to-transparent border border-purple-500/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          Weekly Gunter Gathering
        </h3>
        
        <div className="mb-4">
          <div className="text-sm text-white/80 mb-2">This week's community event:</div>
          <div className="text-base font-semibold text-white">Budget Battle Royale 🎮</div>
          <p className="text-sm text-white/60 mt-1">Top 50 earn 2x ProsperCoins for 48 hours</p>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 font-semibold">Starts in 2d 14h 32m</span>
          </div>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white font-semibold hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
          Join Event
        </button>
      </div>

      {/* Special Badges */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          Special Badges
        </h3>
        
        <div className="space-y-4">
          {badges.map((badge) => (
            <div key={badge.id}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{badge.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{badge.name}</div>
                  <div className="text-xs text-white/50">{badge.description}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                    style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-white/50">
                  {badge.progress}/{badge.maxProgress}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
