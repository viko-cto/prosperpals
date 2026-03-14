import React, { useState } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  Sparkles, 
  Home,
  Settings,
  User,
  Coins,
  ArrowLeft,
  Check,
  X as XIcon,
  Target,
  DollarSign
} from 'lucide-react';
import { FloatingActionButton, useHapticFeedback } from '../components/FloatingActionButton';
import { Link } from 'react-router';

export default function MicroInteractionsShowcase() {
  const [coinCount, setCoinCount] = useState(250);
  const { triggerHaptic } = useHapticFeedback();

  const handleCoinEarn = (amount: number, event: React.MouseEvent<HTMLButtonElement>) => {
    setCoinCount(prev => prev + amount);
    const button = event.currentTarget;
    const coinIcon = button.querySelector('.coin-earn');
    if (coinIcon) {
      coinIcon.classList.add('earning');
      setTimeout(() => coinIcon.classList.remove('earning'), 800);
    }
    triggerHaptic('success', button);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const avatar = event.currentTarget;
    avatar.classList.add('bouncing');
    setTimeout(() => avatar.classList.remove('bouncing'), 600);
    triggerHaptic('tap', avatar);
  };

  const handleSuccess = (event: React.MouseEvent<HTMLButtonElement>) => {
    triggerHaptic('success', event.currentTarget);
  };

  const handleError = (event: React.MouseEvent<HTMLButtonElement>) => {
    triggerHaptic('error', event.currentTarget);
  };

  const handleCelebration = (event: React.MouseEvent<HTMLButtonElement>) => {
    triggerHaptic('celebration', event.currentTarget);
  };

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/state-showcase" 
            className="inline-flex items-center gap-2 text-sm link-hover mb-4 text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Showcase Hub
          </Link>
          <h1 className="mb-2">Micro-Interactions Showcase</h1>
          <p className="text-[var(--theme-text-secondary)]">
            Interactive hover effects, haptic feedback, and smooth animations
          </p>
        </div>

        {/* Card Hover Effects */}
        <section className="mb-12">
          <h2 className="mb-4">Card Hover Effects</h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mb-6">
            Hover over cards to see scale transform and enhanced shadows
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-hover p-6 bg-[var(--theme-card)] rounded-xl border border-[var(--theme-border)] backdrop-blur-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2">Budget Card</h3>
              <p className="text-sm text-[var(--theme-text-secondary)]">
                Your daily spending is on track!
              </p>
              <div className="mt-4 text-2xl font-semibold text-green-500">€45.20</div>
            </div>

            <div className="card-hover p-6 bg-[var(--theme-card)] rounded-xl border border-[var(--theme-border)] backdrop-blur-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2">Investment Card</h3>
              <p className="text-sm text-[var(--theme-text-secondary)]">
                Portfolio growth this month
              </p>
              <div className="mt-4 text-2xl font-semibold text-blue-500">+12.5%</div>
            </div>

            <div className="card-hover p-6 bg-[var(--theme-card)] rounded-xl border border-[var(--theme-border)] backdrop-blur-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2">Goals Card</h3>
              <p className="text-sm text-[var(--theme-text-secondary)]">
                Vacation fund progress
              </p>
              <div className="mt-4 text-2xl font-semibold text-purple-500">67%</div>
            </div>
          </div>
        </section>

        {/* Button Hover Effects with Glow */}
        <section className="mb-12">
          <h2 className="mb-4">Button Hover Effects</h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mb-6">
            Hover over buttons to see scale transform and glowing effects
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="button-hover button-gold px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-lg font-medium">
              Gold Button
            </button>
            
            <button className="button-hover button-blue px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium">
              Blue Button
            </button>
            
            <button className="button-hover button-primary px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium">
              Primary Button
            </button>

            <button className="button-hover px-6 py-3 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-lg font-medium">
              Secondary Button
            </button>
          </div>
        </section>

        {/* Navigation Hover Effects */}
        <section className="mb-12">
          <h2 className="mb-4">Navigation Slide-in Effects</h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mb-6">
            Hover over navigation items to see background slide-in animation
          </p>
          
          <div className="bg-[var(--theme-card)] rounded-xl border border-[var(--theme-border)] p-4 max-w-xs">
            <nav className="space-y-2">
              <div className="nav-hover px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer relative">
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </div>
              
              <div className="nav-hover nav-blue px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer relative">
                <TrendingUp className="w-5 h-5" />
                <span>Investments</span>
              </div>
              
              <div className="nav-hover px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer relative">
                <Target className="w-5 h-5" />
                <span>Goals</span>
              </div>
              
              <div className="nav-hover px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer relative">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </div>
            </nav>
          </div>
        </section>

        {/* Avatar Bounce Animation */}
        <section className="mb-12">
          <h2 className="mb-4">Avatar Bounce Animation</h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mb-6">
            Click on avatars to see bounce animation
          </p>
          
          <div className="flex gap-6">
            <div 
              className="avatar-bounce w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
              onClick={handleAvatarClick}
            >
              G
            </div>
            
            <div 
              className="avatar-bounce w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
              onClick={handleAvatarClick}
            >
              F
            </div>
            
            <div 
              className="avatar-bounce w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
              onClick={handleAvatarClick}
            >
              <User className="w-10 h-10" />
            </div>
          </div>
        </section>

        {/* Coin Spin Animation */}
        <section className="mb-12">
          <h2 className="mb-4">Coin Earn Animation</h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mb-6">
            Click buttons to earn ProsperCoins with spin animation
          </p>
          
          <div className="bg-[var(--theme-card)] rounded-xl border border-[var(--theme-border)] p-6 max-w-md">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-medium">Your Balance</span>
              <div className="flex items-center gap-2">
                <Coins className="w-6 h-6 text-yellow-500 coin-earn floating" />
                <span className="text-2xl font-bold text-yellow-500">{coinCount}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={(e) => handleCoinEarn(10, e)}
                className="button-hover button-gold w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Coins className="w-5 h-5 coin-earn" />
                Earn 10 Coins
              </button>
              
              <button 
                onClick={(e) => handleCoinEarn(25, e)}
                className="button-hover button-gold w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Coins className="w-5 h-5 coin-earn" />
                Earn 25 Coins
              </button>
              
              <button 
                onClick={(e) => handleCoinEarn(50, e)}
                className="button-hover button-gold w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Coins className="w-5 h-5 coin-earn" />
                Earn 50 Coins
              </button>
            </div>
          </div>
        </section>

        {/* Haptic Feedback Visual Indicators */}
        <section className="mb-12">
          <h2 className="mb-4">Haptic Feedback Indicators</h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mb-6">
            Click buttons to see visual haptic feedback animations (mimics mobile haptics)
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={handleSuccess}
              className="haptic-feedback p-6 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl hover:bg-green-500/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div className="text-center font-medium">Success</div>
              <div className="text-xs text-[var(--theme-text-secondary)] text-center mt-1">
                Transaction confirmed
              </div>
            </button>

            <button 
              onClick={handleError}
              className="haptic-feedback p-6 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl hover:bg-red-500/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-3">
                <XIcon className="w-6 h-6 text-white" />
              </div>
              <div className="text-center font-medium">Error</div>
              <div className="text-xs text-[var(--theme-text-secondary)] text-center mt-1">
                Double tap vibration
              </div>
            </button>

            <button 
              onClick={handleCelebration}
              className="haptic-feedback p-6 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl hover:bg-yellow-500/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-center font-medium">Celebration</div>
              <div className="text-xs text-[var(--theme-text-secondary)] text-center mt-1">
                Goal reached
              </div>
            </button>

            <button 
              onClick={(e) => triggerHaptic('tap', e.currentTarget)}
              className="haptic-feedback p-6 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl hover:bg-purple-500/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-center font-medium">Light Tap</div>
              <div className="text-xs text-[var(--theme-text-secondary)] text-center mt-1">
                Button press
              </div>
            </button>
          </div>
        </section>

        {/* Link Hover Effects */}
        <section className="mb-12">
          <h2 className="mb-4">Link Hover Effects</h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mb-6">
            Hover over links to see underline animation
          </p>
          
          <div className="space-y-2">
            <div>
              <a href="#" className="link-hover text-blue-500">View all transactions →</a>
            </div>
            <div>
              <a href="#" className="link-hover text-purple-500">Learn more about investing →</a>
            </div>
            <div>
              <a href="#" className="link-hover text-yellow-600">Track your goals →</a>
            </div>
          </div>
        </section>

        {/* Input Focus Glow */}
        <section className="mb-12">
          <h2 className="mb-4">Input Focus Glow</h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mb-6">
            Focus on inputs to see glowing focus ring
          </p>
          
          <div className="max-w-md space-y-4">
            <input 
              type="text" 
              placeholder="Enter transaction amount"
              className="input-focus w-full px-4 py-3 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-lg"
            />
            <input 
              type="email" 
              placeholder="Enter your email"
              className="input-focus w-full px-4 py-3 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-lg"
            />
            <textarea 
              placeholder="Add notes..."
              className="input-focus w-full px-4 py-3 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-lg resize-none"
              rows={3}
            />
          </div>
        </section>

        {/* Floating Action Button Demo */}
        <section className="mb-12">
          <h2 className="mb-4">Floating Action Button (FAB)</h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mb-6">
            Click the floating button in the bottom-right corner to see expandable quick actions with smooth spring animations
          </p>
          
          <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="mb-2">Quick Actions Available</h3>
                <ul className="text-sm text-[var(--theme-text-secondary)] space-y-1">
                  <li>• Add Transaction - Record a new expense or income</li>
                  <li>• Set Goal - Create a new savings goal</li>
                  <li>• Ask Goldie - Chat with your budget companion</li>
                </ul>
                <p className="text-sm text-[var(--theme-text-secondary)] mt-4">
                  The FAB features a gold gradient, pulsing ripple effect, smooth rotation on expand/collapse, 
                  spring animations for action items, and backdrop overlay.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Guide */}
        <section className="mb-12">
          <h2 className="mb-4">Implementation Guide</h2>
          
          <div className="space-y-4">
            <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl p-6">
              <h3 className="mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center">1</span>
                Card Hover
              </h3>
              <code className="text-sm bg-black/20 px-2 py-1 rounded">
                className="card-hover"
              </code>
              <p className="text-sm text-[var(--theme-text-secondary)] mt-2">
                Adds scale(1.02) transform and enhanced shadow on hover
              </p>
            </div>

            <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl p-6">
              <h3 className="mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center">2</span>
                Button Glow
              </h3>
              <code className="text-sm bg-black/20 px-2 py-1 rounded">
                className="button-hover button-gold"
              </code>
              <p className="text-sm text-[var(--theme-text-secondary)] mt-2">
                Adds scale and color-specific glow effect (gold, blue, or primary)
              </p>
            </div>

            <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl p-6">
              <h3 className="mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center">3</span>
                Navigation Slide
              </h3>
              <code className="text-sm bg-black/20 px-2 py-1 rounded">
                className="nav-hover"
              </code>
              <p className="text-sm text-[var(--theme-text-secondary)] mt-2">
                Background highlight slides in from left on hover
              </p>
            </div>

            <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl p-6">
              <h3 className="mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center">4</span>
                Avatar Bounce
              </h3>
              <code className="text-sm bg-black/20 px-2 py-1 rounded">
                className="avatar-bounce"
              </code>
              <p className="text-sm text-[var(--theme-text-secondary)] mt-2">
                Subtle bounce animation on click
              </p>
            </div>

            <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl p-6">
              <h3 className="mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center">5</span>
                Coin Spin
              </h3>
              <code className="text-sm bg-black/20 px-2 py-1 rounded">
                className="coin-earn"
              </code>
              <p className="text-sm text-[var(--theme-text-secondary)] mt-2">
                Add "earning" class to trigger spin animation
              </p>
            </div>

            <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl p-6">
              <h3 className="mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center">6</span>
                Haptic Feedback
              </h3>
              <code className="text-sm bg-black/20 px-2 py-1 rounded">
                useHapticFeedback() hook
              </code>
              <p className="text-sm text-[var(--theme-text-secondary)] mt-2">
                Call triggerHaptic('success' | 'error' | 'tap' | 'celebration', element)
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton 
        onAddTransaction={() => alert('Add Transaction clicked!')}
        onSetGoal={() => alert('Set Goal clicked!')}
        onAskGoldie={() => alert('Ask Goldie clicked!')}
      />
    </div>
  );
}