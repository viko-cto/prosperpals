import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield,
  Crown,
  Users,
  MessageCircle,
  Trophy,
  Search,
  UserPlus,
  Swords,
  Mail,
  ChevronRight,
  Calendar,
  TrendingUp,
  Award,
  Lock,
  Sparkles,
  Target,
  Clock,
  Send,
  MoreVertical,
  Settings,
  Star,
  Flame,
  Gift,
  BarChart3
} from "lucide-react";

type ClanTab = "my-clan" | "wars" | "discover" | "invites";

interface ClanMember {
  id: string;
  username: string;
  avatar: string;
  role: "leader" | "co-leader" | "member";
  level: number;
  coins: number;
  streak: number;
  isOnline: boolean;
}

interface ClanChallenge {
  id: string;
  name: string;
  description: string;
  goal: number;
  current: number;
  unit: string;
  daysRemaining: number;
  topContributors: { username: string; amount: number }[];
  reward: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export function ClansNew() {
  const [activeTab, setActiveTab] = useState<ClanTab>("my-clan");
  const [chatMessage, setChatMessage] = useState("");

  const clanData = {
    name: "The Prosperity Pioneers",
    motto: "Together we prosper",
    emblem: "🛡️",
    level: 5,
    totalCoins: 34500,
    members: 8,
    maxMembers: 12,
    founded: "January 2026",
    globalRank: 142,
    colors: {
      primary: "#f59e0b",
      secondary: "#fbbf24"
    }
  };

  const members: ClanMember[] = [
    {
      id: "1",
      username: "Vadim",
      avatar: "👤",
      role: "leader",
      level: 7,
      coins: 2450,
      streak: 12,
      isOnline: true
    },
    {
      id: "2",
      username: "Sarah",
      avatar: "👩",
      role: "co-leader",
      level: 12,
      coins: 8200,
      streak: 45,
      isOnline: true
    },
    {
      id: "3",
      username: "Mike",
      avatar: "👨",
      role: "member",
      level: 10,
      coins: 6100,
      streak: 22,
      isOnline: false
    },
    {
      id: "4",
      username: "Emma",
      avatar: "👱‍♀️",
      role: "member",
      level: 8,
      coins: 4200,
      streak: 15,
      isOnline: true
    },
    {
      id: "5",
      username: "Alex",
      avatar: "🧑",
      role: "member",
      level: 9,
      coins: 5300,
      streak: 18,
      isOnline: false
    },
    {
      id: "6",
      username: "Sofia",
      avatar: "👩‍🦰",
      role: "member",
      level: 11,
      coins: 7100,
      streak: 30,
      isOnline: true
    }
  ];

  const currentChallenge: ClanChallenge = {
    id: "1",
    name: "February Savings Sprint",
    description: "Save a combined €5,000 this month",
    goal: 5000,
    current: 3200,
    unit: "€",
    daysRemaining: 16,
    topContributors: [
      { username: "Sarah", amount: 1200 },
      { username: "Mike", amount: 900 },
      { username: "You", amount: 500 }
    ],
    reward: "All members get 500 PC bonus + \"Savings Squad\" badge"
  };

  const achievements: Achievement[] = [
    {
      id: "1",
      name: "United We Stand",
      description: "All members logged in same day",
      icon: "🏅",
      unlocked: true
    },
    {
      id: "2",
      name: "Budget Buddies",
      description: "5 members under budget simultaneously",
      icon: "🏅",
      unlocked: true
    },
    {
      id: "3",
      name: "Study Group",
      description: "All members completed a lesson in one week",
      icon: "🏅",
      unlocked: true
    },
    {
      id: "4",
      name: "Prosperity Pack",
      description: "All members earn Copper Key",
      icon: "🔒",
      unlocked: false,
      progress: 0,
      maxProgress: 8
    }
  ];

  const chatMessages = [
    { id: "1", username: "Sarah", avatar: "👩", message: "Great work team! We're ahead of schedule 🎉", time: "2h ago" },
    { id: "2", username: "Mike", avatar: "👨", message: "I'm cutting my coffee spending this week to help", time: "1h ago" },
    { id: "3", username: "Goldie", avatar: "🪙", message: "The Pioneers are in 3rd place for this challenge!", time: "30m ago", isBot: true }
  ];

  return (
    <div className="flex-1 flex bg-[#0a0a12]">
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Tab Bar */}
        <div className="sticky top-0 z-20 bg-[#0f0f1a]/95 backdrop-blur-xl border-b border-white/10 px-8 py-4">
          <div className="flex gap-2 bg-[rgba(26,26,46,0.6)] border border-[rgba(255,255,255,0.08)] rounded-[14px] p-1 w-fit">
            <TabButton
              icon={<Shield className="w-4 h-4" />}
              label="My Clan"
              active={activeTab === "my-clan"}
              onClick={() => setActiveTab("my-clan")}
            />
            <TabButton
              icon={<Swords className="w-4 h-4" />}
              label="Clan Wars"
              active={activeTab === "wars"}
              onClick={() => setActiveTab("wars")}
            />
            <TabButton
              icon={<Search className="w-4 h-4" />}
              label="Discover"
              active={activeTab === "discover"}
              onClick={() => setActiveTab("discover")}
            />
            <TabButton
              icon={<Mail className="w-4 h-4" />}
              label="Invites"
              active={activeTab === "invites"}
              onClick={() => setActiveTab("invites")}
              badge={2}
            />
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === "my-clan" && (
              <MyClanTab
                clanData={clanData}
                members={members}
                currentChallenge={currentChallenge}
                achievements={achievements}
                chatMessages={chatMessages}
                chatMessage={chatMessage}
                onChatMessageChange={setChatMessage}
              />
            )}
            {activeTab === "wars" && <ClanWarsTab />}
            {activeTab === "discover" && <DiscoverTab />}
            {activeTab === "invites" && <InvitesTab />}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Panel */}
      <RightPanel clanData={clanData} />
    </div>
  );
}

