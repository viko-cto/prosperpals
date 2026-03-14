import { motion } from "motion/react";
import { Check } from "lucide-react";
import { ReactNode } from "react";

interface PremiumCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string | ReactNode;
  variant?: "gold" | "blue";
}

export function PremiumCheckbox({ 
  checked, 
  onChange, 
  label, 
  variant = "gold" 
}: PremiumCheckboxProps) {
  const gradientColors = variant === "gold" 
    ? "from-yellow-400 to-yellow-500"
    : "from-blue-400 to-blue-500";

  const glowColor = variant === "gold"
    ? "rgba(255, 215, 0, 0.4)"
    : "rgba(59, 130, 246, 0.4)";

  return (
    <label className="flex items-start gap-2.5 cursor-pointer group min-h-[44px]">
      {/* Custom Checkbox */}
      <div className="relative flex-shrink-0 mt-0.5">{/* Added mt-0.5 for better visual alignment with first line of text */}
        {/* Hidden native checkbox for accessibility */}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        
        {/* Custom checkbox visual */}
        <motion.div
          className={`
            relative w-[18px] h-[18px] rounded-[5px] border-[1.5px] 
            transition-all duration-150 ease-out
            ${checked 
              ? `bg-gradient-to-br ${gradientColors} border-transparent` 
              : 'bg-transparent border-white/20'
            }
            peer-focus-visible:ring-2 peer-focus-visible:ring-white/60 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#1a1a2e]
            group-hover:border-white/40
            ${checked && 'group-hover:brightness-110'}
          `}
          style={{
            boxShadow: checked 
              ? `0 0 8px ${glowColor}`
              : undefined,
          }}
          whileHover={{
            boxShadow: checked 
              ? `0 0 12px ${glowColor}`
              : "0 0 6px rgba(255, 255, 255, 0.1)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Check icon */}
          <motion.div
            initial={false}
            animate={{
              scale: checked ? 1 : 0,
              opacity: checked ? 1 : 0,
            }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Check className="w-3 h-3 text-white stroke-[3]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Label */}
      <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors select-none">
        {label}
      </span>
    </label>
  );
}