import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { MobileNavigation, MobileHeader } from "./MobileNavigation";
import { NotificationProvider } from "../contexts/NotificationContext";
import { AccessibilityProvider } from "../contexts/AccessibilityContext";
import { CoinRewardToast } from "./CoinRewardToast";
import { LevelUpModal } from "./LevelUpModal";

export function MainLayout() {
  return (
    <AccessibilityProvider>
      <NotificationProvider>
        <div className="flex h-screen bg-[#0f0f1a] overflow-hidden">
          {/* Desktop Sidebar - hidden on mobile */}
          <div className="hidden md:block">
            <Sidebar />
          </div>
          
          {/* Mobile Header - shown only on mobile */}
          <MobileHeader />
          
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto pt-14 pb-16 md:pt-0 md:pb-0">
            <Outlet />
          </div>
          
          {/* Mobile Bottom Navigation - shown only on mobile */}
          <MobileNavigation />
          
          {/* Global Notification Components */}
          <CoinRewardToast />
          <LevelUpModal />
        </div>
      </NotificationProvider>
    </AccessibilityProvider>
  );
}