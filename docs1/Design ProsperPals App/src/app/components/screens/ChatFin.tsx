import GlassCard from '../GlassCard';
import CompanionAvatar from '../CompanionAvatar';
import { Send, Paperclip, Mic, BookOpen, Award } from 'lucide-react';

export default function ChatFin() {
  return (
    <div className="flex h-screen">
      {/* Main Chat Area (60%) */}
      <div className="flex-[3] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <CompanionAvatar type="fin" size="md" />
            <div>
              <h1 className="text-2xl font-bold">Fin</h1>
              <p className="text-gray-400 text-sm">Your investing guide • Teaching you to grow wealth</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Fin Message 1 */}
          <div className="flex gap-3">
            <CompanionAvatar type="fin" size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-[#4A90D9]">Fin</span>
                <span className="text-xs text-gray-500">2:30 PM</span>
              </div>
              <div className="bg-white/5 rounded-xl rounded-tl-sm p-4 border border-white/10">
                <p className="text-gray-200 mb-3">
                  Welcome to your first investing lesson! 📊 Let's start simple: Do you know what an index fund is?
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-[#4A90D9]/20 hover:bg-[#4A90D9]/30 border border-[#4A90D9]/50 rounded-lg text-sm text-[#4A90D9] transition-colors">
                    Yes, explain anyway
                  </button>
                  <button className="px-4 py-2 bg-[#4A90D9]/20 hover:bg-[#4A90D9]/30 border border-[#4A90D9]/50 rounded-lg text-sm text-[#4A90D9] transition-colors">
                    No, teach me
                  </button>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 transition-colors">
                    Skip to advanced
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Response 1 */}
          <div className="flex gap-3 justify-end">
            <div className="flex-1 max-w-md">
              <div className="flex items-center gap-2 mb-1 justify-end">
                <span className="text-xs text-gray-500">2:31 PM</span>
                <span className="font-semibold">You</span>
              </div>
              <div className="bg-gradient-to-r from-[#4A90D9] to-[#2563EB] rounded-xl rounded-tr-sm p-4">
                <p className="text-white">No, teach me</p>
              </div>
            </div>
          </div>

          {/* Fin Message 2 with Visual */}
          <div className="flex gap-3">
            <CompanionAvatar type="fin" size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-[#4A90D9]">Fin</span>
                <span className="text-xs text-gray-500">2:31 PM</span>
              </div>
              <div className="bg-white/5 rounded-xl rounded-tl-sm p-4 border border-white/10">
                <p className="text-gray-200 mb-4">
                  Perfect! Think of an index fund like a basket of fruits 🍎🍊🍋...
                </p>
                
                {/* Visual Metaphor Card */}
                <div className="bg-gradient-to-br from-[#4A90D9]/20 to-[#2563EB]/20 rounded-lg p-6 border border-[#4A90D9]/30 mb-4">
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2">🧺</div>
                    <div className="text-lg font-semibold text-[#4A90D9]">The Basket</div>
                    <div className="text-sm text-gray-300">= Index Fund</div>
                  </div>
                  <div className="flex justify-center gap-3 text-4xl">
                    <span>🍎</span>
                    <span>🍊</span>
                    <span>🍋</span>
                    <span>🍇</span>
                    <span>🍓</span>
                  </div>
                  <div className="text-center text-sm text-gray-300 mt-2">
                    Each fruit = Individual stock
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fin Message 3 */}
          <div className="flex gap-3">
            <CompanionAvatar type="fin" size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-[#4A90D9]">Fin</span>
                <span className="text-xs text-gray-500">2:32 PM</span>
              </div>
              <div className="bg-white/5 rounded-xl rounded-tl-sm p-4 border border-white/10">
                <p className="text-gray-200">
                  Instead of buying one apple (stock), you buy the whole basket. If one fruit goes bad, others are still fresh. That's diversification!
                </p>
              </div>
            </div>
          </div>

          {/* Fin Quiz */}
          <div className="flex gap-3">
            <CompanionAvatar type="fin" size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-[#4A90D9]">Fin</span>
                <span className="text-xs text-gray-500">2:33 PM</span>
              </div>
              <div className="bg-white/5 rounded-xl rounded-tl-sm p-4 border border-white/10">
                <p className="text-gray-200 mb-3">
                  Quick quiz: Why is a basket safer than a single fruit?
                </p>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-colors">
                    <span className="font-semibold mr-2">A)</span> More vitamins
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-[#4A90D9]/20 hover:bg-[#4A90D9]/30 border border-[#4A90D9]/50 rounded-lg text-sm text-[#4A90D9] transition-colors">
                    <span className="font-semibold mr-2">B)</span> Less risk if one goes bad
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-colors">
                    <span className="font-semibold mr-2">C)</span> Tastes better
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Response 2 */}
          <div className="flex gap-3 justify-end">
            <div className="flex-1 max-w-md">
              <div className="flex items-center gap-2 mb-1 justify-end">
                <span className="text-xs text-gray-500">2:34 PM</span>
                <span className="font-semibold">You</span>
              </div>
              <div className="bg-gradient-to-r from-[#4A90D9] to-[#2563EB] rounded-xl rounded-tr-sm p-4">
                <p className="text-white">B) Less risk if one goes bad</p>
              </div>
            </div>
          </div>

          {/* Fin Confirmation */}
          <div className="flex gap-3">
            <CompanionAvatar type="fin" size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-[#4A90D9]">Fin</span>
                <span className="text-xs text-gray-500">2:34 PM</span>
              </div>
              <div className="bg-white/5 rounded-xl rounded-tl-sm p-4 border border-white/10">
                <p className="text-gray-200 mb-3">
                  🎯 Exactly! You're getting it. Ready to see how this works with real numbers?
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-[#4A90D9] to-[#2563EB] text-white rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(74,144,217,0.4)] transition-all">
                  Show me the math
                </button>
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
              placeholder="Ask Fin anything..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#4A90D9] focus:ring-1 focus:ring-[#4A90D9]"
            />
            <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
              <Mic className="w-5 h-5 text-gray-400" />
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-[#4A90D9] to-[#2563EB] text-white rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(74,144,217,0.4)] transition-all">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel (40%) */}
      <div className="flex-[2] bg-[#1a1a2e]/50 p-6 overflow-y-auto border-l border-white/10">
        <GlassCard className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-[#4A90D9]" />
            <h3 className="text-lg font-semibold text-[#4A90D9]">Progress</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-400 mb-2">Current Module</div>
              <div className="text-lg font-semibold mb-1">Investing 101</div>
              <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-[#4A90D9] to-[#2563EB] h-2 rounded-full" style={{ width: '15%' }} />
              </div>
              <div className="text-sm text-gray-400">15% complete</div>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <div className="text-sm text-gray-400 mb-1">Estimated Time</div>
              <div className="text-xl font-bold">8 min remaining</div>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <div className="text-sm text-gray-400 mb-2">Next Badge</div>
              <div className="flex items-center gap-2 p-3 bg-[#4A90D9]/10 border border-[#4A90D9]/30 rounded-lg">
                <Award className="w-5 h-5 text-[#4A90D9]" />
                <div>
                  <div className="text-sm font-semibold">📊 Index Fund Graduate</div>
                  <div className="text-xs text-gray-400">Complete this lesson</div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-[#4A90D9]">Key Concepts</h3>
          
          <div className="space-y-3">
            {[
              { term: 'Diversification', definition: 'Spreading investments to reduce risk' },
              { term: 'Index Fund', definition: 'Investment tracking a market index' },
              { term: 'Risk', definition: 'Potential for loss or gain' },
              { term: 'Portfolio', definition: 'Collection of all investments' },
            ].map((concept, i) => (
              <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="font-semibold text-sm text-[#4A90D9] mb-1">{concept.term}</div>
                <div className="text-xs text-gray-400">{concept.definition}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
