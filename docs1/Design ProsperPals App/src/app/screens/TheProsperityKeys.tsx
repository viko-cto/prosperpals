import { motion, AnimatePresence } from "motion/react";
import {
  Home as HomeIcon,
  Wallet,
  BarChart3,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Key,
  Lock,
  Check,
  ChevronRight,
  Trophy,
  Users,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Target,
  BookOpen,
  TrendingDown,
  Award,
  X,
  Share2,
} from "lucide-react";
import { GoldieAvatar } from "../components/GoldieAvatar";

type KeyStatus = "completed" | "in-progress" | "locked";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  progress?: { current: number; total: number };
  link?: string;
};

type KeyData = {
  name: string;
  phase: string;
  status: KeyStatus;
  progress: number;
  icon: string;
  color: string;
  borderColor: string;
  bgColor: string;
  reward: {
    nft: string;
    coins: number;
    title: string;
    extra?: string;
  };
  tasks: Task[];
};

const keysData: KeyData[] = [
  {
    name: "Copper Key",
    phase: "Foundation Phase",
    status: "in-progress",
    progress: 75,
    icon: "🔑",
    color: "#D97D3A",
    borderColor: "rgba(255,215,0,0.4)",
    bgColor: "rgba(255,215,0,0.04)",
    reward: {
      nft: "Copper Key NFT 🏅",
      coins: 500,
      title: "Foundation Builder",
    },
    tasks: [
      { id: "c1", title: "Create your first budget", completed: true },
      { id: "c2", title: "Log 7 consecutive days of expenses", completed: true, progress: { current: 7, total: 7 } },
      { id: "c3", title: "Set your first financial goal", completed: true },
      { id: "c4", title: "Complete 3 learning modules", completed: false, progress: { current: 1, total: 3 } },
      { id: "c5", title: "Earn 100 ProsperCoins", completed: false, progress: { current: 78, total: 100 } },
    ],
  },
  {
    name: "Silver Key",
    phase: "Growth Phase",
    status: "locked",
    progress: 0,
    icon: "🗝️",
    color: "#9CA3AF",
    borderColor: "rgba(255,255,255,0.1)",
    bgColor: "rgba(26,26,46,0.4)",
    reward: {
      nft: "Silver Key NFT",
      coins: 1500,
      title: "Growth Champion",
    },
    tasks: [
      { id: "s1", title: "Build €500 emergency fund", completed: false, progress: { current: 0, total: 500 } },
      { id: "s2", title: "Complete 10 learning modules", completed: false, progress: { current: 0, total: 10 } },
      { id: "s3", title: "Make your first virtual investment", completed: false },
      { id: "s4", title: "Maintain 30-day expense tracking streak", completed: false, progress: { current: 0, total: 30 } },
      { id: "s5", title: "Earn 1,000 total ProsperCoins", completed: false, progress: { current: 78, total: 1000 } },
    ],
  },
  {
    name: "Gold Key",
    phase: "Prosperity Mastery",
    status: "locked",
    progress: 0,
    icon: "🔑",
    color: "#FFD700",
    borderColor: "rgba(255,255,255,0.1)",
    bgColor: "rgba(26,26,46,0.4)",
    reward: {
      nft: "Gold Key NFT 👑",
      coins: 5000,
      title: "Prosperity Master",
      extra: "Exclusive Leaderboard Crown",
    },
    tasks: [
      { id: "g1", title: "Build €1,000 emergency fund", completed: false, progress: { current: 0, total: 1000 } },
      { id: "g2", title: "Complete all 8 learning paths", completed: false, progress: { current: 0, total: 8 } },
      { id: "g3", title: "Achieve 10% return on virtual portfolio", completed: false },
      { id: "g4", title: "Maintain 90-day tracking streak", completed: false, progress: { current: 0, total: 90 } },
      { id: "g5", title: "Invite 5 friends to ProsperPals", completed: false, progress: { current: 0, total: 5 } },
    ],
  },
];

