import { Check, RefreshCw, X, Shield, Download, AlertTriangle } from "lucide-react";

export function Settings() {
  const connectedBanks = [
    { name: "Nordea", type: "Checking", lastSync: "2 min ago", connected: true },
    { name: "Danske Bank", type: "Savings", lastSync: "5 min ago", connected: true },
    { name: "Revolut", type: "Card", lastSync: "1 hour ago", connected: true },
  ];

  const connectedIntegrations = [
    { name: "Google Calendar", description: "Syncing bill reminders", icon: "📅" },
  ];

  const availableIntegrations = [
    { name: "Email (Gmail)", description: "Scan receipts and detect subscriptions", icon: "📧" },
    { name: "Apple Health", description: "Correlate spending with wellness", icon: "📱" },
    { name: "Slack", description: "Get goal celebration notifications", icon: "💬" },
    { name: "Smart Home", description: "Track utility costs", icon: "🏠" },
  ];

  const comingSoon = ["Investment brokers (Nordnet, Saxo)", "Crypto wallets"];

  return (
    <div className="min-h-screen bg-[#0f0f1a] p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold text-white">Settings</h1>
          <span className="text-3xl">⚙️</span>
        </div>
        <p className="text-white/60 text-lg">Manage your connections and preferences</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          <button className="px-6 py-3 font-medium text-white border-b-2 border-blue-500">
            Connected Accounts
          </button>
          <button className="px-6 py-3 font-medium text-white/60 hover:text-white transition-colors">
            Integrations
          </button>
          <button className="px-6 py-3 font-medium text-white/60 hover:text-white transition-colors">
            Privacy
          </button>
          <button className="px-6 py-3 font-medium text-white/60 hover:text-white transition-colors">
            Notifications
          </button>
        </div>

        {/* Connected Accounts Section */}
        <div className="space-y-6">
          {/* Bank Connections */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Your Linked Bank Accounts</h2>
                <p className="text-white/60">Securely connected to sync your transactions</p>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400 font-medium">Bank-level security</span>
              </div>
            </div>

            <div className="space-y-4">
              {connectedBanks.map((bank) => (
                <div
                  key={bank.name}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🏦</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-white">{bank.name}</h3>
                          <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                            <Check className="w-3 h-3" />
                            Connected
                          </div>
                        </div>
                        <div className="text-sm text-white/60">{bank.type}</div>
                        <div className="text-xs text-white/40 mt-1">Last sync: {bank.lastSync}</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 font-medium transition-colors flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                      </button>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 font-medium transition-colors flex items-center gap-2">
                        <X className="w-4 h-4" />
                        Disconnect
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full px-6 py-4 bg-gradient-to-r from-blue-500/20 to-blue-600/10 hover:from-blue-500/30 hover:to-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400 font-semibold transition-colors">
              + Connect Another Bank
            </button>

            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-white/40">
                <Shield className="w-4 h-4" />
                <span>Powered by Tink - Bank-level encryption</span>
              </div>
            </div>
          </div>

          {/* Integrations Section */}
          <div className="border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Integrations</h2>

            {/* Connected */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Connected</h3>
              <div className="space-y-3">
                {connectedIntegrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{integration.icon}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-white">{integration.name}</h4>
                            <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs">
                              <Check className="w-3 h-3" />
                              Active
                            </div>
                          </div>
                          <div className="text-sm text-white/60">{integration.description}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 text-sm font-medium transition-colors">
                          Configure
                        </button>
                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 text-sm font-medium transition-colors">
                          Disconnect
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Available Integrations</h3>
              <div className="grid grid-cols-2 gap-4">
                {availableIntegrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="text-3xl">{integration.icon}</div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{integration.name}</h4>
                        <p className="text-sm text-white/60">{integration.description}</p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 font-medium transition-colors">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon */}
            <div>
              <h3 className="text-lg font-semibold text-white/60 mb-4">Coming Soon</h3>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="space-y-3">
                  {comingSoon.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-white/40">
                      <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                        <span className="text-sm">🔒</span>
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Privacy & Security</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6 text-center">
                <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="font-semibold text-white mb-1">EU Data Storage</div>
                <div className="text-sm text-white/60">Your data stays in the EU</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6 text-center">
                <Shield className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="font-semibold text-white mb-1">No Data Selling</div>
                <div className="text-sm text-white/60">We never sell your data</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6 text-center">
                <Shield className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="font-semibold text-white mb-1">End-to-End Encrypted</div>
                <div className="text-sm text-white/60">Bank-level security</div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="font-semibold text-white">Download My Data</div>
                      <div className="text-sm text-white/60">Export all your financial data</div>
                    </div>
                  </div>
                  <span className="text-white/40 group-hover:text-white/60">→</span>
                </div>
              </button>
              
              <button className="w-full px-6 py-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-left transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="font-semibold text-red-400">Delete Account</div>
                      <div className="text-sm text-white/60">Permanently delete your account and data</div>
                    </div>
                  </div>
                  <span className="text-white/40 group-hover:text-white/60">→</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
