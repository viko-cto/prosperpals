import { motion } from "motion/react";
import { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "destructive";
  size?: "default" | "mobile";
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "default",
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = "font-bold text-[15px] rounded-xl transition-all duration-150 flex items-center justify-center gap-2";
  
  const heightStyles = size === "mobile" ? "h-11" : "h-12";
  
  const widthStyles = fullWidth ? "w-full" : "";

  const variantStyles = {
    primary: `
      bg-gradient-to-br from-[#FFD700] to-[#F59E0B] 
      text-black
      shadow-[0_2px_12px_rgba(255,215,0,0.3)]
      ${disabled ? "opacity-40 cursor-not-allowed" : "hover:brightness-110 active:brightness-95"}
    `,
    secondary: `
      bg-transparent 
      border-[1.5px] border-[rgba(255,255,255,0.25)]
      text-white
      font-semibold
      ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.4)]"}
    `,
    destructive: `
      bg-transparent
      border-[1.5px] border-[rgba(239,68,68,0.5)]
      text-[#EF4444]
      font-semibold
      ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-[rgba(239,68,68,0.1)]"}
    `,
  };

  const ButtonContent = (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${heightStyles}
        ${widthStyles}
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );

  if (disabled) {
    return ButtonContent;
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={widthStyles}>
      {ButtonContent}
    </motion.div>
  );
}
