import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search,
  ChevronDown,
  Plus,
  Calendar,
  Filter,
  Download,
  FileText,
  Mic,
  RefreshCw,
  Edit2,
  Trash2,
  Tag,
  MapPin,
  Receipt,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  X,
  Check
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

/**
 * MICRO-INTERACTION ANNOTATIONS FOR TRANSACTION LOG
 * 
 * SCREEN ENTRY:
 *   - Page header + summary: opacity 0→1, 200ms ease-out-quart
 *   - Donut chart: arcs draw 0°→target, 700ms ease-out-quart, delay 100ms
 *   - Filter bar: opacity 0→1, translateY(-4px)→0, delay 150ms, 250ms
 *   - Transaction rows: stagger opacity 0→1, translateX(-8px)→0
 *     25ms between rows (fast stagger, max 350ms total), 200ms per row
 * 
 * FILTER BAR:
 *   - Date dropdown hover: border-color brightens to gold, 120ms
 *   - Dropdown open: scaleY(0)→scaleY(1), opacity 0→1, 200ms
 *   - Category chips: checkmark scale 0→1 on select, bounce animation
 *   - Type toggle: active pill slides to new position, 200ms
 *   - Amount slider: thumb scale 1.0→1.3 on drag, 150ms
 * 
 * TRANSACTION ROW:
 *   - Hover: background brightens, border gold, translateY(-1px), 150ms
 *   - Category icon: scale 1.0→1.08 on hover
 *   - "View Details →" button appears on hover
 *   - ProsperCoin badge: glow pulse on hover
 *   - Tap: flash background, open detail modal
 * 
 * PROSPERCOINS BADGE:
 *   - Entry: scale 0→1.15→1.0, spring, delay row_delay + 80ms
 *   - Hover: scale 1.08, glow brightens, 120ms
 *   - Tap: tooltip appears "You earned 12 PC!", auto-dismiss 2000ms
 * 
 * TRANSACTION DETAIL MODAL:
 *   - Open: backdrop fade in, modal translateY(+40px)→0, scale 0.95→1.0, 280ms
 *   - Receipt zone: border dashes animate, drag-over highlights
 *   - Save/Delete buttons with respective animations
 */

type TransactionType = "inflow" | "outflow";
type TransactionMethod = "voice" | "auto" | "manual" | "receipt";

interface Transaction {
  id: string;
  date: string;
  time: string;
  emoji: string;
  merchant: string;
  amount: number;
  type: TransactionType;
  category: string;
  account: string;
  method: TransactionMethod;
  recurring?: boolean;
  location?: string;
  prosperCoins?: number;
  receiptUrl?: string;
  notes?: string;
  tags?: string[];
}

