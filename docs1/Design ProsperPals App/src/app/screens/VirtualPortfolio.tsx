import { useState } from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Trophy, 
  Shield, 
  HelpCircle,
  ChevronRight,
  AlertCircle,
  BookOpen,
  BarChart3,
  Sparkles
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";

export function VirtualPortfolio() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(200);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [timeHorizon, setTimeHorizon] = useState(20);
  const [showComparison, setShowComparison] = useState(true);

  const performanceData = [
    { day: "Day 1", value: 10000 },
    { day: "Day 5", value: 10120 },
    { day: "Day 10", value: 10350 },
    { day: "Day 15", value: 10280 },
    { day: "Day 20", value: 10520 },
    { day: "Day 25", value: 10690 },
    { day: "Day 30", value: 10847 },
  ];

  const holdings = [
    { symbol: "AAPL", name: "Apple Inc.", emoji: "🍎", shares: 5, avgCost: 178, current: 192, pl: 70, plPercent: 7.9, pcValue: 960 },
    { symbol: "VOO", name: "S&P 500 ETF", emoji: "📊", shares: 10, avgCost: 420, current: 445, pl: 250, plPercent: 6.0, pcValue: 4450 },
    { symbol: "TSLA", name: "Tesla", emoji: "🚗", shares: 2, avgCost: 245, current: 210, pl: -70, plPercent: -14.3, pcValue: 420 },
  ];

  const leaderboard = [
    { name: "Sarah", return: 12.3, rank: 1 },
    { name: "Mike", return: 10.1, rank: 2 },
    { name: "You", return: 8.5, rank: 3 },
    { name: "Alex", return: 7.2, rank: 4 },
  ];

  // Calculate compound growth
  const calculateCompoundGrowth = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = timeHorizon * 12;
    let futureValue = 0;
    
    for (let i = 0; i < months; i++) {
      futureValue = (futureValue + monthlyInvestment) * (1 + monthlyRate);
    }
    
    return Math.round(futureValue);
  };

  // Calculate savings account comparison
  const calculateSavingsGrowth = () => {
    const monthlyRate = 2.1 / 100 / 12;
    const months = timeHorizon * 12;
    let futureValue = 0;
    
    for (let i = 0; i < months; i++) {
      futureValue = (futureValue + monthlyInvestment) * (1 + monthlyRate);
    }
    
    return Math.round(futureValue);
  };

  // Generate compound growth chart data
  const generateGrowthData = () => {
    const data = [];
    const monthlyRate = expectedReturn / 100 / 12;
    const savingsRate = 2.1 / 100 / 12;
    const months = timeHorizon * 12;
    
    let investmentValue = 0;
    let savingsValue = 0;
    
    for (let i = 0; i <= months; i += Math.max(1, Math.floor(months / 20))) {
      for (let j = 0; j < Math.min(i, Math.floor(months / 20)); j++) {
        investmentValue = (investmentValue + monthlyInvestment) * (1 + monthlyRate);
        savingsValue = (savingsValue + monthlyInvestment) * (1 + savingsRate);
      }
      
      data.push({
        year: Math.round(i / 12 * 10) / 10,
        investment: Math.round(investmentValue),
        savings: Math.round(savingsValue)
      });
    }
    
    return data;
  };

  const compoundGrowthValue = calculateCompoundGrowth();
  const savingsGrowthValue = calculateSavingsGrowth();
  const growthData = generateGrowthData();
  const totalInvested = monthlyInvestment * timeHorizon * 12;
  const diversificationScore = 6;

  return (
    <div className="flex-1 bg-[#0f0f1a] overflow-auto">
      {/* SIMULATION MODE BANNER */}
      <div className="sticky top-0 z-30 bg-gradient-to-r from-blue-500/20 via-blue-400/20 to-blue-500/20 backdrop-blur-xl border-b-2 border-blue-500/50">
        <div className="max-w-7xl mx-auto px-8 py-3">
          <div className="flex items-center justify-center gap-3">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold text-sm">
              🛡️ SIMULATION MODE — No real money involved
            </span>
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-white">Risk-Free Investing Simulator</h1>
            <span className="text-3xl">🎮</span>
          </div>
          <p className="text-white/60 text-lg mb-4">
            Learn to invest using ProsperCoins — zero real money risk
          </p>
          
          {/* ProsperCoin Balance */}
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-4 py-2">
            <span className="text-2xl">🪙</span>
            <span className="text-yellow-400 font-semibold">2,450 PC available</span>
            <span className="text-white/40 text-sm ml-2">(1 PC = €1 simulation value)</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {/* Main Portfolio Area */}
            <div className="col-span-2 space-y-6">
              {/* Portfolio Summary */}
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-sm text-white/60 mb-2">Total Portfolio Value</div>
                    <div className="text-5xl font-bold text-white mb-2">€10,847.32</div>
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-2xl font-semibold text-green-400">+€847.32</span>
                      <span className="text-lg text-green-400">(+8.47%)</span>
                    </div>
                    <div className="text-sm text-yellow-400">
                      = 10,847 ProsperCoins value
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/60 mb-2">Starting Balance</div>
                    <div className="text-2xl font-bold text-white/60">€10,000.00</div>
                    <div className="text-sm text-white/40 mt-1">10,000 PC</div>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <XAxis dataKey="day" stroke="#ffffff30" fontSize={12} />
                      <YAxis stroke="#ffffff30" fontSize={12} domain={[9800, 11000]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1a1a2e",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: "#10B981", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Diversification Score */}
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-5 h-5 text-blue-400" />
                      <span className="font-semibold text-white">Diversification Score: {diversificationScore}/10</span>
                      <span className="text-yellow-400 text-sm">— Too concentrated in tech</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🐋</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white/80">
                          Fin: "Your portfolio is heavily weighted in technology. Want to learn about sector allocation and risk management?"
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 text-sm font-medium transition-colors whitespace-nowrap">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Holdings Table */}
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Your Holdings</h2>
                <div className="space-y-3">
                  {holdings.map((holding) => (
                    <div
                      key={holding.symbol}
                      className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors relative group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{holding.emoji}</span>
                          <div>
                            <div className="font-semibold text-white">{holding.symbol}</div>
                            <div className="text-sm text-white/60">{holding.name}</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-white/60">Shares</div>
                          <div className="font-semibold text-white">{holding.shares}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-white/60">Avg Cost</div>
                          <div className="font-semibold text-white">€{holding.avgCost}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-white/60">Current</div>
                          <div className="font-semibold text-white">€{holding.current}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${holding.pl >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {holding.pl >= 0 ? "+" : ""}€{holding.pl}
                          </div>
                          <div className={`text-sm ${holding.pl >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {holding.pl >= 0 ? "+" : ""}{holding.plPercent}%
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-white/60">PC Value</div>
                          <div className="text-yellow-400 font-semibold">{holding.pcValue} PC</div>
                        </div>
                      </div>

                      {/* Educational Tooltip */}
                      {holding.pl >= 0 ? (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-0 right-0 mt-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        >
                          <div className="flex items-start gap-2">
                            <HelpCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs font-semibold text-green-400 mb-1">Why did this stock go up?</div>
                              <div className="text-xs text-white/80 mb-2">
                                Learn about market dynamics, company performance, and investor sentiment.
                              </div>
                              <button className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1">
                                Take Fin's lesson
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        >
                          <div className="flex items-start gap-2">
                            <HelpCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs font-semibold text-red-400 mb-1">Understanding losses</div>
                              <div className="text-xs text-white/80 mb-2">
                                Losses are part of investing. Learn about risk vs reward and position sizing.
                              </div>
                              <button className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                                Learn Risk Management
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}

                  {/* Cash */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">💰</span>
                        <div>
                          <div className="font-semibold text-white">Cash</div>
                          <div className="text-sm text-white/60">Available to invest</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">€3,200.00</div>
                        <div className="text-sm text-yellow-400 text-right">3,200 PC</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 px-6 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-400 font-medium transition-colors flex items-center justify-center gap-2">
                    <span className="text-lg">🪙</span>
                    Buy with ProsperCoins
                  </button>
                  <button className="flex-1 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 font-medium transition-colors">
                    Sell Stock
                  </button>
                  <button className="flex-1 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 font-medium transition-colors">
                    Research
                  </button>
                </div>
              </div>

              {/* THE COMPOUND GROWTH MACHINE */}
              <div className="bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent border-2 border-purple-500/40 rounded-xl p-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">The Compound Growth Machine ⚙️</h2>
                </div>

                {/* Interactive Sliders */}
                <div className="space-y-6 mb-6">
                  {/* Monthly Investment */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-white">Monthly Investment</label>
                      <span className="text-lg font-bold text-purple-400">€{monthlyInvestment}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="10"
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <div className="flex justify-between text-xs text-white/40 mt-1">
                      <span>€50</span>
                      <span>€500</span>
                    </div>
                  </div>

                  {/* Expected Return */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-white">Expected Annual Return</label>
                      <span className="text-lg font-bold text-purple-400">{expectedReturn}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="12"
                      step="0.5"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <div className="flex justify-between text-xs text-white/40 mt-1">
                      <span>5%</span>
                      <span>12%</span>
                    </div>
                  </div>

                  {/* Time Horizon */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-white">Time Horizon</label>
                      <span className="text-lg font-bold text-purple-400">{timeHorizon} years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={timeHorizon}
                      onChange={(e) => setTimeHorizon(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <div className="flex justify-between text-xs text-white/40 mt-1">
                      <span>1 year</span>
                      <span>30 years</span>
                    </div>
                  </div>
                </div>

                {/* Growth Chart */}
                <div className="h-64 mb-6 bg-white/5 rounded-xl p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthData}>
                      <defs>
                        <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="year" stroke="#ffffff40" fontSize={12} label={{ value: 'Years', position: 'insideBottom', offset: -5, fill: '#ffffff60' }} />
                      <YAxis stroke="#ffffff40" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1a1a2e",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => `€${value.toLocaleString()}`}
                      />
                      {showComparison && (
                        <Area
                          type="monotone"
                          dataKey="savings"
                          stroke="#ef4444"
                          strokeWidth={2}
                          fill="url(#savingsGradient)"
                          name="Savings Account"
                        />
                      )}
                      <Area
                        type="monotone"
                        dataKey="investment"
                        stroke="#a855f7"
                        strokeWidth={3}
                        fill="url(#investmentGradient)"
                        name="Investment"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Key Callout */}
                <div className="bg-gradient-to-r from-purple-500/30 to-purple-600/20 border border-purple-400/40 rounded-xl p-6 mb-4">
                  <div className="text-center mb-4">
                    <div className="text-sm text-purple-300 mb-2">Your Future Wealth</div>
                    <div className="text-4xl font-bold text-white mb-2">
                      €{compoundGrowthValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-white/60">
                      From investing €{monthlyInvestment}/month at {expectedReturn}% for {timeHorizon} years
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-xs text-white/60 mb-1">Total Invested</div>
                      <div className="text-lg font-bold text-white">€{totalInvested.toLocaleString()}</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-xs text-white/60 mb-1">Gains from Growth</div>
                      <div className="text-lg font-bold text-green-400">€{(compoundGrowthValue - totalInvested).toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Comparison Toggle */}
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showComparison}
                      onChange={(e) => setShowComparison(e.target.checked)}
                      className="w-4 h-4 rounded accent-purple-500"
                    />
                    <span className="text-sm text-white">Compare vs Savings Account (2.1%)</span>
                  </label>
                  {showComparison && (
                    <div className="text-sm">
                      <span className="text-white/60">Difference: </span>
                      <span className="text-green-400 font-bold">
                        +€{(compoundGrowthValue - savingsGrowthValue).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Fin Quote */}
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🐋</span>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-400 mb-1">Fin says:</div>
                      <p className="text-sm text-white/90 italic">
                        "This is why learning to invest matters. Start practicing here with ProsperCoins, 
                        and when you're ready, you'll know exactly what to do with real money."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Your Investment IQ */}
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-bold text-white">Your Investment IQ</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">Lessons completed</span>
                      <span className="text-white font-semibold">5/12</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 to-green-500 w-[42%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">Quiz score average</span>
                      <span className="text-green-400 font-semibold">82%</span>
                    </div>
                  </div>

                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">🐋</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-green-400 mb-1">Fin says:</div>
                        <p className="text-xs text-white/90">
                          "You're ready to try ETF investing! 📈"
                        </p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-green-500/30 hover:bg-green-500/40 border border-green-500/40 rounded-lg text-green-400 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      Take next lesson
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Reality Check */}
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">What would have happened?</h3>
                <p className="text-white/60 text-sm mb-4">If this were real money...</p>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-white/40 mb-1">You'd have made</div>
                    <div className="text-2xl font-bold text-green-400">€847</div>
                    <div className="text-xs text-white/60 mt-1">in 30 days</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-white/40 mb-1">vs Savings Account (2.1%)</div>
                    <div className="text-lg font-semibold text-white/60">€17</div>
                    <div className="text-xs text-green-400 mt-1">You're 50x better!</div>
                  </div>
                </div>
              </div>

              {/* Leaderboard */}
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-bold text-white">Friends Leaderboard</h3>
                </div>
                <div className="space-y-3">
                  {leaderboard.map((player) => (
                    <div
                      key={player.name}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        player.name === "You"
                          ? "bg-blue-500/20 border border-blue-500/30"
                          : "bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            player.rank === 1
                              ? "bg-yellow-500 text-gray-900"
                              : player.rank === 2
                              ? "bg-gray-400 text-gray-900"
                              : player.rank === 3
                              ? "bg-orange-600 text-white"
                              : "bg-white/10 text-white/60"
                          }`}
                        >
                          {player.rank}
                        </div>
                        <span className="font-medium text-white">{player.name}</span>
                      </div>
                      <div className="text-green-400 font-semibold">+{player.return}%</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 text-center text-sm text-white/40">
                  12 friends playing
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER DISCLAIMER */}
          <div className="mt-12 bg-yellow-500/10 border-l-4 border-yellow-500 rounded-r-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-white/80 leading-relaxed">
                <span className="font-semibold text-yellow-400">⚠️ Educational Simulator Disclaimer:</span>
                {" "}This is an educational simulator. ProsperPals does not provide financial advice.
                Past performance of simulated trades does not predict real market results.
                When you're ready for real investing, consult a licensed financial advisor.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
