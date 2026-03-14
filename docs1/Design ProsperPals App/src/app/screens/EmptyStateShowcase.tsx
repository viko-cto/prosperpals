import { useState } from "react";
import { 
  EmptyTransactions, 
  EmptyGoals, 
  EmptyPortfolio,
  EmptyClans,
  EmptyLeaderboard 
} from "../components/EmptyStates";

export function EmptyStateShowcase() {
  const [activeState, setActiveState] = useState<"transactions" | "goals" | "portfolio" | "clans" | "leaderboard">("transactions");

  const states = [
    { id: "transactions", label: "Transactions", emoji: "📝" },
    { id: "goals", label: "Goals", emoji: "🎯" },
    { id: "portfolio", label: "Portfolio", emoji: "📊" },
    { id: "clans", label: "Clans", emoji: "🏰" },
    { id: "leaderboard", label: "Leaderboard", emoji: "🏆" },
  ] as const;

  return (
    <div className="flex-1 bg-[#0f0f1a] overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Empty State Showcase</h1>
          <p className="text-white/60">Preview all empty state designs</p>
        </div>

        {/* State Selector */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {states.map((state) => (
            <button
              key={state.id}
              onClick={() => setActiveState(state.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeState === state.id
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1a1a2e] shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                  : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="text-xl">{state.emoji}</span>
              {state.label}
            </button>
          ))}
        </div>

        {/* Active Empty State */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          {activeState === "transactions" && <EmptyTransactions />}
          {activeState === "goals" && <EmptyGoals />}
          {activeState === "portfolio" && <EmptyPortfolio />}
          {activeState === "clans" && <EmptyClans />}
          {activeState === "leaderboard" && <EmptyLeaderboard />}
        </div>
      </div>
    </div>
  );
}
