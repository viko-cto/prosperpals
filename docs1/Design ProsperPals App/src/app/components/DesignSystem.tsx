import { motion } from "motion/react";
import { ReactNode } from "react";

// Card Component
interface CardProps {
  children: ReactNode;
  className?: string;
  gradient?: "gold" | "blue" | "purple" | "green" | "none";
  hover?: boolean;
}

export function Card({ children, className = "", gradient = "none", hover = false }: CardProps) {
  const gradients = {
    gold: "from-yellow-500/10 to-yellow-600/5 border-yellow-500/20",
    blue: "from-blue-500/10 to-blue-600/5 border-blue-500/20",
    purple: "from-purple-500/10 to-purple-600/5 border-purple-500/20",
    green: "from-green-500/10 to-green-600/5 border-green-500/20",
    none: "from-white/5 to-white/[0.02] border-white/10",
  };

  return (
    <div
      className={`bg-gradient-to-br ${gradients[gradient]} backdrop-blur-xl border rounded-xl ${
        hover ? "hover:border-opacity-50 transition-all cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Page Header Component
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, icon, action }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {icon && <span className="text-2xl">{icon}</span>}
            <h1 className="text-3xl font-bold text-white">{title}</h1>
          </div>
          {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  gradient?: "gold" | "blue" | "purple" | "green";
}

export function StatCard({ label, value, icon, trend, gradient = "gold" }: StatCardProps) {
  return (
    <Card gradient={gradient} className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white/60">{label}</span>
        <div className="text-white/60">{icon}</div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        {trend && (
          <span
            className={`text-xs font-semibold ${
              trend.positive ? "text-green-400" : "text-red-400"
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
    </Card>
  );
}

// Button Component
interface ButtonProps {
  children: ReactNode;
  variant?: "primary-gold" | "primary-blue" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary-gold",
  size = "md",
  onClick,
  className = "",
  icon,
}: ButtonProps) {
  const variants = {
    "primary-gold": "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]",
    "primary-blue": "bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`rounded-xl font-semibold transition-all flex items-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon}
      {children}
    </motion.button>
  );
}

// Empty State Component
interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-white/40">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/60 max-w-md mb-6">{description}</p>
      {action}
    </div>
  );
}

// Companion Message Component
interface CompanionMessageProps {
  companion: "goldie" | "fin";
  message: string;
  actions?: ReactNode;
}

export function CompanionMessage({ companion, message, actions }: CompanionMessageProps) {
  const config = {
    goldie: {
      avatar: "🪙",
      name: "Goldie",
      gradient: "from-yellow-500/10 to-yellow-600/5",
      border: "border-yellow-500/20",
    },
    fin: {
      avatar: "🐋",
      name: "Fin",
      gradient: "from-blue-500/10 to-blue-600/5",
      border: "border-blue-500/20",
    },
  };

  const { avatar, name, gradient, border } = config[companion];

  return (
    <div className={`bg-gradient-to-br ${gradient} border ${border} rounded-xl p-4`}>
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${companion === "goldie" ? "from-yellow-400 to-yellow-600" : "from-blue-400 to-blue-600"} flex items-center justify-center text-xl flex-shrink-0`}>
          {avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white/80 mb-1">{name}</p>
          <p className="text-sm text-white/90 leading-relaxed">{message}</p>
        </div>
      </div>
      {actions && <div className="mt-3">{actions}</div>}
    </div>
  );
}

// Progress Bar Component
interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  gradient?: "gold" | "blue" | "green";
}

export function ProgressBar({
  value,
  max,
  label,
  showPercentage = true,
  gradient = "gold",
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const gradients = {
    gold: "from-yellow-400 to-yellow-500",
    blue: "from-blue-400 to-blue-500",
    green: "from-green-400 to-green-500",
  };

  return (
    <div>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/70">{label}</span>
          {showPercentage && (
            <span className="text-sm font-semibold text-white">{percentage.toFixed(0)}%</span>
          )}
        </div>
      )}
      <div className="relative w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-2 rounded-full bg-gradient-to-r ${gradients[gradient]}`}
        />
      </div>
    </div>
  );
}

// Badge Component
interface BadgeProps {
  children: ReactNode;
  variant?: "gold" | "blue" | "green" | "red" | "default";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    gold: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
    blue: "bg-blue-500/20 border-blue-500/30 text-blue-400",
    green: "bg-green-500/20 border-green-500/30 text-green-400",
    red: "bg-red-500/20 border-red-500/30 text-red-400",
    default: "bg-white/10 border-white/20 text-white/70",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

// Input Component
interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "number" | "email" | "password";
  icon?: ReactNode;
}

export function Input({ label, placeholder, value, onChange, type = "text", icon }: InputProps) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-white/80 mb-2">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">{icon}</div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500/50 transition-colors ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
    </div>
  );
}
