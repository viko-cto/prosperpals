import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wallet,
  TrendingUp,
  Home as HomeIcon,
  BarChart3,
  PiggyBank,
  CreditCard,
  Plus,
  Search,
  ChevronDown,
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  Paperclip,
  Camera,
  Trash2,
  Check,
  AlertCircle,
  Sparkles,
  Flame,
  ArrowRight,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Types
type Transaction = {
  id: string;
  merchant: string;
  category: string;
  categoryIcon: string;
  categoryColor: string;
  amount: number;
  type: "expense" | "income" | "transfer";
  date: string;
  time: string;
  notes?: string;
  receipt?: boolean;
  pcEarned: number;
  paymentMethod?: string;
  confidence?: number;
};

type CategoryData = {
  name: string;
  value: number;
  color: string;
  icon: string;
};

// Mock data
const categoryData: CategoryData[] = [
  { name: "Food & Dining", value: 345.68, color: "#F59E0B", icon: "🍕" },
  { name: "Transport", value: 234.56, color: "#4A90D9", icon: "🚌" },
  { name: "Bills", value: 296.30, color: "#7C3AED", icon: "🏠" },
  { name: "Shopping", value: 197.53, color: "#EC4899", icon: "🛍️" },
  { name: "Other", value: 160.49, color: "#6B7280", icon: "📦" },
];

const mockTransactions: Transaction[] = [
  {
    id: "1",
    merchant: "Lidl Supermarket",
    category: "Food & Dining",
    categoryIcon: "🍕",
    categoryColor: "#F59E0B",
    amount: -45.99,
    type: "expense",
    date: "Feb 24",
    time: "09:41",
    notes: "Weekly grocery run",
    receipt: true,
    pcEarned: 12,
    paymentMethod: "Revolut Card",
    confidence: 92,
  },
  {
    id: "2",
    merchant: "Starbucks",
    category: "Food & Dining",
    categoryIcon: "🍕",
    categoryColor: "#F59E0B",
    amount: -4.50,
    type: "expense",
    date: "Feb 24",
    time: "08:15",
    pcEarned: 5,
    paymentMethod: "Revolut Card",
    confidence: 95,
  },
  {
    id: "3",
    merchant: "Monthly Salary",
    category: "Income",
    categoryIcon: "💰",
    categoryColor: "#10B981",
    amount: 2500.00,
    type: "income",
    date: "Feb 24",
    time: "00:00",
    pcEarned: 100,
    paymentMethod: "Bank Transfer",
    confidence: 100,
  },
  {
    id: "4",
    merchant: "Uber",
    category: "Transport",
    categoryIcon: "🚌",
    categoryColor: "#4A90D9",
    amount: -12.80,
    type: "expense",
    date: "Feb 23",
    time: "19:30",
    pcEarned: 8,
    paymentMethod: "Revolut Card",
    confidence: 88,
  },
  {
    id: "5",
    merchant: "Wagamama",
    category: "Food & Dining",
    categoryIcon: "🍕",
    categoryColor: "#F59E0B",
    amount: -32.50,
    type: "expense",
    date: "Feb 23",
    time: "18:45",
    notes: "Dinner with friends",
    receipt: true,
    pcEarned: 10,
    paymentMethod: "Revolut Card",
    confidence: 90,
  },
  {
    id: "6",
    merchant: "Amazon",
    category: "Shopping",
    categoryIcon: "🛍️",
    categoryColor: "#EC4899",
    amount: -67.99,
    type: "expense",
    date: "Feb 23",
    time: "14:22",
    pcEarned: 15,
    paymentMethod: "Credit Card",
    confidence: 85,
  },
  {
    id: "7",
    merchant: "Netflix",
    category: "Bills",
    categoryIcon: "🏠",
    categoryColor: "#7C3AED",
    amount: -15.99,
    type: "expense",
    date: "Feb 23",
    time: "09:00",
    pcEarned: 6,
    paymentMethod: "Revolut Card",
    confidence: 98,
  },
  {
    id: "8",
    merchant: "Pure Gym",
    category: "Health",
    categoryIcon: "💪",
    categoryColor: "#EF4444",
    amount: -39.99,
    type: "expense",
    date: "Feb 22",
    time: "10:15",
    pcEarned: 10,
    paymentMethod: "Direct Debit",
    confidence: 95,
  },
  {
    id: "9",
    merchant: "Transfer to Savings",
    category: "Transfer",
    categoryIcon: "🔄",
    categoryColor: "#9CA3AF",
    amount: -200.00,
    type: "transfer",
    date: "Feb 22",
    time: "08:00",
    pcEarned: 20,
    paymentMethod: "Internal Transfer",
    confidence: 100,
  },
];

