import { Send } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function BudgetCentral() {
  const budgetData = [
    { name: "Food", value: 420, budget: 500, emoji: "🍕", status: "under" },
    { name: "Transport", value: 180, budget: 200, emoji: "🚗", status: "close" },
    { name: "Shopping", value: 350, budget: 300, emoji: "🛍️", status: "over" },
    { name: "Subscriptions", value: 89, budget: 100, emoji: "📱", status: "under" },
    { name: "Remaining", value: 811, budget: 1700, emoji: "", status: "" },
  ];

  const chartData = budgetData.slice(0, 4).map((item) => ({
    name: item.name,
    value: item.value,
  }));

  const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#10B981"];

  return (
    <div className="flex h-screen bg-[#0f0f1a]">
      {/* Main Chat Area (60%) */}
      <div className="w-[60%] flex flex-col border-r border-white/10">
        {/* Header */}
        <div className="border-b border-white/10 p-6">
          <h1 className="text-2xl font-bold text-white mb-1">Budget Central</h1>
          <p className="text-white/60">Chat with Goldie about your spending</p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Goldie's Message */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-xl">🪙</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-yellow-400">Goldie</span>
                <span className="text-xs text-white/40">9:42 AM</span>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl rounded-tl-none p-4 shadow-lg">
                <p className="text-white/90 leading-relaxed">
                  Good morning! 🌅 You've spent €127 this week — €23 under budget! 
                  Want to sweep the extra to your summer trip fund?
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg text-sm font-medium transition-colors">
                    Yes, sweep it!
                  </button>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 rounded-lg text-sm font-medium transition-colors">
                    Not now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* System Message */}
          <div className="flex justify-center">
            <div className="bg-white/5 px-4 py-2 rounded-full text-xs text-white/40">
              €23 saved to Summer Trip fund
            </div>
          </div>

          {/* Goldie's Follow-up */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-xl">🪙</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-yellow-400">Goldie</span>
                <span className="text-xs text-white/40">9:43 AM</span>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl rounded-tl-none p-4 shadow-lg">
                <p className="text-white/90 leading-relaxed">
                  Perfect! 🎉 Your summer trip fund is now at €1,523. You're on track to hit €2,000 by June!
                </p>
                <p className="text-white/90 leading-relaxed mt-2">
                  By the way, I noticed your shopping spending is €50 over budget this month. 
                  Want to talk about it?
                </p>
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-4 justify-end">
            <div className="flex-1 max-w-[70%]">
              <div className="flex items-center gap-2 mb-1 justify-end">
                <span className="text-xs text-white/40">9:45 AM</span>
                <span className="font-semibold text-white/90">You</span>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-xl border border-blue-500/20 rounded-xl rounded-tr-none p-4 shadow-lg">
                <p className="text-white/90 leading-relaxed">
                  Yeah, I bought some clothes. Can we adjust the budget?
                </p>
              </div>
            </div>
          </div>

          {/* Goldie's Response */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-xl">🪙</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-yellow-400">Goldie</span>
                <span className="text-xs text-white/40">9:45 AM</span>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl rounded-tl-none p-4 shadow-lg">
                <p className="text-white/90 leading-relaxed">
                  Of course! We could take €50 from your entertainment budget. 
                  You haven't used much of it this month anyway. Sound good?
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg text-sm font-medium transition-colors">
                    Sounds good
                  </button>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 rounded-lg text-sm font-medium transition-colors">
                    Show other options
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 p-4">
          <div className="flex gap-3 items-end">
            <input
              type="text"
              placeholder="Ask Goldie anything..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
            />
            <button className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg hover:opacity-90 transition-opacity">
              <Send className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel (40%) */}
      <div className="w-[40%] p-6 overflow-y-auto">
        {/* Budget Overview Card */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl mb-6">
          <h2 className="text-xl font-bold text-white mb-4">February Budget</h2>
          
          {/* Circular Progress Chart */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-white">65%</div>
                <div className="text-sm text-white/60">spent</div>
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-white">€1,850 / €2,800</div>
            <div className="text-sm text-white/60 mt-1">€950 remaining</div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-3">
            {budgetData.slice(0, 4).map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-white/90 font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60">€{item.value}</span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.status === "under"
                        ? "bg-green-500"
                        : item.status === "close"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 text-left transition-colors group">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">View all transactions</span>
              <span className="text-white/40 group-hover:text-white/60">→</span>
            </div>
          </button>
          <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 text-left transition-colors group">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">Adjust budget</span>
              <span className="text-white/40 group-hover:text-white/60">→</span>
            </div>
          </button>
          <button className="w-full bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 hover:from-yellow-500/30 hover:to-yellow-600/30 border border-yellow-500/20 rounded-lg p-4 text-left transition-colors group">
            <div className="flex items-center justify-between">
              <span className="text-yellow-400 font-medium">Set aside money</span>
              <span className="text-yellow-400/60 group-hover:text-yellow-400">→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
