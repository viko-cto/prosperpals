import { createBrowserRouter, Navigate } from "react-router";
import { Onboarding } from "./screens/Onboarding";
import { Landing } from "./screens/Landing";
import { Auth } from "./screens/Auth";
import { WhatIfCalculator } from "./screens/WhatIfCalculator";
import { PreviewDashboard } from "./screens/PreviewDashboard";
import { SubscriptionRealityCheck } from "./screens/SubscriptionRealityCheck";
import { DataPrivacyTrust } from "./screens/DataPrivacyTrust";
import { BankConnection } from "./screens/BankConnection";
import { MeetGoldie } from "./screens/MeetGoldie";
import { CompanionDashboard } from "./screens/CompanionDashboard";
import { BudgetOverspendNotification } from "./screens/BudgetOverspendNotification";
import { EssentialBills } from "./screens/EssentialBills";
import { FlexibleSubscriptions } from "./screens/FlexibleSubscriptions";
import { HeroScreen } from "./screens/HeroScreen";
import { LoginAuth } from "./screens/LoginAuth";
import { Home } from "./screens/Home";
import { TheKeys } from "./screens/TheKeys";
import { TheProsperityKeys } from "./screens/TheProsperityKeys";
import { Leaderboard } from "./screens/Leaderboard";
import { WalletScreen } from "./screens/WalletScreen";
import { WalletDashboard } from "./screens/WalletDashboard";
import { WalletDashboard2 } from "./screens/WalletDashboard2";
import { Transactions } from "./screens/Transactions";
import { TransactionLog } from "./screens/TransactionLog";
import { TransactionLog2 } from "./screens/TransactionLog2";
import { Portfolio } from "./screens/Portfolio";
import { Clans } from "./screens/Clans";
import { BudgetCentral } from "./screens/BudgetCentral";
import { ChatGoldie } from "./screens/ChatGoldie";
import { ChatFin } from "./screens/ChatFin";
import { LearningHub } from "./screens/LearningHub";
import { VirtualPortfolio } from "./screens/VirtualPortfolio";
import { Goals } from "./screens/Goals";
import { GoalsMilestones } from "./screens/GoalsMilestones";
import { FamilySpace } from "./screens/FamilySpace";
import { Subscriptions } from "./screens/Subscriptions";
import { Settings } from "./screens/Settings";
import { NetWorth } from "./screens/NetWorth";
import { SpendingInsights } from "./screens/SpendingInsights";
import { VoiceChat } from "./screens/VoiceChat";
import { TextChat } from "./screens/TextChat";
import { EmptyStateShowcase } from "./screens/EmptyStateShowcase";
import { LoadingStateShowcase } from "./screens/LoadingStateShowcase";
import { ErrorStateShowcase } from "./screens/ErrorStateShowcase";
import { StateShowcase } from "./screens/StateShowcase";
import { OnboardingShowcase } from "./screens/OnboardingShowcase";
import { CompanionEmotionsShowcase } from "./screens/CompanionEmotionsShowcase";
import { ThemeShowcase } from "./screens/ThemeShowcase";
import { PushNotificationShowcase } from "./screens/PushNotificationShowcase";
import { WidgetShowcase } from "./screens/WidgetShowcase";
import { AccessibilityShowcase } from "./screens/AccessibilityShowcase";
import { CelebrationShowcase } from "./screens/CelebrationShowcase";
import MicroInteractionsShowcase from "./screens/MicroInteractionsShowcase";
import { GoalsCelebrationShowcase } from "./screens/GoalsCelebrationShowcase";
import { MainLayout } from "./components/MainLayout";

// Router configuration for ProsperPals
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginAuth />,
  },
  {
    path: "/hero",
    element: <HeroScreen />,
  },
  {
    path: "/flexible-subscriptions",
    element: <FlexibleSubscriptions />,
  },
  {
    path: "/essential-bills",
    element: <EssentialBills />,
  },
  {
    path: "/budget-overspend",
    element: <BudgetOverspendNotification />,
  },
  {
    path: "/dashboard",
    element: <CompanionDashboard />,
  },
  {
    path: "/meet-goldie",
    element: <MeetGoldie />,
  },
  {
    path: "/bank-connection",
    element: <BankConnection />,
  },
  {
    path: "/data-privacy",
    element: <DataPrivacyTrust />,
  },
  {
    path: "/subscription-reality",
    element: <SubscriptionRealityCheck />,
  },
  {
    path: "/preview",
    element: <PreviewDashboard />,
  },
  {
    path: "/what-if",
    element: <WhatIfCalculator />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Landing />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/keys",
        element: <TheKeys />,
      },
      {
        path: "/prosperity-keys",
        element: <TheProsperityKeys />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/wallet",
        element: <WalletScreen />,
      },
      {
        path: "/wallet-dashboard",
        element: <WalletDashboard />,
      },
      {
        path: "/wallet-dashboard2",
        element: <WalletDashboard2 />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/transaction-log",
        element: <TransactionLog />,
      },
      {
        path: "/transaction-log2",
        element: <TransactionLog2 />,
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
      {
        path: "/clans",
        element: <Clans />,
      },
      {
        path: "/budget-central",
        element: <BudgetCentral />,
      },
      {
        path: "/chat-goldie",
        element: <ChatGoldie />,
      },
      {
        path: "/chat-fin",
        element: <ChatFin />,
      },
      {
        path: "/learning-hub",
        element: <LearningHub />,
      },
      {
        path: "/virtual-portfolio",
        element: <VirtualPortfolio />,
      },
      {
        path: "/goals",
        element: <Goals />,
      },
      {
        path: "/goals-milestones",
        element: <GoalsMilestones />,
      },
      {
        path: "/family-space",
        element: <FamilySpace />,
      },
      {
        path: "/net-worth",
        element: <NetWorth />,
      },
      {
        path: "/spending-insights",
        element: <SpendingInsights />,
      },
      {
        path: "/subscriptions",
        element: <Subscriptions />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/voice-chat",
        element: <VoiceChat />,
      },
      {
        path: "/text-chat",
        element: <TextChat />,
      },
      {
        path: "/voice-workflow",
        element: <Navigate to="/voice-chat" replace />,
      },
      {
        path: "/onboarding-showcase",
        element: <OnboardingShowcase />,
      },
      {
        path: "/error-state-showcase",
        element: <ErrorStateShowcase />,
      },
      {
        path: "/state-showcase",
        element: <StateShowcase />,
      },
      {
        path: "/empty-state-showcase",
        element: <EmptyStateShowcase />,
      },
      {
        path: "/loading-state-showcase",
        element: <LoadingStateShowcase />,
      },
      {
        path: "/companion-emotions-showcase",
        element: <CompanionEmotionsShowcase />,
      },
      {
        path: "/theme-showcase",
        element: <ThemeShowcase />,
      },
      {
        path: "/push-notification-showcase",
        element: <PushNotificationShowcase />,
      },
      {
        path: "/widget-showcase",
        element: <WidgetShowcase />,
      },
      {
        path: "/accessibility-showcase",
        element: <AccessibilityShowcase />,
      },
      {
        path: "/celebration-showcase",
        element: <CelebrationShowcase />,
      },
      {
        path: "/micro-interactions-showcase",
        element: <MicroInteractionsShowcase />,
      },
      {
        path: "/goals-celebration-showcase",
        element: <GoalsCelebrationShowcase />,
      },
    ],
  },
]);