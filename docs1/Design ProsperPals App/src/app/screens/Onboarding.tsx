import { useNavigate } from "react-router";
import { Sparkles, ArrowRight, Shield, Zap, MessageCircle } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { GoldieAvatar } from "../components/GoldieAvatar";
import { FinAvatar } from "../components/FinAvatar";

/**
 * MICRO-INTERACTION ANNOTATIONS
 * 
 * SCREEN ENTRY ANIMATION (on first load):
 * Stagger sequence — each element fades in from y+20px to y+0, opacity 0→1:
 *   1. ProsperPals logo + wordmark: delay 0ms, duration 400ms, ease-out-quart
 *   2. Hero headline: delay 80ms, duration 400ms, ease-out-quart
 *   3. Subheadline: delay 160ms, duration 350ms, ease-out-quart
 *   4. "Get Started" button: delay 240ms, duration 350ms, ease-out-quart
 *   5. "Explore Learning" button: delay 280ms, duration 350ms, ease-out-quart
 *   6. Companion section: delay 360ms, duration 400ms, ease-out-quart
 * 
 * COMPANION CARDS (hover):
 *   - translateY(-4px), box-shadow lift, border brightens
 *   - Duration: 200ms, ease-out-quart
 *   - Avatar scales to 1.08, glow ring brightens
 *   - "Chat with →" arrow nudges right +3px
 * 
 * PRIMARY BUTTON ("Get Started"):
 *   - Hover: scale 1.03, brightness 1.1, shadow appears
 *   - Active: scale 0.97, brightness 0.95
 *   - Release: spring bounce back
 *   - Focus: gold outline with glow
 * 
 * SCROLL ANIMATIONS:
 *   - IntersectionObserver triggers at 20% viewport
 *   - Children animate from opacity 0, translateY(16px)
 *   - Stagger 60ms between children
 */

export function Onboarding() {
  const navigate = useNavigate();
  const companionRef = useRef(null);
  const companionInView = useInView(companionRef, { once: true, amount: 0.2 });

  // Easing functions
  const easeOutQuart = [0.25, 1, 0.5, 1];
  const springBounce = [0.34, 1.56, 0.64, 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] text-white overflow-hidden relative">
      {/* Animated background constellation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        {/* ELEMENT 1: Logo + Wordmark - Delay 0ms, Duration 400ms */}
        <motion.div
          className="flex items-center justify-between mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOutQuart, delay: 0 }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-[#FFD700]" />
            <h1 
              className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-[#FFD700] to-[#F59E0B] bg-clip-text"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}
            >
              ProsperPals
            </h1>
          </div>
          
          {/* SIGN IN LINK - Hover: color change + underline */}
          <motion.button
            className="text-white text-[15px] font-semibold hover:text-[#FFD700] relative group"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.12, ease: easeOutQuart }}
          >
            Sign In
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] group-hover:w-full transition-all duration-200" />
          </motion.button>
        </motion.div>

        {/* Hero Section */}
        <div className="text-center mb-20">
          
          {/* ELEMENT 2: Hero Headline - Delay 80ms, Duration 400ms */}
          <motion.h2
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOutQuart, delay: 0.08 }}
          >
            Your Journey to
            <br />
            <span className="bg-gradient-to-r from-[#FFD700] via-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
              Financial Freedom
            </span>
            <br />
            Starts Here
          </motion.h2>
          
          {/* ELEMENT 3: Subheadline - Delay 160ms, Duration 350ms */}
          <motion.p
            className="text-xl md:text-2xl text-[#9CA3AF] max-w-3xl mx-auto mb-12"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: easeOutQuart, delay: 0.16 }}
          >
            Meet Goldie and Fin, your AI companions who make managing money feel empowering, 
            not overwhelming. Together, we'll build the financial future you deserve.
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            
            {/* ELEMENT 4: PRIMARY BUTTON "Get Started" - Delay 240ms */}
            <PrimaryButton
              onClick={() => navigate("/chat-goldie")}
              delay={0.24}
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-150" />
            </PrimaryButton>

            {/* ELEMENT 5: SECONDARY BUTTON "Explore Learning" - Delay 280ms */}
            <SecondaryButton
              onClick={() => navigate("/learning-hub")}
              delay={0.28}
            >
              Explore Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-150" />
            </SecondaryButton>
          </div>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 text-sm text-white/50"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Bank-level security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Real-time insights</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>AI-powered guidance</span>
            </div>
          </motion.div>
        </div>

        {/* ELEMENT 6: Companion Section - Delay 360ms */}
        <motion.div
          ref={companionRef}
          className="max-w-6xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOutQuart, delay: 0.36 }}
        >
          <div className="text-center mb-10">
            <h3 
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              Meet Your AI Companions
            </h3>
            <p 
              className="text-[#9CA3AF] text-[16px]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              Two specialized guides to help you master your finances
            </p>
          </div>
          
          {/* Companion Cards with Scroll Animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* GOLDIE CARD - Hover interactions */}
            <CompanionCard
              companion="goldie"
              title="Chat with Goldie"
              subtitle="Your daily budgeting coach"
              description="Goldie helps you track spending, set realistic budgets, and build healthy money habits with warmth and encouragement."
              onClick={() => navigate("/chat-goldie")}
              delay={companionInView ? 0 : 0}
            />

            {/* FIN CARD - Hover interactions */}
            <CompanionCard
              companion="fin"
              title="Chat with Fin"
              subtitle="Your investing education guide"
              description="Fin teaches you investment fundamentals, explains market concepts, and helps you build long-term wealth strategies."
              onClick={() => navigate("/chat-fin")}
              delay={companionInView ? 0.06 : 0}
            />
          </div>
        </motion.div>

        {/* Feature Cards - Scroll reveal */}
        <FeatureSection />
      </div>
    </div>
  );
}

