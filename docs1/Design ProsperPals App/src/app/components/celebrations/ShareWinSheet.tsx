import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Share2, Download, Lock, Users, Globe } from "lucide-react";

interface ShareWinSheetProps {
  visible: boolean;
  onClose: () => void;
  goalName: string;
  amount: number;
  goalIcon?: string;
  daysToComplete?: number;
}

export function ShareWinSheet({
  visible,
  onClose,
  goalName,
  amount,
  goalIcon = "🎯",
  daysToComplete,
}: ShareWinSheetProps) {
  const [shareOption, setShareOption] = useState<"private" | "family" | "public">("private");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[120] bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] rounded-t-3xl border-t-2 border-white/10 max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Share Your Win</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-8rem)]">
              {/* Share Card Preview */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-white/60 mb-3">Preview</div>
                <motion.div
                  animate={isGenerating ? { scale: [1, 0.98, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isGenerating ? Infinity : 0 }}
                  className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-8 text-center shadow-2xl"
                >
                  <div className="text-6xl mb-4">{goalIcon}</div>
                  <h3 className="text-3xl font-bold text-white mb-2">I just completed my</h3>
                  <h2 className="text-4xl font-bold text-white mb-4">{goalName}!</h2>
                  <div className="text-2xl font-semibold text-white/90 mb-2">
                    €{amount.toLocaleString()} saved
                  </div>
                  {daysToComplete && (
                    <div className="text-lg text-white/80 mb-6">in {daysToComplete} days</div>
                  )}
                  <div className="text-white/70 text-sm">Powered by ProsperPals 🪙</div>
                </motion.div>
              </div>

              {/* Privacy Options */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-white/60 mb-3">Who can see this?</div>
                <div className="space-y-2">
                  {/* Private */}
                  <button
                    onClick={() => setShareOption("private")}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      shareOption === "private"
                        ? "border-green-500 bg-green-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        shareOption === "private" ? "bg-green-500" : "bg-white/10"
                      }`}
                    >
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-white">Private (Just you)</div>
                      <div className="text-sm text-white/60">Save to your achievements</div>
                    </div>
                    {shareOption === "private" && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>

                  {/* Family Space */}
                  <button
                    onClick={() => setShareOption("family")}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      shareOption === "family"
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        shareOption === "family" ? "bg-blue-500" : "bg-white/10"
                      }`}
                    >
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-white">Family Space</div>
                      <div className="text-sm text-white/60">Share with your family members</div>
                    </div>
                    {shareOption === "family" && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>

                  {/* Public */}
                  <button
                    onClick={() => setShareOption("public")}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      shareOption === "public"
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        shareOption === "public" ? "bg-purple-500" : "bg-white/10"
                      }`}
                    >
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-white">Public</div>
                      <div className="text-sm text-white/60">Share on social media</div>
                    </div>
                    {shareOption === "public" && (
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pb-6">
                <button
                  onClick={handleShare}
                  disabled={isGenerating}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Share2 className="w-5 h-5" />
                      {shareOption === "private" && "Save Achievement"}
                      {shareOption === "family" && "Share with Family"}
                      {shareOption === "public" && "Share Publicly"}
                    </>
                  )}
                </button>

                <button className="w-full px-6 py-4 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Image
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
