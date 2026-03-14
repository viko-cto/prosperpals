import { useState } from "react";
import { 
  SkeletonCard,
  SkeletonText,
  SkeletonTransaction,
  SkeletonGoal,
  SkeletonAccount,
  CompanionThinking,
  BankSyncLoading,
  DataRefreshSpinner,
  PullToRefreshIndicator,
  InlineSpinner,
  SkeletonDashboard,
  SkeletonLeaderboard
} from "../components/LoadingStates";

export function LoadingStateShowcase() {
  const [activeState, setActiveState] = useState<string>("skeletons");
  const [syncProgress, setSyncProgress] = useState(45);
  const [pullProgress, setPullProgress] = useState(0);

  const states = [
    { id: "skeletons", label: "Skeleton Cards", emoji: "💀" },
    { id: "companions", label: "Companions", emoji: "🪙" },
    { id: "bank-sync", label: "Bank Sync", emoji: "🏦" },
    { id: "spinners", label: "Spinners", emoji: "⚙️" },
    { id: "layouts", label: "Full Layouts", emoji: "📱" },
  ];

  return (
    <div className="flex-1 bg-[#0f0f1a] overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Loading State Showcase</h1>
          <p className="text-white/60">Preview all loading states and skeletons</p>
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

        {/* Active State Display */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          
          {/* SKELETON CARDS */}
          {activeState === "skeletons" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Basic Skeleton Components</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-white/60 mb-3">Skeleton Card</p>
                    <SkeletonCard className="h-32" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-white/60 mb-3">Skeleton Text Lines</p>
                    <SkeletonText width="100%" height="20px" />
                    <SkeletonText width="80%" height="16px" />
                    <SkeletonText width="60%" height="14px" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Transaction Skeletons</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <SkeletonTransaction key={i} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Goal Card Skeleton</h3>
                <div className="grid grid-cols-2 gap-4">
                  <SkeletonGoal />
                  <SkeletonGoal />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Account Card Skeleton</h3>
                <SkeletonAccount />
              </div>
            </div>
          )}

          {/* COMPANION THINKING */}
          {activeState === "companions" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Goldie Thinking</h3>
                <div className="flex justify-center">
                  <CompanionThinking companion="goldie" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Fin Thinking</h3>
                <div className="flex justify-center">
                  <CompanionThinking companion="fin" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Custom Message</h3>
                <div className="flex justify-center">
                  <CompanionThinking 
                    companion="goldie" 
                    message="Crunching the numbers..."
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Analyzing Investment</h3>
                <div className="flex justify-center">
                  <CompanionThinking 
                    companion="fin" 
                    message="Analyzing market trends..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* BANK SYNC */}
          {activeState === "bank-sync" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Bank Sync Progress</h3>
                <BankSyncLoading 
                  bankName="Nordea"
                  bankLogo="🏦"
                  transactionCount={847}
                  progress={syncProgress}
                  estimatedTime="30 seconds"
                />
              </div>

              {/* Progress Control */}
              <div className="max-w-lg mx-auto">
                <label className="block text-sm text-white/60 mb-2">
                  Adjust Progress: {syncProgress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={syncProgress}
                  onChange={(e) => setSyncProgress(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Different Banks */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-4">Danske Bank</h4>
                  <BankSyncLoading 
                    bankName="Danske Bank"
                    bankLogo="🏦"
                    transactionCount={1234}
                    progress={75}
                    estimatedTime="15 seconds"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-4">Revolut</h4>
                  <BankSyncLoading 
                    bankName="Revolut"
                    bankLogo="💳"
                    transactionCount={456}
                    progress={25}
                    estimatedTime="45 seconds"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SPINNERS */}
          {activeState === "spinners" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Data Refresh Spinners</h3>
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <DataRefreshSpinner variant="gold" size="sm" />
                    <p className="text-sm text-white/60 mt-3">Small Gold</p>
                  </div>
                  <div className="text-center">
                    <DataRefreshSpinner variant="gold" size="md" />
                    <p className="text-sm text-white/60 mt-3">Medium Gold</p>
                  </div>
                  <div className="text-center">
                    <DataRefreshSpinner variant="gold" size="lg" />
                    <p className="text-sm text-white/60 mt-3">Large Gold</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Blue Variant</h3>
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <DataRefreshSpinner variant="blue" size="sm" />
                    <p className="text-sm text-white/60 mt-3">Small Blue</p>
                  </div>
                  <div className="text-center">
                    <DataRefreshSpinner variant="blue" size="md" />
                    <p className="text-sm text-white/60 mt-3">Medium Blue</p>
                  </div>
                  <div className="text-center">
                    <DataRefreshSpinner variant="blue" size="lg" />
                    <p className="text-sm text-white/60 mt-3">Large Blue</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Inline Spinners</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white">
                    <InlineSpinner variant="gold" size="sm" />
                    <span>Loading your budget...</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <InlineSpinner variant="blue" size="md" />
                    <span>Analyzing investment portfolio...</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Pull to Refresh (Mobile)</h3>
                <div className="max-w-sm mx-auto bg-white/5 rounded-xl p-4">
                  <PullToRefreshIndicator 
                    progress={pullProgress} 
                    variant="gold"
                  />
                  
                  <div className="mt-4">
                    <label className="block text-sm text-white/60 mb-2">
                      Simulate Pull: {pullProgress}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="120"
                      value={pullProgress}
                      onChange={(e) => setPullProgress(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FULL LAYOUTS */}
          {activeState === "layouts" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Dashboard Skeleton</h3>
                <div className="bg-[#0f0f1a] rounded-xl overflow-hidden">
                  <SkeletonDashboard />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Leaderboard Skeleton</h3>
                <div className="max-w-2xl">
                  <SkeletonLeaderboard />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Usage Examples */}
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-3">💡 Usage Examples</h3>
          <div className="space-y-2 text-sm text-white/80 font-mono">
            <p>// Show skeleton while loading:</p>
            <p className="text-blue-400">
              {`{isLoading ? <SkeletonTransaction /> : <TransactionList />}`}
            </p>
            
            <p className="mt-4">// Companion thinking state:</p>
            <p className="text-blue-400">
              {`<CompanionThinking companion="goldie" message="Calculating..." />`}
            </p>
            
            <p className="mt-4">// Bank sync with progress:</p>
            <p className="text-blue-400">
              {`<BankSyncLoading bankName="Nordea" progress={75} />`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