// Group transactions by date
const groupTransactionsByDate = (transactions: Transaction[]) => {
  const groups: { [key: string]: Transaction[] } = {};
  transactions.forEach((tx) => {
    const dateLabel = tx.date === "Feb 24" ? "Today — Feb 24" : 
                     tx.date === "Feb 23" ? "Yesterday — Feb 23" : 
                     tx.date;
    if (!groups[dateLabel]) {
      groups[dateLabel] = [];
    }
    groups[dateLabel].push(tx);
  });
  return groups;
};

export function TransactionLog2() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [filterPeriod, setFilterPeriod] = useState("This Month");
  const [filterType, setFilterType] = useState<"all" | "expense" | "income" | "transfer">("all");

  const groupedTransactions = groupTransactionsByDate(mockTransactions);
  const totalSpent = 1234.56;
  const totalIncome = 2500.00;
  const netAmount = 1265.44;
  const pcEarned = 348;
  const streakDays = 7;

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
            <NavItem icon={CreditCard} label="Transactions" active={true} />
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex gap-8">
            {/* LEFT COLUMN (65%) */}
            <div className="flex-1" style={{ maxWidth: "65%" }}>
              {/* Page Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-white font-extrabold text-[32px] mb-2">
                    Transaction History
                  </h1>
                  <p className="text-[#9CA3AF] text-base">
                    All your income and expenses in one place.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-11 px-6 bg-gradient-to-r from-[#FFD700] to-[#F59E0B] text-black font-semibold rounded-xl flex items-center gap-2 shadow-lg hover:brightness-110 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Add Transaction
                </motion.button>
              </div>

              {/* Filter Bar */}
              <div className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.6)] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 mb-6 sticky top-0 z-10">
                {/* Row 1 */}
                <div className="flex gap-3 mb-3">
                  {/* Date Range */}
                  <select
                    value={filterPeriod}
                    onChange={(e) => setFilterPeriod(e.target.value)}
                    className="flex-1 h-10 bg-[#1a1a2e] border border-[rgba(255,255,255,0.15)] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20"
                  >
                    <option>This Month</option>
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                    <option>Custom Range</option>
                  </select>

                  {/* Category */}
                  <select className="flex-1 h-10 bg-[#1a1a2e] border border-[rgba(255,255,255,0.15)] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20">
                    <option>All Categories</option>
                    <option>Food & Dining</option>
                    <option>Transport</option>
                    <option>Bills</option>
                    <option>Shopping</option>
                    <option>Health</option>
                    <option>Other</option>
                  </select>

                  {/* Type Filter */}
                  <div className="flex bg-[#1a1a2e] border border-[rgba(255,255,255,0.15)] rounded-lg p-1">
                    {(["all", "expense", "income", "transfer"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                          filterType === type
                            ? "bg-gradient-to-r from-[#FFD700] to-[#F59E0B] text-black"
                            : "text-[#9CA3AF] hover:text-white"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex gap-3 items-center">
                  {/* Amount Range Slider */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#9CA3AF] text-xs">Amount: €0 - €500+</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      className="w-full h-1.5 bg-[rgba(255,255,255,0.1)] rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
                      style={{
                        background: "linear-gradient(to right, #FFD700 0%, #FFD700 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 100%)",
                      }}
                    />
                  </div>

                  {/* Search */}
                  <div className="relative w-[280px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <input
                      type="text"
                      placeholder="Search merchant or notes..."
                      className="w-full h-10 bg-[#1a1a2e] border border-[rgba(255,255,255,0.15)] rounded-lg pl-10 pr-3 text-white text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20"
                    />
                  </div>

                  {/* Apply/Reset */}
                  <button className="h-10 px-5 bg-gradient-to-r from-[#FFD700] to-[#F59E0B] text-black font-semibold rounded-lg text-sm hover:brightness-110 transition-all">
                    Apply Filters
                  </button>
                  <button className="text-[#9CA3AF] text-sm hover:text-white transition-colors">
                    Reset
                  </button>
                </div>
              </div>

              {/* Transaction List */}
              <div className="space-y-6">
                {Object.entries(groupedTransactions).map(([dateLabel, transactions]) => (
                  <div key={dateLabel}>
                    {/* Date Group Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-[#9CA3AF] text-xs uppercase tracking-wider font-semibold">
                        {dateLabel}
                      </div>
                      <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
                    </div>

                    {/* Transactions */}
                    <div className="space-y-2">
                      {transactions.map((tx) => (
                        <TransactionRow
                          key={tx.id}
                          transaction={tx}
                          onClick={() => setSelectedTransaction(tx)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Bar */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(255,255,255,0.1)]">
                <div className="text-[#9CA3AF] text-sm">
                  Showing 24 of 87 transactions
                </div>
                <div className="flex items-center gap-4">
                  <button className="h-10 px-4 border border-[rgba(255,255,255,0.2)] text-white rounded-lg text-sm font-medium hover:bg-[rgba(255,255,255,0.05)] transition-all flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export to CSV
                  </button>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-lg border border-[rgba(255,255,255,0.2)] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {[1, 2, 3, "...", 7].map((page, i) => (
                      <button
                        key={i}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                          page === 1
                            ? "bg-[#FFD700] text-black"
                            : "text-[#9CA3AF] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button className="w-8 h-8 rounded-lg border border-[rgba(255,255,255,0.2)] flex items-center justify-center text-white hover:bg-[rgba(255,255,255,0.05)] transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (35%) - Sticky */}
            <div className="w-[35%] space-y-6 sticky top-8 self-start">
              {/* Summary Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="backdrop-blur-[20px] bg-[rgba(26,26,46,0.6)] border border-[rgba(255,255,255,0.1)] rounded-[16px] p-6"
              >
                <h3 className="text-white font-bold text-lg mb-5">January 2026 Summary</h3>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-xl p-4">
                    <div className="text-[#EF4444] text-2xl mb-1">🔴</div>
                    <div className="text-[#9CA3AF] text-xs mb-1">Total Spent</div>
                    <div className="text-[#EF4444] font-bold text-xl">€{totalSpent.toFixed(2)}</div>
                  </div>

                  <div className="bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] rounded-xl p-4">
                    <div className="text-[#10B981] text-2xl mb-1">🟢</div>
                    <div className="text-[#9CA3AF] text-xs mb-1">Total Income</div>
                    <div className="text-[#10B981] font-bold text-xl">€{totalIncome.toFixed(2)}</div>
                  </div>

                  <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl p-4">
                    <div className="text-white text-2xl mb-1">⚡</div>
                    <div className="text-[#9CA3AF] text-xs mb-1">Net</div>
                    <div className="text-white font-bold text-xl">+€{netAmount.toFixed(2)}</div>
                  </div>

                  <div className="bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.3)] rounded-xl p-4">
                    <div className="text-[#FFD700] text-2xl mb-1">✨</div>
                    <div className="text-[#9CA3AF] text-xs mb-1">PC Earned</div>
                    <div className="text-[#FFD700] font-bold text-xl">{pcEarned} PC</div>
                  </div>
                </div>

                {/* Donut Chart */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold text-sm mb-4">Spending by Category</h4>
                  <div className="relative w-[180px] h-[180px] mx-auto mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={75}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-white font-bold text-2xl">€{totalSpent.toFixed(0)}</div>
                      <div className="text-[#9CA3AF] text-xs">Spent</div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="space-y-2">
                    {categoryData.map((cat) => (
                      <div key={cat.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: cat.color }}
                          />
                          <span className="text-[#9CA3AF]">{cat.icon} {cat.name}</span>
                        </div>
                        <div className="text-white font-semibold">
                          {Math.round((cat.value / totalSpent) * 100)}% · €{cat.value.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Gamification Streak Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[rgba(255,215,0,0.15)] to-[rgba(245,158,11,0.1)] border-2 border-[rgba(255,215,0,0.3)] rounded-[16px] p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-6 h-6 text-[#FFD700]" />
                  <h3 className="text-[#FFD700] font-bold text-lg">7-Day Logging Streak!</h3>
                </div>

                {/* Streak Progress */}
                <div className="flex items-center gap-2 mb-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full border-2 ${
                        i < streakDays
                          ? "bg-[#FFD700] border-[#FFED4E]"
                          : "bg-transparent border-[rgba(255,215,0,0.3)]"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-white text-sm mb-3">
                  Log today to keep your streak! <span className="font-bold">+10 bonus PC</span> at 10 days 🎯
                </p>

                <button className="text-[#FFD700] text-sm font-semibold hover:underline flex items-center gap-1">
                  See your Copper Key progress <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Transaction Detail Modal */}
      <TransactionModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
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

// Transaction Row Component
function TransactionRow({
  transaction,
  onClick,
}: {
  transaction: Transaction;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-all text-left"
      role="row"
    >
      {/* Category Icon */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
        style={{ backgroundColor: `${transaction.categoryColor}30` }}
        aria-label={`${transaction.category} category`}
      >
        {transaction.categoryIcon}
      </div>

      {/* Transaction Info */}
      <div className="flex-1 min-w-0">
        <div className="text-white font-semibold text-[15px] mb-0.5">{transaction.merchant}</div>
        <div className="text-[#9CA3AF] text-xs">
          {transaction.category} • {transaction.date} • {transaction.time}
        </div>
        {transaction.notes && (
          <div className="text-[#9CA3AF] text-xs mt-1 flex items-center gap-1">
            <span>📝</span>
            <span>{transaction.notes}</span>
          </div>
        )}
      </div>

      {/* Receipt Indicator */}
      {transaction.receipt && (
        <Paperclip className="w-4 h-4 text-[#9CA3AF] flex-shrink-0" />
      )}

      {/* Amount & PC Earned */}
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <div
          className={`font-semibold text-base ${
            transaction.type === "income"
              ? "text-[#10B981]"
              : transaction.type === "expense"
              ? "text-[#EF4444]"
              : "text-[#9CA3AF]"
          }`}
        >
          {transaction.amount > 0 ? "+" : ""}€{Math.abs(transaction.amount).toFixed(2)}
        </div>
        <div className="bg-[rgba(255,215,0,0.15)] border border-[rgba(255,215,0,0.3)] rounded-full px-2.5 py-0.5 text-[#FFD700] text-[11px] font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          +{transaction.pcEarned} PC
        </div>
      </div>
    </motion.button>
  );
}

// Transaction Detail Modal
function TransactionModal({
  transaction,
  onClose,
}: {
  transaction: Transaction | null;
  onClose: () => void;
}) {
  if (!transaction) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-[10px] flex items-center justify-center z-50 p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[520px] backdrop-blur-[20px] bg-[rgba(26,26,46,0.95)] border border-[rgba(255,255,255,0.1)] rounded-[20px] p-9 relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] flex items-center justify-center transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: `${transaction.categoryColor}30` }}
            >
              {transaction.categoryIcon}
            </div>
            <div className="flex-1">
              <h2 className="text-white font-bold text-2xl mb-1">{transaction.merchant}</h2>
              <div
                className={`text-3xl font-extrabold ${
                  transaction.type === "income"
                    ? "text-[#10B981]"
                    : transaction.type === "expense"
                    ? "text-[#EF4444]"
                    : "text-[#9CA3AF]"
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}€{Math.abs(transaction.amount).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Detail Rows */}
          <div className="space-y-4 mb-6">
            <DetailRow label="Date & Time" value={`${transaction.date}, ${transaction.time}`} />
            <DetailRow label="Category" value={transaction.category} />
            <DetailRow label="Payment Method" value={transaction.paymentMethod || "N/A"} />
            
            {/* Notes Field */}
            <div>
              <label className="text-[#9CA3AF] text-sm mb-2 block">Notes</label>
              <textarea
                defaultValue={transaction.notes || ""}
                placeholder="Add notes about this transaction..."
                className="w-full h-20 bg-[#1a1a2e] border border-[rgba(255,255,255,0.15)] rounded-lg p-3 text-white text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 resize-none"
              />
            </div>
          </div>

          {/* AI Categorization */}
          {transaction.confidence && (
            <div className="bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.3)] rounded-lg p-3 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🤖</span>
                  <span className="text-[#F59E0B] text-sm font-semibold">
                    {transaction.confidence}% confident: {transaction.category}
                  </span>
                </div>
                <button className="text-[#FFD700] text-sm font-semibold hover:underline">
                  Recategorize?
                </button>
              </div>
            </div>
          )}

          {/* Receipt Upload */}
          <div className="border-2 border-dashed border-[rgba(255,255,255,0.2)] rounded-lg p-6 mb-6 hover:border-[rgba(255,215,0,0.3)] transition-all cursor-pointer">
            <div className="flex flex-col items-center gap-2 text-center">
              <Camera className="w-8 h-8 text-[#9CA3AF]" />
              <div className="text-white text-sm font-semibold">Add Receipt</div>
              <div className="text-[#9CA3AF] text-xs">Click to upload or drag and drop</div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 h-12 border-2 border-[#EF4444] text-[#EF4444] rounded-xl font-semibold hover:bg-[rgba(239,68,68,0.1)] transition-all flex items-center justify-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete Transaction
            </button>
            <button className="flex-1 h-12 bg-gradient-to-r from-[#FFD700] to-[#F59E0B] text-black rounded-xl font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Detail Row Component
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-[#9CA3AF] text-sm">{label}</div>
      <div className="text-white font-semibold text-sm">{value}</div>
    </div>
  );
}
