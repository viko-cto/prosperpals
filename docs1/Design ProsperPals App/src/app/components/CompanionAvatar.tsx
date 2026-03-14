import { GoldieAvatar, FinAvatar } from "./GoldieAvatar";

interface CompanionAvatarProps {
  type: 'goldie' | 'fin';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

export function CompanionAvatar({ type, size = 'md', animate = false }: CompanionAvatarProps) {
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 80,
  };

  const pixelSize = sizeMap[size];

  if (type === 'goldie') {
    return <GoldieAvatar size={pixelSize} animate={animate} />;
  } else {
    return <FinAvatar size={pixelSize} animate={animate} />;
  }
}