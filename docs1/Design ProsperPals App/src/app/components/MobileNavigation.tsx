import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { 
  Home,
  Key,
  Wallet,
  PieChart,
  Menu,
  Trophy,
  List,
  Swords,
  BookOpen,
  DollarSign,
  Target,
  Users,
  BarChart3,
  TrendingUp,
  CreditCard,
  Settings,
  X
} from "lucide-react";

interface NavTab {
  id: string;
  path: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
  hasNotification?: boolean;
}

interface MoreMenuItem {
  id: string;
  path: string;
  icon: React.ReactNode;
  label: string;
  hasNotification?: boolean;
}

export function MobileNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const tabs: NavTab[] = [
    { 
      id: "home", 
      path: "/home", 
      icon: <Home className="w-5 h-5" />, 
      label: "Home",
      badge: "2.4k" // ProsperCoins mini-badge
    },
    { 
      id: "keys", 
      path: "/keys", 
      icon: <Key className="w-5 h-5" />, 
      label: "Keys" 
    },
    { 
      id: "wallet", 
      path: "/wallet-dashboard", 
      icon: <Wallet className="w-5 h-5" />, 
      label: "Wallet",
      hasNotification: true
    },
    { 
      id: "portfolio", 
      path: "/portfolio", 
      icon: <PieChart className="w-5 h-5" />, 
      label: "Folio" 
    },
    { 
      id: "more", 
      path: "#more", 
      icon: <Menu className="w-5 h-5" />, 
      label: "More" 
    },
  ];

  const moreMenuItems: MoreMenuItem[] = [
    { id: "leaderboard", path: "/leaderboard", icon: <Trophy className="w-5 h-5" />, label: "Leaderboard" },
    { id: "transactions", path: "/transaction-log", icon: <List className="w-5 h-5" />, label: "Transactions" },
    { id: "clans", path: "/clans", icon: <Swords className="w-5 h-5" />, label: "Clans", hasNotification: true },
    { id: "learning", path: "/learning-hub", icon: <BookOpen className="w-5 h-5" />, label: "Learning Hub" },
    { id: "budget", path: "/budget-central", icon: <DollarSign className="w-5 h-5" />, label: "Budget Central" },
    { id: "goals", path: "/goals", icon: <Target className="w-5 h-5" />, label: "Goals" },
    { id: "family", path: "/family-space", icon: <Users className="w-5 h-5" />, label: "Family Space" },
    { id: "net-worth", path: "/net-worth", icon: <BarChart3 className="w-5 h-5" />, label: "Net Worth" },
    { id: "spending", path: "/spending-insights", icon: <TrendingUp className="w-5 h-5" />, label: "Spending Insights" },
    { id: "subscriptions", path: "/subscriptions", icon: <CreditCard className="w-5 h-5" />, label: "Subscriptions" },
    { id: "settings", path: "/settings", icon: <Settings className="w-5 h-5" />, label: "Settings" },
  ];

  const handleTabClick = (tab: NavTab) => {
    if (tab.id === "more") {
      setShowMoreMenu(true);
    } else {
      navigate(tab.path);
    }
  };

  const handleMoreMenuItemClick = (item: MoreMenuItem) => {
    navigate(item.path);
    setShowMoreMenu(false);
  };

  const isActiveTab = (tab: NavTab) => {
    if (tab.id === "more") return false;
    return location.pathname === tab.path;
  };

  return (
    <>
      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="h-16 bg-[#0f0f1a]/95 backdrop-blur-xl border-t border-white/10">
          <div className="flex items-center justify-around h-full px-2">
            {tabs.map((tab) => {
              const isActive = isActiveTab(tab);
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className="relative flex flex-col items-center justify-center flex-1 h-full group"
                >
                  {/* Active Indicator Glow */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Icon Container */}
                  <div className="relative">
                    <motion.div
                      animate={{
                        color: isActive ? "#fbbf24" : "#ffffff60",
                        scale: isActive ? 1.1 : 1
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {tab.icon}
                    </motion.div>

                    {/* ProsperCoin Mini Badge */}
                    {tab.badge && (
                      <div className="absolute -top-1 -right-3 px-1 py-0.5 bg-yellow-500 rounded text-[9px] font-bold text-[#1a1a2e] min-w-[20px] text-center">
                        {tab.badge}
                      </div>
                    )}

                    {/* Notification Dot */}
                    {tab.hasNotification && (
                      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-[#0f0f1a]" />
                    )}
                  </div>

                  {/* Label */}
                  <motion.span
                    animate={{
                      color: isActive ? "#fbbf24" : "#ffffff60",
                      fontWeight: isActive ? 600 : 400
                    }}
                    className="text-[11px] mt-1"
                    transition={{ duration: 0.2 }}
                  >
                    {tab.label}
                  </motion.span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* More Menu Bottom Sheet */}
      <AnimatePresence>
        {showMoreMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMoreMenu(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            >
              <div className="bg-[#1a1a2e] rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden">
                {/* Handle Bar */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-10 h-1 bg-white/20 rounded-full" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">More</h3>
                  <button
                    onClick={() => setShowMoreMenu(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-white/60" />
                  </button>
                </div>

                {/* Menu Items */}
                <div className="overflow-y-auto max-h-[calc(80vh-80px)] pb-6">
                  <div className="px-4 py-2">
                    {moreMenuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleMoreMenuItemClick(item)}
                        className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/5 transition-colors relative"
                      >
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/80">
                          {item.icon}
                        </div>
                        <span className="text-white font-medium flex-1 text-left">
                          {item.label}
                        </span>
                        {item.hasNotification && (
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function MobileHeader() {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  // Get current screen title based on route
  const getScreenTitle = () => {
    const path = location.pathname;
    if (path === "/home") return "Home";
    if (path === "/keys") return "The Keys";
    if (path === "/wallet-dashboard") return "Wallet";
    if (path === "/portfolio") return "Portfolio";
    if (path === "/leaderboard") return "Leaderboard";
    if (path === "/transaction-log") return "Transactions";
    if (path === "/clans") return "Clans";
    if (path === "/learning-hub") return "Learning Hub";
    if (path === "/budget-central") return "Budget Central";
    if (path === "/goals") return "Goals";
    if (path === "/family-space") return "Family Space";
    if (path === "/net-worth") return "Net Worth";
    if (path === "/spending-insights") return "Spending";
    if (path === "/subscriptions") return "Subscriptions";
    if (path === "/settings") return "Settings";
    return "ProsperPals";
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 md:hidden">
      <div className="h-14 bg-[#0f0f1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between h-full px-4">
          {/* Left: Hamburger Menu */}
          <button
            onClick={() => setShowSidebar(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>

          {/* Center: Screen Title */}
          <h1 className="text-base font-bold text-white">{getScreenTitle()}</h1>

          {/* Right: Coin Balance + Avatar */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-2.5 py-1">
              <span className="text-sm">🪙</span>
              <span className="text-xs font-semibold text-yellow-400">2,450</span>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-sm">
              👤
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {showSidebar && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-[#1a1a2e] shadow-2xl z-50"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">💰</div>
                    <span className="text-lg font-bold text-white">ProsperPals</span>
                  </div>
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-white/60" />
                  </button>
                </div>

                {/* User Profile */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-xl">
                      👤
                    </div>
                    <div>
                      <div className="font-semibold text-white">YourUsername</div>
                      <div className="text-sm text-white/60">Level 7</div>
                    </div>
                  </div>
                </div>

                {/* Navigation - scroll if needed */}
                <div className="flex-1 overflow-y-auto p-2">
                  <div className="text-xs font-semibold text-white/40 px-4 py-2">CORE</div>
                  {/* Add navigation items here - could import from Sidebar or duplicate */}
                  <p className="text-white/60 text-sm px-4 py-2">Navigation items...</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
