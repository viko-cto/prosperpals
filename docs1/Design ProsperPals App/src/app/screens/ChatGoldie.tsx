import { Send, Paperclip, Mic, Check } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { GoldieAvatar } from "../components/GoldieAvatar";

/**
 * MICRO-INTERACTION ANNOTATIONS FOR CHAT WITH GOLDIE
 * 
 * SCREEN ENTRY:
 *   - Top chat header: slides down from y-20px, opacity 0→1, 300ms ease-out-quart
 *   - Chat messages: staggered fade-in from bottom, each message delays 60ms
 *   - Right sidebar: slides in from right +24px→0, opacity 0→1, delay 150ms, 300ms
 * 
 * GOLDIE AVATAR (header, 56px):
 *   - Idle: subtle float translateY(0)→translateY(-4px)→translateY(0), 3s infinite ease-in-out
 *   - New message: pulse scale 1.0→1.12→1.0, glow brightens, 400ms spring
 *   - Hover: scale 1.0→1.06, glow brightens, 200ms ease-out-quart
 * 
 * ACTIVE NOW INDICATOR:
 *   - Opacity 0.6→1.0→0.6, 2000ms infinite
 *   - When typing: 800ms faster pulse
 *   - Hover tooltip: "Goldie is active" appears after 400ms, 150ms ease-out
 * 
 * CHAT BUBBLES (incoming - Goldie):
 *   - Entry: translateX(-16px)→0, opacity 0→1, 250ms ease-out-quart
 *   - Avatar appears 50ms before bubble
 * 
 * CHAT BUBBLES (outgoing - user):
 *   - Entry: translateX(+16px)→0, opacity 0→1, 200ms ease-out-quart
 * 
 * TYPING INDICATOR:
 *   - Three dots: translateY(0)→translateY(-6px)→0, 600ms ease-in-out, stagger 100ms, infinite
 *   - Bubble entry: same as incoming message
 *   - Exit: opacity 1→0, scale 1→0.8, 150ms ease-in
 * 
 * QUICK-REPLY CHIPS:
 *   - Entry: stagger from y+8px, opacity 0→1, 40ms between chips, 200ms ease-out-quart
 *   - Hover: background brightens, border brightens, text→gold, scale 1.0→1.04, 120ms
 *   - Active: scale 1.04→0.95, 80ms
 *   - Selected: scale bounce 0.95→1.06→1.0, 350ms spring, checkmark fades in
 * 
 * PRIMARY CTA ("Yes, remind me"):
 *   - Same as global primary button + sparkle burst on tap
 * 
 * SECONDARY CTA ("No thanks"):
 *   - On tap: button fades out, card height collapses, 200ms ease-in-out
 * 
 * CHAT INPUT:
 *   - Focus: border→gold, shadow appears, 150ms ease-out-quart
 *   - Typing: send button opacity 0.4→1.0, scale 0.8→1.0, 200ms spring
 *   - Send tap: scale 1.0→0.85→1.0, arrow rotates +15deg, 300ms spring
 *   - Empty send: input shakes translateX(-4px, +4px, -4px, +4px, 0), 300ms
 * 
 * QUICK STATS SIDEBAR:
 *   - Hover: border brightens, translateY(-2px), 180ms ease-out-quart
 *   - Number values: count up from 0 over 600ms ease-out
 *   - Progress bar: fills 0%→76% over 800ms ease-out-quart
 */

interface Message {
  id: string;
  sender: "goldie" | "user";
  content: string;
  timestamp: string;
  quickReplies?: string[];
  hasChart?: boolean;
  ctaButtons?: { primary: string; secondary: string };
}

