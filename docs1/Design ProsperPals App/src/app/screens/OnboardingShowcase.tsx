import { useState } from "react";
import {
  CoachMark,
  CelebrationMoment,
  OnboardingTour,
  QuickTip,
  FeatureHighlight,
  ProgressCheckpoint
} from "../components/OnboardingMoments";

export function OnboardingShowcase() {
  const [activeDemo, setActiveDemo] = useState<string>("coach-marks");
  const [showCoachMark, setShowCoachMark] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showQuickTip, setShowQuickTip] = useState(false);
  const [showCheckpoint, setShowCheckpoint] = useState(false);
  const [currentCoachStep, setCurrentCoachStep] = useState(1);

  const demos = [
    { id: "coach-marks", label: "Coach Marks", emoji: "🎯" },
    { id: "celebration", label: "Celebrations", emoji: "🎉" },
    { id: "full-tour", label: "Full Tour", emoji: "🗺️" },
    { id: "quick-tips", label: "Quick Tips", emoji: "💡" },
    { id: "highlights", label: "Feature Highlights", emoji: "✨" },
    { id: "checkpoints", label: "Progress Checkpoints", emoji: "🏁" },
  ];

  // Sample target elements for coach marks
  const sampleTargets = [
    { id: 1, label: "ProsperCoin Balance", x: 100, y: 100, width: 200, height: 60 },
    { id: 2, label: "Chat Button", x: 50, y: 250, width: 180, height: 80 },
    { id: 3, label: "Dashboard", x: 400, y: 150, width: 300, height: 200 },
    { id: 4, label: "Goals Section", x: 800, y: 100, width: 250, height: 150 },
    { id: 5, label: "Bank Connect", x: 500, y: 400, width: 200, height: 100 },
  ];

  const coachMarkSteps = [
    {
      title: "Welcome to ProsperPals! 🎉",
      message: "This is your ProsperCoin balance - earn coins by completing actions like setting budgets and tracking expenses!",
      companion: "goldie" as const,
    },
    {
      title: "Meet Goldie!",
      message: "Chat with Goldie anytime for budget help, spending tips, and financial guidance. She's always here to support you!",
      companion: "goldie" as const,
    },
    {
      title: "Your Financial Dashboard",
      message: "Your financial dashboard lives here. See your spending, income, and savings at a glance!",
      companion: "goldie" as const,
    },
    {
      title: "Set Goals, Stay Motivated",
      message: "Set goals to stay motivated! Whether it's an emergency fund or a dream vacation, we'll help you get there.",
      companion: "fin" as const,
    },
    {
      title: "Connect Your Banks",
      message: "Connect banks for automatic tracking. We'll sync your transactions securely and keep everything organized!",
      companion: "fin" as const,
    },
  ];

  const handleCoachNext = () => {
    if (currentCoachStep < 5) {
      setCurrentCoachStep(currentCoachStep + 1);
    } else {
      setShowCoachMark(false);
      setCurrentCoachStep(1);
    }
  };

  const handleCoachSkip = () => {
    setShowCoachMark(false);
    setCurrentCoachStep(1);
  };

  return (
    <div className="flex-1 bg-[#0f0f1a] overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Onboarding Micro-Moments</h1>
          <p className="text-white/60">First-time user experience overlays and celebrations</p>
        </div>

        {/* Demo Selector */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeDemo === demo.id
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1a1a2e] shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                  : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="text-xl">{demo.emoji}</span>
              {demo.label}
            </button>
          ))}
        </div>

        {/* Active Demo Display */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 min-h-[600px]">
          
          {/* COACH MARKS DEMO */}
          {activeDemo === "coach-marks" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Coach Mark / Spotlight Tutorial</h2>
              <p className="text-white/60 mb-6">
                Highlight specific features with a spotlight effect and contextual tooltips
              </p>

              {/* Demo Area */}
              <div className="relative bg-[#0f0f1a] rounded-xl p-8 mb-6 min-h-[500px] border border-white/10">
                {/* Sample Target Elements */}
                {sampleTargets.map((target) => (
                  <div
                    key={target.id}
                    className="absolute bg-white/5 border border-white/20 rounded-lg flex items-center justify-center text-sm text-white/60 font-medium"
                    style={{
                      left: target.x,
                      top: target.y,
                      width: target.width,
                      height: target.height,
                    }}
                  >
                    {target.label}
                  </div>
                ))}

                {/* Start Button */}
                {!showCoachMark && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setShowCoachMark(true)}
                      className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-bold text-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all"
                    >
                      Start Coach Mark Demo
                    </button>
                  </div>
                )}

                {/* Coach Mark Overlay */}
                {showCoachMark && (
                  <CoachMark
                    title={coachMarkSteps[currentCoachStep - 1].title}
                    message={coachMarkSteps[currentCoachStep - 1].message}
                    companion={coachMarkSteps[currentCoachStep - 1].companion}
                    position="bottom"
                    targetElement={sampleTargets[currentCoachStep - 1]}
                    currentStep={currentCoachStep}
                    totalSteps={5}
                    onNext={handleCoachNext}
                    onSkip={handleCoachSkip}
                    isVisible={true}
                  />
                )}
              </div>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">✨ Visual Features</h3>
                  <ul className="space-y-1 text-sm text-white/70">
                    <li>• Dimmed backdrop (80% black)</li>
                    <li>• Spotlight ring with glow</li>
                    <li>• Pulsing animation</li>
                    <li>• Tooltip with arrow</li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">🎯 Interactive Elements</h3>
                  <ul className="space-y-1 text-sm text-white/70">
                    <li>• Step indicator (1/5, 2/5, etc.)</li>
                    <li>• Next / Skip Tour buttons</li>
                    <li>• Goldie/Fin avatar</li>
                    <li>• Click backdrop to dismiss</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* CELEBRATION DEMO */}
          {activeDemo === "celebration" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Celebration After First Action</h2>
              <p className="text-white/60 mb-6">
                Reward users with confetti, coins, and progress feedback
              </p>

              <div className="space-y-6">
                {/* Trigger Button */}
                <div className="text-center">
                  <button
                    onClick={() => setShowCelebration(true)}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-bold text-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all"
                  >
                    🎉 Trigger Celebration
                  </button>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">🎊</div>
                    <h3 className="font-semibold text-white mb-1">Confetti Burst</h3>
                    <p className="text-xs text-white/60">50 colorful confetti pieces</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">🪙</div>
                    <h3 className="font-semibold text-white mb-1">Coin Reward</h3>
                    <p className="text-xs text-white/60">+25 PC animated badge</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">📊</div>
                    <h3 className="font-semibold text-white mb-1">Progress Bar</h3>
                    <p className="text-xs text-white/60">Shows next milestone</p>
                  </div>
                </div>

                {/* Different Celebration Examples */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Celebration Variants:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setShowCelebration(true)}
                      className="px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-all text-sm font-semibold"
                    >
                      First Transaction (+25 PC)
                    </button>
                    <button
                      onClick={() => setShowCelebration(true)}
                      className="px-4 py-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-all text-sm font-semibold"
                    >
                      Goal Created (+25 PC)
                    </button>
                    <button
                      onClick={() => setShowCelebration(true)}
                      className="px-4 py-3 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-all text-sm font-semibold"
                    >
                      Bank Connected (+50 PC)
                    </button>
                    <button
                      onClick={() => setShowCelebration(true)}
                      className="px-4 py-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition-all text-sm font-semibold"
                    >
                      Profile Complete (+25 PC)
                    </button>
                  </div>
                </div>
              </div>

              <CelebrationMoment
                isVisible={showCelebration}
                coinsEarned={25}
                title="You're off to a great start!"
                message="Keep exploring to unlock more rewards and build better financial habits!"
                onComplete={() => setShowCelebration(false)}
                showProgressBar={true}
                currentProgress={25}
                nextMilestone={100}
              />
            </div>
          )}

          {/* FULL TOUR DEMO */}
          {activeDemo === "full-tour" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Complete Onboarding Tour</h2>
              <p className="text-white/60 mb-6">
                Full 5-step guided tour with automatic celebration at the end
              </p>

              <div className="space-y-6">
                {/* Tour Preview */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Tour Steps:</h3>
                  <div className="space-y-3">
                    {[
                      { step: 1, title: "ProsperCoin Balance", companion: "🪙" },
                      { step: 2, title: "Chat with Goldie", companion: "🪙" },
                      { step: 3, title: "Financial Dashboard", companion: "🪙" },
                      { step: 4, title: "Set Goals", companion: "🐋" },
                      { step: 5, title: "Connect Banks", companion: "🐋" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center text-sm font-bold text-yellow-400">
                          {item.step}
                        </div>
                        <div className="flex-1 font-medium text-white">{item.title}</div>
                        <div className="text-2xl">{item.companion}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Start Tour Button */}
                <div className="text-center">
                  <button
                    onClick={() => setShowTour(true)}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-bold text-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all"
                  >
                    🗺️ Start Full Tour
                  </button>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <p className="text-sm text-white/70">
                    <strong className="text-blue-400">Note:</strong> The tour will guide you through all 5 key features, 
                    then celebrate with a confetti reward at the end!
                  </p>
                </div>
              </div>

              <OnboardingTour
                isActive={showTour}
                onComplete={() => setShowTour(false)}
              />
            </div>
          )}

          {/* QUICK TIPS DEMO */}
          {activeDemo === "quick-tips" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Quick Tips & Tooltips</h2>
              <p className="text-white/60 mb-6">
                Non-blocking contextual tips from Goldie and Fin
              </p>

              <div className="space-y-6">
                {/* Trigger Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowQuickTip(true)}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all"
                  >
                    Show Goldie Tip
                  </button>
                  <button
                    onClick={() => setShowQuickTip(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-semibold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
                  >
                    Show Fin Tip
                  </button>
                </div>

                {/* Example Tips */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Example Tips:</h3>
                  <div className="space-y-2">
                    {[
                      { companion: "goldie", message: "💡 Tip: Set a weekly spending limit to stay on track!" },
                      { companion: "fin", message: "📈 Did you know? Investing just €50/month can grow to €10,000 in 10 years!" },
                      { companion: "goldie", message: "🎯 Try categorizing your expenses for better insights!" },
                      { companion: "fin", message: "💼 Diversification is key to reducing investment risk!" },
                    ].map((tip, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl border ${
                          tip.companion === "goldie"
                            ? "bg-yellow-400/10 border-yellow-400/20"
                            : "bg-blue-500/10 border-blue-500/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{tip.companion === "goldie" ? "🪙" : "🐋"}</div>
                          <p className="text-sm text-white/80">{tip.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <QuickTip
                message="💡 Tip: Set a weekly spending limit to stay on track!"
                companion="goldie"
                isVisible={showQuickTip}
                position={{ x: 400, y: 200 }}
                onDismiss={() => setShowQuickTip(false)}
              />
            </div>
          )}

          {/* FEATURE HIGHLIGHTS DEMO */}
          {activeDemo === "highlights" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Feature Highlight Badges</h2>
              <p className="text-white/60 mb-6">
                Animated badges to draw attention to new features
              </p>

              <div className="space-y-6">
                {/* Badge Examples */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-white font-semibold">Voice Commands</h3>
                      <FeatureHighlight label="NEW" color="yellow" />
                    </div>
                    <p className="text-sm text-white/60">
                      Ask Goldie to log expenses hands-free!
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-white font-semibold">AI Insights</h3>
                      <FeatureHighlight label="BETA" color="blue" />
                    </div>
                    <p className="text-sm text-white/60">
                      Get personalized spending recommendations
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-white font-semibold">Social Clans</h3>
                      <FeatureHighlight label="HOT" color="purple" />
                    </div>
                    <p className="text-sm text-white/60">
                      Compete with friends in savings challenges
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-white font-semibold">Eco Tracking</h3>
                      <FeatureHighlight label="ECO" color="green" />
                    </div>
                    <p className="text-sm text-white/60">
                      See your environmental impact
                    </p>
                  </div>
                </div>

                {/* Badge Variants */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Badge Variants:</h3>
                  <div className="flex flex-wrap gap-3">
                    <FeatureHighlight label="NEW" color="yellow" />
                    <FeatureHighlight label="BETA" color="blue" />
                    <FeatureHighlight label="HOT" color="purple" />
                    <FeatureHighlight label="ECO" color="green" />
                    <FeatureHighlight label="UPDATED" color="yellow" />
                    <FeatureHighlight label="PRO" color="purple" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROGRESS CHECKPOINTS DEMO */}
          {activeDemo === "checkpoints" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Progress Checkpoints</h2>
              <p className="text-white/60 mb-6">
                Quick notifications for milestone achievements
              </p>

              <div className="space-y-6">
                {/* Trigger Button */}
                <div className="text-center">
                  <button
                    onClick={() => setShowCheckpoint(true)}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all"
                  >
                    🏁 Trigger Checkpoint
                  </button>
                </div>

                {/* Checkpoint Examples */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { message: "First transaction logged!", coins: 10 },
                    { message: "3-day streak!", coins: 15 },
                    { message: "Budget created!", coins: 10 },
                    { message: "Goal milestone reached!", coins: 20 },
                    { message: "Bank connected!", coins: 25 },
                    { message: "Profile completed!", coins: 10 },
                  ].map((checkpoint, index) => (
                    <button
                      key={index}
                      onClick={() => setShowCheckpoint(true)}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">{checkpoint.message}</span>
                        <span className="text-xs font-bold text-green-400">+{checkpoint.coins} PC</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <p className="text-sm text-white/70">
                    <strong className="text-green-400">Auto-dismiss:</strong> Checkpoints appear at the top 
                    of the screen and automatically dismiss after 3 seconds.
                  </p>
                </div>
              </div>

              <ProgressCheckpoint
                isVisible={showCheckpoint}
                message="Checkpoint reached!"
                coinsEarned={10}
                onDismiss={() => setShowCheckpoint(false)}
              />
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">5</div>
            <div className="text-sm text-white/60">Coach Mark Steps</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">25 PC</div>
            <div className="text-sm text-white/60">First Action Reward</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
            <div className="text-sm text-white/60">Confetti Pieces</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">6</div>
            <div className="text-sm text-white/60">Onboarding Components</div>
          </div>
        </div>
      </div>
    </div>
  );
}
