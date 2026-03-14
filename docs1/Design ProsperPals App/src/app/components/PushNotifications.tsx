import { motion } from "motion/react";
import { Bell, Check, X } from "lucide-react";

// iOS-style notification component
export function IOSNotification({
  appIcon = "🔑",
  appName = "ProsperPals",
  time = "now",
  companionAvatar,
  title,
  message,
  actions = [],
  variant = "default",
  onDismiss,
}: {
  appIcon?: string;
  appName?: string;
  time?: string;
  companionAvatar?: "goldie" | "fin";
  title?: string;
  message: string;
  actions?: { label: string; primary?: boolean }[];
  variant?: "default" | "goldie" | "fin";
  onDismiss?: () => void;
}) {
  const bgColor = variant === "goldie" 
    ? "from-yellow-400/20 to-yellow-500/10" 
    : variant === "fin"
    ? "from-blue-400/20 to-blue-500/10"
    : "from-white/95 to-white/90";

  const borderColor = variant === "goldie"
    ? "border-yellow-400/30"
    : variant === "fin"
    ? "border-blue-400/30"
    : "border-gray-200/50";

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className={`w-full max-w-sm bg-gradient-to-br ${bgColor} backdrop-blur-xl border ${borderColor} rounded-2xl shadow-2xl overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/30">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 text-base">{appIcon}</div>
          <span className="text-xs font-semibold text-gray-700">{appName}</span>
        </div>
        <span className="text-xs text-gray-500">{time}</span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Companion Avatar */}
          {companionAvatar && (
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl flex-shrink-0 ${
              companionAvatar === "goldie"
                ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                : "bg-gradient-to-br from-blue-400 to-blue-700"
            }`}>
              {companionAvatar === "goldie" ? "🪙" : "🐋"}
            </div>
          )}

          {/* Message */}
          <div className="flex-1 min-w-0">
            {title && (
              <div className="text-sm font-bold text-gray-900 mb-1">
                {title}
              </div>
            )}
            <div className="text-sm text-gray-700 leading-relaxed">
              {message}
            </div>
          </div>

          {/* Dismiss Button */}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex gap-2 mt-4">
            {actions.map((action, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  action.primary
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-white/80 text-gray-700 hover:bg-white border border-gray-200"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Budget Alert Notification
export function BudgetAlertNotification({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <IOSNotification
      companionAvatar="goldie"
      title="Goldie"
      message="You've used 80% of your food budget. €40 remaining this week."
      actions={[{ label: "View Budget", primary: true }]}
      variant="goldie"
      onDismiss={onDismiss}
      time="2m ago"
    />
  );
}

// Goal Milestone Notification
export function GoalMilestoneNotification({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <IOSNotification
      companionAvatar="goldie"
      title="Amazing! 🎉"
      message="You're 75% to your Greece trip fund! €500 to go."
      actions={[
        { label: "Add More", primary: false },
        { label: "View Goal", primary: true },
      ]}
      variant="goldie"
      onDismiss={onDismiss}
      time="1h ago"
    />
  );
}

// Bill Reminder Notification
export function BillReminderNotification({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <IOSNotification
      companionAvatar="fin"
      title="Bill Reminder"
      message="Netflix €15.99 renews tomorrow. All good?"
      actions={[
        { label: "Yes", primary: false },
        { label: "Manage", primary: true },
      ]}
      variant="fin"
      onDismiss={onDismiss}
      time="5h ago"
    />
  );
}

// Streak Motivation Notification
export function StreakMotivationNotification({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <IOSNotification
      companionAvatar="goldie"
      title="12 day streak! 🔥"
      message="Check in today to keep it going."
      actions={[{ label: "Open App", primary: true }]}
      variant="goldie"
      onDismiss={onDismiss}
      time="30m ago"
    />
  );
}

// Weekly Summary Notification
export function WeeklySummaryNotification({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <IOSNotification
      companionAvatar="fin"
      title="Your Week in Review"
      message="Spent €423, saved €77, earned 150 PC"
      actions={[{ label: "See Details", primary: true }]}
      variant="fin"
      onDismiss={onDismiss}
      time="Mon 9:00 AM"
    />
  );
}

// Android-style notification (bonus)
export function AndroidNotification({
  appIcon = "🔑",
  appName = "ProsperPals",
  time = "now",
  title,
  message,
  expandedContent,
  actions = [],
}: {
  appIcon?: string;
  appName?: string;
  time?: string;
  title?: string;
  message: string;
  expandedContent?: React.ReactNode;
  actions?: { label: string; icon?: React.ReactNode }[];
}) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="w-full max-w-sm bg-white rounded-lg shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 text-base">{appIcon}</div>
          <span className="text-xs font-semibold text-gray-700">{appName}</span>
        </div>
        <span className="text-xs text-gray-500">{time}</span>
      </div>

      {/* Content */}
      <div className="p-4">
        {title && (
          <div className="text-sm font-bold text-gray-900 mb-1">{title}</div>
        )}
        <div className="text-sm text-gray-700 mb-3">{message}</div>

        {expandedContent && (
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            {expandedContent}
          </div>
        )}

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
            {actions.map((action, index) => (
              <button
                key={index}
                className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Notification Bell Icon with Badge
export function NotificationBellIcon({ count = 0 }: { count?: number }) {
  return (
    <div className="relative">
      <Bell className="w-6 h-6 text-white/80" />
      {count > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
        >
          <span className="text-[10px] font-bold text-white">
            {count > 9 ? "9+" : count}
          </span>
        </motion.div>
      )}
    </div>
  );
}

// Notification Permission Prompt (iOS style)
export function NotificationPermissionPrompt({
  onAllow,
  onDeny,
}: {
  onAllow?: () => void;
  onDeny?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        {/* App Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
          🔑
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-center text-gray-900 mb-2">
          "ProsperPals" Would Like to Send You Notifications
        </h3>

        {/* Description */}
        <p className="text-sm text-center text-gray-600 mb-6">
          Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.
        </p>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={onAllow}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors"
          >
            Allow
          </button>
          <button
            onClick={onDeny}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
          >
            Don't Allow
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// In-App Notification Banner (like toast but notification style)
export function InAppNotificationBanner({
  companionAvatar,
  message,
  action,
  onDismiss,
  isVisible = false,
}: {
  companionAvatar?: "goldie" | "fin";
  message: string;
  action?: { label: string; onClick: () => void };
  onDismiss?: () => void;
  isVisible?: boolean;
}) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md mx-4"
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-4 flex items-center gap-3">
        {companionAvatar && (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl flex-shrink-0 ${
            companionAvatar === "goldie"
              ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
              : "bg-gradient-to-br from-blue-400 to-blue-700"
          }`}>
            {companionAvatar === "goldie" ? "🪙" : "🐋"}
          </div>
        )}

        <div className="flex-1 text-sm text-gray-700">
          {message}
        </div>

        {action && (
          <button
            onClick={action.onClick}
            className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors flex-shrink-0"
          >
            {action.label}
          </button>
        )}

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