export function ChatGoldie() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "goldie",
      content: "I noticed a €45 charge at H&M. Want me to categorize this?",
      timestamp: "2:15 PM",
      quickReplies: ["Clothing", "Shopping", "Other"]
    },
    {
      id: "2",
      sender: "user",
      content: "Clothing",
      timestamp: "2:16 PM"
    },
    {
      id: "3",
      sender: "goldie",
      content: "Got it! 👕 Your clothing budget is at €120/€150 this month. You're doing great!",
      timestamp: "2:16 PM"
    },
    {
      id: "4",
      sender: "goldie",
      content: "Quick tip: There's a sale season coming next week. Want me to remind you to wait?",
      timestamp: "2:17 PM",
      ctaButtons: { primary: "Yes, remind me", secondary: "No thanks" }
    },
    {
      id: "5",
      sender: "user",
      content: "Yes, remind me",
      timestamp: "2:18 PM"
    },
    {
      id: "6",
      sender: "goldie",
      content: "Done! I'll ping you on Friday. In the meantime, here's what €45 could become if invested for 10 years... 💡",
      timestamp: "2:18 PM",
      hasChart: true
    }
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [shouldShake, setShouldShake] = useState(false);

  const compoundData = [
    { year: 0, value: 45 },
    { year: 2, value: 52 },
    { year: 4, value: 60 },
    { year: 6, value: 69 },
    { year: 8, value: 78 },
    { year: 10, value: 87 },
  ];

  const easeOutQuart = [0.25, 1, 0.5, 1];
  const springBounce = [0.34, 1.56, 0.64, 1];

  const handleSend = () => {
    if (inputValue.trim()) {
      // Send logic
      setInputValue("");
    } else {
      // Shake animation on empty send
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 300);
    }
  };

  return (
    <div className="flex h-screen bg-[#0f0f1a]">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        
        {/* HEADER - Slides down from y-20px */}
        <motion.div
          className="border-b border-white/10 p-6 hover:bg-[rgba(255,215,0,0.03)] transition-colors duration-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeOutQuart }}
        >
          <div className="flex items-center gap-3">
            {/* GOLDIE AVATAR - Idle float animation + pulse on new message + hover scale */}
            <GoldieAvatarHeader />
            
            <div>
              <h1 
                className="text-xl font-bold text-white"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                Goldie
              </h1>
              <div className="flex items-center gap-2">
                {/* ACTIVE NOW INDICATOR - Pulse animation */}
                <ActiveIndicator isTyping={isTyping} />
                <span 
                  className="text-sm text-white/60"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  Active now
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CHAT MESSAGES - Staggered fade-in */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              index={index}
              selectedChip={selectedChip}
              onChipSelect={setSelectedChip}
            />
          ))}

          {/* TYPING INDICATOR */}
          {isTyping && <TypingIndicator />}
        </div>

        {/* CHAT INPUT BAR */}
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          inputRef={inputRef}
          shouldShake={shouldShake}
        />
      </div>

      {/* RIGHT SIDEBAR - Slides in from right */}
      <QuickStatsSidebar />
    </div>
  );
}

/**
 * GOLDIE AVATAR HEADER
 * Idle float + hover scale + pulse on new message
 */
function GoldieAvatarHeader() {
  return (
    <motion.div
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{
        scale: 1.06,
        transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] }
      }}
    >
      <GoldieAvatar size={56} animate />
    </motion.div>
  );
}

/**
 * ACTIVE NOW INDICATOR
 * Pulse animation, faster when typing
 */
function ActiveIndicator({ isTyping }: { isTyping: boolean }) {
  return (
    <motion.div
      className="relative w-2 h-2 bg-[#10B981] rounded-full group cursor-help"
      animate={{
        opacity: [0.6, 1.0, 0.6],
      }}
      transition={{
        duration: isTyping ? 0.8 : 2.0,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Tooltip on hover - appears after 400ms */}
      <motion.div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1a1a2e] border border-white/10 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
      >
        Goldie is active
      </motion.div>
    </motion.div>
  );
}

/**
 * MESSAGE BUBBLE
 * Incoming: slide from left, Outgoing: slide from right
 */
