import { useAccessibility } from "../contexts/AccessibilityContext";
import { Eye, Volume2, Palette, Focus, Type, RefreshCw, Check } from "lucide-react";

export function AccessibilityControls() {
  const {
    highContrast,
    reduceMotion,
    colorBlindMode,
    focusVisible,
    fontSize,
    setHighContrast,
    setReduceMotion,
    setColorBlindMode,
    setFocusVisible,
    setFontSize,
    resetToDefaults,
  } = useAccessibility();

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Accessibility Settings</h3>
        <button
          onClick={resetToDefaults}
          className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg text-sm font-semibold text-white transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* High Contrast Mode */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="font-bold text-white">High Contrast Mode</div>
                <div className="text-sm text-white/60">Increase text contrast to WCAG AAA</div>
              </div>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`relative w-14 h-7 rounded-full transition-all ${
                highContrast ? "bg-purple-500" : "bg-white/20"
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all ${
                  highContrast ? "left-7" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {highContrast && (
            <div className="ml-13 pl-4 border-l-2 border-purple-500/30 text-sm text-white/70">
              ✓ Thicker borders on interactive elements<br />
              ✓ Solid backgrounds (no transparency)<br />
              ✓ Maximum text contrast
            </div>
          )}
        </div>

        {/* Reduce Motion */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="font-bold text-white">Reduce Motion</div>
                <div className="text-sm text-white/60">Disable animations and parallax</div>
              </div>
            </div>
            <button
              onClick={() => setReduceMotion(!reduceMotion)}
              className={`relative w-14 h-7 rounded-full transition-all ${
                reduceMotion ? "bg-blue-500" : "bg-white/20"
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all ${
                  reduceMotion ? "left-7" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {reduceMotion && (
            <div className="ml-13 pl-4 border-l-2 border-blue-500/30 text-sm text-white/70">
              ✓ Confetti disabled<br />
              ✓ Transitions instant<br />
              ✓ Parallax effects removed
            </div>
          )}
        </div>

        {/* Color Blind Mode */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center">
              <Palette className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="font-bold text-white">Color Blind Mode</div>
              <div className="text-sm text-white/60">Add patterns and icons to charts</div>
            </div>
          </div>

          <div className="ml-13 grid grid-cols-2 gap-2">
            {[
              { id: "none" as const, label: "None" },
              { id: "deuteranopia" as const, label: "Deuteranopia (Red-Green)" },
              { id: "protanopia" as const, label: "Protanopia (Red-Green)" },
              { id: "tritanopia" as const, label: "Tritanopia (Blue-Yellow)" },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setColorBlindMode(mode.id)}
                className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-between ${
                  colorBlindMode === mode.id
                    ? "bg-green-500/20 border-2 border-green-500/40 text-white"
                    : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                }`}
              >
                <span>{mode.label}</span>
                {colorBlindMode === mode.id && <Check className="w-4 h-4 text-green-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Focus Visible */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center justify-center">
                <Focus className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <div className="font-bold text-white">Visible Focus Rings</div>
                <div className="text-sm text-white/60">2px gold/blue outline on focus</div>
              </div>
            </div>
            <button
              onClick={() => setFocusVisible(!focusVisible)}
              className={`relative w-14 h-7 rounded-full transition-all ${
                focusVisible ? "bg-yellow-500" : "bg-white/20"
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all ${
                  focusVisible ? "left-7" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Font Size */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center">
              <Type className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <div className="font-bold text-white">Font Size</div>
              <div className="text-sm text-white/60">Adjust text size throughout app</div>
            </div>
          </div>

          <div className="ml-13 grid grid-cols-3 gap-2">
            {[
              { id: "normal" as const, label: "Normal", size: "16px" },
              { id: "large" as const, label: "Large", size: "18px" },
              { id: "xlarge" as const, label: "Extra Large", size: "20px" },
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => setFontSize(size.id)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                  fontSize === size.id
                    ? "bg-orange-500/20 border-2 border-orange-500/40 text-white"
                    : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                }`}
              >
                <div className="text-sm">{size.label}</div>
                <div className="text-xs text-white/50">{size.size}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="text-sm text-white/60 mb-2">Active Features:</div>
        <div className="flex flex-wrap gap-2">
          {highContrast && (
            <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs font-semibold text-purple-400">
              High Contrast
            </div>
          )}
          {reduceMotion && (
            <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs font-semibold text-blue-400">
              Reduce Motion
            </div>
          )}
          {colorBlindMode !== "none" && (
            <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-xs font-semibold text-green-400">
              {colorBlindMode.charAt(0).toUpperCase() + colorBlindMode.slice(1)}
            </div>
          )}
          {focusVisible && (
            <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-xs font-semibold text-yellow-400">
              Focus Rings
            </div>
          )}
          {fontSize !== "normal" && (
            <div className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-lg text-xs font-semibold text-orange-400">
              {fontSize === "large" ? "Large" : "Extra Large"} Text
            </div>
          )}
          {!highContrast && !reduceMotion && colorBlindMode === "none" && !focusVisible && fontSize === "normal" && (
            <div className="px-3 py-1 bg-white/10 rounded-lg text-xs text-white/60">
              None (all defaults)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Skip to Content Link (for keyboard navigation)
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-yellow-500 focus:text-gray-900 focus:font-bold focus:rounded-xl focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
}

// Screen Reader Only Text
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

// Accessible Progress Bar
export function AccessibleProgressBar({
  value,
  max,
  label,
  showPercentage = true,
}: {
  value: number;
  max: number;
  label: string;
  showPercentage?: boolean;
}) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-white">{label}</span>
        {showPercentage && <span className="text-sm text-white/60">{percentage}%</span>}
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <ScreenReaderOnly>Progress: {percentage} percent complete</ScreenReaderOnly>
    </div>
  );
}
