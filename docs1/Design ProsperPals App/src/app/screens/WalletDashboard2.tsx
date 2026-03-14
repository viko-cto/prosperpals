import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Home as HomeIcon,
  Zap,
  Smartphone,
  Film,
  Shield,
  Plus,
  BarChart3,
  List,
  Sparkles,
  Medal,
  Lock,
  ChevronRight,
  Calendar,
  ArrowRight,
  DollarSign,
  PiggyBank,
  CreditCard,
} from "lucide-react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type TabType = "real" | "virtual";

// Mock data
const cashFlowData = [
  { week: "Week 1", income: 625, expenses: 412 },
  { week: "Week 2", income: 625, expenses: 298 },
  { week: "Week 3", income: 625, expenses: 324 },
  { week: "Week 4", income: 625, expenses: 850 }, // Rent spike
];

const incomeExpensesData = [
  { name: "Income", value: 2500, color: "#10B981" },
  { name: "Expenses", value: 1234.56, color: "#EF4444" },
];

const upcomingBills = [
  { icon: HomeIcon, name: "Rent", due: "Feb 1", amount: 850, urgent: true, color: "#EF4444" },
  { icon: Zap, name: "Electricity", due: "Feb 8", amount: 65.4, urgent: false, color: "#FFA726" },
  { icon: Smartphone, name: "Phone Plan", due: "Feb 15", amount: 25, urgent: false, color: "#9CA3AF" },
  { icon: Film, name: "Netflix", due: "Feb 22", amount: 15.99, urgent: false, color: "#9CA3AF" },
];

const nftBadges = [
  { id: 1, name: "First Budget", status: "unlocked", progress: 100, date: "Jan 15, 2026", icon: "🔑" },
  { id: 2, name: "7-Day Streak", status: "unlocked", progress: 100, date: "Jan 22, 2026", icon: "🔥" },
  { id: 3, name: "Savings Hero", status: "unlocked", progress: 100, date: "Jan 28, 2026", icon: "💰" },
  { id: 4, name: "Budget Master", status: "in-progress", progress: 75, date: null, icon: "📊" },
  { id: 5, name: "Mystery Badge", status: "locked", progress: 0, date: null, icon: "🔒" },
];

