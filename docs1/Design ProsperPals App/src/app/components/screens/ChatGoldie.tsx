import GlassCard from '../GlassCard';
import CompanionAvatar from '../CompanionAvatar';
import { Send, Paperclip, Mic, TrendingUp } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const compoundData = [
  { year: 0, value: 45 },
  { year: 2, value: 51 },
  { year: 4, value: 58 },
  { year: 6, value: 66 },
  { year: 8, value: 75 },
  { year: 10, value: 87 },
];

export default function ChatGoldie() {
  return (
    <div className="flex h-screen">
      {/* Main Chat Area (60%) */}
      <div className="flex-[3] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <CompanionAvatar type="goldie" size="md" />
            <div>
              <h1 className="text-2xl font-bold">Goldie</h1>
              <p className="text-gray-400 text-sm">Your budgeting buddy • Always here to help</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Goldie Message 1 */}
          <div className="flex gap-3">
            <CompanionAvatar type="goldie" size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-[#FFD700]">Goldie</span>
                <span className="text-xs text-gray-500">10:15 AM</span>
              </div>
              <div className="bg-white/5 rounded-xl rounded-tl-sm p-4 border border-white/10">
                <p className="text-gray-200">
                  I noticed a €45 charge at H&M. Want me to categorize this?
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="px-4 py-2 bg-[#FFD700]/20 hover:bg-[#FFD700]/30 border border-[#FFD700]/50 rounded-lg text-sm text-[#FFD700] transition-colors">
                    Clothing
                  </button>
                  <button className="px-4 py-2 bg-[#FFD700]/20 hover:bg-[#FFD700]/30 border border-[#FFD700]/50 rounded-lg text-sm text-[#FFD700] transition-colors">
                    Shopping
                  </button>
                  <button className="px-4 py-2 bg-[#FFD700]/20 hover:bg-[#FFD700]/30 border border-[#FFD700]/50 rounded-lg text-sm text-[#FFD700] transition-colors">
                    Other
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Response 1 */}
          <div className="flex gap-3 justify-end">
            <div className="flex-1 max-w-md">
              <div className="flex items-center gap-2 mb-1 justify-end">
                <span className="text-xs text-gray-500">10:16 AM</span>
                <span className="font-semibold">You</span>
              </div>
              <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-xl rounded-tr-sm p-4">
                <p className="text-[#1a1a2e]">Clothing</p>
              </div>
            </div>
          </div>

          {/* Goldie Message 2 */}
          <div className="flex gap-3">
            <CompanionAvatar type="goldie" size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-[#FFD700]">Goldie</span>
                <span className="text-xs text-gray-500">10:16 AM</span>
              </div>
              <div className="bg-white/5 rounded-xl rounded-tl-sm p-4 border border-white/10">
                <p className="text-gray-200 mb-2">
                  Got it! 👕 Your clothing budget is at €120/€150 this month. You're doing great!
                </p>
              </div>
            </div>
          </div>

          {/* Goldie Message 3 */}
          <div className="flex gap-3">
            <CompanionAvatar type="goldie" size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-[#FFD700]">Goldie</span>
                <span className="text-xs text-gray-500">10:17 AM</span>
              </div>
              <div className="bg-white/5 rounded-xl rounded-tl-sm p-4 border border-white/10">
                <p className="text-gray-200 mb-3">
                  Quick tip: There's a sale season coming next week. Want me to remind you to wait?
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-[#FFD700]/20 hover:bg-[#FFD700]/30 border border-[#FFD700]/50 rounded-lg text-sm text-[#FFD700] transition-colors">
                    Yes, remind me
                  </button>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 transition-colors">
                    No thanks
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Response 2 */}
          <div className="flex gap-3 justify-end">
            <div className="flex-1 max-w-md">
              <div className="flex items-center gap-2 mb-1 justify-end">
                <span className="text-xs text-gray-500">10:18 AM</span>
                <span className="font-semibold">You</span>
              </div>
              <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-xl rounded-tr-sm p-4">
                <p className="text-[#1a1a2e]">Yes, remind me</p>
              </div>
            </div>
          </div>

          {/* Goldie Message 4 with Chart */}
          <div className="flex gap-3">
            <CompanionAvatar type="goldie" size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-[#FFD700]">Goldie</span>
                <span className="text-xs text-gray-500">10:18 AM</span>
              </div>
              <div className="bg-white/5 rounded-xl rounded-tl-sm p-4 border border-white/10">
                <p className="text-gray-200 mb-4">
                  Done! I'll ping you on Friday. In the meantime, here's what €45 could become if invested for 10 years... 💡
                </p>
                
                {/* Mini Compound Growth Card */}
                <div className="bg-[#1a1a2e] rounded-lg p-4 border border-[#FFD700]/20">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-[#FFD700]" />
                    <span className="text-sm font-semibold text-[#FFD700]">Compound Growth</span>
                  </div>
                  <ResponsiveContainer width="100%" height={80}>
                    <LineChart data={compoundData}>
                      <XAxis dataKey="year" stroke="#666" fontSize={10} />
                      <YAxis stroke="#666" fontSize={10} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#FFD700" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-400">Today: €45</span>
                    <span className="text-sm font-semibold text-[#10B981]">10 years: €87</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/10">
          <div className="flex gap-3">
            <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
              <Paperclip className="w-5 h-5 text-gray-400" />
            </button>
            <input
              type="text"
              placeholder="Ask Goldie anything..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]"
            />
            <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
              <Mic className="w-5 h-5 text-gray-400" />
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1a1a2e] rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel (40%) */}
      <div className="flex-[2] bg-[#1a1a2e]/50 p-6 overflow-y-auto border-l border-white/10">
        <GlassCard className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-[#FFD700]">Quick Stats</h3>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-400 mb-1">Today's Spending</div>
              <div className="text-2xl font-bold">€67</div>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <div className="text-sm text-gray-400 mb-1">Weekly Average</div>
              <div className="text-2xl font-bold">€182</div>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <div className="text-sm text-gray-400 mb-1">Next Bill</div>
              <div className="text-lg font-semibold">Netflix</div>
              <div className="text-sm text-gray-400">February 15</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-[#FFD700]">Recent Transactions</h3>
          
          <div className="space-y-3">
            {[
              { name: 'H&M', amount: 45, category: 'Clothing', time: 'Today' },
              { name: 'Starbucks', amount: 8.50, category: 'Food', time: 'Today' },
              { name: 'Uber', amount: 15, category: 'Transport', time: 'Yesterday' },
              { name: 'Netflix', amount: 15.99, category: 'Subscription', time: '2 days ago' },
            ].map((transaction, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="font-semibold text-sm">{transaction.name}</div>
                  <div className="text-xs text-gray-400">{transaction.category} • {transaction.time}</div>
                </div>
                <div className="text-sm font-semibold">€{transaction.amount}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
