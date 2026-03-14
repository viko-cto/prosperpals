import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AccessibilitySettings {
  highContrast: boolean;
  reduceMotion: boolean;
  colorBlindMode: "none" | "deuteranopia" | "protanopia" | "tritanopia";
  focusVisible: boolean;
  fontSize: "normal" | "large" | "xlarge";
}

interface AccessibilityContextType extends AccessibilitySettings {
  setHighContrast: (enabled: boolean) => void;
  setReduceMotion: (enabled: boolean) => void;
  setColorBlindMode: (mode: AccessibilitySettings["colorBlindMode"]) => void;
  setFocusVisible: (enabled: boolean) => void;
  setFontSize: (size: AccessibilitySettings["fontSize"]) => void;
  resetToDefaults: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  reduceMotion: false,
  colorBlindMode: "none",
  focusVisible: true,
  fontSize: "normal",
};

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem("prosperpal-a11y");
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) };
    }

    // Check system preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const prefersContrast = window.matchMedia("(prefers-contrast: more)").matches;

    return {
      ...defaultSettings,
      reduceMotion: prefersReducedMotion,
      highContrast: prefersContrast,
    };
  });

  // Listen for system preference changes
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrastQuery = window.matchMedia("(prefers-contrast: more)");

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setSettings((prev) => ({ ...prev, reduceMotion: e.matches }));
    };

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setSettings((prev) => ({ ...prev, highContrast: e.matches }));
    };

    motionQuery.addEventListener("change", handleMotionChange);
    contrastQuery.addEventListener("change", handleContrastChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      contrastQuery.removeEventListener("change", handleContrastChange);
    };
  }, []);

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem("prosperpal-a11y", JSON.stringify(settings));
    applyAccessibilitySettings(settings);
  }, [settings]);

  const setHighContrast = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, highContrast: enabled }));
  };

  const setReduceMotion = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, reduceMotion: enabled }));
  };

  const setColorBlindMode = (mode: AccessibilitySettings["colorBlindMode"]) => {
    setSettings((prev) => ({ ...prev, colorBlindMode: mode }));
  };

  const setFocusVisible = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, focusVisible: enabled }));
  };

  const setFontSize = (size: AccessibilitySettings["fontSize"]) => {
    setSettings((prev) => ({ ...prev, fontSize: size }));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        ...settings,
        setHighContrast,
        setReduceMotion,
        setColorBlindMode,
        setFocusVisible,
        setFontSize,
        resetToDefaults,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
}

// Apply settings to document
function applyAccessibilitySettings(settings: AccessibilitySettings) {
  const root = document.documentElement;

  // High Contrast Mode
  if (settings.highContrast) {
    root.classList.add("high-contrast");
  } else {
    root.classList.remove("high-contrast");
  }

  // Reduce Motion
  if (settings.reduceMotion) {
    root.classList.add("reduce-motion");
  } else {
    root.classList.remove("reduce-motion");
  }

  // Color Blind Mode
  root.classList.remove("deuteranopia", "protanopia", "tritanopia");
  if (settings.colorBlindMode !== "none") {
    root.classList.add(settings.colorBlindMode);
  }

  // Focus Visible
  if (settings.focusVisible) {
    root.classList.add("focus-visible");
  } else {
    root.classList.remove("focus-visible");
  }

  // Font Size
  root.classList.remove("font-large", "font-xlarge");
  if (settings.fontSize === "large") {
    root.classList.add("font-large");
  } else if (settings.fontSize === "xlarge") {
    root.classList.add("font-xlarge");
  }
}