export function WalletDashboard2() {
  const [activeTab, setActiveTab] = useState<TabType>("real");
  const [chartPeriod, setChartPeriod] = useState<"week" | "month" | "year">("month");

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex">
      {/* LEFT SIDEBAR - 240px */}
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
            <NavItem icon={Wallet} label="Wallet" active={true} />
            <NavItem icon={BarChart3} label="Budget Central" active={false} />
            <NavItem icon={TrendingUp} label="Investments" active={false} />
            <NavItem icon={PiggyBank} label="Goals" active={false} />
            <NavItem icon={CreditCard} label="Transactions" active={false} />
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-white font-extrabold text-[32px] mb-2">Wallet</h1>
            <p className="text-[#9CA3AF] text-base">Your complete financial picture</p>
          </div>

          {/* Dual Tab Bar */}
          <div className="border-b border-[rgba(255,255,255,0.1)] mb-8">
            <div className="flex gap-0">
              <button
                onClick={() => setActiveTab("real")}
                className={`relative h-[52px] px-8 font-semibold text-base transition-all ${
                  activeTab === "real"
                    ? "text-white bg-[rgba(255,215,0,0.08)]"
                    : "text-[#9CA3AF] bg-transparent hover:text-white"
                }`}
              >
                💰 Real Money
                {activeTab === "real" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FFD700]"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab("virtual")}
                className={`relative h-[52px] px-8 font-semibold text-base transition-all ${
                  activeTab === "virtual"
                    ? "text-white bg-[rgba(255,215,0,0.08)]"
                    : "text-[#9CA3AF] bg-transparent hover:text-white"
                }`}
              >
                ✨ Virtual Assets
                {activeTab === "virtual" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FFD700]"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "real" ? (
              <motion.div
                key="real"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RealMoneyTab chartPeriod={chartPeriod} setChartPeriod={setChartPeriod} />
              </motion.div>
            ) : (
              <motion.div
                key="virtual"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <VirtualAssetsTab />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// Navigation Item Component
function NavItem({ icon: Icon, label, active }: { icon: any; label: string; active: boolean }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
        active
          ? "text-[#FFD700] bg-[rgba(255,215,0,0.08)]"
          : "text-[#9CA3AF] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
      }`}
    >
      {active && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFD700] rounded-r" />
      )}
      <Icon className="w-5 h-5" />
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

// REAL MONEY TAB
function RealMoneyTab({
  chartPeriod,
  setChartPeriod,
}: {
  chartPeriod: string;
  setChartPeriod: (period: "week" | "month" | "year") => void;
}) {
  return (
    <div className="space-y-6">
      {/* TOP ROW - Two Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Balance Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.6)] border border-[rgba(255,255,255,0.1)] rounded-[16px] p-7"
        >
          <div className="text-[#9CA3AF] text-xs uppercase tracking-wider mb-3">
            Current Balance
          </div>
          <div className="text-white font-extrabold text-5xl mb-3">€ 3,264.88</div>
          <div className="flex items-center gap-2 text-[#10B981] text-sm mb-4">
            <ArrowUpRight className="w-4 h-4" />
            <span>+€312 from last month</span>
          </div>
          <div className="flex items-center gap-2 text-[#9CA3AF] text-xs mb-5">
            <span>🏦 Linked: Revolut ••••4821</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="text-[#10B981]">Connected</span>
            </div>
          </div>
          <button className="w-full h-9 border-2 border-[#FFD700] text-[#FFD700] rounded-[10px] font-semibold text-sm hover:bg-[rgba(255,215,0,0.08)] transition-all">
            Link Another Bank Account
          </button>
        </motion.div>

        {/* Income vs Expenses Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.6)] border border-[rgba(255,255,255,0.1)] rounded-[16px] p-7"
        >
          {/* Period Selector */}
          <div className="flex justify-center gap-2 mb-4">
            {(["week", "month", "year"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setChartPeriod(period)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  chartPeriod === period
                    ? "bg-[#FFD700] text-black"
                    : "bg-[rgba(255,255,255,0.05)] text-[#9CA3AF] hover:text-white"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>

          {/* Donut Chart */}
          <div className="flex flex-col items-center">
            <div className="relative w-[180px] h-[180px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeExpensesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {incomeExpensesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[#9CA3AF] text-xs mb-1">Jan 2026</div>
                <div className="text-white font-bold text-lg">Net +€1,265</div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                  <span className="text-white text-sm">Income</span>
                </div>
                <span className="text-white font-semibold">€2,500.00</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <span className="text-white text-sm">Expenses</span>
                </div>
                <span className="text-white font-semibold">€1,234.56</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SECOND ROW - Cash Flow Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.6)] border border-[rgba(255,255,255,0.1)] rounded-[16px] p-7"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-lg">Monthly Cash Flow Forecast</h3>
          <div className="bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.3)] rounded-full px-4 py-1.5 text-[#FFD700] text-sm font-semibold">
            January 2026
          </div>
        </div>

        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cashFlowData}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="week" stroke="#9CA3AF" style={{ fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(26,26,46,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#incomeGradient)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#EF4444"
                strokeWidth={2}
                fill="url(#expensesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Annotation */}
        <div className="mt-4 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-lg p-3 flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          <span className="text-[#EF4444] text-sm">
            <span className="font-semibold">Rent due Feb 1</span> — €850 (causes Week 4 spike)
          </span>
        </div>
      </motion.div>

      {/* THIRD ROW - Two Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Bills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.6)] border border-[rgba(255,255,255,0.1)] rounded-[16px] p-6"
        >
          <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
            Upcoming Bills <Calendar className="w-4 h-4 text-[#9CA3AF]" />
          </h3>

          <div className="space-y-3 mb-4">
            {upcomingBills.map((bill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${bill.color}20` }}
                  >
                    <bill.icon className="w-5 h-5" style={{ color: bill.color }} />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{bill.name}</div>
                    <div className="text-[#9CA3AF] text-xs">{bill.due}</div>
                  </div>
                </div>
                <div
                  className={`font-bold text-sm ${bill.urgent ? "text-[#EF4444]" : "text-white"}`}
                >
                  €{bill.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <button className="text-[#FFD700] text-sm font-semibold hover:underline flex items-center gap-1">
            View all bills <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Emergency Fund Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.6)] border border-[rgba(255,255,255,0.1)] rounded-[16px] p-6"
        >
          <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
            Emergency Fund <Shield className="w-4 h-4 text-[#FFD700]" />
          </h3>

          <div className="flex flex-col items-center mb-5">
            {/* Progress Ring */}
            <div className="relative w-[120px] h-[120px] mb-4">
              <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90">
                {/* Background ring */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="10"
                  fill="none"
                />
                {/* Progress ring */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="url(#goldGradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(41 / 100) * 314} 314`}
                />
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-white font-bold text-2xl">41%</div>
                <div className="text-[#9CA3AF] text-xs">€1,760 to go</div>
              </div>
            </div>

            <div className="text-center mb-4">
              <div className="text-[#9CA3AF] text-sm mb-1">Goal: €3,000</div>
              <div className="text-white font-bold text-xl">€1,240 saved</div>
            </div>

            <p className="text-[#9CA3AF] text-sm text-center mb-5">
              Keep going! You're building your safety net 💪
            </p>
          </div>

          <button className="w-full h-11 bg-gradient-to-r from-[#FFD700] to-[#F59E0B] text-black font-bold rounded-lg hover:brightness-110 transition-all">
            Add to Fund
          </button>
        </motion.div>
      </div>

      {/* QUICK ACTIONS ROW */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <button className="h-12 bg-gradient-to-r from-[#FFD700] to-[#F59E0B] text-black font-semibold rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all">
          <Plus className="w-5 h-5" />
          Add Transaction
        </button>
        <button className="h-12 bg-transparent border-2 border-[#4A90D9] text-[#4A90D9] font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[rgba(74,144,217,0.08)] transition-all">
          <BarChart3 className="w-5 h-5" />
          Set Budget
        </button>
        <button className="h-12 bg-transparent border-2 border-white text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-all">
          <List className="w-5 h-5" />
          View All Transactions
        </button>
      </motion.div>
    </div>
  );
}

// VIRTUAL ASSETS TAB
function VirtualAssetsTab() {
  return (
    <div className="space-y-6">
      {/* TOP ROW - Two Balance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ProsperCoins Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[rgba(255,215,0,0.08)] border-2 border-[rgba(255,215,0,0.3)] rounded-[16px] p-7"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="text-5xl">✨</div>
            <div className="bg-[rgba(255,215,0,0.2)] rounded-full px-3 py-1 text-[#FFD700] text-xs font-semibold">
              Main Currency
            </div>
          </div>
          <div className="text-[#FFD700] font-extrabold text-[42px] mb-2">4,521 PC</div>
          <div className="text-[#9CA3AF] text-sm mb-4">ProsperCoins</div>
          <div className="text-[#10B981] text-xs mb-2">+45 PC today — 3 transactions logged</div>
          <div className="text-[#9CA3AF] text-xs">
            ≈ 1,350 PC this month at current rate
          </div>
        </motion.div>

        {/* ProsperGold Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[rgba(245,158,11,0.08)] border-2 border-[rgba(245,158,11,0.3)] rounded-[16px] p-7"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="text-5xl">🏅</div>
            <div className="bg-[rgba(245,158,11,0.2)] rounded-full px-3 py-1 text-[#F59E0B] text-xs font-semibold">
              Premium
            </div>
          </div>
          <div className="text-[#F59E0B] font-extrabold text-[42px] mb-2">12 PG</div>
          <div className="text-[#9CA3AF] text-sm mb-4">ProsperGold</div>
          <div className="text-[#9CA3AF] text-xs">
            Earned by completing Prosperity Keys 🗝️
          </div>
        </motion.div>
      </div>

      {/* NFT ACHIEVEMENTS GALLERY */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.6)] border border-[rgba(255,255,255,0.1)] rounded-[16px] p-7"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-lg">NFT Achievement Badges</h3>
          <div className="bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.3)] rounded-full px-4 py-1.5 text-[#FFD700] text-sm font-semibold">
            5 / 25 unlocked
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-5">
          {nftBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>

        <button className="text-[#FFD700] text-sm font-semibold hover:underline flex items-center gap-1">
          View Full Gallery <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* TOKEN ACTIONS ROW */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* Invest ProsperCoins */}
        <button className="backdrop-blur-[20px] bg-gradient-to-br from-[rgba(255,215,0,0.15)] to-[rgba(245,158,11,0.1)] border border-[rgba(255,215,0,0.3)] rounded-xl p-5 text-left hover:scale-105 transition-all group">
          <div className="text-2xl mb-3">📈</div>
          <h4 className="text-white font-bold text-base mb-2 group-hover:text-[#FFD700] transition-colors">
            Invest ProsperCoins
          </h4>
          <p className="text-[#9CA3AF] text-sm mb-3">Grow your virtual portfolio</p>
          <ArrowRight className="w-5 h-5 text-[#FFD700]" />
        </button>

        {/* Convert to Crypto */}
        <button className="backdrop-blur-[20px] bg-gradient-to-br from-[rgba(74,144,217,0.15)] to-[rgba(53,122,189,0.1)] border border-[rgba(74,144,217,0.3)] rounded-xl p-5 text-left hover:scale-105 transition-all group">
          <div className="text-2xl mb-3">🔄</div>
          <h4 className="text-white font-bold text-base mb-2 group-hover:text-[#4A90D9] transition-colors">
            Convert to Crypto Wallet
          </h4>
          <p className="text-[#9CA3AF] text-sm mb-3">Withdraw to external wallet</p>
          <ArrowRight className="w-5 h-5 text-[#4A90D9]" />
        </button>

        {/* Transaction History */}
        <button className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.6)] border border-[rgba(255,255,255,0.1)] rounded-xl p-5 text-left hover:scale-105 transition-all group">
          <div className="text-2xl mb-3">📜</div>
          <h4 className="text-white font-bold text-base mb-2 group-hover:text-[#9CA3AF] transition-colors">
            Coin Transaction History
          </h4>
          <p className="text-[#9CA3AF] text-sm mb-3">See all coin earnings</p>
          <ArrowRight className="w-5 h-5 text-[#9CA3AF]" />
        </button>
      </motion.div>
    </div>
  );
}

