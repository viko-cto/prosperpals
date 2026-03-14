import { Send, Paperclip, Mic } from "lucide-react";

export function ChatFin() {
  return (
    <div className="flex h-screen bg-[#0f0f1a]">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center shadow-lg">
              <span className="text-2xl">🐋</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Fin</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-sm text-white/60">Active now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Message 1 */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🐋</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-blue-400">Fin</span>
                <span className="text-xs text-white/40">3:22 PM</span>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl rounded-tl-none p-4">
                <p className="text-white/90">
                  Welcome to your first investing lesson! 📊 Let's start simple: Do you know what an index fund is?
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-colors">
                    Yes, explain anyway
                  </button>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 rounded-lg text-sm font-medium transition-colors">
                    No, teach me
                  </button>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 rounded-lg text-sm font-medium transition-colors">
                    Skip to advanced
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Response */}
          <div className="flex gap-4 justify-end">
            <div className="flex-1 max-w-[70%]">
              <div className="flex items-center gap-2 mb-1 justify-end">
                <span className="text-xs text-white/40">3:23 PM</span>
                <span className="font-semibold text-white/90">You</span>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-xl border border-blue-500/20 rounded-xl rounded-tr-none p-4">
                <p className="text-white/90">No, teach me</p>
              </div>
            </div>
          </div>

          {/* Message 2 - Basket Metaphor */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🐋</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-blue-400">Fin</span>
                <span className="text-xs text-white/40">3:23 PM</span>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl rounded-tl-none p-4">
                <p className="text-white/90 mb-4">
                  Perfect! Think of an index fund like a basket of fruits 🍎🍊🍋...
                </p>
                
                {/* Visual Card */}
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-6 mb-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🍎</div>
                      <div className="text-sm text-white/60">Single Stock</div>
                      <div className="text-xs text-red-400 mt-1">Higher Risk</div>
                    </div>
                    <div className="text-2xl text-white/40">vs</div>
                    <div className="text-center">
                      <div className="text-4xl mb-2">🧺</div>
                      <div className="text-sm text-white/60">Index Fund</div>
                      <div className="text-xs text-green-400 mt-1">Lower Risk</div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 flex items-center gap-2">
                    <span className="text-2xl">🧺 =</span>
                    <span className="text-xl">🍎 🍊 🍋 🍇 🍓 🍌 🥝</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message 3 - Explanation */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🐋</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-blue-400">Fin</span>
                <span className="text-xs text-white/40">3:24 PM</span>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl rounded-tl-none p-4">
                <p className="text-white/90">
                  Instead of buying one apple (stock), you buy the whole basket. If one fruit goes bad, others are still fresh. That's diversification!
                </p>
              </div>
            </div>
          </div>

          {/* Message 4 - Quiz */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🐋</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-blue-400">Fin</span>
                <span className="text-xs text-white/40">3:24 PM</span>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl rounded-tl-none p-4">
                <p className="text-white/90 mb-3">
                  Quick quiz: Why is a basket safer than a single fruit?
                </p>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors">
                    <span className="text-white/90">A) More vitamins</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-colors">
                    <span className="text-blue-400">B) Less risk if one goes bad</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors">
                    <span className="text-white/90">C) Tastes better</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Response */}
          <div className="flex gap-4 justify-end">
            <div className="flex-1 max-w-[70%]">
              <div className="flex items-center gap-2 mb-1 justify-end">
                <span className="text-xs text-white/40">3:25 PM</span>
                <span className="font-semibold text-white/90">You</span>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-xl border border-blue-500/20 rounded-xl rounded-tr-none p-4">
                <p className="text-white/90">B) Less risk if one goes bad</p>
              </div>
            </div>
          </div>

          {/* Message 5 - Confirmation */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🐋</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-blue-400">Fin</span>
                <span className="text-xs text-white/40">3:25 PM</span>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl rounded-tl-none p-4">
                <p className="text-white/90 mb-3">
                  🎯 Exactly! You're getting it. Ready to see how this works with real numbers?
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
                  Show me the math
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 p-4">
          <div className="flex gap-3 items-end">
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
              <Paperclip className="w-5 h-5 text-white/60" />
            </button>
            <input
              type="text"
              placeholder="Ask Fin anything..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
              <Mic className="w-5 h-5 text-white/60" />
            </button>
            <button className="p-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg hover:opacity-90 transition-opacity">
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Progress */}
      <div className="w-80 border-l border-white/10 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Learning Progress</h3>
        
        <div className="space-y-4">
          {/* Current Module */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-blue-400">Investing 101</span>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Active</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: "15%" }} />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/60">15% complete</span>
              <span className="text-white/60">8 min remaining</span>
            </div>
          </div>

          {/* Badge Preview */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4">
            <div className="text-sm text-white/60 mb-3">Next badge to unlock:</div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center border border-blue-500/30">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <div className="font-semibold text-white">Index Fund Graduate</div>
                <div className="text-xs text-white/40">Complete module</div>
              </div>
            </div>
          </div>

          {/* Study Streak */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Study streak</span>
              <span className="text-2xl">🔥</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">7 days</div>
            <div className="text-xs text-white/40">Keep it going!</div>
          </div>

          {/* Lessons Completed */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4">
            <div className="text-sm text-white/60 mb-2">Lessons completed</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">12</span>
              <span className="text-sm text-white/40">total</span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="text-xs text-green-400">+2 this week</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
