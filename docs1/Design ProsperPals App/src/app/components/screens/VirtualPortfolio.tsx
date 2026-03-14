import GlassCard from '../GlassCard';
import CompanionAvatar from '../CompanionAvatar';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Search, Plus } from 'lucide-react';

const performanceData = [
  { date: 'Jan 10', value: 10000 },
  { date: 'Jan 15', value: 10200 },
  { date: 'Jan 20', value: 10100 },
  { date: 'Jan 25', value: 10400 },
  { date: 'Jan 30', value: 10350 },
  { date: 'Feb 5', value: 10600 },
  { date: 'Feb 10', value: 10847 },
];

const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', emoji: '🍎', shares: 5, avgCost: 178, current: 192, change: 70, changePercent: 7.87 },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', emoji: '📊', shares: 10, avgCost: 420, current: 445, change: 250, changePercent: 5.95 },
  { symbol: 'TSLA', name: 'Tesla Inc.', emoji: '🚗', shares: 2, avgCost: 245, current: 210, change: -70, changePercent: -14.29 },
];

const leaderboard = [
  { name: 'Sarah', return: 12.3, rank: 1 },
  { name: 'Michael', return: 9.8, rank: 2 },
  { name: 'You', return: 8.47, rank: 3 },
  { name: 'Emma', return: 7.2, rank: 4 },
  { name: 'David', return: 5.6, rank: 5 },
];

export default function VirtualPortfolio() {
  const totalValue = 10847.32;
  const startingValue = 10000;
  const profitLoss = totalValue - startingValue;
  const profitLossPercent = ((profitLoss / startingValue) * 100).toFixed(2);
  const cashBalance = 3200;

  return (
    <div className="h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-8 border-b border-white/10">
        <h1 className="text-3xl font-bold mb-2">Your Virtual Portfolio 🎮</h1>
        <p className="text-gray-400">Practice investing with €10,000 play money</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Portfolio Summary */}
        <GlassCard className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Total Value */}
            <div>
              <div className="text-sm text-gray-400 mb-1">Total Value</div>
              <div className="text-4xl font-bold mb-2">
                €{totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#10B981]" />
                <span className="text-[#10B981] font-semibold">
                  +€{profitLoss.toFixed(2)} ({profitLossPercent}%)
                </span>
              </div>
            </div>

            {/* Starting Value */}
            <div>
              <div className="text-sm text-gray-400 mb-1">Starting</div>
              <div className="text-2xl font-bold">€{startingValue.toLocaleString()}</div>
              <div className="text-sm text-gray-400 mt-2">30 days ago</div>
            </div>

            {/* Profit/Loss */}
            <div>
              <div className="text-sm text-gray-400 mb-1">Profit/Loss</div>
              <div className="text-2xl font-bold text-[#10B981]">
                +€{profitLoss.toFixed(2)}
              </div>
              <div className="text-sm text-[#10B981] mt-2">
                vs €{(startingValue * 0.021).toFixed(2)} savings account (2.1%)
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="mt-6">
            <div className="text-sm text-gray-400 mb-4">30-Day Performance</div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData}>
                <XAxis dataKey="date" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} domain={[9800, 11000]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a2e', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Holdings Table */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Holdings</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#10B981] hover:bg-[#10B981]/90 rounded-lg font-semibold transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Buy Stock
              </button>
              <button className="px-4 py-2 bg-[#EF4444] hover:bg-[#EF4444]/90 rounded-lg font-semibold transition-colors">
                Sell Stock
              </button>
              <button className="px-4 py-2 bg-[#4A90D9] hover:bg-[#4A90D9]/90 rounded-lg font-semibold transition-colors flex items-center gap-2">
                <Search className="w-4 h-4" />
                Research
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm text-gray-400 font-semibold">Holding</th>
                  <th className="text-right py-3 px-4 text-sm text-gray-400 font-semibold">Shares</th>
                  <th className="text-right py-3 px-4 text-sm text-gray-400 font-semibold">Avg Cost</th>
                  <th className="text-right py-3 px-4 text-sm text-gray-400 font-semibold">Current</th>
                  <th className="text-right py-3 px-4 text-sm text-gray-400 font-semibold">P/L</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr key={holding.symbol} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{holding.emoji}</span>
                        <div>
                          <div className="font-semibold">{holding.symbol}</div>
                          <div className="text-sm text-gray-400">{holding.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4">{holding.shares}</td>
                    <td className="text-right py-4 px-4">€{holding.avgCost}</td>
                    <td className="text-right py-4 px-4">€{holding.current}</td>
                    <td className="text-right py-4 px-4">
                      <div className={`flex items-center justify-end gap-1 ${holding.change >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                        {holding.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="font-semibold">
                          {holding.change >= 0 ? '+' : ''}€{Math.abs(holding.change)}
                        </span>
                      </div>
                      <div className={`text-sm ${holding.change >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                        {holding.changePercent >= 0 ? '+' : ''}{holding.changePercent}%
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💰</span>
                      <div>
                        <div className="font-semibold">Cash</div>
                        <div className="text-sm text-gray-400">Available to invest</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4">-</td>
                  <td className="text-right py-4 px-4">-</td>
                  <td className="text-right py-4 px-4">€{cashBalance.toLocaleString()}</td>
                  <td className="text-right py-4 px-4">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* What If Card */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4">What would have happened?</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-[#10B981]/20 to-[#10B981]/10 border border-[#10B981]/30 rounded-lg">
                <div className="text-sm text-gray-300 mb-2">If this were real money...</div>
                <div className="text-3xl font-bold text-[#10B981] mb-1">€{profitLoss.toFixed(2)}</div>
                <div className="text-sm text-gray-400">profit in 30 days</div>
              </div>
              <div className="text-sm text-gray-300">
                That's <span className="font-semibold text-[#10B981]">{profitLossPercent}% return</span> vs{' '}
                <span className="text-gray-400">2.1% savings account</span>
              </div>
            </div>
          </GlassCard>

          {/* Leaderboard */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4">Friends Leaderboard 🏆</h3>
            <div className="space-y-2">
              {leaderboard.map((player) => (
                <div 
                  key={player.rank}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    player.name === 'You' 
                      ? 'bg-[#FFD700]/20 border border-[#FFD700]/50' 
                      : 'bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      player.rank === 1 ? 'bg-[#FFD700] text-black' :
                      player.rank === 2 ? 'bg-[#C0C0C0] text-black' :
                      player.rank === 3 ? 'bg-[#CD7F32] text-black' :
                      'bg-white/10'
                    }`}>
                      {player.rank}
                    </div>
                    <span className={`font-semibold ${player.name === 'You' ? 'text-[#FFD700]' : ''}`}>
                      {player.name}
                    </span>
                  </div>
                  <div className="text-[#10B981] font-semibold">
                    +{player.return}%
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Fin Insight */}
        <GlassCard className="p-6 bg-[#4A90D9]/10 border-[#4A90D9]/30">
          <div className="flex gap-4">
            <CompanionAvatar type="fin" size="md" />
            <div className="flex-1">
              <div className="font-semibold text-[#4A90D9] mb-2">Fin's Insight</div>
              <p className="text-gray-300 mb-3">
                Your tech allocation is 45%. Consider diversifying into other sectors. Want to learn about sector rotation?
              </p>
              <button className="px-4 py-2 bg-gradient-to-r from-[#4A90D9] to-[#2563EB] text-white rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(74,144,217,0.4)] transition-all">
                Learn More
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