// Badge Card Component
function BadgeCard({ badge }: { badge: typeof nftBadges[0] }) {
  return (
    <motion.div
      whileHover={{ scale: badge.status !== "locked" ? 1.05 : 1 }}
      className={`relative rounded-xl p-4 border-2 ${
        badge.status === "unlocked"
          ? "bg-gradient-to-br from-[rgba(255,215,0,0.15)] to-[rgba(245,158,11,0.1)] border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.2)]"
          : badge.status === "in-progress"
          ? "bg-[rgba(245,158,11,0.08)] border-[#FFA726]"
          : "bg-[rgba(26,26,46,0.6)] border-[rgba(255,255,255,0.1)] grayscale"
      } aspect-square flex flex-col items-center justify-center`}
    >
      {badge.status === "locked" ? (
        <>
          <Lock className="w-8 h-8 text-[#6B7280] mb-2" />
          <div className="text-[#6B7280] text-xs font-semibold">???</div>
        </>
      ) : (
        <>
          <div className="text-4xl mb-2">{badge.icon}</div>
          <div className="text-white text-xs font-semibold text-center mb-1">
            {badge.name}
          </div>
          {badge.status === "unlocked" && (
            <div className="text-[#9CA3AF] text-[10px]">{badge.date}</div>
          )}
          {badge.status === "in-progress" && (
            <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-1.5 mt-2">
              <div
                className="bg-[#FFA726] h-1.5 rounded-full"
                style={{ width: `${badge.progress}%` }}
              />
            </div>
          )}
        </>
      )}

      {badge.status === "in-progress" && (
        <div className="absolute -top-2 -right-2 bg-[#FFA726] text-white text-xs font-bold rounded-full w-12 h-6 flex items-center justify-center">
          {badge.progress}%
        </div>
      )}
    </motion.div>
  );
}
