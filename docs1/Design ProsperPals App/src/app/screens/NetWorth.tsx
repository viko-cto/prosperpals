import { TrendingUp, TrendingDown, DollarSign, Home, Briefcase, PiggyBank, CreditCard } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function NetWorth() {
  const netWorthData = [
    { month: "Jan", assets: 45000, liabilities: 15000, netWorth: 30000 },
    { month: "Feb", assets: 47500, liabilities: 14500, netWorth: 33000 },
    { month: "Mar", assets: 52000, liabilities: 14000, netWorth: 38000 },
    { month: "Apr", assets: 55000, liabilities: 13500, netWorth: 41500 },
    { month: "May", assets: 58000, liabilities: 13000, netWorth: 45000 },
    { month: "Jun", assets: 61500, liabilities: 12500, netWorth: 49000 },
  ];

  const assetBreakdown = [
    { name: "Cash & Savings", value: 15000, color: "#22c55e" },
    { name: "Investments", value: 28000, color: "#3b82f6" },
    { name: "Real Estate", value: 12500, color: "#f59e0b" },
    { name: "Retirement", value: 6000, color: "#8b5cf6" },
  ];

  const liabilityBreakdown = [
    { name: "Student Loans", value: 7000, color: "#ef4444" },
    { name: "Credit Cards", value: 3500, color: "#f97316" },
    { name: "Car Loan", value: 2000, color: "#ec4899" },
  ];

  const currentNetWorth = 49000;
  const previousNetWorth = 45000;
  const netWorthChange = currentNetWorth - previousNetWorth;
  const netWorthChangePercent = ((netWorthChange / previousNetWorth) * 100).toFixed(1);

  const totalAssets = assetBreakdown.reduce((sum, item) => sum + item.value, 0);
  const totalLiabilities = liabilityBreakdown.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-[#0f0f1a] p-6 md:p-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            <h1 className="text-4xl font-bold">Net Worth Dashboard</h1>
          </div>
          <p className="text-white/60">Track your complete financial picture over time</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Net Worth Card */}
          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-900/20 backdrop-blur-lg rounded-2xl p-6 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/70 text-sm">Current Net Worth</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-emerald-400 mb-2">
              ${currentNetWorth.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">+${netWorthChange.toLocaleString()} ({netWorthChangePercent}%)</span>
              <span className="text-white/50">vs last month</span>
            </div>
          </div>

          {/* Total Assets Card */}
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-900/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/70 text-sm">Total Assets</span>
              <Briefcase className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-2">
              ${totalAssets.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400">+€3,500</span>
              <span className="text-white/50">this month</span>
            </div>
          </div>

          {/* Total Liabilities Card */}
          <div className="bg-gradient-to-br from-rose-500/20 to-rose-900/20 backdrop-blur-lg rounded-2xl p-6 border border-rose-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/70 text-sm">Total Liabilities</span>
              <CreditCard className="w-5 h-5 text-rose-400" />
            </div>
            <div className="text-3xl font-bold text-rose-400 mb-2">
              ${totalLiabilities.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">−€500</span>
              <span className="text-white/50">this month</span>
            </div>
          </div>
        </div>

        {/* Net Worth Trend Chart */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-6">Net Worth Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={netWorthData}>
              <defs>
                <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
              <Area 
                type="monotone" 
                dataKey="netWorth" 
                stroke="#10b981" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorNetWorth)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Assets & Liabilities Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assets Breakdown */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <PiggyBank className="w-6 h-6 text-blue-400" />
              Assets Breakdown
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {assetBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {assetBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-white/70">{item.name}</span>
                    </div>
                    <span className="font-semibold">${item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Liabilities Breakdown */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-rose-400" />
              Liabilities Breakdown
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={liabilityBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {liabilityBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {liabilityBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-white/70">{item.name}</span>
                    </div>
                    <span className="font-semibold">${item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Assets vs Liabilities Timeline */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-6">Assets vs Liabilities</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={netWorthData}>
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
                dataKey="assets" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Assets"
              />
              <Line 
                type="monotone" 
                dataKey="liabilities" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Liabilities"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🪙</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2 text-yellow-400">Goldie's Insight</h3>
              <p className="text-white/80 mb-4">
                Fantastic progress! Your net worth has grown by €{netWorthChange.toLocaleString()} this month. 
                You're on track to reach €50,000 by next month. Keep paying down those liabilities – 
                you've reduced them by €500 this month! 💪
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded-lg text-sm transition-colors">
                  Chat with Goldie
                </button>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-sm transition-colors">
                  View Recommendations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}