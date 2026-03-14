import { motion } from "motion/react";
import { Flame, TrendingUp, Target, Plus } from "lucide-react";

// ============================================
// SMALL WIDGET (2x2) - iOS Style
// ============================================
export function SmallWidget() {
  return (
    <div className="w-40 h-40 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-4 border border-gray-200/50">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full text-sm flex items-center justify-center">
          🔑
        </div>
        <span className="text-xs font-semibold text-gray-700">ProsperPals</span>
      </div>

      {/* ProsperCoin Balance */}
      <div className="mb-3">
        <div className="flex items-center gap-1 mb-1">
          <div className="text-lg">🪙</div>
          <div className="text-2xl font-bold text-gray-900">1,250</div>
        </div>
        <div className="text-xs text-gray-500">ProsperCoins</div>
      </div>

      {/* Daily Spending */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-gray-500">Today</div>
        <div className="text-sm font-bold text-gray-900">€47.50</div>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-1">
        <Flame className="w-4 h-4 text-orange-500" fill="currentColor" />
        <span className="text-sm font-bold text-gray-900">12 days</span>
      </div>
    </div>
  );
}

// ============================================
// MEDIUM WIDGET (4x2) - iOS Style
// ============================================
export function MediumWidget() {
  const spentToday = 47.5;
  const budgetToday = 75;
  const percentage = (spentToday / budgetToday) * 100;

  return (
    <div className="w-80 h-40 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-4 border border-gray-200/50">
      {/* App Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full text-xs flex items-center justify-center">
          🔑
        </div>
        <span className="text-xs font-semibold text-gray-700">ProsperPals</span>
      </div>

      <div className="flex items-start gap-4">
        {/* Left: Goldie + Greeting */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-2xl mb-2 shadow-lg">
            🪙
          </div>
          <div className="text-xs font-semibold text-gray-700">Good morning!</div>
        </div>

        {/* Right: Budget Progress */}
        <div className="flex-1">
          <div className="mb-2">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs text-gray-500">Today's spending</span>
              <span className="text-lg font-bold text-gray-900">€{spentToday}</span>
            </div>
            <div className="text-xs text-gray-500 mb-2">of €{budgetToday} budget</div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
            />
          </div>

          {/* Quick Tip */}
          <div className="text-xs text-gray-600 italic">
            💡 You're doing great! €27.50 left today
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// LARGE WIDGET (4x4) - iOS Style
// ============================================
export function LargeWidget() {
  const budgetData = [
    { category: "Food", amount: 234, color: "#f59e0b", max: 400 },
    { category: "Transport", amount: 89, color: "#3b82f6", max: 150 },
    { category: "Entertainment", amount: 56, color: "#8b5cf6", max: 100 },
  ];

  const goals = [
    { name: "Greece Trip", current: 750, target: 1000, color: "#10b981" },
    { name: "Emergency Fund", current: 1200, target: 2000, color: "#3b82f6" },
  ];

  return (
    <div className="w-80 h-80 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-5 border border-gray-200/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full text-sm flex items-center justify-center">
            🔑
          </div>
          <span className="text-sm font-bold text-gray-900">ProsperPals</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-lg">🪙</div>
          <span className="text-lg font-bold text-gray-900">1,250</span>
        </div>
      </div>

      {/* Budget Overview - Simplified Donut */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-gray-700 mb-2">This Week's Budget</div>
        <div className="flex items-center gap-3">
          {/* Simple Circle Progress */}
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#e5e7eb"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#fbbf24"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${(379 / 650) * 176} 176`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900">
              58%
            </div>
          </div>

          {/* Summary */}
          <div className="flex-1">
            <div className="text-lg font-bold text-gray-900">€379</div>
            <div className="text-xs text-gray-500">of €650 spent</div>
          </div>
        </div>
      </div>

      {/* Top 3 Categories */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-gray-700 mb-2">Top Categories</div>
        <div className="space-y-2">
          {budgetData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <div className="flex-1 text-xs text-gray-700">{item.category}</div>
              <div className="text-xs font-semibold text-gray-900">€{item.amount}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div className="mb-3">
        <div className="text-xs font-semibold text-gray-700 mb-2">Goals</div>
        <div className="space-y-2">
          {goals.map((goal, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs text-gray-700">{goal.name}</div>
                <div className="text-xs font-semibold text-gray-900">
                  {Math.round((goal.current / goal.target) * 100)}%
                </div>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(goal.current / goal.target) * 100}%`,
                    backgroundColor: goal.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action */}
      <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all">
        <Plus className="w-4 h-4" />
        Add Transaction
      </button>
    </div>
  );
}

// ============================================
// LOCK SCREEN WIDGETS (iOS 16+)
// ============================================

// Circular Lock Screen Widget
export function CircularLockWidget() {
  const remaining = 27.5;
  const total = 75;
  const percentage = (remaining / total) * 100;

  return (
    <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-center relative">
      {/* Progress Ring */}
      <svg className="absolute inset-0 w-16 h-16 transform -rotate-90">
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="#fbbf24"
          strokeWidth="4"
          fill="none"
          strokeDasharray={`${(percentage / 100) * 176} 176`}
          strokeLinecap="round"
        />
      </svg>

      {/* Amount */}
      <div className="text-center">
        <div className="text-xs font-bold text-white">€{remaining}</div>
      </div>
    </div>
  );
}

// Rectangular Lock Screen Widget
export function RectangularLockWidget() {
  return (
    <div className="w-40 h-12 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 px-3 flex items-center justify-between">
      {/* Streak */}
      <div className="flex items-center gap-2">
        <Flame className="w-5 h-5 text-orange-400" fill="currentColor" />
        <div className="text-sm font-bold text-white">12 days</div>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-white/30" />

      {/* Coins */}
      <div className="flex items-center gap-2">
        <div className="text-lg">🪙</div>
        <div className="text-sm font-bold text-white">1,250</div>
      </div>
    </div>
  );
}

// ============================================
// ANDROID WIDGET VARIANTS
// ============================================

// Android Small Widget (Material Design)
export function AndroidSmallWidget() {
  return (
    <div className="w-40 h-40 bg-white rounded-2xl shadow-lg p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full" />
        <span className="text-xs font-bold text-gray-900">ProsperPals</span>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">Balance</span>
          <div className="flex items-center gap-1">
            <div className="text-sm">🪙</div>
            <span className="text-sm font-bold text-gray-900">1,250</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">Today</span>
          <span className="text-sm font-bold text-gray-900">€47.50</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">Streak</span>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-500" fill="currentColor" />
            <span className="text-sm font-bold text-gray-900">12</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Android Medium Widget (Material Design)
export function AndroidMediumWidget() {
  const percentage = 63;

  return (
    <div className="w-80 h-40 bg-white rounded-2xl shadow-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full" />
          <span className="text-sm font-bold text-gray-900">Budget Today</span>
        </div>
        <span className="text-xs text-gray-500">Feb 13</span>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-2xl font-bold text-gray-900">€47.50</span>
          <span className="text-sm text-gray-500">of €75.00</span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-gray-600">On track</span>
        </div>
        <div className="flex items-center gap-1">
          <Flame className="w-4 h-4 text-orange-500" fill="currentColor" />
          <span className="font-bold text-gray-900">12 day streak</span>
        </div>
      </div>
    </div>
  );
}

// Widget Preview Container (for showcase)
export function WidgetPreview({
  title,
  platform = "iOS",
  size,
  children,
}: {
  title: string;
  platform?: "iOS" | "Android";
  size: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-white/60">
            {platform} • {size}
          </p>
        </div>
        <div className="px-3 py-1 bg-white/10 rounded-lg text-xs font-semibold text-white">
          {platform}
        </div>
      </div>

      {/* Phone/Screen Background */}
      <div
        className="rounded-3xl p-8 flex items-center justify-center"
        style={{
          background: platform === "iOS"
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