const leaderboard = [
  { rank: 1, username: "@goldmaster", progress: 98, key: "Gold Key" },
  { rank: 2, username: "@savequeen", progress: 91, key: "Gold Key" },
  { rank: 3, username: "@finmaster", progress: 87, key: "Gold Key" },
];

export function TheProsperityKeys() {
  const [showCelebration, setShowCelebration] = useState(false);
  const overallProgress = 42;

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex relative overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#FFD700] opacity-[0.08] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#F59E0B] opacity-[0.05] rounded-full blur-[120px]" />
      </div>

      {/* LEFT SIDEBAR */}
      <aside className="w-[240px] bg-[#1a1a2e] border-r border-[rgba(255,255,255,0.1)] flex-shrink-0 relative z-10">
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
            <NavItem icon={Key} label="The Keys" active={true} />
            <NavItem icon={CreditCard} label="Transactions" active={false} />
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto relative z-10">
        <div className="p-8 max-w-[1600px] mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white font-extrabold text-[36px] mb-2 flex items-center gap-3"
            >
              The Prosperity Keys
              <motion.span
                animate={{ rotate: [0, -15, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-4xl"
              >
                🗝️
              </motion.span>
            </motion.h1>
            <p className="text-[#9CA3AF] text-lg mb-6">Your Journey to Financial Mastery</p>

            {/* Overall Progress Bar */}
            <div className="relative">
              <div className="w-full h-3 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#FFD700] to-[#F59E0B] rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-white font-bold text-sm">{overallProgress}% Complete</div>
                <div className="text-[#9CA3AF] text-xs">~2 weeks to Silver Key</div>
              </div>
            </div>
          </div>

          {/* Quest Path Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-10 relative"
          >
            <div className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.3)] border border-[rgba(255,255,255,0.05)] rounded-[24px] p-8 relative overflow-hidden">
              {/* Treasure map texture overlay */}
              <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFhMWEyZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />
              
              <div className="relative flex items-center justify-between">
                {/* Path Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
                  <div className="relative h-full">
                    {/* Background dashed line */}
                    <div className="absolute inset-0 border-t-4 border-dashed border-[rgba(255,215,0,0.2)]" />
                    {/* Filled progress line */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "30%" }}
                      transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
                      className="absolute left-0 top-0 h-full border-t-4 border-[#FFD700]"
                      style={{ filter: "drop-shadow(0 0 8px rgba(255,215,0,0.6))" }}
                    />
                  </div>
                </div>

                {/* Key Stations */}
                {keysData.map((key, index) => (
                  <motion.div
                    key={key.name}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.2, type: "spring", stiffness: 200 }}
                    className="relative z-10 flex flex-col items-center"
                  >
                    {/* Status Badge */}
                    {key.status === "in-progress" && (
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-10 bg-[#FFA726] text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
                      >
                        🔄 IN PROGRESS
                      </motion.div>
                    )}

                    {/* Key Icon */}
                    <div className="relative">
                      {key.status === "in-progress" ? (
                        <>
                          {/* Glowing aura animation */}
                          <motion.div
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-[#FFD700] rounded-full blur-2xl"
                          />
                          <div
                            className="relative w-20 h-20 rounded-full flex items-center justify-center text-5xl bg-gradient-to-br from-[#FFD700] to-[#F59E0B] border-4 border-[#FFED4E]"
                            style={{ filter: "drop-shadow(0 0 20px rgba(255,215,0,0.8))" }}
                          >
                            {key.icon}
                          </div>
                        </>
                      ) : (
                        <div className="relative w-16 h-16 rounded-full flex items-center justify-center text-4xl bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(255,255,255,0.1)] grayscale opacity-50">
                          {key.icon}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                            <Lock className="w-6 h-6 text-[#9CA3AF]" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Key Name */}
                    <div className="mt-3 text-center">
                      <div className={`font-bold text-sm ${key.status === "in-progress" ? "text-[#FFD700]" : "text-[#6B7280]"}`}>
                        {key.name}
                      </div>
                      <div className="text-[#9CA3AF] text-xs">{key.phase}</div>
                    </div>
                  </motion.div>
                ))}

                {/* User Avatar Position (42% to Copper) */}
                <motion.div
                  initial={{ scale: 0, x: 0 }}
                  animate={{ scale: 1, x: "30%" }}
                  transition={{ delay: 1, type: "spring" }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#F59E0B] border-3 border-white flex items-center justify-center text-black font-bold text-sm shadow-lg"
                  style={{ filter: "drop-shadow(0 0 10px rgba(255,215,0,0.6))" }}
                >
                  NK
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-8">
            {/* LEFT COLUMN (70%) */}
            <div className="flex-1" style={{ maxWidth: "70%" }}>
              <div className="space-y-6">
                {keysData.map((key, index) => (
                  <KeySection key={key.name} keyData={key} index={index} />
                ))}
              </div>
            </div>

            {/* RIGHT SIDEBAR (30%) */}
            <div className="w-[30%] space-y-6 sticky top-8 self-start">
              {/* Community Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.6)] border border-[rgba(255,255,255,0.1)] rounded-[16px] p-6"
              >
                <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                  Global Quest Stats
                  <Users className="w-4 h-4 text-[#9CA3AF]" />
                </h3>
                <div className="space-y-3">
                  <StatRow icon="🥉" count="2,487" label="users unlocked Copper Key" />
                  <StatRow icon="🥈" count="312" label="users unlocked Silver Key" />
                  <StatRow icon="🥇" count="7" label="users unlocked Gold Key" />
                </div>
              </motion.div>

              {/* Leaderboard Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.6)] border border-[rgba(255,255,255,0.1)] rounded-[16px] p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-base">Quest Leaderboard</h3>
                  <button className="text-[#FFD700] text-sm font-semibold hover:underline flex items-center gap-1">
                    View Full <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3 mb-4">
                  {leaderboard.map((user) => (
                    <div key={user.username} className="flex items-center gap-3">
                      <div className="text-xl">{user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}</div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-semibold">{user.username}</div>
                        <div className="text-[#9CA3AF] text-xs">{user.progress}% {user.key}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-[rgba(255,255,255,0.1)] text-[#9CA3AF] text-sm">
                  Your Rank: <span className="text-white font-semibold">#1,243</span>
                </div>
              </motion.div>

              {/* Goldie Motivation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-[rgba(255,215,0,0.15)] to-[rgba(245,158,11,0.1)] border-2 border-[rgba(255,215,0,0.3)] rounded-[16px] p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <GoldieAvatar size={48} animate className="flex-shrink-0" />
                  <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 relative">
                    <p className="text-white text-sm leading-relaxed">
                      You're <span className="font-bold text-[#FFD700]">25 ProsperCoins</span> away from completing your Copper Key! Keep logging those expenses! 🌟
                    </p>
                    <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white/10" />
                  </div>
                </div>
                <button className="text-[#FFD700] text-sm font-semibold hover:underline flex items-center gap-1">
                  Chat with Goldie <MessageCircle className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Celebration Modal */}
      <CelebrationModal show={showCelebration} onClose={() => setShowCelebration(false)} />
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

// Key Section Component
function KeySection({ keyData, index }: { keyData: KeyData; index: number }) {
  const isLocked = keyData.status === "locked";
  const isInProgress = keyData.status === "in-progress";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.15 }}
      className={`relative backdrop-blur-[20px] border rounded-[20px] p-8 ${
        isInProgress
          ? "bg-[rgba(255,215,0,0.04)] border-[rgba(255,215,0,0.4)]"
          : "bg-[rgba(26,26,46,0.4)] border-[rgba(255,255,255,0.1)]"
      }`}
      style={
        keyData.name === "Gold Key" && isLocked
          ? {
              borderImage: "linear-gradient(90deg, rgba(255,215,0,0.3), rgba(245,158,11,0.3), rgba(255,215,0,0.3)) 1",
              animation: "shimmer 3s ease-in-out infinite",
            }
          : undefined
      }
    >
      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] rounded-[20px] z-10 pointer-events-none" />
      )}

      <div className="flex gap-8 relative">
        {/* Left: Key Visual Column */}
        <div className="w-[200px] flex-shrink-0 flex flex-col items-center">
          {/* Key Icon */}
          <div className="text-6xl mb-4 grayscale-0">{keyData.icon}</div>

          {/* Progress Ring */}
          {isInProgress && (
            <div className="relative w-[140px] h-[140px] mb-4">
              <svg width="140" height="140" viewBox="0 0 140 140" className="transform -rotate-90">
                <circle cx="70" cy="70" r="60" stroke="rgba(255,255,255,0.1)" strokeWidth="10" fill="none" />
                <motion.circle
                  cx="70"
                  cy="70"
                  r="60"
                  stroke="url(#goldGradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 377" }}
                  animate={{ strokeDasharray: `${(keyData.progress / 100) * 377} 377` }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
                />
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-white font-extrabold text-3xl">{keyData.progress}%</div>
                <div className="text-[#9CA3AF] text-xs">{keyData.phase}</div>
              </div>
            </div>
          )}

          {/* Status Badge */}
          {isInProgress ? (
            <div className="bg-[#FFA726] text-white text-xs font-bold px-4 py-2 rounded-full mb-4">
              🔄 IN PROGRESS
            </div>
          ) : (
            <div className="bg-[rgba(255,255,255,0.1)] text-[#9CA3AF] text-xs font-bold px-4 py-2 rounded-full mb-4">
              🔒 LOCKED
            </div>
          )}

          {/* Reward Preview */}
          <div className={`text-center text-xs leading-relaxed ${isLocked ? "text-[#6B7280]" : "text-[#FFD700]"}`}>
            <div className="font-bold mb-1">Unlock:</div>
            <div>{keyData.reward.nft}</div>
            <div>+ {keyData.reward.coins} PC</div>
            <div>+ Title: {keyData.reward.title}</div>
            {keyData.reward.extra && <div>+ {keyData.reward.extra}</div>}
          </div>
        </div>

        {/* Right: Task Checklist */}
        <div className="flex-1">
          <h3 className="text-white font-bold text-xl mb-5">{keyData.name} Tasks</h3>

          {/* Unlock Requirement Banner */}
          {isLocked && (
            <div className="bg-[rgba(245,158,11,0.2)] border border-[rgba(245,158,11,0.4)] rounded-lg p-3 mb-5 flex items-center gap-2">
              <span className="text-[#FFA726] text-lg">⚠️</span>
              <span className="text-[#FFA726] text-sm font-semibold">
                Complete the {index === 1 ? "Copper" : "Silver"} Key to unlock this quest.
              </span>
            </div>
          )}

          {/* Task List */}
          <div className="space-y-0">
            {keyData.tasks.map((task, taskIndex) => (
              <TaskRow key={task.id} task={task} isLocked={isLocked} index={taskIndex} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Task Row Component
function TaskRow({ task, isLocked, index }: { task: Task; isLocked: boolean; index: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + index * 0.08 }}
      disabled={isLocked}
      className={`w-full flex items-center gap-4 p-4 border-b border-[rgba(255,255,255,0.06)] transition-all group ${
        !isLocked && "hover:bg-[rgba(255,255,255,0.03)] cursor-pointer"
      }`}
      aria-disabled={isLocked}
    >
      {/* Checkbox */}
      <div
        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
          task.completed
            ? "bg-[#10B981] border-[#10B981]"
            : isLocked
            ? "border-[#6B7280] bg-[rgba(255,255,255,0.05)]"
            : "border-[#FFA726]"
        }`}
        role="checkbox"
        aria-checked={task.completed}
      >
        {task.completed ? (
          <Check className="w-4 h-4 text-white" />
        ) : isLocked ? (
          <Lock className="w-3 h-3 text-[#6B7280]" />
        ) : null}
      </div>

      {/* Task Info */}
      <div className="flex-1 text-left">
        <div className={`text-sm font-semibold ${isLocked ? "text-[#6B7280]" : "text-white"}`}>
          {task.title}
        </div>
        {task.progress && (
          <div className="text-xs text-[#9CA3AF] mt-1">
            {task.progress.current} / {task.progress.total}
            {typeof task.progress.total === "number" && task.progress.total > 10 && " days"}
          </div>
        )}
      </div>

      {/* Status Badge / Progress */}
      <div className="flex-shrink-0">
        {task.completed ? (
          <div className="bg-[#10B981] text-white text-xs font-bold px-3 py-1 rounded-full">
            ✅ {task.progress ? "Streak!" : "Done!"}
          </div>
        ) : task.progress && !isLocked ? (
          <div className="min-w-[100px]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#FFA726] text-xs font-semibold">
                {Math.round((task.progress.current / task.progress.total) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FFD700] to-[#F59E0B] rounded-full"
                style={{ width: `${(task.progress.current / task.progress.total) * 100}%` }}
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* Arrow hint on hover */}
      {!isLocked && !task.completed && (
        <ChevronRight className="w-5 h-5 text-[#9CA3AF] opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.button>
  );
}

// Stat Row Component
function StatRow({ icon, count, label }: { icon: string; count: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <div className="text-[#FFD700] font-bold text-lg">{count}</div>
        <div className="text-[#9CA3AF] text-xs">{label}</div>
      </div>
    </div>
  );
}

// Celebration Modal
function CelebrationModal({ show, onClose }: { show: boolean; onClose: () => void }) {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([]);

  useEffect(() => {
    if (show) {
      const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#4A90D9" : "#10B981",
      }));
      setConfetti(particles);
    }
  }, [show]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-[10px] flex items-center justify-center z-50 p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        {/* Confetti */}
        {confetti.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: particle.color,
              left: `${particle.x}%`,
              top: "50%",
            }}
            initial={{ y: 0, opacity: 1, rotate: 0 }}
            animate={{
              y: [-300, 300],
              x: [(Math.random() - 0.5) * 200],
              opacity: [1, 0],
              rotate: [0, Math.random() * 720],
            }}
            transition={{
              duration: 2,
              delay: particle.delay,
              ease: "easeOut",
            }}
          />
        ))}

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[600px] backdrop-blur-[20px] bg-[rgba(26,26,46,0.95)] border-2 border-[#FFD700] rounded-[24px] p-12 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] flex items-center justify-center transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
              className="text-8xl mb-6"
            >
              🔑
            </motion.div>

            <h2 className="text-white font-extrabold text-4xl mb-4">Copper Key Unlocked!</h2>

            <p className="text-[#9CA3AF] text-lg mb-8">
              You've earned <span className="text-[#FFD700] font-bold">500 PC</span> +{" "}
              <span className="text-[#FFD700] font-bold">Foundation Builder</span> title +{" "}
              <span className="text-[#FFD700] font-bold">Copper Key NFT!</span>
            </p>

            <div className="flex gap-4">
              <button className="flex-1 h-12 bg-gradient-to-r from-[#FFD700] to-[#F59E0B] text-black font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                Share Achievement
              </button>
              <button
                onClick={onClose}
                className="flex-1 h-12 bg-[rgba(255,255,255,0.1)] text-white font-bold rounded-xl hover:bg-[rgba(255,255,255,0.15)] transition-all"
              >
                Continue Journey
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Add shimmer keyframe to global styles
const style = document.createElement("style");
style.textContent = `
  @keyframes shimmer {
    0%, 100% { border-image-source: linear-gradient(90deg, rgba(255,215,0,0.3), rgba(245,158,11,0.3), rgba(255,215,0,0.3)); }
    50% { border-image-source: linear-gradient(90deg, rgba(255,215,0,0.6), rgba(245,158,11,0.6), rgba(255,215,0,0.6)); }
  }
`;
document.head.appendChild(style);