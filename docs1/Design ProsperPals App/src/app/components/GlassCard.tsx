import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div 
      className={`rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg ${className}`}
      style={{
        backdropFilter: 'blur(12px)',
      }}
    >
      {children}
    </div>
  );
}