function MessageBubble({ 
  message, 
  index,
  selectedChip,
  onChipSelect
}: { 
  message: Message; 
  index: number;
  selectedChip: string | null;
  onChipSelect: (chip: string) => void;
}) {
  const isGoldie = message.sender === "goldie";
  const delay = index * 0.06; // 60ms stagger

  return (
    <motion.div
      className={`flex gap-4 ${!isGoldie ? "justify-end" : ""}`}
      initial={{ 
        opacity: 0, 
        x: isGoldie ? -16 : 16 
      }}
      animate={{ 
        opacity: 1, 
        x: 0 
      }}
      transition={{ 
        duration: isGoldie ? 0.25 : 0.2, 
        ease: [0.25, 1, 0.5, 1],
        delay 
      }}
    >
      {/* Avatar for Goldie messages - appears 50ms before bubble */}
      {isGoldie && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay - 0.05, duration: 0.2 }}
        >
          <GoldieAvatar size={40} />
        </motion.div>
      )}

      <div className={`flex-1 ${!isGoldie ? "max-w-[70%]" : ""}`}>
        {/* Timestamp */}
        <div className={`flex items-center gap-2 mb-1 ${!isGoldie ? "justify-end" : ""}`}>
          {isGoldie && (
            <span 
              className="font-semibold text-[#FFD700]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Goldie
            </span>
          )}
          <span 
            className="text-xs text-white/40"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            {message.timestamp}
          </span>
          {!isGoldie && (
            <span 
              className="font-semibold text-white/90"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              You
            </span>
          )}
        </div>

        {/* Message Content */}
        <div 
          className={`backdrop-blur-xl border rounded-xl p-4 ${
            isGoldie 
              ? "bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 rounded-tl-none" 
              : "bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/20 rounded-tr-none"
          }`}
        >
          <p 
            className="text-white/90"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            {message.content}
          </p>

          {/* Quick Reply Chips */}
          {message.quickReplies && (
            <QuickReplyChips 
              options={message.quickReplies}
              selectedChip={selectedChip}
              onSelect={onChipSelect}
            />
          )}

          {/* CTA Buttons */}
          {message.ctaButtons && (
            <CTAButtons 
              primary={message.ctaButtons.primary}
              secondary={message.ctaButtons.secondary}
            />
          )}

          {/* Chart */}
          {message.hasChart && <CompoundChart />}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * TYPING INDICATOR
 * Three dots with staggered bounce
 */
