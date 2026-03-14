import { PieChart, TrendingUp, TrendingDown, ShoppingBag, Coffee, Home, Car, Utensils, Smartphone, Heart, MoreHorizontal, AlertCircle } from "lucide-react";
import { BarChart, Bar, PieChart as RePieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function SpendingInsights() {
  const monthlySpending = [
    { month: "Jan", spending: 2450 },
    { month: "Feb", spending: 2680 },
    { month: "Mar", spending: 2320 },
    { month: "Apr", spending: 2890 },
    { month: "May", spending: 2650 },
    { month: "Jun", spending: 3120 },
  ];

  const categorySpending = [
    { category: "Groceries", amount: 680, icon: <ShoppingBag className="w-5 h-5" />, color: "#22c55e", percent: 21.8 },
    { category: "Dining Out", amount: 520, icon: <Utensils className="w-5 h-5" />, color: "#f59e0b", percent: 16.7 },
    { category: "Transportation", amount: 450, icon: <Car className="w-5 h-5" />, color: "#3b82f6", percent: 14.4 },
    { category: "Housing", amount: 1200, icon: <Home className="w-5 h-5" />, color: "#8b5cf6", percent: 38.5 },
    { category: "Entertainment", amount: 180, icon: <Coffee className="w-5 h-5" />, color: "#ec4899", percent: 5.8 },
    { category: "Other", amount: 90, icon: <MoreHorizontal className="w-5 h-5" />, color: "#6b7280", percent: 2.9 },
  ];

  const weeklyTrend = [
    { week: "Week 1", amount: 520 },
    { week: "Week 2", amount: 680 },
    { week: "Week 3", amount: 750 },
    { week: "Week 4", amount: 1170 },
  ];

  const totalSpending = categorySpending.reduce((sum, cat) => sum + cat.amount, 0);
  const averageDaily = (totalSpending / 30).toFixed(2);
  const budget = 2800;
  const overBudget = totalSpending - budget;
  const budgetPercent = ((totalSpending / budget) * 100).toFixed(1);

  const topSpendingDays = [
    { day: "June 15", amount: 285, description: "Weekend shopping & dinner" },
    { day: "June 22", amount: 240, description: "Entertainment & dining" },
    { day: "June 8", amount: 195, description: "Groceries & gas" },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a] p-6 md:p-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <PieChart className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold">Spending Insights</h1>
          </div>
          <p className="text-white/60">Analyze your spending patterns and discover savings opportunities</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Total Spending */}
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-900/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/70 text-sm">This Month</span>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-2">
              ${totalSpending.toLocaleString()}
            </div>
            <div className="text-xs text-white/50">Total Spending</div>
          </div>

          {/* Average Daily */}
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-900/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/70 text-sm">Daily Average</span>
              <Coffee className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-2">
              ${averageDaily}
            </div>
            <div className="text-xs text-white/50">Per Day</div>
          </div>

          {/* Budget Status */}
          <div className={`bg-gradient-to-br ${overBudget > 0 ? 'from-rose-500/20 to-rose-900/20 border-rose-500/30' : 'from-emerald-500/20 to-emerald-900/20 border-emerald-500/30'} backdrop-blur-lg rounded-2xl p-6 border`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/70 text-sm">Budget Status</span>
              {overBudget > 0 ? (
                <AlertCircle className="w-5 h-5 text-rose-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-emerald-400" />
              )}
            </div>
            <div className={`text-3xl font-bold mb-2 ${overBudget > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {budgetPercent}%
            </div>
            <div className="text-xs text-white/50">
              {overBudget > 0 ? `$${overBudget} over budget` : 'Within budget'}
            </div>
          </div>

          {/* Top Category */}
          <div className="bg-gradient-to-br from-amber-500/20 to-amber-900/20 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/70 text-sm">Top Category</span>
              <Home className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-bold text-amber-400 mb-2">
              Housing
            </div>
            <div className="text-xs text-white/50">38.5% of spending</div>
          </div>
        </div>

        {/* Spending by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-6">Spending Distribution</h2>
            <div className="flex flex-col items-center">
              <div className="w-64 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={categorySpending}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      dataKey="amount"
                    >
                      {categorySpending.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a2e', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Category List */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-6">Category Breakdown</h2>
            <div className="space-y-4">
              {categorySpending.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}30` }}
                    >
                      <div style={{ color: item.color }}>{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{item.category}</div>
                      <div className="text-xs text-white/50">{item.percent}% of total</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${item.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spending Trend */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-6">6-Month Spending Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySpending}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="month" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a2e', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="spending" 
                stroke="#a855f7" 
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Breakdown */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-6">Weekly Spending (June)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="week" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a2e', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="amount" fill="#a855f7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Spending Days */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-6">Top Spending Days</h2>
          <div className="space-y-4">
            {topSpendingDays.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <div className="font-semibold">{day.day}</div>
                  <div className="text-sm text-white/60">{day.description}</div>
                </div>
                <div className="text-xl font-bold text-purple-400">${day.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🐋</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2 text-blue-400">Fin's Analysis</h3>
              <p className="text-white/80 mb-4">
                You've spent €{overBudget} more than your budget this month, primarily due to increased 
                dining out expenses. I recommend reducing restaurant visits by 2-3 times this week and 
                meal planning to save approximately €150-200. Your housing costs are stable, which is excellent 
                for long-term planning. 📊
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-sm transition-colors">
                  Get Savings Plan
                </button>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-sm transition-colors">
                  Set Budget Goals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}