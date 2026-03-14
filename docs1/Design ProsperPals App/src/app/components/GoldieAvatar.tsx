import { motion } from "motion/react";

interface GoldieAvatarProps {
  size?: number; // diameter in pixels
  animate?: boolean;
  className?: string;
}

export function GoldieAvatar({ size = 48, animate = false, className = "" }: GoldieAvatarProps) {
  const baseSize = size;
  const eyeSize = size * 0.15;
  const pupilSize = size * 0.08;
  const sparkleSize = size * 0.03;
  const beakSize = size * 0.12;
  const coinSize = size * 0.18;

  const AvatarContent = (
    <div
      className={`relative rounded-full ${className}`}
      style={{
        width: `${baseSize}px`,
        height: `${baseSize}px`,
        background: "radial-gradient(circle at 30% 30%, #FFD700 0%, #F59E0B 100%)",
        border: "2px solid rgba(255, 215, 0, 0.6)",
        boxShadow: "0 0 12px rgba(255, 215, 0, 0.4)",
      }}
    >
      {/* Feather texture pattern (background circles) */}
      <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
        <div
          className="absolute rounded-full"
          style={{
            width: "60%",
            height: "60%",
            top: "5%",
            left: "5%",
            background: "radial-gradient(circle, rgba(255,237,78,0.8) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "50%",
            height: "50%",
            bottom: "10%",
            right: "10%",
            background: "radial-gradient(circle, rgba(255,200,50,0.6) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Owl Face */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: "70%", height: "70%" }}>
          {/* Eyes */}
          <div
            className="absolute bg-white rounded-full flex items-center justify-center"
            style={{
              width: `${eyeSize}px`,
              height: `${eyeSize}px`,
              left: "25%",
              top: "30%",
              transform: "translateX(-50%)",
            }}
          >
            {/* Pupil */}
            <div
              className="bg-black rounded-full relative"
              style={{
                width: `${pupilSize}px`,
                height: `${pupilSize}px`,
              }}
            >
              {/* Sparkle highlight */}
              <div
                className="absolute bg-[#FFD700] rounded-full"
                style={{
                  width: `${sparkleSize}px`,
                  height: `${sparkleSize}px`,
                  top: "20%",
                  left: "30%",
                }}
              />
            </div>
          </div>

          {/* Right Eye */}
          <div
            className="absolute bg-white rounded-full flex items-center justify-center"
            style={{
              width: `${eyeSize}px`,
              height: `${eyeSize}px`,
              right: "25%",
              top: "30%",
              transform: "translateX(50%)",
            }}
          >
            {/* Pupil */}
            <div
              className="bg-black rounded-full relative"
              style={{
                width: `${pupilSize}px`,
                height: `${pupilSize}px`,
              }}
            >
              {/* Sparkle highlight */}
              <div
                className="absolute bg-[#FFD700] rounded-full"
                style={{
                  width: `${sparkleSize}px`,
                  height: `${sparkleSize}px`,
                  top: "20%",
                  left: "30%",
                }}
              />
            </div>
          </div>

          {/* Beak (downward triangle) */}
          <div
            className="absolute"
            style={{
              left: "50%",
              top: "55%",
              transform: "translate(-50%, -50%)",
              width: 0,
              height: 0,
              borderLeft: `${beakSize / 2}px solid transparent`,
              borderRight: `${beakSize / 2}px solid transparent`,
              borderTop: `${beakSize}px solid #E8A020`,
            }}
          />

          {/* Small coin below chin */}
          <div
            className="absolute bg-gradient-to-br from-[#FFD700] to-[#F59E0B] rounded-full flex items-center justify-center border border-[#E8A020]"
            style={{
              width: `${coinSize}px`,
              height: `${coinSize}px`,
              left: "50%",
              bottom: "-5%",
              transform: "translateX(-50%)",
              fontSize: `${coinSize * 0.4}px`,
              fontWeight: "bold",
              color: "#8B6914",
            }}
          >
            GP
          </div>
        </div>
      </div>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        animate={{
          y: [0, -5, 0],
          rotate: [0, -3, 3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {AvatarContent}
      </motion.div>
    );
  }

  return AvatarContent;
}

interface FinAvatarProps {
  size?: number;
  animate?: boolean;
  className?: string;
}

export function FinAvatar({ size = 48, animate = false, className = "" }: FinAvatarProps) {
  const baseSize = size;
  const fontSize = size * 0.5;

  const AvatarContent = (
    <div
      className={`relative rounded-full ${className}`}
      style={{
        width: `${baseSize}px`,
        height: `${baseSize}px`,
        background: "radial-gradient(circle at 30% 30%, #4A90D9 0%, #2563EB 100%)",
        border: "2px solid rgba(74, 144, 217, 0.6)",
        boxShadow: "0 0 12px rgba(74, 144, 217, 0.4)",
      }}
    >
      {/* Abstract "F" monogram or simple fox face */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="font-bold text-white"
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: "Inter, sans-serif",
          }}
        >
          F
        </div>
      </div>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {AvatarContent}
      </motion.div>
    );
  }

  return AvatarContent;
}
