import { useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import { GoldieHappy, FinAnalytical } from "../components/CompanionEmotions";
import { Sun, Moon, Monitor, Palette, Sparkles } from "lucide-react";

export function ThemeShowcase() {
  const { effectiveTheme } = useTheme();
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div style={{
      background: effectiveTheme === "dark" ? "#0f0f1a" : "#F8FAFC",
      minHeight: "100vh",
      transition: "background 0.3s ease",
    }} className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Palette className="w-8 h-8" style={{ color: effectiveTheme === "dark" ? "#fbbf24" : "#1a1a2e" }} />
            <h1 className="text-3xl font-bold" style={{ color: effectiveTheme === "dark" ? "#ffffff" : "#1a1a2e" }}>
              Dark / Light Mode Toggle
            </h1>
          </div>
          <p style={{ color: effectiveTheme === "dark" ? "rgba(255,255,255,0.6)" : "#64748b" }}>
            Seamless theme switching with smooth transitions
          </p>
        </div>

        {/* Theme Toggle Control */}
        <div className="mb-8">
          <ThemeToggle variant="detailed" />
        </div>

        {/* Current Theme Info */}
        <div className="mb-8" style={{
          background: effectiveTheme === "dark" ? "rgba(255,255,255,0.05)" : "#FFFFFF",
          border: effectiveTheme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
          borderRadius: "1rem",
          padding: "1.5rem",
          boxShadow: effectiveTheme === "light" ? "0 1px 3px 0 rgba(0,0,0,0.1)" : "none",
        }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: effectiveTheme === "dark" ? "#ffffff" : "#1a1a2e" }}>
            Current Theme: {effectiveTheme.charAt(0).toUpperCase() + effectiveTheme.slice(1)} Mode
          </h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div style={{
              background: effectiveTheme === "dark" ? "rgba(255,255,255,0.05)" : "#F1F5F9",
              border: effectiveTheme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",
              borderRadius: "0.75rem",
              padding: "1rem",
            }}>
              <div className="text-sm font-semibold mb-1" style={{ color: effectiveTheme === "dark" ? "rgba(255,255,255,0.6)" : "#64748b" }}>
                Background
              </div>
              <div className="text-lg font-bold" style={{ color: effectiveTheme === "dark" ? "#fbbf24" : "#1a1a2e" }}>
                {effectiveTheme === "dark" ? "#0f0f1a" : "#F8FAFC"}
              </div>
            </div>

            <div style={{
              background: effectiveTheme === "dark" ? "rgba(255,255,255,0.05)" : "#F1F5F9",
              border: effectiveTheme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",
              borderRadius: "0.75rem",
              padding: "1rem",
            }}>
              <div className="text-sm font-semibold mb-1" style={{ color: effectiveTheme === "dark" ? "rgba(255,255,255,0.6)" : "#64748b" }}>
                Cards
              </div>
              <div className="text-lg font-bold" style={{ color: effectiveTheme === "dark" ? "#fbbf24" : "#1a1a2e" }}>
                {effectiveTheme === "dark" ? "rgba(255,255,255,0.05)" : "#FFFFFF"}
              </div>
            </div>

            <div style={{
              background: effectiveTheme === "dark" ? "rgba(255,255,255,0.05)" : "#F1F5F9",
              border: effectiveTheme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",
              borderRadius: "0.75rem",
              padding: "1rem",
            }}>
              <div className="text-sm font-semibold mb-1" style={{ color: effectiveTheme === "dark" ? "rgba(255,255,255,0.6)" : "#64748b" }}>
                Sidebar
              </div>
              <div className="text-lg font-bold" style={{ color: effectiveTheme === "dark" ? "#fbbf24" : "#1a1a2e" }}>
                {effectiveTheme === "dark" ? "#1a1a2e" : "#F1F5F9"}
              </div>
            </div>
          </div>
        </div>

        {/* Live Component Examples */}
        <div className="mb-8" style={{
          background: effectiveTheme === "dark" ? "rgba(255,255,255,0.05)" : "#FFFFFF",
          border: effectiveTheme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
          borderRadius: "1rem",
          padding: "2rem",
          boxShadow: effectiveTheme === "light" ? "0 1px 3px 0 rgba(0,0,0,0.1)" : "none",
        }}>
          <h3 className="text-xl font-bold mb-6" style={{ color: effectiveTheme === "dark" ? "#ffffff" : "#1a1a2e" }}>
            Live Component Examples
          </h3>

          <div className="grid grid-cols-2 gap-6">
            {/* Goldie Card */}
            <div style={{
              background: effectiveTheme === "dark" 
                ? "linear-gradient(to bottom right, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.1))"
                : "linear-gradient(to bottom right, rgba(251, 191, 36, 0.1), rgba(251, 191, 36, 0.05))",
              border: effectiveTheme === "dark" ? "1px solid rgba(251, 191, 36, 0.3)" : "1px solid rgba(251, 191, 36, 0.2)",
              borderRadius: "1rem",
              padding: "1.5rem",
              boxShadow: effectiveTheme === "light" ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none",
            }}>
              <div className="flex items-center gap-3 mb-3">
                <GoldieHappy size="medium" />
                <div>
                  <div className="font-bold" style={{ color: effectiveTheme === "dark" ? "#ffffff" : "#1a1a2e" }}>
                    Budget Tip from Goldie
                  </div>
                  <div className="text-sm" style={{ color: effectiveTheme === "dark" ? "rgba(255,255,255,0.6)" : "#64748b" }}>
                    Daily wisdom
                  </div>
                </div>
              </div>
              <p className="text-sm" style={{ color: effectiveTheme === "dark" ? "rgba(255,255,255,0.8)" : "#1a1a2e" }}>
                Great job tracking your expenses! You're building awesome financial habits! 🎉
              </p>
            </div>

            {/* Fin Card */}
            <div style={{
              background: effectiveTheme === "dark"
                ? "linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1))"
                : "linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))",
              border: effectiveTheme === "dark" ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)",
              borderRadius: "1rem",
              padding: "1.5rem",
              boxShadow: effectiveTheme === "light" ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none",
            }}>
              <div className="flex items-center gap-3 mb-3">
                <FinAnalytical size="medium" />
                <div>
                  <div className="font-bold" style={{ color: effectiveTheme === "dark" ? "#ffffff" : "#1a1a2e" }}>
                    Investment Insight from Fin
                  </div>
                  <div className="text-sm" style={{ color: effectiveTheme === "dark" ? "rgba(255,255,255,0.6)" : "#64748b" }}>
                    Market analysis
                  </div>
                </div>
              </div>
              <p className="text-sm" style={{ color: effectiveTheme === "dark" ? "rgba(255,255,255,0.8)" : "#1a1a2e" }}>
                Based on your portfolio, consider diversifying with some international stocks! 📊
              </p>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="mb-8">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="px-6 py-3 rounded-xl font-semibold transition-all mb-6"
            style={{
              background: effectiveTheme === "dark"
                ? "rgba(255,255,255,0.1)"
                : "#1a1a2e",
              color: effectiveTheme === "dark" ? "#ffffff" : "#ffffff",
              border: effectiveTheme === "dark" ? "1px solid rgba(255,255,255,0.2)" : "none",
            }}
          >
            {showComparison ? "Hide" : "Show"} Side-by-Side Comparison
          </button>

          {showComparison && (
            <div className="grid grid-cols-2 gap-8">
              {/* Light Mode Preview */}
              <div style={{
                background: "#FFFFFF",
                border: "2px solid rgba(0,0,0,0.1)",
                borderRadius: "1rem",
                padding: "1.5rem",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
              }}>
                <div className="flex items-center gap-2 mb-4">
                  <Sun className="w-5 h-5 text-yellow-500" />
                  <h4 className="font-bold text-gray-900">Light Mode</h4>
                </div>
                
                <div className="space-y-3">
                  <div style={{ background: "#F8FAFC", padding: "0.75rem", borderRadius: "0.5rem" }}>
                    <div className="text-xs text-gray-500 mb-1">Background</div>
                    <div className="text-sm font-bold text-gray-900">#F8FAFC</div>
                  </div>
                  <div style={{ background: "#FFFFFF", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid rgba(0,0,0,0.1)" }}>
                    <div className="text-xs text-gray-500 mb-1">Cards</div>
                    <div className="text-sm font-bold text-gray-900">#FFFFFF</div>
                  </div>
                  <div className="text-xs text-gray-600">
                    ✓ Subtle shadows for depth<br/>
                    ✓ Reduced glow effects<br/>
                    ✓ High contrast text
                  </div>
                </div>
              </div>

              {/* Dark Mode Preview */}
              <div style={{
                background: "#0f0f1a",
                border: "2px solid rgba(255,255,255,0.2)",
                borderRadius: "1rem",
                padding: "1.5rem",
              }}>
                <div className="flex items-center gap-2 mb-4">
                  <Moon className="w-5 h-5 text-blue-400" />
                  <h4 className="font-bold text-white">Dark Mode</h4>
                </div>
                
                <div className="space-y-3">
                  <div style={{ background: "rgba(255,255,255,0.05)", padding: "0.75rem", borderRadius: "0.5rem" }}>
                    <div className="text-xs text-white/60 mb-1">Background</div>
                    <div className="text-sm font-bold text-white">#0f0f1a</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.05)", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div className="text-xs text-white/60 mb-1">Cards</div>
                    <div className="text-sm font-bold text-white">rgba(255,255,255,0.05)</div>
                  </div>
                  <div className="text-xs text-white/70">
                    ✓ Glassmorphism effects<br/>
                    ✓ Vibrant glows<br/>
                    ✓ Softer borders
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Key Adjustments */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div style={{
            background: effectiveTheme === "dark" ? "rgba(34, 197, 94, 0.1)" : "rgba(34, 197, 94, 0.05)",
            border: effectiveTheme === "dark" ? "1px solid rgba(34, 197, 94, 0.2)" : "1px solid rgba(34, 197, 94, 0.15)",
            borderRadius: "1rem",
            padding: "1.5rem",
          }}>
            <h4 className="font-bold mb-3" style={{ color: effectiveTheme === "dark" ? "#22c55e" : "#16a34a" }}>
              ✅ Light Mode Adjustments
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: effectiveTheme === "dark" ? "rgba(255,255,255,0.8)" : "#1a1a2e" }}>
              <li>• Reduced glow effects (too bright on white)</li>
              <li>• Increased card shadows for depth</li>
              <li>• Adjusted chart colors for visibility</li>
              <li>• Keep gamification colors vibrant</li>
              <li>• Goldie/Fin keep gradients + shadow</li>
            </ul>
          </div>

          <div style={{
            background: effectiveTheme === "dark" ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)",
            border: effectiveTheme === "dark" ? "1px solid rgba(59, 130, 246, 0.2)" : "1px solid rgba(59, 130, 246, 0.15)",
            borderRadius: "1rem",
            padding: "1.5rem",
          }}>
            <h4 className="font-bold mb-3" style={{ color: effectiveTheme === "dark" ? "#3b82f6" : "#2563eb" }}>
              🌙 Dark Mode Features
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: effectiveTheme === "dark" ? "rgba(255,255,255,0.8)" : "#1a1a2e" }}>
              <li>• Glassmorphism with backdrop blur</li>
              <li>• Vibrant glow effects on cards</li>
              <li>• Softer borders (rgba overlays)</li>
              <li>• Companion animations pop more</li>
              <li>• Deep background (#0f0f1a)</li>
            </ul>
          </div>
        </div>

        {/* Technical Details */}
        <div style={{
          background: effectiveTheme === "dark" ? "rgba(255,255,255,0.05)" : "#FFFFFF",
          border: effectiveTheme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
          borderRadius: "1rem",
          padding: "2rem",
          boxShadow: effectiveTheme === "light" ? "0 1px 3px 0 rgba(0,0,0,0.1)" : "none",
        }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: effectiveTheme === "dark" ? "#ffffff" : "#1a1a2e" }}>
            🔧 Technical Implementation
          </h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3" style={{ color: effectiveTheme === "dark" ? "#fbbf24" : "#1a1a2e" }}>
                Theme System
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: effectiveTheme === "dark" ? "rgba(255,255,255,0.7)" : "#64748b" }}>
                <li>• React Context for global state</li>
                <li>• LocalStorage persistence</li>
                <li>• System preference detection</li>
                <li>• Smooth 0.3s transitions</li>
                <li>• CSS custom properties</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3" style={{ color: effectiveTheme === "dark" ? "#fbbf24" : "#1a1a2e" }}>
                Features
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: effectiveTheme === "dark" ? "rgba(255,255,255,0.7)" : "#64748b" }}>
                <li>• Preview before applying</li>
                <li>• Three modes: Light, Dark, System</li>
                <li>• Animated toggle component</li>
                <li>• Theme-aware components</li>
                <li>• Accessible color contrast</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
