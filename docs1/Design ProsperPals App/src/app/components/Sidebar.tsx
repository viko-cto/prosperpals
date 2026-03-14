import { Link, useLocation } from "react-router";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { 
  Home,
  Key,
  Trophy,
  Wallet,
  List,
  PieChart as PieChartIcon,
  Swords,
  DollarSign,
  TrendingUp,
  BookOpen,
  Target,
  Users,
  RefreshCw,
  Building2,
  Calendar,
  Plus,
  Settings,
  Bell,
  Flame,
  Mic,
  Sparkles,
  MessageSquare
} from "lucide-react";
import { CoinEarningTooltip } from "./CoinEarningTooltip";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  accent?: "gold" | "blue" | "purple";
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export function Sidebar() {
  const location = useLocation();
  const [showCoinTooltip, setShowCoinTooltip] = useState(false);

  const companions: NavItem[] = [
    { path: "/chat-goldie", label: "Goldie", icon: "🪙", accent: "gold" },
    { path: "/chat-fin", label: "Fin", icon: "🐋", accent: "blue" },
  ];

  const core: NavSection = {
    title: "MAIN",
    items: [
      { path: "/budget-central", label: "Budget Central", icon: <DollarSign className="w-4 h-4" />, accent: "gold" },
      { path: "/goals-milestones", label: "Goals & Milestones", icon: <Target className="w-4 h-4" />, accent: "gold" },
      { path: "/learning-hub", label: "Learning Hub", icon: <BookOpen className="w-4 h-4" />, accent: "blue" },
      { path: "/virtual-portfolio", label: "Virtual Portfolio", icon: <TrendingUp className="w-4 h-4" />, accent: "blue" },
      { path: "/family-space", label: "Family Space", icon: <Users className="w-4 h-4" /> },
      { path: "/subscriptions", label: "Subscriptions", icon: <RefreshCw className="w-4 h-4" /> },
    ],
  };

  const workspaces: NavSection = {
    title: "SETTINGS",
    items: [
      { path: "/settings", label: "Settings & Integrations", icon: <Settings className="w-4 h-4" /> },
    ],
  };

  const dashboards: NavSection = {
    title: "DEV",
    items: [
      { path: "/voice-chat", label: "Voice Chat", icon: <Mic className="w-4 h-4" /> },
      { path: "/text-chat", label: "Text Chat", icon: <MessageSquare className="w-4 h-4" /> },
    ],
  };

  const integrations: NavSection = {
    title: "",
    items: [],
  };

  const showcases: NavSection = {
    title: "",
    items: [],
  };

  const isActive = (path: string) => location.pathname === path;

  const getAccentClass = (accent?: "gold" | "blue" | "purple", isActiveRoute?: boolean) => {
    if (!isActiveRoute) return "";
    switch (accent) {
      case "gold":
        return "bg-yellow-500/10 border-l-2 border-yellow-500 text-yellow-500";
      case "blue":
        return "bg-blue-500/10 border-l-2 border-blue-500 text-blue-500";
      case "purple":
        return "bg-purple-500/10 border-l-2 border-purple-500 text-purple-500";
      default:
        return "bg-white/5 border-l-2 border-white/50 text-white";
    }
  };

  return (
    <div className="w-60 bg-[#1a1a2e] h-screen flex flex-col text-white border-r border-white/10">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-6">
          <Key className="w-6 h-6 text-yellow-400" />
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            ProsperPals
          </span>
        </Link>

        {/* Persistent Top Bar */}
        <div className="space-y-3">
          {/* ProsperCoin Balance */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-lg p-3 group hover:border-yellow-500/50 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl animate-pulse">🪙</span>
                <div>
                  <div className="text-xs text-yellow-400/70">ProsperCoin</div>
                  <div className="text-lg font-bold text-yellow-400">2,450 PC</div>
                </div>
              </div>
              <div className="relative">
                <Flame className="w-4 h-4 text-yellow-400 cursor-pointer" onClick={() => setShowCoinTooltip(!showCoinTooltip)} />
                <AnimatePresence>
                  {showCoinTooltip && <CoinEarningTooltip />}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2">
            {/* XP Level */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-2 text-center">
              <div className="relative w-8 h-8 mx-auto mb-1">
                {/* Progress Ring */}
                <svg className="w-8 h-8 -rotate-90">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="#FFD700"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${(70 / 100) * 87.96} 87.96`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-yellow-400">
                  7
                </div>
              </div>
              <div className="text-[10px] text-white/60">Level</div>
            </div>

            {/* Streak */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-2 text-center">
              <div className="text-xl mb-0.5">🔥</div>
              <div className="text-xs font-bold text-orange-400">12</div>
              <div className="text-[10px] text-white/60">days</div>
            </div>

            {/* Notifications */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-2 text-center hover:bg-white/10 cursor-pointer transition-colors">
              <div className="relative mx-auto w-fit mb-1">
                <Bell className="w-5 h-5 text-white/70" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">
                  3
                </span>
              </div>
              <div className="text-[10px] text-white/60">Alerts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        {/* Companions */}
        <div className="mb-6">
          <div className="px-6 text-xs font-semibold text-white/40 mb-2">COMPANIONS</div>
          {companions.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-2.5 transition-colors ${
                isActive(item.path)
                  ? getAccentClass(item.accent, true)
                  : "hover:bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1">
                <span className="text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.accent === "gold" 
                          ? "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]" 
                          : "bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                      }`}
                    />
                    <span className="text-[10px] text-white/50">{item.badge}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Core Section */}
        <NavSection section={core} isActive={isActive} getAccentClass={getAccentClass} />

        {/* Workspaces */}
        <NavSection section={workspaces} isActive={isActive} getAccentClass={getAccentClass} />

        {/* Dashboards */}
        <NavSection section={dashboards} isActive={isActive} getAccentClass={getAccentClass} />

        {/* Integrations */}
        <div className="mb-6">
          <div className="px-6 text-xs font-semibold text-white/40 mb-2">{integrations.title}</div>
          {integrations.items.map((item, index) => (
            <Link
              key={item.path + index}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-2.5 transition-colors ${
                isActive(item.path) && item.label === "Banks"
                  ? getAccentClass(item.accent, true)
                  : "hover:bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-green-500/20 text-green-400 text-xs px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
          <button className="flex items-center gap-3 px-6 py-2.5 w-full transition-colors hover:bg-white/5 text-white/70 hover:text-white">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add Integration</span>
          </button>
        </div>

        {/* Showcases */}
        <NavSection section={showcases} isActive={isActive} getAccentClass={getAccentClass} />
      </div>

      {/* Settings */}
      <div className="border-t border-white/10 p-4">
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
            isActive("/settings")
              ? "bg-white/10 text-white"
              : "hover:bg-white/5 text-white/70 hover:text-white"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
}

function NavSection({
  section,
  isActive,
  getAccentClass,
}: {
  section: NavSection;
  isActive: (path: string) => boolean;
  getAccentClass: (accent?: "gold" | "blue" | "purple", isActiveRoute?: boolean) => string;
}) {
  return (
    <div className="mb-6">
      <div className="px-6 text-xs font-semibold text-white/40 mb-2">{section.title}</div>
      {section.items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-3 px-6 py-2.5 transition-colors ${
            isActive(item.path)
              ? getAccentClass(item.accent, true)
              : "hover:bg-white/5 text-white/70 hover:text-white"
          }`}
        >
          {item.icon}
          <span className="text-sm font-medium">{item.label}</span>
          {item.badge && (
            <span className="ml-auto bg-yellow-500/20 text-yellow-400 text-xs px-1.5 py-0.5 rounded font-semibold">
              {item.badge}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}