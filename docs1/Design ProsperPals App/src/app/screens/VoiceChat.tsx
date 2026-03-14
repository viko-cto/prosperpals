import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, Volume2, VolumeX, RotateCcw, Pause, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router";

type VoiceState = "idle" | "listening" | "processing" | "speaking";
type Companion = "goldie" | "fin";

export function VoiceChat() {
  const navigate = useNavigate();
  const [companion, setCompanion] = useState<Companion>("goldie");
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [lastTranscript, setLastTranscript] = useState<string>("");

  const companionConfig = {
    goldie: {
      name: "Goldie",
      avatar: "🪙",
      gradient: "from-yellow-400 to-yellow-500",
      accentColor: "yellow",
      shadowColor: "rgba(250, 204, 21, 0.5)",
    },
    fin: {
      name: "Fin",
      avatar: "🐋",
      gradient: "from-blue-400 to-blue-500",
      accentColor: "blue",
      shadowColor: "rgba(59, 130, 246, 0.5)",
    },
  };

  const config = companionConfig[companion];

  const handleMicClick = () => {
    if (voiceState === "idle") {
      setVoiceState("listening");
      setLastTranscript("");
      
      // Simulate voice interaction
      setTimeout(() => {
        setVoiceState("processing");
        setLastTranscript("How much did I spend on groceries this week?");
        
        setTimeout(() => {
          setVoiceState("speaking");
          setLastTranscript("You spent €142 on groceries this week. That's within your budget!");
          
          setTimeout(() => {
            setVoiceState("idle");
          }, 3000);
        }, 1500);
      }, 2500);
    } else if (voiceState === "listening") {
      setVoiceState("idle");
      setLastTranscript("");
    }
  };

  const handleReplay = () => {
    if (lastTranscript && voiceState === "idle") {
      setVoiceState("speaking");
      setTimeout(() => {
        setVoiceState("idle");
      }, 2000);
    }
  };

  return (
    <div className="flex h-screen bg-[#0f0f1a]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="border-b border-white/10 bg-[#1a1a2e]/80 backdrop-blur-xl p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1">
              <button className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all bg-gradient-to-r ${config.gradient} text-gray-900`}>
                Voice
              </button>
              <button
                onClick={() => navigate("/text-chat")}
                className="flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all text-white/60 hover:text-white/80 hover:bg-white/5"
              >
                Text
              </button>
            </div>
          </div>
        </div>

        {/* Voice Interface */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* AI Avatar */}
          <div className="relative mb-8">
            {/* State Animations */}
            <AnimatePresence>
              {voiceState === "listening" && <ListeningRing color={config.accentColor} />}
              {voiceState === "processing" && <ProcessingRing />}
              {voiceState === "speaking" && <SpeakingWave />}
            </AnimatePresence>

            {/* Avatar */}
            <motion.div
              animate={voiceState === "speaking" ? { scale: [1, 1.05, 1] } : {}}
              transition={{
                duration: 0.8,
                repeat: voiceState === "speaking" ? Infinity : 0,
              }}
              className={`relative z-10 w-40 h-40 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-6xl shadow-2xl`}
            >
              {config.avatar}
            </motion.div>
          </div>

          {/* Voice Status */}
          <div className="min-h-[32px] mb-8">
            <VoiceStatus state={voiceState} companionName={config.name} />
          </div>

          {/* Primary Mic Button */}
          <div className="mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMicClick}
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-xl transition-all ${
                voiceState === "listening" ? `shadow-[0_0_40px_${config.shadowColor}]` : ""
              }`}
            >
              {voiceState === "listening" ? (
                <Pause className="w-11 h-11 text-gray-900" />
              ) : (
                <Mic className="w-11 h-11 text-gray-900" />
              )}
            </motion.button>
          </div>

          {/* Secondary Controls */}
          <div className="flex items-center gap-4 mb-12">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white/60" />
              ) : (
                <Volume2 className="w-5 h-5 text-white/60" />
              )}
            </button>

            <button
              onClick={handleReplay}
              disabled={voiceState !== "idle" || !lastTranscript}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title="Replay last response"
            >
              <RotateCcw className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Last Transcript Preview (minimal) */}
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              {lastTranscript && (
                <motion.div
                  key={lastTranscript}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                >
                  <p className="text-sm text-white/70 line-clamp-2">{lastTranscript}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[340px] bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] border-l border-white/10 overflow-y-auto p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-3">Voice Session</h3>
            <div className={`bg-gradient-to-br from-${config.accentColor}-500/10 to-${config.accentColor}-600/5 border border-${config.accentColor}-500/20 rounded-xl p-4`}>
              <p className="text-xs text-white/70 mb-2">Status</p>
              <p className="text-sm text-white font-medium">
                {voiceState === "idle" && "Ready"}
                {voiceState === "listening" && "Listening..."}
                {voiceState === "processing" && "Processing..."}
                {voiceState === "speaking" && "Speaking..."}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate("/text-chat")}
                className="w-full flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Switch to Text Chat
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors">
                📊 View budget summary
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors">
                🎯 Check goals
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-3">Today's Activity</h3>
            <div className="space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-xs text-white/60 mb-1">Voice interactions</p>
                <p className="text-xl font-bold text-white">5</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-xs text-white/60 mb-1">Questions answered</p>
                <p className="text-xl font-bold text-white">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Voice Status Component
function VoiceStatus({ state, companionName }: { state: VoiceState; companionName: string }) {
  const statusConfig = {
    idle: { text: "Tap the mic to start", color: "text-white/60" },
    listening: { text: "Listening...", color: "text-yellow-400" },
    processing: { text: "Processing...", color: "text-purple-400" },
    speaking: { text: `${companionName} is speaking`, color: "text-green-400" },
  };

  const config = statusConfig[state];

  return (
    <motion.p
      key={state}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-base font-semibold ${config.color}`}
    >
      {config.text}
    </motion.p>
  );
}

// Listening Ring Animation
function ListeningRing({ color }: { color: string }) {
  const colorMap: { [key: string]: string } = {
    yellow: "border-yellow-400",
    blue: "border-blue-400",
  };

  return (
    <>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute inset-0 rounded-full border-4 ${colorMap[color]}`}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className={`absolute inset-0 rounded-full border-4 ${colorMap[color]}`}
      />
    </>
  );
}

// Processing Ring Animation
function ProcessingRing() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-400 border-r-purple-400"
    />
  );
}

// Speaking Wave Animation
function SpeakingWave() {
  const bars = 12;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {Array.from({ length: bars }).map((_, i) => {
        const angle = (i / bars) * 360;
        const radius = 96;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={i}
            animate={{
              height: [12, 28, 12],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
            className="absolute w-1.5 bg-green-400 rounded-full"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </div>
  );
}