// Tab Button Component
function TabButton({
  icon,
  label,
  active,
  onClick,
  badge
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-[18px] py-2 rounded-[10px] h-[36px] transition-all duration-200 ${
        active
          ? "bg-gradient-to-br from-[#FFD700] to-[#F59E0B] text-[#000000] font-semibold"
          : "bg-transparent text-[#9CA3AF] hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
      }`}
      style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: active ? 600 : 400 }}
    >
      {icon}
      {label}
      {badge && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ fontWeight: 700 }}>
          {badge}
        </span>
      )}
    </button>
  );
}

// My Clan Tab Component
function MyClanTab({
  clanData,
  members,
  currentChallenge,
  achievements,
  chatMessages,
  chatMessage,
  onChatMessageChange
}: {
  clanData: any;
  members: ClanMember[];
  currentChallenge: ClanChallenge;
  achievements: Achievement[];
  chatMessages: any[];
  chatMessage: string;
  onChatMessageChange: (value: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto space-y-6"
    >
      {/* Clan Header */}
      <div className="relative bg-gradient-to-br from-yellow-500/20 via-[#1a1a2e] to-[#0f0f1a] rounded-2xl p-8 border border-yellow-500/30 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
          }} />
        </div>

        <div className="relative z-10 flex items-start gap-6">
          {/* Clan Emblem */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center text-6xl shadow-[0_0_30px_rgba(255,215,0,0.3)]">
              {clanData.emblem}
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-sm font-bold text-[#1a1a2e]">
              L{clanData.level}
            </div>
          </div>

          {/* Clan Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  {clanData.name}
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <Settings className="w-5 h-5 text-white/60" />
                  </button>
                </h1>
                <p className="text-lg text-white/60 italic mb-4">"{clanData.motto}"</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                <div className="text-xs text-white/60 mb-1">Combined ProsperCoins</div>
                <div className="text-xl font-bold text-yellow-400">{clanData.totalCoins.toLocaleString()} PC</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                <div className="text-xs text-white/60 mb-1">Members</div>
                <div className="text-xl font-bold text-white">{clanData.members}/{clanData.maxMembers}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                <div className="text-xs text-white/60 mb-1">Global Rank</div>
                <div className="text-xl font-bold text-white">#{clanData.globalRank}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                <div className="text-xs text-white/60 mb-1">Founded</div>
                <div className="text-sm font-semibold text-white">{clanData.founded}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Member Roster */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Member Roster
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg text-[#1a1a2e] font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all">
            <UserPlus className="w-4 h-4" />
            Invite Member
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
          
          {/* Empty Slots */}
          {[...Array(clanData.maxMembers - clanData.members)].map((_, i) => (
            <div
              key={`empty-${i}`}
              className="bg-white/5 border-2 border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center text-white/40 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all cursor-pointer"
            >
              <UserPlus className="w-8 h-8 mb-2" />
              <span className="text-sm">Empty Slot</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Clan Challenge */}
      <div className="bg-gradient-to-br from-purple-500/10 via-white/5 to-transparent border border-purple-500/30 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              🏆 Current Challenge: {currentChallenge.name}
            </h2>
            <p className="text-white/70">{currentChallenge.description}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full">
            <Clock className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-semibold">{currentChallenge.daysRemaining} days left</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-white/60">Clan goal progress</span>
            <span className="text-white font-semibold">
              {currentChallenge.unit}{currentChallenge.current.toLocaleString()} / {currentChallenge.unit}{currentChallenge.goal.toLocaleString()}
            </span>
          </div>
          <div className="h-4 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentChallenge.current / currentChallenge.goal) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
            />
          </div>
          <div className="text-center mt-2">
            <span className="text-2xl font-bold text-purple-400">
              {Math.round((currentChallenge.current / currentChallenge.goal) * 100)}%
            </span>
          </div>
        </div>

        {/* Top Contributors */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
          <div className="text-sm font-semibold text-white/70 mb-3">Top Contributors:</div>
          <div className="space-y-2">
            {currentChallenge.topContributors.map((contributor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? "bg-yellow-400 text-[#1a1a2e]" :
                    index === 1 ? "bg-gray-400 text-[#1a1a2e]" :
                    "bg-orange-600 text-white"
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-white font-medium">{contributor.username}</span>
                </div>
                <span className="text-white/80">{currentChallenge.unit}{contributor.amount.toLocaleString()} saved</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reward Info */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <Gift className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-yellow-400 mb-1">Reward:</div>
              <div className="text-sm text-white/80">{currentChallenge.reward}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 font-semibold hover:bg-purple-500/30 transition-all">
            View Challenge Details
          </button>
          <button className="flex-1 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Chat About Strategy
          </button>
        </div>
      </div>

      {/* Clan Chat */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Clan Chat
          </h3>
          <button className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
            Open full chat
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3">
              <div className="text-2xl">{msg.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-semibold ${msg.isBot ? "text-yellow-400" : "text-white"}`}>
                    {msg.username}
                  </span>
                  <span className="text-xs text-white/40">{msg.time}</span>
                </div>
                <p className="text-sm text-white/80">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => onChatMessageChange(e.target.value)}
              placeholder="Send a message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500/50"
            />
            <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg text-[#1a1a2e] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Clan Achievements */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Our Shared Trophies 🏅
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Member Card Component
function MemberCard({ member }: { member: ClanMember }) {
  const getRoleIcon = () => {
    if (member.role === "leader") return <Crown className="w-4 h-4 text-yellow-400" />;
    if (member.role === "co-leader") return <Star className="w-4 h-4 text-yellow-400" />;
    return null;
  };

  const getRoleBadge = () => {
    return member.role.charAt(0).toUpperCase() + member.role.slice(1);
  };

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-yellow-500/30 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="text-4xl">{member.avatar}</div>
            {member.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#1a1a2e]" />
            )}
          </div>
        </div>
        <button className="p-1 hover:bg-white/10 rounded transition-colors">
          <MoreVertical className="w-4 h-4 text-white/60" />
        </button>
      </div>

      {/* Info */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-white">{member.username}</h3>
          {getRoleIcon()}
        </div>
        <div className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded inline-block">
          {getRoleBadge()}
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Level</span>
          <span className="text-white font-semibold">{member.level}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">ProsperCoins</span>
          <span className="text-yellow-400 font-semibold">{member.coins.toLocaleString()} PC</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Streak</span>
          <span className="text-orange-400 font-semibold flex items-center gap-1">
            <Flame className="w-3 h-3" />
            {member.streak} days
          </span>
        </div>
      </div>

      {/* Message Button */}
      <button className="w-full py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2">
        <MessageCircle className="w-4 h-4" />
        Message
      </button>
    </div>
  );
}

