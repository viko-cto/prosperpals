import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Send, Mic } from "lucide-react";
import { useNavigate } from "react-router";

type Companion = "goldie" | "fin";

interface Message {
  id: number;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
}

export function TextChat() {
  const navigate = useNavigate();
  const [companion] = useState<Companion>("goldie");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      content: "Hey there! Ready to tackle your budget today? I'm here to help!",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: 2,
      sender: "user",
      content: "Show me my spending for this week",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: 3,
      sender: "ai",
      content: "You've spent €387 this week across all categories. Your top spending was groceries at €142. Want to see the breakdown?",
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: 4,
      sender: "user",
      content: "Yes, show me the full breakdown",
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: 5,
      sender: "ai",
      content: "Here's your weekly breakdown:\n🛒 Groceries: €142\n🍕 Dining Out: €85\n🚗 Transport: €68\n🎬 Entertainment: €52\n⚡ Utilities: €40\n\nYou're doing great! All categories are within budget.",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const companionConfig = {
    goldie: {
      name: "Goldie",
      avatar: "🪙",
      gradient: "from-yellow-400 to-yellow-500",
      accentColor: "yellow",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
    },
    fin: {
      name: "Fin",
      avatar: "🐋",
      gradient: "from-blue-400 to-blue-500",
      accentColor: "blue",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
  };

  const config = companionConfig[companion];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Sure thing! Let me pull that up for you.",
        "Great question! Here's what I found...",
        "Absolutely! I can help with that.",
        "Got it! Let me check that for you.",
      ];
      const aiMessage: Message = {
        id: messages.length + 2,
        sender: "ai",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  return (
    <div className="flex h-screen bg-[#0f0f1a]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="border-b border-white/10 bg-[#1a1a2e]/80 backdrop-blur-xl p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1">
              <button
                onClick={() => navigate("/voice-chat")}
                className="flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all text-white/60 hover:text-white/80 hover:bg-white/5"
              >
                Voice
              </button>
              <button className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all bg-gradient-to-r ${config.gradient} text-gray-900`}>
                Text
              </button>
            </div>
          </div>
        </div>

        {/* Chat Header */}
        <div className="border-b border-white/10 bg-[#1a1a2e]/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-xl`}>
              {config.avatar}
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">{config.name}</h2>
              <p className="text-xs text-white/60">Online • Responds instantly</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} companionConfig={config} />
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Text Composer */}
        <div className="border-t border-white/10 p-6 bg-[#1a1a2e]/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message…"
                  rows={1}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500/50 transition-colors resize-none"
                  style={{ minHeight: "48px", maxHeight: "120px" }}
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`p-3 rounded-xl transition-all flex-shrink-0 ${
                  inputValue.trim()
                    ? `bg-gradient-to-r ${config.gradient} hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]`
                    : "bg-white/5 opacity-40 cursor-not-allowed"
                }`}
              >
                <Send className="w-5 h-5 text-gray-900" />
              </button>
            </div>

            {/* Helper Text */}
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-white/40">Press Enter to send</p>
              <button
                onClick={() => navigate("/voice-chat")}
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/70 transition-colors"
              >
                <Mic className="w-3 h-3" />
                Switch to Voice
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[340px] bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] border-l border-white/10 overflow-y-auto p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-3">Conversation</h3>
            <div className={`bg-gradient-to-br ${config.bg} border ${config.border} rounded-xl p-4`}>
              <p className="text-xs text-white/70 mb-2">Chat with {config.name}</p>
              <p className="text-sm text-white font-medium">{messages.length} messages</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors">
                📊 View budget summary
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors">
                🎯 Check goal progress
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors">
                💰 Add transaction
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors">
                📈 Spending insights
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-3">Suggested Topics</h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setInputValue("How much can I spend today?");
                }}
                className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white/80 transition-colors"
              >
                How much can I spend today?
              </button>
              <button
                onClick={() => {
                  setInputValue("Show my recent transactions");
                }}
                className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white/80 transition-colors"
              >
                Show my recent transactions
              </button>
              <button
                onClick={() => {
                  setInputValue("What's my biggest expense this month?");
                }}
                className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white/80 transition-colors"
              >
                What's my biggest expense?
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-3">Today's Stats</h3>
            <div className="space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-xs text-white/60 mb-1">Messages sent</p>
                <p className="text-xl font-bold text-white">
                  {messages.filter((m) => m.sender === "user").length}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-xs text-white/60 mb-1">Questions answered</p>
                <p className="text-xl font-bold text-white">
                  {messages.filter((m) => m.sender === "ai").length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Message Bubble Component
function MessageBubble({
  message,
  companionConfig,
}: {
  message: Message;
  companionConfig: any;
}) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      {!isUser && (
        <div
          className={`w-8 h-8 rounded-full bg-gradient-to-br ${companionConfig.gradient} flex items-center justify-center text-lg flex-shrink-0`}
        >
          {companionConfig.avatar}
        </div>
      )}

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[70%]`}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? `bg-gradient-to-br ${companionConfig.bg} border ${companionConfig.border}`
              : "bg-white/5 border border-white/10"
          }`}
        >
          <p className="text-sm text-white/90 whitespace-pre-wrap">{message.content}</p>
        </motion.div>
        <span className="text-xs text-white/40 mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-lg flex-shrink-0">
          👤
        </div>
      )}
    </div>
  );
}