/**
 * PRIMARY BUTTON COMPONENT
 * Hover: scale 1.03, brightness 1.1, shadow
 * Active: scale 0.97, brightness 0.95
 * Release: spring bounce
 * Focus: gold outline + glow
 */
function PrimaryButton({ 
  children, 
  onClick, 
  delay 
}: { 
  children: React.ReactNode; 
  onClick: () => void; 
  delay: number;
}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      className="group relative px-8 py-4 rounded-xl font-bold text-lg transition-all w-full sm:w-auto overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0f0f1a]"
      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1], delay }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.15, ease: [0.25, 1, 0.5, 1] }
      }}
      whileTap={{ 
        scale: 0.97,
        transition: { duration: 0.08, ease: [0.25, 1, 0.5, 1] }
      }}
    >
      {/* Background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#F59E0B] rounded-xl"
        animate={{
          filter: isPressed ? "brightness(0.95)" : "brightness(1.1)"
        }}
        transition={{ duration: 0.08 }}
      />
      
      {/* Glow effect on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#F59E0B] rounded-xl blur-lg opacity-0"
        whileHover={{ 
          opacity: 0.35,
          transition: { duration: 0.15 }
        }}
      />
      
      <span className="relative text-[#1a1a2e] flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

/**
 * SECONDARY BUTTON COMPONENT
 * Hover: background rgba(255,255,255,0.08), border brightens, scale 1.02
 * Active: scale 0.97
 * Release: spring bounce
 */
function SecondaryButton({ 
  children, 
  onClick, 
  delay 
}: { 
  children: React.ReactNode; 
  onClick: () => void; 
  delay: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="group px-8 py-4 rounded-xl font-bold text-lg transition-all w-full sm:w-auto bg-transparent border-2 border-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0f0f1a]"
      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1], delay }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.15, ease: [0.25, 1, 0.5, 1] }
      }}
      whileTap={{ 
        scale: 0.97,
        transition: { duration: 0.08 }
      }}
    >
      <span className="relative text-white flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

/**
 * COMPANION CARD COMPONENT
 * Hover: translateY(-4px), shadow lift, border brightens
 * Avatar: scale 1.08, glow ring brightens
 * Link arrow: nudges right +3px
 */
