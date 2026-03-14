import React, { createContext, useContext, useState, useCallback } from "react";

interface CoinReward {
  amount: number;
  reason: string;
  currentXP?: number;
  xpToNextLevel?: number;
}

interface LevelUpData {
  newLevel: number;
  rewards: string[];
  message: string;
}

interface NotificationContextType {
  showCoinReward: (reward: CoinReward) => void;
  showLevelUp: (data: LevelUpData) => void;
  activeCoinReward: CoinReward | null;
  activeLevelUp: LevelUpData | null;
  dismissCoinReward: () => void;
  dismissLevelUp: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [activeCoinReward, setActiveCoinReward] = useState<CoinReward | null>(null);
  const [activeLevelUp, setActiveLevelUp] = useState<LevelUpData | null>(null);

  const showCoinReward = useCallback((reward: CoinReward) => {
    setActiveCoinReward(reward);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setActiveCoinReward(null);
    }, 3000);
  }, []);

  const showLevelUp = useCallback((data: LevelUpData) => {
    setActiveLevelUp(data);
  }, []);

  const dismissCoinReward = useCallback(() => {
    setActiveCoinReward(null);
  }, []);

  const dismissLevelUp = useCallback(() => {
    setActiveLevelUp(null);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        showCoinReward,
        showLevelUp,
        activeCoinReward,
        activeLevelUp,
        dismissCoinReward,
        dismissLevelUp,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
}
