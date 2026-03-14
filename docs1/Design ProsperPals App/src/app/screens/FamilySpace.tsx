import { MessageCircle, DollarSign, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function FamilySpace() {
  const familyMembers = [
    { name: "Vadim", role: "Admin", spending: 1200, avatar: "👨" },
    { name: "Ani", role: "Admin", spending: 890, avatar: "👩" },
    { name: "Nikolas", role: "Teen", spending: 45, avatar: "👦" },
  ];

  const sharedGoals = [
    {
      title: "Family Vacation 2026",
      target: 5000,
      current: 3400,
      contributors: [
        { name: "Vadim", amount: 2000 },
        { name: "Ani", amount: 1400 },
      ],
    },
    {
      title: "Home Renovation",
      target: 10000,
      current: 800,
      contributors: [
        { name: "Vadim", amount: 500 },
        { name: "Ani", amount: 300 },
      ],
    },
  ];

  const householdData = [
    { name: "Vadim", value: 1200, color: "#4A90D9" },
    { name: "Ani", value: 890, color: "#9B59B6" },
    { name: "Nikolas", value: 45, color: "#F59E0B" },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a] p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold text-white">Family Space</h1>
          <span className="text-3xl">👨‍👩‍👧</span>
        </div>
        <p className="text-white/60 text-lg">Managing finances together</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Family Members */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Family Members</h2>
          <div className="grid grid-cols-4 gap-4">
            {familyMembers.map((member) => (
              <div
                key={member.name}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">{member.avatar}</div>
                  <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                  <div className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded mb-3">
                    {member.role}
                  </div>
                  <div className="text-sm text-white/60">This month</div>
                  <div className="text-2xl font-bold text-white">€{member.spending}</div>
                </div>
              </div>
            ))}
            <button className="bg-white/5 border-2 border-dashed border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-white/10 transition-colors flex flex-col items-center justify-center min-h-[200px]">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                <span className="text-2xl">+</span>
              </div>
              <span className="text-white/70 font-medium">Add family member</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Household Overview */}
          <div className="col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Household Overview</h2>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-sm text-white/60 mb-2">Combined Spending</div>
                  <div className="text-4xl font-bold text-white mb-2">€2,135</div>
                  <div className="text-white/60">of €4,000 budget</div>
                  <div className="w-full bg-white/10 rounded-full h-3 mt-3">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full"
                      style={{ width: "53%" }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-[200px] h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={householdData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {householdData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-sm text-white/60 mb-1">Upcoming Bills</div>
                  <div className="text-2xl font-bold text-white">€425</div>
                  <div className="text-xs text-white/40 mt-1">Next 7 days</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-sm text-white/60 mb-1">Shared Goals</div>
                  <div className="text-2xl font-bold text-white">2</div>
                  <div className="text-xs text-white/40 mt-1">In progress</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-sm text-white/60 mb-1">Budget Left</div>
                  <div className="text-2xl font-bold text-green-400">€1,865</div>
                  <div className="text-xs text-green-400 mt-1">47% remaining</div>
                </div>
              </div>
            </div>

            {/* Shared Goals */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Shared Goals</h2>
              <div className="space-y-4">
                {sharedGoals.map((goal) => {
                  const progress = (goal.current / goal.target) * 100;
                  return (
                    <div key={goal.title} className="bg-white/5 border border-white/10 rounded-lg p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{goal.title}</h3>
                          <div className="text-sm text-white/60">
                            €{goal.current.toLocaleString()} / €{goal.target.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-white">{progress.toFixed(0)}%</div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3 mb-3">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex gap-3">
                        {goal.contributors.map((contributor) => (
                          <div key={contributor.name} className="flex items-center gap-2 text-sm">
                            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
                              {contributor.name[0]}
                            </div>
                            <span className="text-white/60">{contributor.name}:</span>
                            <span className="text-white font-medium">€{contributor.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Kids Corner */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/5 border border-orange-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Kids Corner 🎮</h2>
              
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">👦</div>
                <h3 className="text-lg font-bold text-white mb-1">Nikolas</h3>
                <div className="text-sm text-white/60">Age 14</div>
              </div>

              {/* Allowance Tracker */}
              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <div className="text-sm text-white/60 mb-2">Monthly Allowance</div>
                <div className="text-3xl font-bold text-white mb-1">€45</div>
                <div className="text-sm text-orange-400">€15 left this month</div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-yellow-500 h-2 rounded-full"
                    style={{ width: "33%" }}
                  />
                </div>
              </div>

              {/* Savings Goal */}
              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">Saving for: New Video Game</span>
                  <span className="text-lg">🎮</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">€30 / €60</div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                    style={{ width: "50%" }}
                  />
                </div>
              </div>

              {/* Goldie Message */}
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <span className="text-xl">🪙</span>
                  <p className="text-sm text-white/90 leading-relaxed">
                    Great job saving, Nikolas! You're halfway to your video game. Keep it up! 🌟
                  </p>
                </div>
              </div>
            </div>

            {/* Money Talks */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Money Talks</h3>
              </div>
              <p className="text-sm text-white/60 mb-4">
                Weekly family finance discussion topics
              </p>
              <div className="space-y-2 mb-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white/80">
                  Should we increase the vacation budget?
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white/80">
                  Nikolas wants to save for a bike
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 font-medium transition-colors">
                Start family chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}