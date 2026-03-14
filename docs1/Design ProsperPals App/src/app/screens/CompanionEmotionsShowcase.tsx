import { useState } from "react";
import {
  GoldieHappy,
  GoldieExcited,
  GoldieThinking,
  GoldieConcerned,
  GoldieCelebrating,
  GoldieSleeping,
  GoldieEncouraging,
  FinAnalytical,
  FinTeaching,
  FinImpressed,
  FinThinking,
  FinCelebrating,
  FinWarning,
  CompanionEmotion,
} from "../components/CompanionEmotions";

export function CompanionEmotionsShowcase() {
  const [activeCompanion, setActiveCompanion] = useState<"goldie" | "fin">("goldie");
  const [selectedSize, setSelectedSize] = useState<"avatar" | "medium" | "hero">("medium");

  const goldieEmotions = [
    { id: "happy", label: "Happy/Default", component: GoldieHappy, description: "Friendly smile, slight glow" },
    { id: "excited", label: "Excited", component: GoldieExcited, description: "Wide eyes, sparkles, bouncing" },
    { id: "thinking", label: "Thinking", component: GoldieThinking, description: "Hand on chin, '...' bubble" },
    { id: "concerned", label: "Concerned", component: GoldieConcerned, description: "Slight frown, supportive posture" },
    { id: "celebrating", label: "Celebrating", component: GoldieCelebrating, description: "Party hat, confetti, big grin" },
    { id: "sleeping", label: "Sleeping", component: GoldieSleeping, description: "Zzz, night mode indicator" },
    { id: "encouraging", label: "Encouraging", component: GoldieEncouraging, description: "Thumbs up, cheering pose" },
  ];

  const finEmotions = [
    { id: "analytical", label: "Analytical/Default", component: FinAnalytical, description: "Glasses, confident smile" },
    { id: "teaching", label: "Teaching", component: FinTeaching, description: "Pointing gesture, lightbulb nearby" },
    { id: "impressed", label: "Impressed", component: FinImpressed, description: "Raised eyebrows, '!' bubble" },
    { id: "thinking", label: "Thinking", component: FinThinking, description: "Looking up, calculation symbols" },
    { id: "celebrating", label: "Celebrating", component: FinCelebrating, description: "Graduation cap, diploma" },
    { id: "warning", label: "Warning", component: FinWarning, description: "Serious face, caution gesture" },
  ];

  const currentEmotions = activeCompanion === "goldie" ? goldieEmotions : finEmotions;

  return (
    <div className="flex-1 bg-[#0f0f1a] overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Companion Emotion Variants</h1>
          <p className="text-white/60">
            Characters that feel alive and responsive to user actions
          </p>
        </div>

        {/* Companion Toggle */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveCompanion("goldie")}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-3 ${
              activeCompanion === "goldie"
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1a1a2e] shadow-[0_0_30px_rgba(251,191,36,0.4)]"
                : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
            }`}
          >
            <span className="text-3xl">🪙</span>
            Goldie (7 Emotions)
          </button>
          <button
            onClick={() => setActiveCompanion("fin")}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-3 ${
              activeCompanion === "fin"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
            }`}
          >
            <span className="text-3xl">🐋</span>
            Fin (6 Emotions)
          </button>
        </div>

        {/* Size Selector */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">Size Variant:</h3>
          <div className="flex gap-3">
            {[
              { id: "avatar" as const, label: "Avatar (32px)", description: "For chat bubbles" },
              { id: "medium" as const, label: "Medium (64px)", description: "For cards and tips" },
              { id: "hero" as const, label: "Hero (200px+)", description: "For empty states & celebrations" },
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedSize === size.id
                    ? "bg-white/20 border-2 border-white/40 text-white"
                    : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                }`}
              >
                <div className="font-bold mb-1">{size.label}</div>
                <div className="text-xs opacity-70">{size.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Emotion Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {currentEmotions.map((emotion) => {
            const Component = emotion.component;
            return (
              <div
                key={emotion.id}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all"
              >
                {/* Emotion Display */}
                <div className="flex items-center justify-center mb-4 min-h-[200px]">
                  <Component size={selectedSize} />
                </div>

                {/* Label */}
                <h3 className="text-lg font-bold text-white text-center mb-2">
                  {emotion.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/60 text-center">
                  {emotion.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Usage Examples */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📖 Usage Examples</h2>
          
          <div className="space-y-6">
            {/* Chat Bubble Example */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Chat Bubble (Avatar Size)</h3>
              <div className="bg-[#0f0f1a] rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <GoldieHappy size="avatar" />
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-sm text-white">
                      Great job tracking your expenses today! You're building awesome habits! 🎉
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FinAnalytical size="avatar" />
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-sm text-white">
                      Based on your spending patterns, I recommend allocating 20% to investments.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Example */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Tip Card (Medium Size)</h3>
              <div className="bg-[#0f0f1a] rounded-xl p-6">
                <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/10 border border-yellow-400/30 rounded-xl p-6 flex items-center gap-4">
                  <GoldieThinking size="medium" />
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-2">💡 Quick Tip</h4>
                    <p className="text-sm text-white/80">
                      Try setting up automatic savings transfers on payday to build your emergency fund!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty State Example */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Empty State (Hero Size)</h3>
              <div className="bg-[#0f0f1a] rounded-xl p-8 text-center">
                <div className="flex justify-center mb-6">
                  <GoldieEncouraging size="hero" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ready to start tracking?
                </h3>
                <p className="text-white/60 mb-6">
                  Log your first transaction to earn 25 ProsperCoins!
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-bold hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all">
                  Add Transaction
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic API Example */}
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">🔧 Dynamic Component API</h2>
          <p className="text-white/70 mb-6">
            Use the <code className="px-2 py-1 bg-black/30 rounded text-blue-400">CompanionEmotion</code> component for dynamic emotion rendering:
          </p>
          
          <div className="bg-black/30 rounded-xl p-4 mb-6">
            <code className="text-sm text-green-400">
              {`<CompanionEmotion 
  companion="goldie"    // "goldie" | "fin"
  emotion="excited"     // see emotion types below
  size="medium"         // "avatar" | "medium" | "hero"
/>`}
            </code>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-400 mb-3">Goldie Emotions:</h4>
              <ul className="space-y-1 text-sm text-white/70 font-mono">
                <li>• "happy" (default)</li>
                <li>• "excited"</li>
                <li>• "thinking"</li>
                <li>• "concerned"</li>
                <li>• "celebrating"</li>
                <li>• "sleeping"</li>
                <li>• "encouraging"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-3">Fin Emotions:</h4>
              <ul className="space-y-1 text-sm text-white/70 font-mono">
                <li>• "analytical" (default)</li>
                <li>• "teaching"</li>
                <li>• "impressed"</li>
                <li>• "thinking"</li>
                <li>• "celebrating"</li>
                <li>• "warning"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Animation Details */}
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">✨ Animation Details</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Goldie Animations</h3>
              <div className="space-y-3 text-sm text-white/80">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <strong className="text-white">Happy:</strong> Gentle float (y: 0 → -5 → 0)
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <strong className="text-white">Excited:</strong> Energetic bounce + scale + 4 sparkles
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <strong className="text-white">Thinking:</strong> Subtle tilt + "..." thought bubble
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <strong className="text-white">Celebrating:</strong> Party hat shake + confetti rain
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Fin Animations</h3>
              <div className="space-y-3 text-sm text-white/80">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <strong className="text-white">Analytical:</strong> Slow float + glasses overlay
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <strong className="text-white">Teaching:</strong> Pointing gesture + lightbulb pulse
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <strong className="text-white">Impressed:</strong> "!" bubble popup + scale pulse
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <strong className="text-white">Warning:</strong> Shake + caution ring + hand stop
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-400 mb-4">✅ Best Practices</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Use avatar size (32px) for chat messages</li>
              <li>• Use medium size (64px) for cards and tooltips</li>
              <li>• Use hero size (200px+) for empty states</li>
              <li>• Match emotion to user action context</li>
              <li>• Goldie for budgeting, Fin for investing</li>
              <li>• Transition emotions smoothly</li>
            </ul>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-400 mb-4">⚠️ Guidelines</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Don't overuse excited/celebrating states</li>
              <li>• Use concerned sparingly (for serious issues)</li>
              <li>• Sleeping state for night mode only</li>
              <li>• Warning state for important alerts</li>
              <li>• Keep animations performant</li>
              <li>• Respect reduced motion preferences</li>
            </ul>
          </div>
        </div>

        {/* Size Comparison */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">📏 Size Comparison</h2>
          
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-white font-semibold mb-4">Avatar (32px)</h3>
              <div className="bg-[#0f0f1a] rounded-xl p-6 flex items-center justify-center min-h-[120px]">
                <GoldieHappy size="avatar" />
              </div>
              <p className="text-xs text-white/60 mt-3">Chat bubbles, inline messages</p>
            </div>

            <div className="text-center">
              <h3 className="text-white font-semibold mb-4">Medium (64px)</h3>
              <div className="bg-[#0f0f1a] rounded-xl p-6 flex items-center justify-center min-h-[120px]">
                <GoldieHappy size="medium" />
              </div>
              <p className="text-xs text-white/60 mt-3">Cards, tips, notifications</p>
            </div>

            <div className="text-center">
              <h3 className="text-white font-semibold mb-4">Hero (200px+)</h3>
              <div className="bg-[#0f0f1a] rounded-xl p-6 flex items-center justify-center min-h-[280px]">
                <GoldieHappy size="hero" />
              </div>
              <p className="text-xs text-white/60 mt-3">Empty states, celebrations, modals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
