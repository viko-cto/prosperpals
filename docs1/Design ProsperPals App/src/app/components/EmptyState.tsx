import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon: Icon,
  emoji,
  title,
  description,
  primaryAction,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      {/* Icon or Emoji */}
      <div className="mb-6">
        {emoji ? (
          <div className="text-6xl">{emoji}</div>
        ) : Icon ? (
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <Icon className="w-8 h-8 text-white/40" />
          </div>
        ) : null}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>

      {/* Description */}
      <p className="text-white/60 max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-[#1a1a2e] font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] min-h-[44px]"
          >
            {primaryAction.label}
          </button>
        )}
        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-colors min-h-[44px]"
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
}
