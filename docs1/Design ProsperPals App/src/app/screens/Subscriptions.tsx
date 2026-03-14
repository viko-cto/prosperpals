import { Calendar, TrendingDown, TrendingUp, Clock, AlertCircle, CheckCircle, Zap, Pause, ArrowDown, X, Bell, Eye } from "lucide-react";
import { formatMoney } from "../utils/formatMoney";

export function Subscriptions() {
  const essentialBills = [
    { 
      name: "Electricity", 
      provider: "Energy Corp", 
      cost: 85.50, 
      dueDate: "28th", 
      status: "paid",
      emoji: "⚡",
      trend: "+12",
      trendDirection: "up"
    },
    { 
      name: "Water", 
      provider: "City Water", 
      cost: 42.00, 
      dueDate: "15th", 
      status: "upcoming",
      emoji: "💧",
      trend: null,
      trendDirection: null
    },
    { 
      name: "Heating", 
      provider: "Gas Provider", 
      cost: 68.00, 
      dueDate: "20th", 
      status: "upcoming",
      emoji: "🔥",
      trend: "-8",
      trendDirection: "down"
    },
    { 
      name: "Internet", 
      provider: "TeleNet", 
      cost: 55.00, 
      dueDate: "5th", 
      status: "paid",
      emoji: "🌐",
      trend: null,
      trendDirection: null
    },
    { 
      name: "Mobile Plan", 
      provider: "VodaTel", 
      cost: 35.00, 
      dueDate: "10th", 
      status: "paid",
      emoji: "📱",
      trend: null,
      trendDirection: null
    },
    { 
      name: "Insurance", 
      provider: "SafeGuard", 
      cost: 125.00, 
      dueDate: "1st", 
      status: "upcoming",
      emoji: "🛡️",
      trend: null,
      trendDirection: null
    },
    { 
      name: "Rent", 
      provider: "Landlord", 
      cost: 950.00, 
      dueDate: "1st", 
      status: "paid",
      emoji: "🏠",
      trend: null,
      trendDirection: null
    },
  ];

  const flexibleSubscriptions = [
    { 
      name: "Netflix", 
      cost: 15.99, 
      billing: "monthly",
      lastUsed: "2 days ago", 
      renewalDate: "Mar 5",
      emoji: "🎬",
      savings: 192
    },
    { 
      name: "Spotify", 
      cost: 9.99, 
      billing: "monthly",
      lastUsed: "Today", 
      renewalDate: "Mar 12",
      emoji: "🎵",
      savings: 120
    },
    { 
      name: "Disney+", 
      cost: 8.99, 
      billing: "monthly",
      lastUsed: "1 week ago", 
      renewalDate: "Mar 8",
      emoji: "🏰",
      savings: 108
    },
    { 
      name: "HBO Max", 
      cost: 10.99, 
      billing: "monthly",
      lastUsed: "Never used", 
      renewalDate: "Mar 15",
      emoji: "📺",
      savings: 132,
      warning: "Never opened"
    },
    { 
      name: "Notion", 
      cost: 8.00, 
      billing: "monthly",
      lastUsed: "Today", 
      renewalDate: "Mar 20",
      emoji: "📝",
      savings: 96
    },
    { 
      name: "Adobe CC", 
      cost: 54.99, 
      billing: "monthly",
      lastUsed: "Yesterday", 
      renewalDate: "Mar 3",
      emoji: "🎨",
      savings: 660
    },
    { 
      name: "Gym", 
      cost: 24.99, 
      billing: "monthly",
      lastUsed: "3 weeks ago", 
      renewalDate: "Mar 10",
      emoji: "💪",
      savings: 300,
      warning: "Low usage"
    },
  ];

  const totalEssential = essentialBills.reduce((sum, bill) => sum + bill.cost, 0);
  const totalFlexible = flexibleSubscriptions.reduce((sum, sub) => sum + sub.cost, 0);
  const totalMonthly = totalEssential + totalFlexible;
  const potentialSavings = flexibleSubscriptions
    .filter(sub => sub.warning)
    .reduce((sum, sub) => sum + sub.savings, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 border border-green-500/30 rounded-md text-xs text-green-400">
            <CheckCircle className="w-3 h-3" />
            Paid
          </span>
        );
      case "upcoming":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/20 border border-blue-500/30 rounded-md text-xs text-blue-400">
            <Clock className="w-3 h-3" />
            Upcoming
          </span>
        );
      case "overdue":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/20 border border-red-500/30 rounded-md text-xs text-red-400">
            <AlertCircle className="w-3 h-3" />
            Overdue
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] p-6 md:p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">💳</span>
            <h1 className="text-4xl font-bold">Recurring Payments</h1>
          </div>
          <p className="text-white/60">Manage your essential bills and flexible subscriptions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* SECTION A: Essential Bills */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Essential Bills</h2>
                <p className="text-white/60 text-sm">Core monthly costs you typically keep active</p>
              </div>
              
              <div className="space-y-3">
                {essentialBills.map((bill, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Icon & Info */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="text-4xl flex-shrink-0">{bill.emoji}</div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-white mb-0.5">{bill.name}</h3>
                          <div className="text-sm text-white/50">{bill.provider}</div>
                        </div>
                      </div>

                      {/* Due Date */}
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Calendar className="w-4 h-4" />
                        <span>Due {bill.dueDate}</span>
                      </div>

                      {/* Status Badge */}
                      <div className="flex-shrink-0">
                        {getStatusBadge(bill.status)}
                      </div>

                      {/* Cost & Trend */}
                      <div className="text-right flex-shrink-0">
                        <div className="text-xl font-bold text-white">{formatMoney(bill.cost)}</div>
                        {bill.trend && (
                          <div className={`text-xs flex items-center gap-1 justify-end ${
                            bill.trendDirection === "up" ? "text-red-400" : "text-green-400"
                          }`}>
                            {bill.trendDirection === "up" ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {bill.trend}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-xs font-medium transition-colors flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" />
                          Details
                        </button>
                        <button className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5" />
                          Optimize
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION B: Flexible Subscriptions */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Flexible Subscriptions</h2>
                <p className="text-white/60 text-sm">Services you can cancel, pause, or downgrade</p>
              </div>
              
              <div className="space-y-3">
                {flexibleSubscriptions.map((sub, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border rounded-xl p-5 hover:border-white/20 transition-all ${
                      sub.warning ? "border-yellow-500/30" : "border-white/10"
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Icon & Info */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="text-4xl flex-shrink-0">{sub.emoji}</div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-white mb-0.5">{sub.name}</h3>
                          <div className="text-sm text-white/50 flex items-center gap-2">
                            <span>Last used: {sub.lastUsed}</span>
                          </div>
                          {sub.warning && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-yellow-400">
                              <AlertCircle className="w-3 h-3" />
                              {sub.warning}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Renewal Date */}
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Calendar className="w-4 h-4" />
                        <span>Renews {sub.renewalDate}</span>
                      </div>

                      {/* Cost */}
                      <div className="text-right flex-shrink-0">
                        <div className="text-xl font-bold text-white">{formatMoney(sub.cost)}</div>
                        <div className="text-xs text-white/40">{sub.billing}</div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-xs font-medium transition-colors">
                          Keep
                        </button>
                        <button className="px-3 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 rounded-lg text-orange-400 text-xs font-medium transition-colors flex items-center gap-1.5">
                          <Pause className="w-3.5 h-3.5" />
                          Pause
                        </button>
                        <button className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5">
                          <ArrowDown className="w-3.5 h-3.5" />
                          Downgrade
                        </button>
                        <button className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 text-xs font-medium transition-colors flex items-center gap-1.5">
                          <X className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                      </div>
                    </div>

                    {/* Savings Badge */}
                    {sub.warning && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/60">Potential savings:</span>
                          <span className="font-bold text-green-400">€{sub.savings}/year</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Insights Panel */}
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Monthly Overview</h3>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-sm text-white/60 mb-1">Essential Bills</div>
                  <div className="text-2xl font-bold text-white">{formatMoney(totalEssential)}</div>
                  <div className="text-xs text-white/40 mt-1">{essentialBills.length} bills</div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-sm text-white/60 mb-1">Flexible Subscriptions</div>
                  <div className="text-2xl font-bold text-white">{formatMoney(totalFlexible)}</div>
                  <div className="text-xs text-white/40 mt-1">{flexibleSubscriptions.length} services</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-4">
                  <div className="text-sm text-blue-400 mb-1">Total Monthly Recurring</div>
                  <div className="text-3xl font-bold text-white">{formatMoney(totalMonthly)}</div>
                  <div className="text-xs text-blue-300/70 mt-1">€{(totalMonthly * 12).toFixed(0)}/year</div>
                </div>

                {potentialSavings > 0 && (
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-lg p-4">
                    <div className="text-sm text-green-400 mb-1">Savings Opportunities</div>
                    <div className="text-3xl font-bold text-white">€{potentialSavings}</div>
                    <div className="text-xs text-green-300/70 mt-1">from unused services</div>
                  </div>
                )}
              </div>
            </div>

            {/* Goldie's Insight */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🪙</span>
                </div>
                <div>
                  <div className="font-semibold text-yellow-400 mb-1">Goldie's Tip</div>
                  <p className="text-sm text-white/90 leading-relaxed">
                    You could save €432/year by canceling HBO Max and the gym membership you haven't used in 3 weeks.
                  </p>
                </div>
              </div>
              <button className="w-full px-4 py-2.5 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg text-yellow-400 font-medium transition-colors text-sm">
                Review unused services
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2 justify-center">
                  <Bell className="w-4 h-4" />
                  Set payment reminders
                </button>
                <button className="w-full px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2 justify-center">
                  <TrendingDown className="w-4 h-4" />
                  Compare providers
                </button>
                <button className="w-full px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2 justify-center">
                  <Calendar className="w-4 h-4" />
                  View payment calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}