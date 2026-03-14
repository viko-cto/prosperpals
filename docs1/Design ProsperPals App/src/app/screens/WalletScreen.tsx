import { Wallet, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export function WalletScreen() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Wallet className="w-10 h-10 text-yellow-400" />
          <h1 className="text-4xl font-bold text-white">Wallet</h1>
        </div>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-white/80">Real Money</h3>
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">€2,450.00</div>
            <div className="text-sm text-green-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +€125 this month
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-white/80">Virtual Portfolio</h3>
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">€10,248.50</div>
            <div className="text-sm text-purple-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +€248.50 (+2.48%)
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Overview</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm text-white/60">Total Balance</div>
              <div className="text-lg font-bold text-white">€12,698.50</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-sm text-white/60">Total Gain</div>
              <div className="text-lg font-bold text-green-400">+€373.50</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm text-white/60">Budget Left</div>
              <div className="text-lg font-bold text-white">€550</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🪙</div>
              <div className="text-sm text-white/60">ProsperCoins</div>
              <div className="text-lg font-bold text-yellow-400">2,450</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}