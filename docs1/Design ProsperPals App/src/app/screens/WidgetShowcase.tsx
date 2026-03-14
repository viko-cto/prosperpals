import {
  SmallWidget,
  MediumWidget,
  LargeWidget,
  CircularLockWidget,
  RectangularLockWidget,
  AndroidSmallWidget,
  AndroidMediumWidget,
  WidgetPreview,
} from "../components/Widgets";
import { Smartphone, Monitor, Check } from "lucide-react";

export function WidgetShowcase() {
  return (
    <div className="flex-1 bg-[#0f0f1a] overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Smartphone className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">Widget Designs</h1>
          </div>
          <p className="text-white/60">
            iOS and Android home screen widgets for ProsperPals
          </p>
        </div>

        {/* Platform Toggle */}
        <div className="flex gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl">
            <Monitor className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold text-white">Platform Adaptive</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-xl">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold text-green-400">iOS & Android Supported</span>
          </div>
        </div>

        {/* iOS Widgets */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="text-3xl">📱</div>
            iOS Widgets
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Small Widget */}
            <WidgetPreview title="Small Widget" platform="iOS" size="2x2">
              <SmallWidget />
            </WidgetPreview>

            {/* Medium Widget */}
            <WidgetPreview title="Medium Widget" platform="iOS" size="4x2">
              <MediumWidget />
            </WidgetPreview>
          </div>

          {/* Large Widget - Full Width */}
          <div className="mt-8">
            <WidgetPreview title="Large Widget" platform="iOS" size="4x4">
              <LargeWidget />
            </WidgetPreview>
          </div>
        </div>

        {/* iOS Lock Screen Widgets */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="text-3xl">🔒</div>
            iOS 16+ Lock Screen Widgets
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Circular */}
            <WidgetPreview title="Circular Lock Widget" platform="iOS" size="Circular">
              <CircularLockWidget />
            </WidgetPreview>

            {/* Rectangular */}
            <WidgetPreview title="Rectangular Lock Widget" platform="iOS" size="Rectangular">
              <RectangularLockWidget />
            </WidgetPreview>
          </div>
        </div>

        {/* Android Widgets */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="text-3xl">🤖</div>
            Android Widgets (Material Design)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Small Widget */}
            <WidgetPreview title="Small Widget" platform="Android" size="2x2">
              <AndroidSmallWidget />
            </WidgetPreview>

            {/* Medium Widget */}
            <WidgetPreview title="Medium Widget" platform="Android" size="4x2">
              <AndroidMediumWidget />
            </WidgetPreview>
          </div>
        </div>

        {/* Widget Specifications */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* iOS Specs */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              📱 iOS Widget Specs
            </h3>
            <div className="space-y-3 text-sm text-white/70">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-semibold text-white mb-1">Small (2x2)</div>
                <div>• 158 x 158 pts (rounded 3xl)</div>
                <div>• Coin balance, spending, streak</div>
                <div>• Tap to open app</div>
              </div>

              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-semibold text-white mb-1">Medium (4x2)</div>
                <div>• 338 x 158 pts (rounded 3xl)</div>
                <div>• Goldie greeting + budget progress</div>
                <div>• Quick tip text</div>
              </div>

              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-semibold text-white mb-1">Large (4x4)</div>
                <div>• 338 x 354 pts (rounded 3xl)</div>
                <div>• Donut chart, categories, goals</div>
                <div>• Quick action button</div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <div className="font-semibold text-blue-400 mb-1">Lock Screen (iOS 16+)</div>
                <div>• Circular: Budget remaining</div>
                <div>• Rectangular: Streak + Coins</div>
                <div>• Glassmorphism on lock screen</div>
              </div>
            </div>
          </div>

          {/* Android Specs */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              🤖 Android Widget Specs
            </h3>
            <div className="space-y-3 text-sm text-white/70">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-semibold text-white mb-1">Small (2x2)</div>
                <div>• Material Design 3</div>
                <div>• White background, sharp shadows</div>
                <div>• Rounded 2xl corners</div>
              </div>

              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-semibold text-white mb-1">Medium (4x2)</div>
                <div>• Budget progress bar</div>
                <div>• Streak indicator</div>
                <div>• On-track status</div>
              </div>

              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-semibold text-white mb-1">Large (4x4)</div>
                <div>• Similar to iOS but Material styled</div>
                <div>• Follows Material You theming</div>
                <div>• Dynamic color support</div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <div className="font-semibold text-green-400 mb-1">Material Design</div>
                <div>• Elevation shadows (not blur)</div>
                <div>• Sharp corners (rounded-2xl)</div>
                <div>• Solid backgrounds</div>
              </div>
            </div>
          </div>
        </div>

        {/* Design Features */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🎨 Design Features</h2>
          
          <div className="grid grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-400 mb-3">Small Widget (2x2)</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>ProsperCoin balance with 🪙 icon</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Daily spending amount (€47.50)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Streak flame 🔥 with count</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Tap anywhere to open app</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-400 mb-3">Medium Widget (4x2)</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Goldie avatar + "Good morning!"</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Today's spending vs budget</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Animated progress bar</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Quick tip text from Goldie</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-purple-400 mb-3">Large Widget (4x4)</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Budget overview donut chart</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Top 3 spending categories</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>2-3 goal progress bars</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>"Add Transaction" quick action</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Style Guidelines */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-400 mb-4">iOS Style Guidelines</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Glassmorphism: backdrop-blur-xl</li>
              <li>• Rounded corners: rounded-3xl</li>
              <li>• Soft shadows: shadow-2xl</li>
              <li>• White/90 opacity backgrounds</li>
              <li>• SF Pro font (system default)</li>
              <li>• Lock screen: transparent glass</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-400 mb-4">Android Guidelines</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Material Design 3 principles</li>
              <li>• Rounded corners: rounded-2xl</li>
              <li>• Elevation shadows (not blur)</li>
              <li>• Solid white backgrounds</li>
              <li>• Roboto font (system default)</li>
              <li>• Material You color theming</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
