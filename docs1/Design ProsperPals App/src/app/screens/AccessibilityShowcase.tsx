import { AccessibilityControls, SkipToContent, AccessibleProgressBar } from "../components/AccessibilityControls";
import { useAccessibility } from "../contexts/AccessibilityContext";
import { Eye, Volume2, Palette, Focus, Type, Check, X } from "lucide-react";
import { GoldieHappy, FinAnalytical } from "../components/CompanionEmotions";

export function AccessibilityShowcase() {
  const { highContrast, reduceMotion, colorBlindMode, focusVisible, fontSize } = useAccessibility();

  return (
    <div className="flex-1 bg-[#0f0f1a] overflow-auto">
      <SkipToContent />
      
      <div id="main-content" className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Accessibility Polish</h1>
          </div>
          <p className="text-white/60">
            WCAG AAA compliant features for inclusive design
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8">
          <AccessibilityControls />
        </div>

        {/* Live Preview */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">🔴 Live Preview</h2>
          
          {/* Example Components with Current Settings */}
          <div className="grid grid-cols-2 gap-6">
            {/* Goldie Card */}
            <div
              className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-xl p-6"
              data-companion="goldie"
              tabIndex={0}
            >
              <div className="flex items-center gap-3 mb-3">
                <GoldieHappy size="medium" />
                <div>
                  <h3 className="font-bold text-white">Budget Tip</h3>
                  <p className="text-sm text-white/60">From Goldie</p>
                </div>
              </div>
              <p className="text-sm text-white/80 mb-4">
                You're doing great this week! Keep up the awesome work! 🎉
              </p>
              <button
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg transition-all"
                data-companion="goldie"
              >
                View Budget
              </button>
            </div>

            {/* Fin Card */}
            <div
              className="bg-gradient-to-r from-blue-400/20 to-blue-500/10 border border-blue-400/30 rounded-xl p-6"
              data-companion="fin"
              tabIndex={0}
            >
              <div className="flex items-center gap-3 mb-3">
                <FinAnalytical size="medium" />
                <div>
                  <h3 className="font-bold text-white">Investment Insight</h3>
                  <p className="text-sm text-white/60">From Fin</p>
                </div>
              </div>
              <p className="text-sm text-white/80 mb-4">
                Your portfolio is well-diversified. Consider rebalancing monthly. 📊
              </p>
              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all"
                data-companion="fin"
              >
                View Portfolio
              </button>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="mt-6 space-y-4">
            <AccessibleProgressBar
              value={750}
              max={1000}
              label="Greece Trip Fund"
            />
            <AccessibleProgressBar
              value={450}
              max={650}
              label="Weekly Budget"
            />
          </div>

          {/* Active Settings Indicator */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="text-sm text-white/60 mb-3">Currently Active:</div>
            <div className="grid grid-cols-5 gap-3">
              <div className={`px-3 py-2 rounded-lg text-center ${highContrast ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/5'}`}>
                <Eye className={`w-5 h-5 mx-auto mb-1 ${highContrast ? 'text-purple-400' : 'text-white/40'}`} />
                <div className="text-xs text-white/60">High Contrast</div>
              </div>
              <div className={`px-3 py-2 rounded-lg text-center ${reduceMotion ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/5'}`}>
                <Volume2 className={`w-5 h-5 mx-auto mb-1 ${reduceMotion ? 'text-blue-400' : 'text-white/40'}`} />
                <div className="text-xs text-white/60">Reduce Motion</div>
              </div>
              <div className={`px-3 py-2 rounded-lg text-center ${colorBlindMode !== 'none' ? 'bg-green-500/20 border border-green-500/30' : 'bg-white/5'}`}>
                <Palette className={`w-5 h-5 mx-auto mb-1 ${colorBlindMode !== 'none' ? 'text-green-400' : 'text-white/40'}`} />
                <div className="text-xs text-white/60">Color Blind</div>
              </div>
              <div className={`px-3 py-2 rounded-lg text-center ${focusVisible ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-white/5'}`}>
                <Focus className={`w-5 h-5 mx-auto mb-1 ${focusVisible ? 'text-yellow-400' : 'text-white/40'}`} />
                <div className="text-xs text-white/60">Focus Rings</div>
              </div>
              <div className={`px-3 py-2 rounded-lg text-center ${fontSize !== 'normal' ? 'bg-orange-500/20 border border-orange-500/30' : 'bg-white/5'}`}>
                <Type className={`w-5 h-5 mx-auto mb-1 ${fontSize !== 'normal' ? 'text-orange-400' : 'text-white/40'}`} />
                <div className="text-xs text-white/60">Font Size</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Documentation */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* High Contrast */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">High Contrast Mode</h3>
            </div>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Text contrast increased to WCAG AAA (7:1 minimum)</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Thicker borders (2px) on interactive elements</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Remove transparency effects</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Solid backgrounds (no glassmorphism)</span>
              </div>
            </div>
          </div>

          {/* Reduce Motion */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Reduce Motion</h3>
            </div>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Respects "prefers-reduced-motion" setting</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Disable confetti and celebration animations</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Parallax effects removed</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Transitions become instant (0.01ms)</span>
              </div>
            </div>
          </div>

          {/* Focus States */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center justify-center">
                <Focus className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Focus States</h3>
            </div>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Visible focus rings: 2px gold outline</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Goldie elements: Gold focus with glow</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Fin elements: Blue focus with glow</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Skip-to-content link for keyboard nav</span>
              </div>
            </div>
          </div>

          {/* Screen Readers */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Screen Reader Labels</h3>
            </div>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Alt text for Goldie/Fin avatars</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>ARIA labels on icon-only buttons</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Dynamic content changes announced</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Progress bar percentages spoken</span>
              </div>
            </div>
          </div>
        </div>

        {/* Color Blind Modes */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🎨 Color Blind Modes</h2>
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Deuteranopia</h4>
              <div className="text-sm text-white/70 mb-3">Red-Green (most common)</div>
              <div className="space-y-2">
                <div className="h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold" data-status="success">
                  Success ✓
                </div>
                <div className="h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold" data-status="error">
                  Error ✗
                </div>
                <div className="h-8 bg-yellow-500 rounded flex items-center justify-center text-gray-900 text-xs font-bold" data-status="warning">
                  Warning ⚠
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Protanopia</h4>
              <div className="text-sm text-white/70 mb-3">Red-Green (less common)</div>
              <div className="text-xs text-white/60">
                • Patterns differentiate colors<br />
                • Icons alongside color coding<br />
                • Text labels always present
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Tritanopia</h4>
              <div className="text-sm text-white/70 mb-3">Blue-Yellow</div>
              <div className="text-xs text-white/60">
                • Unique pattern set<br />
                • Chart segments labeled<br />
                • Multiple visual cues
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-white/80">
                <strong className="text-white">Pattern-based differentiation:</strong> Charts use diagonal stripes, dots, and checkerboard patterns in addition to colors, ensuring everyone can distinguish categories regardless of color perception.
              </div>
            </div>
          </div>
        </div>

        {/* WCAG Compliance */}
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">✅ WCAG AAA Compliance</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-400 mb-3">Contrast Ratios</h4>
              <div className="space-y-2 text-sm text-white/80">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span>Large text (18pt+)</span>
                    <span className="font-bold text-green-400">4.5:1 ✓</span>
                  </div>
                  <div className="text-xs text-white/60">Enhanced mode minimum</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span>Normal text (&lt;18pt)</span>
                    <span className="font-bold text-green-400">7:1 ✓</span>
                  </div>
                  <div className="text-xs text-white/60">AAA level compliant</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-green-400 mb-3">Keyboard Navigation</h4>
              <div className="space-y-2 text-sm text-white/80">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>All interactive elements focusable</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Logical tab order (top to bottom)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Skip links for efficient navigation</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Proper heading hierarchy (h1-h4)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-400 mb-4">✅ Implemented</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• WCAG AAA contrast ratios</li>
              <li>• System preference detection</li>
              <li>• Keyboard navigation support</li>
              <li>• Screen reader optimized</li>
              <li>• Color blind friendly patterns</li>
              <li>• Motion preferences respected</li>
              <li>• Touch targets 44x44px minimum</li>
              <li>• Semantic HTML structure</li>
            </ul>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-400 mb-4">💡 Tips</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Test with screen readers (NVDA, JAWS)</li>
              <li>• Use keyboard-only navigation</li>
              <li>• Enable high contrast in OS settings</li>
              <li>• Test color blind simulations</li>
              <li>• Verify focus visible on all elements</li>
              <li>• Check heading hierarchy</li>
              <li>• Validate ARIA labels</li>
              <li>• Test with reduced motion on</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}