function TypingIndicator() {
  return (
    <motion.div
      className="flex gap-4"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
    >
      <GoldieAvatar size={40} />
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl rounded-tl-none p-4 w-20">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-[#FFD700] rounded-full"
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * QUICK REPLY CHIPS
 * Stagger entry, hover scale, selected state with checkmark
 */
function QuickReplyChips({ 
  options, 
  selectedChip,
  onSelect 
}: { 
  options: string[];
  selectedChip: string | null;
  onSelect: (chip: string) => void;
}) {
  const [hoveredChip, setHoveredChip] = useState<string | null>(null);

  return (
    <div className="flex gap-2 mt-3">
      {options.map((option, index) => {
        const isSelected = selectedChip === option;
        const isOtherSelected = selectedChip && selectedChip !== option;
        const isHovered = hoveredChip === option;

        return (
          <motion.button
            key={option}
            className="px-4 py-2 rounded-lg text-sm font-medium border"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              backgroundColor: isSelected 
                ? "rgba(255,215,0,0.2)" 
                : isHovered && !isSelected
                ? "rgba(255,215,0,0.2)"
                : "rgba(255,215,0,0.12)",
              borderColor: isSelected 
                ? "#FFD700" 
                : isHovered && !isSelected
                ? "rgba(255,215,0,0.6)"
                : "rgba(255,215,0,0.3)",
              color: isSelected || isHovered ? "#FFD700" : "#9CA3AF",
              transition: 'background-color 0.12s ease-out, border-color 0.12s ease-out, color 0.12s ease-out'
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ 
              opacity: isOtherSelected ? 0.4 : 1,
              y: 0,
              scale: isOtherSelected ? 0.96 : 1
            }}
            transition={{ 
              delay: index * 0.04,
              duration: 0.2,
              ease: [0.25, 1, 0.5, 1]
            }}
            whileHover={!isSelected ? {
              scale: 1.04,
              transition: { duration: 0.12, ease: [0.25, 1, 0.5, 1] }
            } : {}}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.08 }
            }}
            onMouseEnter={() => setHoveredChip(option)}
            onMouseLeave={() => setHoveredChip(null)}
            onClick={() => {
              onSelect(option);
            }}
          >
            <span className="flex items-center gap-2">
              {isSelected && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  <Check className="w-3 h-3" />
                </motion.span>
              )}
              {option}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

/**
 * CTA BUTTONS
 * Primary with sparkle burst, Secondary with collapse animation
 */
function CTAButtons({ primary, secondary }: { primary: string; secondary: string }) {
  const [showPrimary, setShowPrimary] = useState(true);
  const [showSecondary, setShowSecondary] = useState(true);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handlePrimaryClick = () => {
    // Create sparkle burst
    const newSparkles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 30
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 500);
  };

  const handleSecondaryClick = () => {
    setShowSecondary(false);
  };

  return (
    <div className="flex gap-2 mt-3 overflow-hidden">
      {showPrimary && (
        <motion.button
          className="relative px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#F59E0B] rounded-lg text-sm font-bold text-[#1a1a2e] overflow-visible"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          whileHover={{ 
            scale: 1.03,
            brightness: 1.1,
            transition: { duration: 0.15, ease: [0.25, 1, 0.5, 1] }
          }}
          whileTap={{ 
            scale: 0.97,
            transition: { duration: 0.08 }
          }}
          onClick={handlePrimaryClick}
        >
          {primary}
          
          {/* Sparkle burst particles */}
          <AnimatePresence>
            {sparkles.map((sparkle) => (
              <motion.div
                key={sparkle.id}
                className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#FFD700] rounded-full pointer-events-none"
                initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                animate={{ 
                  opacity: 0, 
                  scale: 0.5,
                  x: sparkle.x,
                  y: sparkle.y
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>
        </motion.button>
      )}

      <AnimatePresence>
        {showSecondary && (
          <motion.button
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-white/70 border border-white/10"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.15 }
            }}
            whileTap={{ scale: 0.97 }}
            exit={{ 
              opacity: 0,
              height: 0,
              marginTop: 0,
              transition: { duration: 0.2, ease: "easeInOut" }
            }}
            onClick={handleSecondaryClick}
          >
            {secondary}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * COMPOUND CHART
 */
function CompoundChart() {
  const compoundData = [
    { year: 0, value: 45 },
    { year: 2, value: 52 },
    { year: 4, value: 60 },
    { year: 6, value: 69 },
    { year: 8, value: 78 },
    { year: 10, value: 87 },
  ];

  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10 mt-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
          Compound Growth
        </span>
        <span className="text-sm font-semibold text-green-400" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
          +93%
        </span>
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={compoundData}>
          <XAxis dataKey="year" stroke="#ffffff30" fontSize={12} />
          <YAxis stroke="#ffffff30" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a2e",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#FFD700"
            strokeWidth={2}
            dot={{ fill: "#FFD700", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-between mt-3">
        <div>
          <div className="text-xs text-white/40" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>Today</div>
          <div className="text-lg font-bold text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>€45</div>
        </div>
        <div className="text-white/20">→</div>
        <div className="text-right">
          <div className="text-xs text-white/40" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>In 10 years</div>
          <div className="text-lg font-bold text-yellow-400" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>€87</div>
        </div>
      </div>
    </div>
  );
}

/**
 * CHAT INPUT
 * Focus state, send button animation, shake on empty send
 */
function ChatInput({ 
  value, 
  onChange, 
  onSend,
  inputRef,
  shouldShake
}: { 
  value: string; 
  onChange: (val: string) => void; 
  onSend: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  shouldShake: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="border-t border-white/10 p-4">
      <motion.div
        className="flex gap-3 items-end"
        animate={shouldShake ? {
          x: [-4, 4, -4, 4, 0],
          transition: { duration: 0.3, ease: "easeInOut" }
        } : {}}
      >
        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
          <Paperclip className="w-5 h-5 text-white/60" />
        </button>
        
        <motion.input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSend();
            }
          }}
          placeholder="Ask Goldie anything..."
          className="flex-1 bg-white/5 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none transition-all"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: isFocused ? "rgba(255, 215, 0, 0.6)" : "rgba(255, 255, 255, 0.12)",
            boxShadow: isFocused ? "0 0 0 3px rgba(255, 215, 0, 0.15)" : "none"
          }}
        />
        
        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
          <Mic className="w-5 h-5 text-white/60" />
        </button>
        
        <motion.button
          className="p-3 bg-gradient-to-r from-[#FFD700] to-[#F59E0B] rounded-lg"
          style={{
            opacity: value.trim() ? 1.0 : 0.4
          }}
          animate={{
            opacity: value.trim() ? 1.0 : 0.4,
            scale: value.trim() ? 1.0 : 0.8
          }}
          transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          whileTap={{
            scale: 0.85,
            transition: { duration: 0.08 }
          }}
          onClick={onSend}
        >
          <motion.div
            animate={value.trim() ? {} : {}}
            whileTap={{
              rotate: 15,
              transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
            }}
          >
            <Send className="w-5 h-5 text-[#1a1a2e]" />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
}

/**
 * QUICK STATS SIDEBAR
 * Slides in from right, hover states, count up animations
 */
function QuickStatsSidebar() {
  return (
    <motion.div
      className="w-80 border-l border-white/10 p-6"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.3, 
        ease: [0.25, 1, 0.5, 1],
        delay: 0.15 
      }}
    >
      <h3 
        className="text-lg font-bold text-white mb-4"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
      >
        Quick Stats
      </h3>
      
      <div className="space-y-4">
        <StatCard
          label="Today's spending"
          value="€67"
          subtitle="↓ 12% vs yesterday"
          subtitleColor="text-green-400"
        />

        <StatCard
          label="Weekly average"
          value="€182"
          subtitle="7-day rolling average"
        />

        <StatCard
          label="Next bill"
          value="Netflix"
          subtitle="Feb 15 · €15.99"
        />

        <GoalCard />
      </div>
    </motion.div>
  );
}

/**
 * STAT CARD
 * Hover lift, count up animation
 */
function StatCard({ 
  label, 
  value, 
  subtitle,
  subtitleColor = "text-white/40"
}: { 
  label: string; 
  value: string;
  subtitle: string;
  subtitleColor?: string;
}) {
  return (
    <motion.div
      className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4 cursor-pointer"
      whileHover={{
        borderColor: "rgba(255,255,255,0.14)",
        y: -2,
        transition: { duration: 0.18, ease: [0.25, 1, 0.5, 1] }
      }}
    >
      <div 
        className="text-sm text-white/60 mb-1"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
      >
        {label}
      </div>
      <div 
        className="text-2xl font-bold text-white"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
      >
        {value}
      </div>
      <div 
        className={`text-xs ${subtitleColor} mt-1`}
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
      >
        {subtitle}
      </div>
    </motion.div>
  );
}

/**
 * GOAL CARD
 * Progress bar fills from 0% to 76%
 */
function GoalCard() {
  return (
    <motion.div
      className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 backdrop-blur-xl border border-yellow-500/20 rounded-xl p-4 cursor-pointer"
      whileHover={{
        borderColor: "rgba(255,215,0,0.3)",
        y: -2,
        transition: { duration: 0.18, ease: [0.25, 1, 0.5, 1] }
      }}
    >
      <div 
        className="text-sm text-yellow-400/80 mb-2"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
      >
        Summer Trip Goal
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "76%" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 1, 0.5, 1],
            delay: 0.3
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span 
          className="text-xs text-white/60"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
        >
          €1,523 / €2,000
        </span>
        <span 
          className="text-xs font-semibold text-yellow-400"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          76%
        </span>
      </div>
    </motion.div>
  );
}