// Achievement Card Component
function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <div className={`p-4 rounded-lg border transition-all ${
      achievement.unlocked
        ? "bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-500/30"
        : "bg-white/5 border-white/10 opacity-60"
    }`}>
      <div className="flex items-start gap-3">
        <div className="text-3xl">{achievement.icon}</div>
        <div className="flex-1">
          <h4 className={`font-semibold mb-1 ${achievement.unlocked ? "text-yellow-400" : "text-white/60"}`}>
            {achievement.name}
          </h4>
          <p className="text-sm text-white/60">{achievement.description}</p>
          
          {!achievement.unlocked && achievement.progress !== undefined && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                <span>Progress</span>
                <span>{achievement.progress}/{achievement.maxProgress}</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                  style={{ width: `${(achievement.progress / achievement.maxProgress!) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Clan Wars Tab Component
function ClanWarsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto"
    >
      <div className="bg-gradient-to-br from-red-500/10 via-white/5 to-transparent border border-red-500/30 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <Swords className="w-8 h-8 text-red-400" />
          Current War: Prosperity Pioneers vs Money Mavericks
        </h2>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Our Clan */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">🛡️</div>
              <h3 className="text-xl font-bold text-white">The Prosperity Pioneers</h3>
              <div className="text-sm text-white/60">Our Clan</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">€3,200</div>
              <div className="text-sm text-white/60">Total Saved</div>
            </div>
          </div>

          {/* Enemy Clan */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">⚔️</div>
              <h3 className="text-xl font-bold text-white">Money Mavericks</h3>
              <div className="text-sm text-white/60">Opponent</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400 mb-2">€2,800</div>
              <div className="text-sm text-white/60">Total Saved</div>
            </div>
          </div>
        </div>

        {/* War Timer */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 text-center">
          <div className="flex items-center justify-center gap-2 text-white/60 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">War ends in:</span>
          </div>
          <div className="text-3xl font-bold text-white">4d 12h 36m</div>
        </div>

        {/* Stakes */}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
          <div className="text-sm text-white/60 mb-1">🏆 Stakes</div>
          <div className="text-lg font-semibold text-purple-400">
            Winning clan gets 2x ProsperCoins for one week!
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Discover Tab Component
function DiscoverTab() {
  const featuredClans = [
    { name: "Golden Warriors", emblem: "⚔️", members: 124, level: 12, focus: "Investing", region: "EU" },
    { name: "Savings Squad", emblem: "💰", members: 89, level: 8, focus: "Saving", region: "US" },
    { name: "Budget Builders", emblem: "🏗️", members: 56, level: 6, focus: "Learning", region: "EU" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto space-y-6"
    >
      {/* Search & Filters */}
      <div className="flex gap-4">
        <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
          <Search className="w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search clans..."
            className="flex-1 bg-transparent text-white placeholder:text-white/40 focus:outline-none"
          />
        </div>
        <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50">
          <option>All Regions</option>
          <option>EU</option>
          <option>US</option>
          <option>Asia</option>
        </select>
        <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50">
          <option>All Focus</option>
          <option>Saving</option>
          <option>Investing</option>
          <option>Learning</option>
        </select>
      </div>

      {/* Create New Clan Button */}
      <button className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all flex items-center justify-center gap-2">
        <Shield className="w-5 h-5" />
        Create New Clan
      </button>

      {/* Featured Clans */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Featured Clans</h3>
        <div className="space-y-4">
          {featuredClans.map((clan, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-yellow-500/30 transition-all"
            >
              <div className="flex items-center gap-6">
                <div className="text-6xl">{clan.emblem}</div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-2">{clan.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span>{clan.members} members</span>
                    <span>•</span>
                    <span>Level {clan.level}</span>
                    <span>•</span>
                    <span>Focus: {clan.focus}</span>
                    <span>•</span>
                    <span>{clan.region}</span>
                  </div>
                </div>
                <button className="px-6 py-3 bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-yellow-400 font-semibold hover:bg-yellow-500/30 transition-all">
                  Request to Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Invites Tab Component
function InvitesTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-6">
              <div className="text-5xl">🛡️</div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white mb-1">Invitation from Golden Warriors</h4>
                <p className="text-sm text-white/60 mb-2">Sarah invited you to join their clan</p>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span>124 members</span>
                  <span>•</span>
                  <span>Level 12</span>
                  <span>•</span>
                  <span>Received 2 days ago</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 font-semibold hover:bg-green-500/30 transition-all">
                  Accept
                </button>
                <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 font-semibold hover:bg-red-500/30 transition-all">
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Right Panel Component
function RightPanel({ clanData }: { clanData: any }) {
  return (
    <div className="w-80 border-l border-white/10 bg-[#0a0a12] p-6 space-y-6 overflow-auto">
      {/* Clan Stats */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Clan Stats
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Average member level</span>
            <span className="text-white font-semibold">9.2</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Weekly active members</span>
            <span className="text-green-400 font-semibold">7/8</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Challenges won</span>
            <span className="text-yellow-400 font-semibold">3 this month</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Best streak</span>
            <span className="text-orange-400 font-semibold">45 days (Sarah)</span>
          </div>
        </div>

        <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <p className="text-sm text-blue-400 text-center">
            Your clan is more active than 78% of clans! 🎉
          </p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Upcoming Events
        </h3>
        
        <div className="space-y-3">
          <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
            <div className="text-sm font-semibold text-white mb-1">Gunter Gathering: Budget Battle</div>
            <div className="text-xs text-white/60">Feb 15</div>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
            <div className="text-sm font-semibold text-white mb-1">Clan vs Clan: Savings Showdown</div>
            <div className="text-xs text-white/60">Feb 20</div>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
            <div className="text-sm font-semibold text-white mb-1">Community Quest: Help a Friend Week</div>
            <div className="text-xs text-white/60">Feb 25</div>
          </div>
        </div>

        <button className="w-full mt-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2">
          Calendar view
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Clan Perks */}
      <div className="bg-gradient-to-br from-purple-500/10 via-white/5 to-transparent border border-purple-500/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          Clan Perks
        </h3>
        
        <div className="mb-4">
          <div className="text-sm text-white/60 mb-2">Level {clanData.level} perks unlocked:</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-green-400">
              <div className="w-5 h-5 bg-green-500/20 rounded flex items-center justify-center">
                ✓
              </div>
              <span>🎨 Custom clan emblem</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <div className="w-5 h-5 bg-green-500/20 rounded flex items-center justify-center">
                ✓
              </div>
              <span>💬 Private clan chat</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <div className="w-5 h-5 bg-green-500/20 rounded flex items-center justify-center">
                ✓
              </div>
              <span>🏆 Enter Clan Wars</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="text-sm text-white/60 mb-2">Next at Level 6:</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-white/40">
              <Lock className="w-4 h-4" />
              <span>🎁 Clan mystery box (monthly)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <Lock className="w-4 h-4" />
              <span>📊 Clan analytics dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}