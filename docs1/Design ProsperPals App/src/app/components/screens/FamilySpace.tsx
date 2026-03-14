import GlassCard from '../GlassCard';
import { Plus, Users, DollarSign, Target, Calendar } from 'lucide-react';
import { useState } from 'react';

const familyMembers = [
  { name: 'Vadim', role: 'Admin', avatar: '👨', spending: 1200, color: '#4A90D9' },
  { name: 'Ani', role: 'Admin', avatar: '👩', spending: 890, color: '#EF4444' },
  { name: 'Nikolas', role: 'Teen', avatar: '👦', spending: 45, allowance: 50, color: '#FFD700' },
];

const sharedGoals = [
  {
    title: 'Family Vacation 2026',
    emoji: '✈️',
    current: 3400,
    target: 5000,
    contributions: [
      { name: 'Vadim', amount: 2000 },
      { name: 'Ani', amount: 1400 },
    ],
  },
  {
    title: 'Home Renovation',
    emoji: '🏠',
    current: 800,
    target: 10000,
    contributions: [
      { name: 'Vadim', amount: 500 },
      { name: 'Ani', amount: 300 },
    ],
  },
];

export default function FamilySpace() {
  const [activeTab, setActiveTab] = useState<'shared' | 'vadim' | 'ani' | 'kids'>('shared');
  const totalSpending = familyMembers.reduce((sum, member) => sum + member.spending, 0);
  const householdBudget = 4000;

  return (
    <div className="h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-8 border-b border-white/10">
        <h1 className="text-3xl font-bold mb-2">Family Space 👨‍👩‍👧</h1>
        <p className="text-gray-400">Managing finances together</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Family Members */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {familyMembers.map((member) => (
            <GlassCard key={member.name} className="p-4 min-w-[200px] flex-shrink-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-4xl">{member.avatar}</div>
                <div>
                  <div className="font-bold">{member.name}</div>
                  <div className="text-xs text-gray-400">{member.role}</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-sm text-gray-400">This month</div>
                <div className="text-xl font-bold">€{member.spending.toLocaleString()}</div>
                {member.allowance && (
                  <div className="text-sm text-gray-400 mt-1">
                    €{member.spending} / €{member.allowance} allowance
                  </div>
                )}
              </div>
            </GlassCard>
          ))}
          <button className="min-w-[200px] flex-shrink-0 p-4 border-2 border-dashed border-white/20 rounded-xl hover:border-white/40 hover:bg-white/5 transition-colors flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-white">
            <Plus className="w-8 h-8" />
            <span className="text-sm font-semibold">Add family member</span>
          </button>
        </div>

        {/* Household Overview */}
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Household Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-400 mb-2">Combined Spending</div>
              <div className="text-3xl font-bold mb-1">
                €{totalSpending.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">
                of €{householdBudget.toLocaleString()} budget
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-[#10B981] to-[#10B981]/80 h-2 rounded-full"
                  style={{ width: `${(totalSpending / householdBudget) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-2">Shared Goals</div>
              <div className="text-3xl font-bold mb-1">2</div>
              <div className="text-sm text-gray-400">in progress</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-2">Upcoming Bills</div>
              <div className="text-lg font-semibold mb-1">Mortgage • €1,200</div>
              <div className="text-sm text-gray-400">Due Feb 15</div>
            </div>
          </div>
        </GlassCard>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-white/10">
          {['shared', 'vadim', 'ani', 'kids'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 font-semibold capitalize transition-colors relative ${
                activeTab === tab
                  ? 'text-[#FFD700]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'shared' ? '👨‍👩‍👧 Shared' : 
               tab === 'vadim' ? '👨 Vadim\'s View' :
               tab === 'ani' ? '👩 Ani\'s View' :
               '👦 Kids'}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700]" />
              )}
            </button>
          ))}
        </div>

        {/* Shared Goals */}
        {activeTab === 'shared' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Shared Goals</h2>
            {sharedGoals.map((goal, idx) => {
              const progress = (goal.current / goal.target) * 100;
              return (
                <GlassCard key={idx} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{goal.emoji}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-4">{goal.title}</h3>
                      
                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">Progress</span>
                          <span className="text-sm font-semibold">
                            €{goal.current.toLocaleString()} / €{goal.target.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] h-3 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="text-sm font-semibold mt-1">{progress.toFixed(0)}%</div>
                      </div>

                      {/* Contributions */}
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-gray-400">Contributions</div>
                        {goal.contributions.map((contribution, i) => (
                          <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                            <span>{contribution.name}</span>
                            <span className="font-semibold">€{contribution.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      <button className="mt-4 px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1a1a2e] rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all">
                        Add contribution
                      </button>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}

        {/* Vadim's View */}
        {activeTab === 'vadim' && (
          <div className="space-y-6">
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold mb-4">Vadim's Spending</h2>
              <div className="text-3xl font-bold mb-4">€1,200</div>
              <div className="space-y-3">
                {[
                  { category: 'Groceries', amount: 450, icon: '🛒' },
                  { category: 'Gas', amount: 280, icon: '⛽' },
                  { category: 'Entertainment', amount: 180, icon: '🎬' },
                  { category: 'Other', amount: 290, icon: '📊' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span>{item.category}</span>
                    </div>
                    <span className="font-semibold">€{item.amount}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Ani's View */}
        {activeTab === 'ani' && (
          <div className="space-y-6">
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold mb-4">Ani's Spending</h2>
              <div className="text-3xl font-bold mb-4">€890</div>
              <div className="space-y-3">
                {[
                  { category: 'Shopping', amount: 320, icon: '🛍️' },
                  { category: 'Dining', amount: 240, icon: '🍽️' },
                  { category: 'Healthcare', amount: 180, icon: '⚕️' },
                  { category: 'Other', amount: 150, icon: '📊' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span>{item.category}</span>
                    </div>
                    <span className="font-semibold">€{item.amount}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Kids Corner */}
        {activeTab === 'kids' && (
          <div className="space-y-6">
            <GlassCard className="p-6 bg-gradient-to-br from-[#FFD700]/10 to-[#FFA500]/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-5xl">👦</div>
                <div>
                  <h2 className="text-2xl font-bold">Nikolas's Corner</h2>
                  <p className="text-gray-400">Teen Mode</p>
                </div>
              </div>

              {/* Allowance Tracker */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Allowance This Month</h3>
                  <div className="text-2xl font-bold text-[#FFD700]">€45 / €50</div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] h-4 rounded-full"
                    style={{ width: '90%' }}
                  />
                </div>
              </div>

              {/* Savings Jar */}
              <div className="p-6 bg-white/5 rounded-xl border border-[#FFD700]/30 mb-6">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">🏺</div>
                  <div className="text-lg font-semibold">Savings Jar</div>
                  <div className="text-3xl font-bold text-[#FFD700] mt-2">€125</div>
                </div>
              </div>

              {/* Goals */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Nikolas's Goals</h3>
                <GlassCard className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">🎮</span>
                    <div className="flex-1">
                      <div className="font-semibold">New Video Game</div>
                      <div className="text-sm text-gray-400">€30 / €60</div>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] h-2 rounded-full"
                      style={{ width: '50%' }}
                    />
                  </div>
                </GlassCard>
              </div>
            </GlassCard>

            {/* Goldie Message for Kids */}
            <GlassCard className="p-6 bg-[#FFD700]/10 border-[#FFD700]/30">
              <div className="flex gap-4">
                <div className="text-4xl">🪙</div>
                <div>
                  <div className="font-semibold text-[#FFD700] mb-2">Goldie says:</div>
                  <p className="text-gray-300">
                    Great job saving, Nikolas! You're halfway to your video game goal. Keep it up! 🌟
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Money Talks */}
        <GlassCard className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4A90D9] to-[#2563EB] rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">Money Talks 💬</h3>
              <p className="text-gray-400 mb-4">Weekly family finance discussion topics</p>
              <div className="space-y-2 mb-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  Should we increase the vacation budget?
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  Nikolas wants to save for a bike
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-[#4A90D9] to-[#2563EB] text-white rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(74,144,217,0.4)] transition-all">
                Start family chat
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
