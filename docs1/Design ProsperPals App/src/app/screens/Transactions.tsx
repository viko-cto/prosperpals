import { List, Download, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNotifications } from "../contexts/NotificationContext";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface Transaction {
  date: string;
  dateGroup: string;
  merchant: string;
  category: string;
  amount: number;
  type: "expense" | "income";
  time: string;
  pcEarned: number;
}

const categoryConfig: Record<string, { bg: string; icon: string }> = {
  "Food & Drink": { bg: "#F59E0B", icon: "🍕" },
  Transport: { bg: "#4A90D9", icon: "🚗" },
  Entertainment: { bg: "#7C3AED", icon: "🎬" },
  "Bills & Utilities": { bg: "#6B7280", icon: "⚡" },
  Groceries: { bg: "#EC4899", icon: "🛍️" },
  Income: { bg: "#10B981", icon: "💰" },
  Health: { bg: "#EF4444", icon: "❤️" },
  Other: { bg: "#374151", icon: "●" },
};

export function Transactions() {
  const { showCoinReward } = useNotifications();
  const [filterType, setFilterType] = useState<string>("all");

  const transactions: Transaction[] = [
    { dateGroup: "Today · Feb 24", date: "Feb 24, 2026", time: "2:45 PM", merchant: "Starbucks", category: "Food & Drink", amount: -5.75, type: "expense", pcEarned: 5 },
    { dateGroup: "Today · Feb 24", date: "Feb 24, 2026", time: "9:00 AM", merchant: "Salary Deposit", category: "Income", amount: 3200.00, type: "income", pcEarned: 50 },
    { dateGroup: "Yesterday · Feb 23", date: "Feb 23, 2026", time: "8:30 PM", merchant: "Netflix", category: "Entertainment", amount: -15.99, type: "expense", pcEarned: 5 },
    { dateGroup: "Yesterday · Feb 23", date: "Feb 23, 2026", time: "6:15 PM", merchant: "Whole Foods", category: "Groceries", amount: -87.43, type: "expense", pcEarned: 20 },
    { dateGroup: "Feb 22", date: "Feb 22, 2026", time: "7:45 AM", merchant: "Shell Gas", category: "Transport", amount: -45.00, type: "expense", pcEarned: 12 },
  ];

  const categorySpending = [
    { name: "Groceries", value: 87.43, color: "#EC4899" },
    { name: "Transport", value: 45.00, color: "#4A90D9" },
    { name: "Entertainment", value: 15.99, color: "#7C3AED" },
    { name: "Food", value: 5.75, color: "#F59E0B" },
  ];

  const totalSpent = 1234.56;
  const totalIncome = 3200.00;
  const netAmount = totalIncome - totalSpent;
  const totalPCEarned = 348;

  const handleAddTransaction = () => {
    showCoinReward({
      amount: 25,
      reason: "Logged a transaction!",
      currentXP: 175,
      xpToNextLevel: 200
    });
  };

  // Group transactions by date
  const groupedTransactions: Record<string, Transaction[]> = {};
  transactions.forEach((tx) => {
    if (!groupedTransactions[tx.dateGroup]) {
      groupedTransactions[tx.dateGroup] = [];
    }
    groupedTransactions[tx.dateGroup].push(tx);
  });

  return (
    <div className="min-h-screen bg-[#0f0f1a] p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <List className="w-10 h-10 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>Transactions</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAddTransaction}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-lg text-[#1a1a2e] font-bold transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              + Add Transaction (Earn 25 PC)
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 flex-1">
              <div>
                <div className="text-[#EF4444] text-xs font-semibold mb-1 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  🔴 Spent this month
                </div>
                <div className="text-white text-2xl font-extrabold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
                  €{totalSpent.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-[#10B981] text-xs font-semibold mb-1 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  🟢 Income this month
                </div>
                <div className="text-white text-2xl font-extrabold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
                  €{totalIncome.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-[#9CA3AF] text-xs font-semibold mb-1 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  ⚡ Net
                </div>
                <div className="text-white text-2xl font-extrabold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
                  +€{netAmount.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-[#FFD700] text-xs font-semibold mb-1 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  ✨ PC Earned
                </div>
                <div className="text-[#FFD700] text-2xl font-extrabold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
                  {totalPCEarned} PC
                </div>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="w-[160px] h-[160px] ml-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySpending}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categorySpending.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center -mt-[105px] pointer-events-none">
                <div className="text-white text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Spending
                </div>
                <div className="text-white text-sm font-bold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  by Category
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pill Bar */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-6">
          {/* Row 1: Type Filters */}
          <div className="flex gap-2 bg-[rgba(26,26,46,0.6)] border border-[rgba(255,255,255,0.08)] rounded-[14px] p-1 w-fit mb-4">
            <button
              onClick={() => setFilterType("all")}
              className={`px-[18px] py-2 rounded-[10px] h-[36px] transition-all duration-200 ${
                filterType === "all"
                  ? "bg-gradient-to-br from-[#FFD700] to-[#F59E0B] text-[#000000] font-semibold"
                  : "bg-transparent text-[#9CA3AF] hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
              }`}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: filterType === "all" ? 600 : 400 }}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("expenses")}
              className={`px-[18px] py-2 rounded-[10px] h-[36px] transition-all duration-200 ${
                filterType === "expenses"
                  ? "bg-gradient-to-br from-[#FFD700] to-[#F59E0B] text-[#000000] font-semibold"
                  : "bg-transparent text-[#9CA3AF] hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
              }`}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: filterType === "expenses" ? 600 : 400 }}
            >
              Expenses
            </button>
            <button
              onClick={() => setFilterType("income")}
              className={`px-[18px] py-2 rounded-[10px] h-[36px] transition-all duration-200 ${
                filterType === "income"
                  ? "bg-gradient-to-br from-[#FFD700] to-[#F59E0B] text-[#000000] font-semibold"
                  : "bg-transparent text-[#9CA3AF] hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
              }`}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: filterType === "income" ? 600 : 400 }}
            >
              Income
            </button>
            <button
              onClick={() => setFilterType("transfers")}
              className={`px-[18px] py-2 rounded-[10px] h-[36px] transition-all duration-200 ${
                filterType === "transfers"
                  ? "bg-gradient-to-br from-[#FFD700] to-[#F59E0B] text-[#000000] font-semibold"
                  : "bg-transparent text-[#9CA3AF] hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
              }`}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: filterType === "transfers" ? 600 : 400 }}
            >
              Transfers
            </button>
          </div>

          {/* Row 2: Secondary Filters */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 h-[36px] bg-white/5 border border-white/10 rounded-[10px] text-white/80 hover:bg-white/10 transition-colors">
              <span className="text-[14px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>This Month</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 h-[36px] bg-white/5 border border-white/10 rounded-[10px] text-white/80 hover:bg-white/10 transition-colors">
              <span className="text-[14px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>All Categories</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 h-[36px] bg-white/5 border border-white/10 rounded-[10px] text-white/80 hover:bg-white/10 transition-colors">
              <Search className="w-4 h-4" />
              <span className="text-[14px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>Search</span>
            </button>
          </div>
        </div>

        {/* Transaction List with Date Groups */}
        <div>
          {Object.entries(groupedTransactions).map(([dateGroup, txList]) => (
            <div key={dateGroup}>
              {/* Date Group Header */}
              <div 
                className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider mt-5 mb-2"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.08em' }}
              >
                {dateGroup}
              </div>

              {/* Transaction Rows */}
              {txList.map((tx, index) => (
                <TransactionRow key={`${dateGroup}-${index}`} transaction={tx} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const categoryInfo = categoryConfig[transaction.category] || categoryConfig["Other"];
  const isIncome = transaction.type === "income";

  return (
    <div className="bg-[rgba(26,26,46,0.4)] border border-[rgba(255,255,255,0.06)] rounded-xl p-[14px_18px] mb-2 hover:bg-[rgba(255,215,0,0.04)] hover:border-[rgba(255,215,0,0.15)] transition-all duration-150 cursor-pointer">
      <div className="flex items-center gap-4">
        {/* Category Icon Circle */}
        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: categoryInfo.bg }}
        >
          <span className="text-lg">{categoryInfo.icon}</span>
        </div>

        {/* Text Block */}
        <div className="flex-1 min-w-0">
          <div className="text-white text-[15px] font-semibold mb-0.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            {transaction.merchant}
          </div>
          <div className="text-[#9CA3AF] text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            {transaction.category} • {transaction.date} • {transaction.time}
          </div>
        </div>

        {/* Amounts */}
        <div className="text-right flex-shrink-0">
          <div
            className={`text-[16px] font-semibold mb-1 ${isIncome ? "text-[#10B981]" : "text-white"}`}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            {isIncome ? "+" : "−"}€{Math.abs(transaction.amount).toFixed(2)}
          </div>
          {/* ProsperCoin Badge */}
          <div
            className="inline-flex items-center gap-1 bg-[rgba(255,215,0,0.12)] border border-[rgba(255,215,0,0.3)] rounded-full px-2 py-0.5"
          >
            <span className="text-[#FFD700] text-[11px] font-semibold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              ✨ +{transaction.pcEarned} PC
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
