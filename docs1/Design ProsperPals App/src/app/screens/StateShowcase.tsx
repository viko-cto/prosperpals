import { useState } from "react";
import { Link } from "react-router";
import { Inbox, Loader2, AlertTriangle, Sparkles, Smile, Smartphone, Eye, PartyPopper, Zap } from "lucide-react";

export function StateShowcase() {
  const showcases = [
    {
      id: "empty",
      title: "Empty States",
      description: "Delightful screens when users have no data yet",
      icon: Inbox,
      color: "from-purple-500 to-purple-600",
      route: "/empty-state-showcase",
      features: [
        "Goldie & Fin characters",
        "Encouraging CTAs",
        "Animated placeholders",
        "Goal suggestions"
      ],
      preview: "🪙 🐋 ✨"
    },
    {
      id: "loading",
      title: "Loading States",
      description: "Skeletons, spinners, and progress indicators",
      icon: Loader2,
      color: "from-blue-500 to-blue-600",
      route: "/loading-state-showcase",
      features: [
        "Shimmer skeletons",
        "Companion thinking",
        "Bank sync progress",
        "Pull-to-refresh"
      ],
      preview: "⚙️ 🔄 💀"
    },
    {
      id: "error",
      title: "Error States",
      description: "Recoverable, friendly error messages",
      icon: AlertTriangle,
      color: "from-yellow-400 to-yellow-500",
      route: "/error-state-showcase",
      features: [
        "Goldie softens errors",
        "Clear error codes",
        "Actionable solutions",
        "Never scary"
      ],
      preview: "😅 ❓ ✅"
    },
    {
      id: "onboarding",
      title: "Onboarding Moments",
      description: "First-time user experience and celebrations",
      icon: Sparkles,
      color: "from-pink-500 to-pink-600",
      route: "/onboarding-showcase",
      features: [
        "Coach mark tutorials",
        "Confetti celebrations",
        "Progress checkpoints",
        "Feature highlights"
      ],
      preview: "🎉 🎯 🏁"
    },
    {
      id: "emotions",
      title: "Companion Emotions",
      description: "Goldie & Fin emotion variants for all contexts",
      icon: Smile,
      color: "from-orange-500 to-orange-600",
      route: "/companion-emotions-showcase",
      features: [
        "7 Goldie expressions",
        "6 Fin expressions",
        "3 size variants",
        "Alive & responsive"
      ],
      preview: "🪙 🐋 😊"
    },
    {
      id: "widgets",
      title: "Widget Designs",
      description: "iOS & Android home screen widgets",
      icon: Smartphone,
      color: "from-cyan-500 to-cyan-600",
      route: "/widget-showcase",
      features: [
        "Small, medium, large",
        "Lock screen widgets",
        "iOS & Android styles",
        "Glassmorphism"
      ],
      preview: "📱 🏠 🔒"
    },
    {
      id: "accessibility",
      title: "Accessibility Polish",
      description: "WCAG AAA compliant inclusive features",
      icon: Eye,
      color: "from-purple-400 to-purple-600",
      route: "/accessibility-showcase",
      features: [
        "High contrast mode",
        "Reduce motion",
        "Color blind friendly",
        "Screen readers"
      ],
      preview: "👁️ 🎨 ♿"
    },
    {
      id: "celebrations",
      title: "Celebration Moments",
      description: "Special moments and achievements",
      icon: PartyPopper,
      color: "from-red-500 to-red-600",
      route: "/celebration-showcase",
      features: [
        "Goldie & Fin reactions",
        "Confetti showers",
        "Achievement badges",
        "Special animations"
      ],
      preview: "🎉 🎉 🎉"
    },
    {
      id: "micro-interactions",
      title: "Micro-Interactions",
      description: "Hover effects, haptics, and animations",
      icon: Zap,
      color: "from-emerald-500 to-emerald-600",
      route: "/micro-interactions-showcase",
      features: [
        "Card hover effects",
        "Button glows",
        "Haptic feedback",
        "Floating FAB"
      ],
      preview: "⚡ ✨ 💫"
    }
  ];

  return (
    <div className="flex-1 bg-[#0f0f1a] overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">State Showcase Hub</h1>
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-xl text-white/60">
            Explore all empty, loading, and error states for ProsperPals
          </p>
        </div>

        {/* Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {showcases.map((showcase) => {
            const Icon = showcase.icon;
            return (
              <Link
                key={showcase.id}
                to={showcase.route}
                className="group"
              >
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,0,0.2)]">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${showcase.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {showcase.title}
                  </h3>
                  <p className="text-white/60 mb-6">
                    {showcase.description}
                  </p>

                  {/* Preview Emojis */}
                  <div className="text-4xl mb-6 text-center">
                    {showcase.preview}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {showcase.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center justify-between text-sm font-medium text-yellow-400 group-hover:text-yellow-300">
                    <span>Explore {showcase.title}</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-8 gap-4 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">5</div>
            <div className="text-sm text-white/60">Empty States</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">13</div>
            <div className="text-sm text-white/60">Loading</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">8</div>
            <div className="text-sm text-white/60">Error</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">6</div>
            <div className="text-sm text-white/60">Onboarding</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">13</div>
            <div className="text-sm text-white/60">Emotions</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">7</div>
            <div className="text-sm text-white/60">Widgets</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">5</div>
            <div className="text-sm text-white/60">A11y Features</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">70+</div>
            <div className="text-sm text-white/60">Total</div>
          </div>
        </div>

        {/* Design Principles */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">✨ Design Principles</h2>
          
          <div className="grid grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Empty States</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Opportunities, not voids</li>
                <li>• Character-driven guidance</li>
                <li>• Clear next steps</li>
                <li>• Warm, inviting tone</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Loading States</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Smooth shimmer effects</li>
                <li>• Progress visibility</li>
                <li>• Companion animations</li>
                <li>• Brand consistency</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3">Error States</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Never scary or harsh</li>
                <li>• Always recoverable</li>
                <li>• Goldie softens tone</li>
                <li>• Clear error codes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Component Library Overview */}
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4">📚 Component Library</h3>
          
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-purple-400 mb-3">Empty States</h4>
              <ul className="space-y-1 text-white/70 font-mono text-xs">
                <li>• EmptyTransactions</li>
                <li>• EmptyGoals</li>
                <li>• EmptyPortfolio</li>
                <li>• EmptyClans</li>
                <li>• EmptyLeaderboard</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-400 mb-3">Loading States</h4>
              <ul className="space-y-1 text-white/70 font-mono text-xs">
                <li>• SkeletonCard</li>
                <li>• SkeletonTransaction</li>
                <li>• CompanionThinking</li>
                <li>• BankSyncLoading</li>
                <li>• DataRefreshSpinner</li>
                <li>• PullToRefreshIndicator</li>
                <li>+ 7 more...</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-yellow-400 mb-3">Error States</h4>
              <ul className="space-y-1 text-white/70 font-mono text-xs">
                <li>• ErrorState</li>
                <li>• NetworkError</li>
                <li>• BankSyncError</li>
                <li>• TransactionFailedError</li>
                <li>• DataLoadError</li>
                <li>• InvestmentError</li>
                <li>• InlineError</li>
                <li>• ErrorToast</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4">🚀 Quick Start</h3>
          
          <div className="space-y-4 text-sm text-white/80">
            <div>
              <p className="font-semibold text-green-400 mb-2">Import what you need:</p>
              <code className="block bg-black/30 p-3 rounded-lg text-xs font-mono">
                import {"{"} EmptyTransactions {"}"} from './components/EmptyStates';<br/>
                import {"{"} CompanionThinking {"}"} from './components/LoadingStates';<br/>
                import {"{"} ErrorState {"}"} from './components/ErrorStates';
              </code>
            </div>

            <div>
              <p className="font-semibold text-green-400 mb-2">Use conditionally:</p>
              <code className="block bg-black/30 p-3 rounded-lg text-xs font-mono">
                {"{"}{"{"}isLoading {"?"} {"<"}CompanionThinking companion="goldie" /{">"} : data.length === 0 {"?"} {"<"}EmptyTransactions /{">"} : {"<"}TransactionList data={"{"}data{"}"} /{">"}{"}"}{"}"}
              </code>
            </div>
          </div>
        </div>

        {/* Navigation Help */}
        <div className="mt-8 text-center">
          <p className="text-white/60 mb-4">Click any card above to explore that state showcase</p>
          <Link 
            to="/home"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-white font-semibold transition-all"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}