export function TransactionLog() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [dateRange, setDateRange] = useState("This Month");
  const [typeFilter, setTypeFilter] = useState<"all" | "inflow" | "outflow">("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: "1",
      date: "2026-02-12",
      time: "2:15 PM",
      emoji: "🛒",
      merchant: "Lidl Groceries",
      amount: -45.20,
      type: "outflow",
      category: "Groceries",
      account: "Nordea",
      method: "voice",
      location: "Copenhagen, Denmark",
      prosperCoins: 12,
      receiptUrl: "/receipt-1.jpg",
      notes: "Weekly grocery shopping",
      tags: ["Essentials"]
    },
    {
      id: "2",
      date: "2026-02-12",
      time: "10:30 AM",
      emoji: "☕",
      merchant: "Coffee Collective",
      amount: -5.50,
      type: "outflow",
      category: "Dining",
      account: "Revolut",
      method: "auto",
      prosperCoins: 5,
    },
    {
      id: "3",
      date: "2026-02-11",
      time: "3:45 PM",
      emoji: "🎬",
      merchant: "Netflix Subscription",
      amount: -14.99,
      type: "outflow",
      category: "Entertainment",
      account: "Nordea",
      method: "auto",
      recurring: true,
      prosperCoins: 8,
    },
    {
      id: "4",
      date: "2026-02-11",
      time: "9:00 AM",
      emoji: "💼",
      merchant: "Salary - Acme Corp",
      amount: 2500.00,
      type: "inflow",
      category: "Salary",
      account: "Nordea",
      method: "auto",
      prosperCoins: 50,
    },
    {
      id: "5",
      date: "2026-02-10",
      time: "6:20 PM",
      emoji: "🚕",
      merchant: "Uber Ride",
      amount: -18.50,
      type: "outflow",
      category: "Transportation",
      account: "Revolut",
      method: "auto",
      location: "Copenhagen City Center",
      prosperCoins: 6,
    },
    {
      id: "6",
      date: "2026-02-10",
      time: "1:15 PM",
      emoji: "🏃",
      merchant: "Fitness World Gym",
      amount: -29.00,
      type: "outflow",
      category: "Health",
      account: "Nordea",
      method: "auto",
      recurring: true,
      prosperCoins: 10,
    },
  ];

  const categoryData = [
    { name: "Groceries", value: 245, color: "#10B981" },
    { name: "Dining", value: 180, color: "#F59E0B" },
    { name: "Entertainment", value: 95, color: "#8B5CF6" },
    { name: "Transportation", value: 120, color: "#3B82F6" },
    { name: "Health", value: 60, color: "#EF4444" },
  ];

  const categories = ["Groceries", "Dining", "Entertainment", "Transportation", "Health", "Shopping", "Bills"];

  const filteredTransactions = transactions.filter(tx => {
    if (typeFilter !== "all" && tx.type !== typeFilter) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(tx.category)) return false;
    return true;
  });

  const easeOutQuart = [0.25, 1, 0.5, 1];

  return (
    <div className="min-h-screen bg-[#0f0f1a] p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER + SUMMARY CARD - Entry animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: easeOutQuart }}
        >
          <div className="mb-6">
            <h1 
              className="text-3xl font-bold text-white mb-2"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              Transaction Log 📊
            </h1>
            <p 
              className="text-white/60"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              Track every expense and income
            </p>
          </div>

          {/* Summary Card with Donut Chart */}
          <div className="bg-gradient-to-br from-yellow-500/10 via-white/5 to-transparent backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6 mb-6 shadow-[0_0_40px_rgba(255,215,0,0.1)]">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 
                  className="text-lg font-semibold text-white mb-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  This Month's Breakdown
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div 
                      className="text-sm text-white/60 mb-1"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      Total Income
                    </div>
                    <div 
                      className="text-2xl font-bold text-green-400"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                    >
                      €2,500.00
                    </div>
                  </div>
                  <div>
                    <div 
                      className="text-sm text-white/60 mb-1"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      Total Expenses
                    </div>
                    <div 
                      className="text-2xl font-bold text-red-400"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                    >
                      €700.00
                    </div>
                  </div>
                </div>
              </div>

              {/* Donut Chart with arc animation */}
              <DonutChart data={categoryData} delay={0.1} />
            </div>
          </div>
        </motion.div>

        {/* FILTER BAR - Animated entry */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: easeOutQuart, delay: 0.15 }}
          className="mb-6"
        >
          <FilterBar
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            categories={categories}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />
        </motion.div>

        {/* TRANSACTION LIST - Staggered rows */}
        <div className="space-y-3">
          {filteredTransactions.map((transaction, index) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              index={index}
              onClick={() => setSelectedTransaction(transaction)}
            />
          ))}
        </div>

        {/* Quick Add Button */}
        <motion.button
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-[#FFD700] to-[#F59E0B] rounded-full flex items-center justify-center shadow-lg"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 20px rgba(255,215,0,0.5)",
            transition: { duration: 0.15 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-6 h-6 text-[#1a1a2e]" />
        </motion.button>
      </div>

      {/* TRANSACTION DETAIL MODAL */}
      <AnimatePresence>
        {selectedTransaction && (
          <TransactionDetailModal
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * DONUT CHART with arc draw-in animation
 */
function DonutChart({ data, delay }: { data: any[]; delay: number }) {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, delay * 1000 + 700);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay }}
      className="w-48 h-48 min-w-[192px] min-h-[192px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            animationBegin={delay * 1000}
            animationDuration={700}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

/**
 * FILTER BAR with all interactive elements
 */
function FilterBar({
  typeFilter,
  setTypeFilter,
  selectedCategories,
  setSelectedCategories,
  categories,
  showFilters,
  setShowFilters
}: {
  typeFilter: "all" | "inflow" | "outflow";
  setTypeFilter: (type: "all" | "inflow" | "outflow") => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  categories: string[];
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}) {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const resetFilters = () => {
    setTypeFilter("all");
    setSelectedCategories([]);
  };

  return (
    <div className="space-y-4">
      {/* Main Filter Row */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Type Toggle - Segmented control with sliding indicator */}
        <TypeToggle value={typeFilter} onChange={setTypeFilter} />

        {/* Category Filter Button */}
        <motion.button
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px' }}
          whileHover={{
            backgroundColor: "rgba(255,255,255,0.08)",
            borderColor: "rgba(255,215,0,0.3)",
            transition: { duration: 0.12 }
          }}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {selectedCategories.length > 0 && (
            <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
              {selectedCategories.length}
            </span>
          )}
        </motion.button>

        {/* Reset Link */}
        {(typeFilter !== "all" || selectedCategories.length > 0) && (
          <motion.button
            className="text-sm text-white/50 hover:text-yellow-400 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetFilters}
          >
            Reset
          </motion.button>
        )}
      </div>

      {/* Expanded Category Chips */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="flex items-center gap-2 flex-wrap"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            style={{ transformOrigin: "top center" }}
          >
            {categories.map((category, index) => (
              <CategoryChip
                key={category}
                category={category}
                isSelected={selectedCategories.includes(category)}
                onToggle={() => toggleCategory(category)}
                delay={index * 0.03}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * TYPE TOGGLE with sliding indicator
 */
function TypeToggle({
  value,
  onChange
}: {
  value: "all" | "inflow" | "outflow";
  onChange: (value: "all" | "inflow" | "outflow") => void;
}) {
  const options: Array<{ value: "all" | "inflow" | "outflow"; label: string }> = [
    { value: "all", label: "All" },
    { value: "inflow", label: "Income" },
    { value: "outflow", label: "Expenses" }
  ];

  return (
    <div className="relative flex gap-1 bg-[rgba(26,26,46,0.6)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-lg p-1">
      {/* Sliding indicator */}
      <motion.div
        className="absolute top-1 bottom-1 bg-gradient-to-br from-[#FFD700] to-[#F59E0B] rounded-md"
        initial={false}
        animate={{
          left: value === "all" ? 4 : value === "inflow" ? "calc(33.33% + 1.33px)" : "calc(66.66% + 2.66px)",
          right: value === "all" ? "calc(66.66% + 2.66px)" : value === "inflow" ? "calc(33.33% + 1.33px)" : 4
        }}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
      />

      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className="relative z-10 px-4 py-1.5 text-sm rounded-md transition-colors"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: value === option.value ? 600 : 400,
            color: value === option.value ? "#000000" : "#9CA3AF"
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

/**
 * CATEGORY CHIP with checkmark animation
 */
function CategoryChip({
  category,
  isSelected,
  onToggle,
  delay
}: {
  category: string;
  isSelected: boolean;
  onToggle: () => void;
  delay: number;
}) {
  return (
    <motion.button
      className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-colors ${
        isSelected
          ? "bg-[rgba(255,215,0,0.2)] border-[#FFD700] text-[#FFD700]"
          : "bg-white/5 border-white/10 text-white/70"
      }`}
      style={{ fontFamily: 'Inter, sans-serif', fontWeight: isSelected ? 600 : 400 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, delay }}
      whileHover={{
        backgroundColor: isSelected ? "rgba(255,215,0,0.25)" : "rgba(255,215,0,0.08)",
        borderColor: isSelected ? "#FFD700" : "rgba(255,215,0,0.3)",
        transition: { duration: 0.12 }
      }}
      whileTap={{
        scale: 0.95
      }}
      onClick={onToggle}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Check className="w-3 h-3" />
        </motion.div>
      )}
      <span>{category}</span>
    </motion.button>
  );
}

/**
 * TRANSACTION ROW with hover effects and ProsperCoin badge
 */
function TransactionRow({
  transaction,
  index,
  onClick
}: {
  transaction: Transaction;
  index: number;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showCoinTooltip, setShowCoinTooltip] = useState(false);

  // Fast stagger: 25ms between rows, max 350ms total (14 rows max before no stagger)
  const staggerDelay = Math.min(index * 0.025, 0.35);

  return (
    <motion.div
      className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 cursor-pointer"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1], delay: staggerDelay }}
      whileHover={{
        backgroundColor: "rgba(255,215,0,0.07)",
        borderColor: "rgba(255,215,0,0.15)",
        y: -1,
        transition: { duration: 0.15, ease: [0.25, 1, 0.5, 1] }
      }}
      whileTap={{
        backgroundColor: "rgba(255,215,0,0.15)",
        transition: { duration: 0.08 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: Category Icon + Details */}
        <div className="flex items-center gap-4 flex-1">
          {/* Category Icon with hover scale */}
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 flex items-center justify-center text-xl"
            animate={{
              scale: isHovered ? 1.08 : 1.0
            }}
            transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
          >
            {transaction.emoji}
          </motion.div>

          {/* Transaction Details */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span 
                className="font-semibold text-white"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {transaction.merchant}
              </span>
              {transaction.recurring && (
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">
                  Recurring
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-white/50">
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                {transaction.time}
              </span>
              <span>•</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                {transaction.category}
              </span>
              {transaction.method === "voice" && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Mic className="w-3 h-3" />
                    Voice
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Amount + ProsperCoin Badge */}
        <div className="flex items-center gap-4">
          {/* Amount */}
          <div 
            className={`text-lg font-bold ${
              transaction.type === "inflow" ? "text-green-400" : "text-white"
            }`}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            {transaction.type === "inflow" ? "+" : ""}€{Math.abs(transaction.amount).toFixed(2)}
          </div>

          {/* ProsperCoin Badge */}
          {transaction.prosperCoins && (
            <ProsperCoinBadge
              coins={transaction.prosperCoins}
              isHovered={isHovered}
              delay={staggerDelay + 0.08}
              onTooltipShow={() => setShowCoinTooltip(true)}
            />
          )}
        </div>

        {/* "View Details →" button appears on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-yellow-400 text-sm"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
            >
              <span>View Details</span>
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/**
 * PROSPER COIN BADGE with glow and tooltip
 */
function ProsperCoinBadge({
  coins,
  isHovered,
  delay,
  onTooltipShow
}: {
  coins: number;
  isHovered: boolean;
  delay: number;
  onTooltipShow: () => void;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(true);
    onTooltipShow();
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: [1.15, 1.0] }}
      transition={{
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1],
        delay
      }}
    >
      <motion.button
        className="flex items-center gap-1 px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px' }}
        animate={{
          scale: isHovered ? 1.08 : 1.0,
          boxShadow: isHovered 
            ? "0 0 12px rgba(255,215,0,0.4)" 
            : "0 0 0px rgba(255,215,0,0)"
        }}
        transition={{ duration: 0.12 }}
        onClick={handleClick}
      >
        <span className="text-sm">🪙</span>
        <span className="text-yellow-400">+{coins}</span>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-2 bg-[#1a1a2e] border border-yellow-500/30 rounded-lg text-xs text-white whitespace-nowrap shadow-lg"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            You earned {coins} PC for logging this transaction!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * TRANSACTION DETAIL MODAL with animations
 */
function TransactionDetailModal({
  transaction,
  onClose
}: {
  transaction: Transaction;
  onClose: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      {/* Modal Card */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1.0 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 
              className="text-2xl font-bold text-white"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              Transaction Details
            </h2>
            <motion.button
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
            >
              <X className="w-5 h-5 text-white/70" />
            </motion.button>
          </div>

          {/* Transaction Info */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 flex items-center justify-center text-3xl">
                {transaction.emoji}
              </div>
              <div className="flex-1">
                <div 
                  className="text-xl font-semibold text-white mb-1"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  {transaction.merchant}
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <span>{transaction.date}</span>
                  <span>•</span>
                  <span>{transaction.time}</span>
                </div>
              </div>
              <div 
                className={`text-2xl font-bold ${
                  transaction.type === "inflow" ? "text-green-400" : "text-white"
                }`}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                {transaction.type === "inflow" ? "+" : "-"}€{Math.abs(transaction.amount).toFixed(2)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-xs text-white/50 mb-1">Category</div>
                <div className="text-white font-semibold">{transaction.category}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-xs text-white/50 mb-1">Account</div>
                <div className="text-white font-semibold">{transaction.account}</div>
              </div>
            </div>

            {transaction.location && (
              <div className="flex items-center gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4" />
                <span>{transaction.location}</span>
              </div>
            )}

            {transaction.notes && (
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-xs text-white/50 mb-1">Notes</div>
                <div className="text-white text-sm">{transaction.notes}</div>
              </div>
            )}
          </div>

          {/* Receipt Upload Zone */}
          <motion.div
            className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
              isDragging
                ? "border-[#FFD700] bg-[rgba(255,215,0,0.08)]"
                : "border-white/20 bg-white/5"
            }`}
            whileHover={{
              backgroundColor: "rgba(255,215,0,0.04)",
              borderColor: "rgba(255,215,0,0.5)",
              scale: 1.01,
              transition: { duration: 0.15 }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              // Handle file upload
            }}
          >
            <Receipt className="w-12 h-12 text-white/40 mx-auto mb-3" />
            <div className="text-white/70 mb-1">Drop receipt here or click to upload</div>
            <div className="text-xs text-white/40">PNG, JPG or PDF (max 5MB)</div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <motion.button
              className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg text-[#1a1a2e] font-semibold"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              whileHover={{
                boxShadow: "0 0 20px rgba(255,215,0,0.4)",
                transition: { duration: 0.15 }
              }}
              whileTap={{ scale: 0.97 }}
            >
              Save Changes
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 font-semibold flex items-center gap-2"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              whileHover={{
                backgroundColor: "rgba(239,68,68,0.3)",
                transition: { duration: 0.15 }
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}