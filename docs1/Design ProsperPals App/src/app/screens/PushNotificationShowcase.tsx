import { useState } from "react";
import {
  BudgetAlertNotification,
  GoalMilestoneNotification,
  BillReminderNotification,
  StreakMotivationNotification,
  WeeklySummaryNotification,
  NotificationPermissionPrompt,
  InAppNotificationBanner,
  NotificationBellIcon,
} from "../components/PushNotifications";
import { Bell, Smartphone, Check } from "lucide-react";

export function PushNotificationShowcase() {
  const [activeNotif, setActiveNotif] = useState<string | null>(null);
  const [showPermission, setShowPermission] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [notifCount, setNotifCount] = useState(3);

  const notifications = [
    {
      id: "budget",
      title: "Budget Alert",
      description: "80% of food budget used",
      component: BudgetAlertNotification,
      color: "from-yellow-400 to-yellow-500",
    },
    {
      id: "goal",
      title: "Goal Milestone",
      description: "75% to Greece trip fund",
      component: GoalMilestoneNotification,
      color: "from-green-400 to-green-500",
    },
    {
      id: "bill",
      title: "Bill Reminder",
      description: "Netflix renews tomorrow",
      component: BillReminderNotification,
      color: "from-blue-400 to-blue-500",
    },
    {
      id: "streak",
      title: "Streak Motivation",
      description: "12 day streak active!",
      component: StreakMotivationNotification,
      color: "from-orange-400 to-orange-500",
    },
    {
      id: "summary",
      title: "Weekly Summary",
      description: "Your financial recap",
      component: WeeklySummaryNotification,
      color: "from-purple-400 to-purple-500",
    },
  ];

  return (
    <div className="flex-1 bg-[#0f0f1a] overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">Push Notification Previews</h1>
          </div>
          <p className="text-white/60">
            iOS-style notifications for ProsperPals
          </p>
        </div>

        {/* Notification Bell with Badge */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Notification Bell Icon</h3>
          <div className="flex items-center gap-6">
            <div className="bg-[#1a1a2e] rounded-xl p-4">
              <NotificationBellIcon count={notifCount} />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setNotifCount(Math.max(0, notifCount - 1))}
                className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-all"
              >
                - Decrease
              </button>
              <button
                onClick={() => setNotifCount(notifCount + 1)}
                className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-all"
              >
                + Increase
              </button>
            </div>
            <div className="text-sm text-white/60">
              Current count: <span className="font-bold text-white">{notifCount}</span>
            </div>
          </div>
        </div>

        {/* Notification Types */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Notification Types</h2>
          
          <div className="grid grid-cols-1 gap-6">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${notif.color} rounded-xl flex items-center justify-center`}>
                      <Bell className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{notif.title}</h3>
                      <p className="text-sm text-white/60">{notif.description}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setActiveNotif(activeNotif === notif.id ? null : notif.id)}
                    className="px-6 py-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg text-sm font-semibold text-white transition-all"
                  >
                    {activeNotif === notif.id ? "Hide" : "Show"} Preview
                  </button>
                </div>

                {/* Preview */}
                {activeNotif === notif.id && (
                  <div className="bg-[#0f0f1a] rounded-xl p-8 flex items-center justify-center">
                    <notif.component onDismiss={() => setActiveNotif(null)} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Notification Details */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* iOS Style Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-bold text-white">iOS Notification Style</h3>
            </div>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>App icon (🔑 gold key)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>"ProsperPals" header</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Goldie/Fin avatar in notification</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Glassmorphism backdrop blur</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Action buttons (View, Add, Manage)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Timestamp (2m ago, 1h ago, etc.)</span>
              </li>
            </ul>
          </div>

          {/* Notification Copy */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">📝 Notification Copy Examples</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                <div className="font-semibold text-yellow-400 mb-1">Budget Alert</div>
                <div className="text-white/70">
                  "You've used 80% of your food budget. €40 remaining this week."
                </div>
              </div>
              
              <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-3">
                <div className="font-semibold text-green-400 mb-1">Goal Milestone</div>
                <div className="text-white/70">
                  "Amazing! You're 75% to your Greece trip fund! €500 to go."
                </div>
              </div>
              
              <div className="bg-blue-400/10 border border-blue-400/20 rounded-lg p-3">
                <div className="font-semibold text-blue-400 mb-1">Bill Reminder</div>
                <div className="text-white/70">
                  "Netflix €15.99 renews tomorrow. All good?"
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Permission Prompt */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Permission Prompt</h3>
          <p className="text-sm text-white/60 mb-4">
            iOS-style notification permission request
          </p>
          <button
            onClick={() => setShowPermission(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
          >
            Show Permission Prompt
          </button>
        </div>

        {/* In-App Banner */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">In-App Notification Banner</h3>
          <p className="text-sm text-white/60 mb-4">
            Toast-style notification that appears at the top of the app
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowBanner(true)}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-bold hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all"
            >
              Show Goldie Banner
            </button>
            <button
              onClick={() => setShowBanner(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
            >
              Show Fin Banner
            </button>
          </div>
        </div>

        {/* Notification Flow */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">📱 Notification Flow</h2>
          
          <div className="grid grid-cols-5 gap-4">
            {[
              { step: 1, label: "User Action", desc: "Reaches budget threshold" },
              { step: 2, label: "Trigger", desc: "Backend sends push" },
              { step: 3, label: "Notification", desc: "Appears on lock screen" },
              { step: 4, label: "Tap", desc: "Opens app to budget screen" },
              { step: 5, label: "Reward", desc: "Earns 5 PC for engagement" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-xl font-bold text-[#1a1a2e] mx-auto mb-3 shadow-lg">
                  {item.step}
                </div>
                <div className="text-sm font-bold text-white mb-1">{item.label}</div>
                <div className="text-xs text-white/60">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-400 mb-4">✅ Best Practices</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Keep messages under 100 characters</li>
              <li>• Include Goldie/Fin for personality</li>
              <li>• Always provide clear actions</li>
              <li>• Use emojis sparingly (1-2 max)</li>
              <li>• Time notifications appropriately</li>
              <li>• Respect user notification settings</li>
            </ul>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-400 mb-4">⚠️ Avoid</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Don't spam with too many notifications</li>
              <li>• Avoid notifications late at night</li>
              <li>• Don't use scary or alarming language</li>
              <li>• Never send marketing in push notifications</li>
              <li>• Don't send without clear value</li>
              <li>• Avoid long, wordy messages</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overlays */}
      {showPermission && (
        <NotificationPermissionPrompt
          onAllow={() => setShowPermission(false)}
          onDeny={() => setShowPermission(false)}
        />
      )}

      <InAppNotificationBanner
        isVisible={showBanner}
        companionAvatar="goldie"
        message="Great job! You've logged 5 transactions this week! 🎉"
        action={{ label: "View", onClick: () => setShowBanner(false) }}
        onDismiss={() => setShowBanner(false)}
      />
    </div>
  );
}
