import { motion } from "motion/react";
import { Sparkles, MessageCircle, ThumbsUp, AlertTriangle, GraduationCap, Lightbulb } from "lucide-react";

// SIZE VARIANTS
type SizeVariant = "avatar" | "medium" | "hero";

const sizeClasses = {
  avatar: { container: "w-8 h-8", emoji: "text-xl", icon: "w-3 h-3" },
  medium: { container: "w-16 h-16", emoji: "text-4xl", icon: "w-5 h-5" },
  hero: { container: "w-52 h-52", emoji: "text-8xl", icon: "w-10 h-10" },
};

// ============================================
// GOLDIE EMOTION VARIANTS
// ============================================

// 1. HAPPY/DEFAULT
export function GoldieHappy({ size = "medium" }: { size?: SizeVariant }) {
  const s = sizeClasses[size];
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className={`${s.container} bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.3)] relative`}
    >
      <div className={s.emoji}>🪙</div>
      {/* Friendly glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-yellow-300/30 rounded-full blur-sm"
      />
    </motion.div>
  );
}

// 2. EXCITED
export function GoldieExcited({ size = "medium" }: { size?: SizeVariant }) {
  const s = sizeClasses[size];
  return (
    <motion.div className="relative inline-block">
      <motion.div
        animate={{
          y: [0, -15, 0, -10, 0],
          scale: [1, 1.1, 1, 1.05, 1],
        }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        className={`${s.container} bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.5)]`}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.4, repeat: Infinity }}
          className={s.emoji}
        >
          🪙
        </motion.div>
      </motion.div>

      {/* Sparkles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, Math.cos((i * 90 * Math.PI) / 180) * 40],
            y: [0, Math.sin((i * 90 * Math.PI) / 180) * 40],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          className="absolute top-1/2 left-1/2"
        >
          <Sparkles className={`${s.icon} text-yellow-400`} />
        </motion.div>
      ))}
    </motion.div>
  );
}

// 3. THINKING
export function GoldieThinking({ size = "medium" }: { size?: SizeVariant }) {
  const s = sizeClasses[size];
  return (
    <div className="relative inline-block">
      <motion.div
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={`${s.container} bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.3)]`}
      >
        <div className={s.emoji}>🪙</div>
      </motion.div>

      {/* Thought bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg"
      >
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm font-bold text-gray-700"
        >
          ...
        </motion.div>
      </motion.div>

      {/* Hand on chin gesture (using emoji) */}
      <motion.div
        animate={{ rotate: [0, 5, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className={`absolute -bottom-1 -right-1 ${size === 'hero' ? 'text-3xl' : size === 'medium' ? 'text-xl' : 'text-xs'}`}
      >
        🤔
      </motion.div>
    </div>
  );
}

// 4. CONCERNED
export function GoldieConcerned({ size = "medium" }: { size?: SizeVariant }) {
  const s = sizeClasses[size];
  return (
    <motion.div
      animate={{ y: [0, 3, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className={`${s.container} bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.2)] relative`}
    >
      <motion.div
        animate={{ scale: [1, 0.95, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={s.emoji}
      >
        🪙
      </motion.div>

      {/* Concerned expression overlay */}
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`absolute ${size === 'hero' ? 'text-4xl top-2' : size === 'medium' ? 'text-2xl top-0' : 'text-sm -top-1'}`}
      >
        😟
      </motion.div>
    </motion.div>
  );
}

// 5. CELEBRATING
export function GoldieCelebrating({ size = "medium" }: { size?: SizeVariant }) {
  const s = sizeClasses[size];
  return (
    <div className="relative inline-block">
      <motion.div
        animate={{
          rotate: [0, -10, 10, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.5 }}
        className={`${s.container} bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.6)]`}
      >
        <div className={s.emoji}>🪙</div>
      </motion.div>

      {/* Party hat */}
      <motion.div
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className={`absolute -top-2 ${size === 'hero' ? 'text-5xl -right-4' : size === 'medium' ? 'text-3xl -right-2' : 'text-lg -right-1'}`}
      >
        🎉
      </motion.div>

      {/* Confetti */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, 20],
            x: [0, (i % 2 === 0 ? 1 : -1) * 10],
            opacity: [1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          className="absolute top-0 left-1/2"
          style={{ fontSize: size === 'hero' ? '16px' : size === 'medium' ? '10px' : '6px' }}
        >
          {['🎊', '✨', '🎉'][i % 3]}
        </motion.div>
      ))}
    </div>
  );
}

// 6. SLEEPING
export function GoldieSleeping({ size = "medium" }: { size?: SizeVariant }) {
  const s = sizeClasses[size];
  return (
    <div className="relative inline-block">
      <motion.div
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={`${s.container} bg-gradient-to-br from-yellow-400/70 to-yellow-600/70 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.2)]`}
      >
        <div className={s.emoji}>🪙</div>
      </motion.div>

      {/* Sleeping emoji overlay */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${size === 'hero' ? 'text-4xl' : size === 'medium' ? 'text-2xl' : 'text-sm'}`}>
        😴
      </div>

      {/* Zzz */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0, 1, 0],
            y: [-10, -30],
            x: [0, 10],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
          }}
          className={`absolute -top-4 -right-2 font-bold ${size === 'hero' ? 'text-3xl' : size === 'medium' ? 'text-xl' : 'text-xs'}`}
          style={{ color: '#fbbf24' }}
        >
          Z
        </motion.div>
      ))}
    </div>
  );
}

// 7. ENCOURAGING
export function GoldieEncouraging({ size = "medium" }: { size?: SizeVariant }) {
  const s = sizeClasses[size];
  return (
    <div className="relative inline-block">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className={`${s.container} bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.4)]`}
      >
        <div className={s.emoji}>🪙</div>
      </motion.div>

      {/* Thumbs up */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -10, 0],
        }}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.8 }}
        className={`absolute -bottom-1 -right-1 ${size === 'hero' ? 'text-5xl' : size === 'medium' ? 'text-3xl' : 'text-xl'}`}
      >
        👍
      </motion.div>

      {/* Cheering effect */}
      <motion.div
        animate={{ scale: [0, 1.5], opacity: [0.8, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="absolute inset-0 bg-yellow-400/30 rounded-full"
      />
    </div>
  );
}

// ============================================
// FIN EMOTION VARIANTS
// ============================================

// 1. ANALYTICAL/DEFAULT
export function FinAnalytical({ size = "medium" }: { size?: SizeVariant }) {
  const s = sizeClasses[size];
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      className={`${s.container} bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] relative`}
    >
      <div className={s.emoji}>🐋</div>
      
      {/* Glasses overlay */}
      <div className={`absolute top-1/3 ${size === 'hero' ? 'text-4xl' : size === 'medium' ? 'text-2xl' : 'text-sm'}`}>
        👓
      </div>
    </motion.div>
  );
}

// 2. TEACHING
export function FinTeaching({ size = "medium" }: { size?: SizeVariant }) {
  const s = sizeClasses[size];
  return (
    <div className="relative inline-block">
      <motion.div
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={`${s.container} bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.4)]`}
      >
        <div className={s.emoji}>🐋</div>
      </motion.div>

      {/* Pointing gesture */}
      <motion.div
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className={`absolute -right-2 top-1/2 -translate-y-1/2 ${size === 'hero' ? 'text-4xl' : size === 'medium' ? 'text-2xl' : 'text-lg'}`}
      >
        👉
      </motion.div>

      {/* Lightbulb (idea) */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`absolute -top-2 -left-2 ${size === 'hero' ? 'text-3xl' : size === 'medium' ? 'text-xl' : 'text-sm'}`}
      >
        💡
      </motion.div>
    </div>
  );
}

// 3. IMPRESSED
export function FinImpressed({ size = "medium" }: { size?: SizeVariant }) {
  const s = sizeClasses[size];
  return (
    <div className="relative inline-block">
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className={`${s.container} bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]`}
      >
        <div className={s.emoji}>🐋</div>
      </motion.div>

      {/* Raised eyebrows expression */}
      <motion.div
        animate={{ y: [-2, 0, -2] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className={`absolute top-1/4 ${size === 'hero' ? 'text-3xl' : size === 'medium' ? 'text-xl' : 'text-sm'}`}
      >
        😮
      </motion.div>

      {/* Exclamation bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0, 1.2, 1, 0.8],
          y: [0, -10],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`absolute -top-4 -right-4 bg-white rounded-full ${size === 'hero' ? 'w-12 h-12 text-3xl' : size === 'medium' ? 'w-8 h-8 text-xl' : 'w-5 h-5 text-xs'} flex items-center justify-center font-bold text-blue-600 shadow-lg`}
      >
        !
      </motion.div>
    </div>
  );
}

// 4. THINKING
export function FinThinking({ size = "medium" }: { size?: SizeVariant }) {
  const s = sizeClasses[size];
  return (
    <div className="relative inline-block">
      <motion.div
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`${s.container} bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]`}
      >
        <div className={s.emoji}>🐋</div>
      </motion.div>

      {/* Looking up */}
      <motion.div
        animate={{ y: [-1, 1, -1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`absolute top-1/3 ${size === 'hero' ? 'text-3xl' : size === 'medium' ? 'text-xl' : 'text-sm'}`}
      >
        🤔
      </motion.div>

      {/* Calculation symbols */}
      {['+', '×', '='].map((symbol, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0, 1, 0],
            y: [-20, -40],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
          }}
          className={`absolute -top-4 ${i === 0 ? '-left-2' : i === 1 ? 'left-1/2' : '-right-2'} font-bold text-blue-400 ${size === 'hero' ? 'text-2xl' : size === 'medium' ? 'text-lg' : 'text-xs'}`}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
}

// 5. CELEBRATING
export function FinCelebrating({ size = "medium" }: { size?: SizeVariant }) {
  const s = sizeClasses[size];
  return (
    <div className="relative inline-block">
      <motion.div
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className={`${s.container} bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)]`}
      >
        <div className={s.emoji}>🐋</div>
      </motion.div>

      {/* Graduation cap */}
      <motion.div
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className={`absolute -top-2 -right-2 ${size === 'hero' ? 'text-5xl' : size === 'medium' ? 'text-3xl' : 'text-xl'}`}
      >
        🎓
      </motion.div>

      {/* Diploma */}
      <motion.div
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className={`absolute -bottom-1 -left-1 ${size === 'hero' ? 'text-4xl' : size === 'medium' ? 'text-2xl' : 'text-lg'}`}
      >
        📜
      </motion.div>

      {/* Stars */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          className={`absolute ${size === 'hero' ? 'text-2xl' : size === 'medium' ? 'text-lg' : 'text-xs'}`}
          style={{
            top: `${i * 25}%`,
            left: `${100 + (i % 2) * 20}%`,
          }}
        >
          ⭐
        </motion.div>
      ))}
    </div>
  );
}

// 6. WARNING
export function FinWarning({ size = "medium" }: { size?: SizeVariant }) {
  const s = sizeClasses[size];
  return (
    <div className="relative inline-block">
      <motion.div
        animate={{ x: [-3, 3, -3] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className={`${s.container} bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.4)] ring-2 ring-orange-400/50`}
      >
        <div className={s.emoji}>🐋</div>
      </motion.div>

      {/* Serious face overlay */}
      <div className={`absolute top-1/3 ${size === 'hero' ? 'text-3xl' : size === 'medium' ? 'text-xl' : 'text-sm'}`}>
        😐
      </div>

      {/* Warning icon */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 1, repeat: Infinity }}
        className={`absolute -top-2 -right-2 bg-orange-500 rounded-full ${size === 'hero' ? 'w-12 h-12' : size === 'medium' ? 'w-8 h-8' : 'w-5 h-5'} flex items-center justify-center shadow-lg`}
      >
        <AlertTriangle className={`${s.icon} text-white`} />
      </motion.div>

      {/* Caution gesture (hand) */}
      <motion.div
        animate={{ rotate: [0, -15, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className={`absolute -bottom-1 -right-1 ${size === 'hero' ? 'text-4xl' : size === 'medium' ? 'text-2xl' : 'text-lg'}`}
      >
        ✋
      </motion.div>
    </div>
  );
}

// ============================================
// UTILITY: DYNAMIC COMPANION
// ============================================

export function CompanionEmotion({
  companion = "goldie",
  emotion = "happy",
  size = "medium",
}: {
  companion?: "goldie" | "fin";
  emotion?: string;
  size?: SizeVariant;
}) {
  if (companion === "goldie") {
    switch (emotion) {
      case "excited":
        return <GoldieExcited size={size} />;
      case "thinking":
        return <GoldieThinking size={size} />;
      case "concerned":
        return <GoldieConcerned size={size} />;
      case "celebrating":
        return <GoldieCelebrating size={size} />;
      case "sleeping":
        return <GoldieSleeping size={size} />;
      case "encouraging":
        return <GoldieEncouraging size={size} />;
      default:
        return <GoldieHappy size={size} />;
    }
  } else {
    switch (emotion) {
      case "teaching":
        return <FinTeaching size={size} />;
      case "impressed":
        return <FinImpressed size={size} />;
      case "thinking":
        return <FinThinking size={size} />;
      case "celebrating":
        return <FinCelebrating size={size} />;
      case "warning":
        return <FinWarning size={size} />;
      default:
        return <FinAnalytical size={size} />;
    }
  }
}
