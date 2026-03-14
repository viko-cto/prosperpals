import GlassCard from '../GlassCard';
import CompanionAvatar from '../CompanionAvatar';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Send, Plus } from 'lucide-react';

const spendingData = [
  { name: 'Food', value: 420, budget: 500, color: '#10B981' },
  { name: 'Transport', value: 180, budget: 200, color: '#F59E0B' },
  { name: 'Shopping', value: 350, budget: 300, color: '#EF4444' },
  { name: 'Subscriptions', value: 89, budget: 100, color: '#10B981' },
  { name: 'Other', value: 811, budget: 1700, color: '#6B7280' },
];

const totalSpent = spendingData.reduce((acc, item) => acc + item.value, 0);
const totalBudget = 2800;

export default function BudgetCentral() {
  return (
    <div className="flex h-screen">
      {/* Main Chat Area (60%) */}
      <div className="flex-[3] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">Budget Central</h1>
          <p className="text-gray-400 text-sm mt-1">Chat with Goldie about your spending</p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Goldie Message */}
          <div className="flex gap-3">
            <CompanionAvatar type="goldie" size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-[#FFD700]">Goldie</span>
                <span className="text-xs text-gray-500">9:24 AM</span>
              </div>
              <div className="bg-white/5 rounded-xl rounded-tl-sm p-4 border border-white/10">
                <p className="text-gray-200">
                  Good morning! 🌅 You've spent €127 this week — €23 under budget! 
                  Want to sweep the extra to your summer trip fund?
                </p>
              </div>
            </div>
          </div>

          {/* User Response */}
          <div className="flex gap-3 justify-end">
            <div className="flex-1 max-w-md">
              <div className="flex items-center gap-2 mb-1 justify-end">
                <span className="text-xs text-gray-500">9:25 AM</span>
                <span className="font-semibold">You</span>
              </div>
              <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-xl rounded-tr-sm p-4">
                <p className="text-[#1a1a2e]">
                  Yes, let's do that!
                </p>
              </div>
            </div>
          </div>

          {/* Goldie Confirmation */}
          <div className="flex gap-3">
            <CompanionAvatar type="goldie" size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-[#FFD700]">Goldie</span>
                <span className="text-xs text-gray-500">9:25 AM</span>
              </div>
              <div className="bg-white/5 rounded-xl rounded-tl-sm p-4 border border-white/10">
                <p className="text-gray-200 mb-3">
                  Perfect! I've moved €23 to your Greece trip fund. 🏖️
                </p>
                <p className="text-gray-200">
                  You're now at €1,523 / €2,000. At this rate, you'll hit your goal by May!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/10">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Ask Goldie anything..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1a1a2e] rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel (40%) */}
      <div className="flex-[2] bg-[#1a1a2e]/50 p-6 overflow-y-auto border-l border-white/10">
        <GlassCard className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">February Budget</h3>
          
          {/* Donut Chart */}
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center -mt-32 mb-24">
              <div className="text-3xl font-bold">{Math.round((totalSpent / totalBudget) * 100)}%</div>
              <div className="text-sm text-gray-400">spent</div>
            </div>
          </div>

          {/* Budget Total */}
          <div className="text-center mb-6">
            <div className="text-2xl font-bold">€{totalSpent.toLocaleString()} / €{totalBudget.toLocaleString()}</div>
            <div className="text-sm text-gray-400">€{(totalBudget - totalSpent).toLocaleString()} remaining</div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-3">
            {spendingData.map((category) => {
              const icon = category.name === 'Food' ? '🍕' : 
                          category.name === 'Transport' ? '🚗' :
                          category.name === 'Shopping' ? '🛍️' :
                          category.name === 'Subscriptions' ? '📱' : '📊';
              
              const status = category.value < category.budget ? 'under' :
                           category.value === category.budget ? 'on track' : 'over';
              
              const statusColor = status === 'under' ? 'text-green-500' :
                                status === 'on track' ? 'text-yellow-500' : 'text-red-500';

              return (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{icon}</span>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">€{category.value}</div>
                    <div className={`text-xs ${statusColor}`}>{status}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Quick Actions */}
        <div className="space-y-3">
          <button className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors">
            View all transactions
          </button>
          <button className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors">
            Adjust budget
          </button>
          <button className="w-full px-4 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1a1a2e] rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Set aside money
          </button>
        </div>
      </div>
    </div>
  );
}
