interface FinAvatarProps {
  size?: number;
}

export function FinAvatar({ size = 40 }: FinAvatarProps) {
  return (
    <div
      className="rounded-full bg-gradient-to-br from-[#4A90D9] to-[#2563EB] flex items-center justify-center flex-shrink-0 shadow-[0_0_16px_rgba(74,144,217,0.4)]"
      style={{ width: size, height: size }}
    >
      <span 
        className="text-white font-extrabold" 
        style={{ 
          fontFamily: 'Inter, sans-serif', 
          fontWeight: 800,
          fontSize: size * 0.5 
        }}
      >
        F
      </span>
    </div>
  );
}