function CompanionCard({ 
  companion, 
  title, 
  subtitle,
  description, 
  onClick,
  delay
}: { 
  companion: "goldie" | "fin";
  title: string;
  subtitle: string;
  description: string;
  onClick: () => void;
  delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  const isGoldie = companion === "goldie";
  const bgColor = isGoldie ? "rgba(45,26,0,0.4)" : "rgba(74,144,217,0.15)";
  const borderDefault = isGoldie ? "rgba(255,215,0,0.2)" : "rgba(74,144,217,0.2)";
  const borderHover = isGoldie ? "rgba(255,215,0,0.3)" : "rgba(74,144,217,0.3)";
  const accentColor = isGoldie ? "#FFD700" : "#4A90D9";

  return (
    <motion.div
      className="relative cursor-pointer group"
      style={{ 
        backgroundColor: bgColor,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '16px',
        padding: '24px',
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1], delay }}
      whileHover={{ 
        y: -4,
        borderColor: borderHover,
        boxShadow: isGoldie 
          ? '0 12px 32px rgba(255,215,0,0.2)' 
          : '0 12px 32px rgba(74,144,217,0.2)',
        transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Avatar with hover scale */}
      <motion.div
        className="mb-4 inline-block"
        animate={{
          scale: isHovered ? 1.08 : 1.0,
        }}
        transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {isGoldie ? (
          <GoldieAvatar size={56} animate={isHovered} />
        ) : (
          <FinAvatar size={56} />
        )}
      </motion.div>

      <h3 
        className="text-[20px] font-bold text-white mb-1"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
      >
        {title}
      </h3>
      
      <p 
        className="text-[14px] mb-3"
        style={{ 
          fontFamily: 'Inter, sans-serif', 
          fontWeight: 600,
          color: accentColor
        }}
      >
        {subtitle}
      </p>
      
      <p 
        className="text-white/80 text-[15px] leading-relaxed mb-4"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
      >
        {description}
      </p>

      {/* Link with arrow nudge */}
      <motion.div 
        className="flex items-center gap-2 text-[14px] font-semibold"
        style={{ 
          fontFamily: 'Inter, sans-serif', 
          fontWeight: 600,
          color: accentColor
        }}
      >
        <span>Start chatting</span>
        <motion.div
          animate={{
            x: isHovered ? 3 : 0,
          }}
          transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * FEATURE SECTION
 * Scroll reveal with IntersectionObserver
 * Stagger 60ms between children
 */
function FeatureSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      title: "Budget Central",
      description: "Track spending categories, set flexible budgets, and get real-time alerts from Goldie.",
      icon: "🎯",
      link: "/budget-central"
    },
    {
      title: "Learning Hub",
      description: "Master financial concepts with Fin's interactive lessons and bite-sized modules.",
      icon: "📚",
      link: "/learning-hub"
    },
    {
      title: "Virtual Portfolio",
      description: "Practice investing with virtual money and learn by doing without any risk.",
      icon: "📈",
      link: "/portfolio"
    }
  ];

  return (
    <motion.div 
      ref={ref}
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center mb-10">
        <h3 
          className="text-3xl font-bold mb-3"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
        >
          Everything You Need
        </h3>
        <p 
          className="text-[#9CA3AF] text-[16px]"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
        >
          Powerful tools designed to help you thrive
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard 
            key={feature.title}
            feature={feature}
            index={index}
            inView={inView}
          />
        ))}
      </div>
    </motion.div>
  );
}

/**
 * FEATURE CARD
 * Hover: translateY(-2px), border brightens
 * "Explore →" arrow nudges right +4px
 * Active: scale 0.985
 */
function FeatureCard({ 
  feature, 
  index, 
  inView 
}: { 
  feature: any; 
  index: number; 
  inView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-[rgba(26,26,46,0.6)] backdrop-blur-lg rounded-2xl p-6 border cursor-pointer"
      style={{
        borderColor: isHovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.4, 
        ease: [0.25, 1, 0.5, 1],
        delay: inView ? index * 0.06 : 0
      }}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.18, ease: [0.25, 1, 0.5, 1] }
      }}
      whileTap={{ 
        scale: 0.985,
        transition: { duration: 0.08 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-5xl mb-4">{feature.icon}</div>
      <h4 
        className="text-[18px] font-bold text-white mb-2"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
      >
        {feature.title}
      </h4>
      <p 
        className="text-white/70 text-[14px] leading-relaxed mb-4"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
      >
        {feature.description}
      </p>
      
      <motion.div 
        className="flex items-center gap-2 text-[#FFD700] text-[14px] font-semibold"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
      >
        <span>Explore</span>
        <motion.div
          animate={{
            x: isHovered ? 4 : 0,
          }}
          transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
