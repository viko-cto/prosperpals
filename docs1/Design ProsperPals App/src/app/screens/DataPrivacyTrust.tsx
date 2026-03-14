import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Shield, Lock, CreditCard, User, Calendar, Tag, Hash, Key, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";

export function DataPrivacyTrust() {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  // What we see (safe, helpful data)
  const whatWeSee = [
    { icon: Tag, label: "Spending categories", example: "Groceries, Transport" },
    { icon: Calendar, label: "Transaction dates", example: "June 15, 2026" },
    { icon: Hash, label: "Transaction amounts", example: "€45.00" },
    { icon: User, label: "Your first name", example: "Alex" },
  ];

  // What we NEVER see (protected data)
  const whatWeNeverSee = [
    { icon: Key, label: "Bank passwords", description: "Never stored or seen" },
    { icon: CreditCard, label: "Full card numbers", description: "Only last 4 digits" },
    { icon: Lock, label: "PIN codes", description: "We don't ask for these" },
    { icon: Shield, label: "Account credentials", description: "Handled by banks" },
  ];

  const handleDeleteData = () => {
    setIsDeleting(true);
    // Simulate deletion process
    setTimeout(() => {
      setIsDeleting(false);
      setDeleted(true);
      setTimeout(() => {
        setShowDeleteConfirm(false);
        setDeleted(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3F0] via-[#FAF8F5] to-[#F0F4F0] relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 right-10 w-40 h-40 bg-[#A8D5BA] rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-60 h-60 bg-[#98D8C8] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-6 pt-8 pb-24">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="text-[#666] mb-6 flex items-center gap-2 text-sm hover:text-[#2C2C2C] transition-colors"
          >
            ← Back
          </button>
          
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-3">
            Your Data, Your Rules
          </h1>
          <p className="text-[#666] leading-relaxed">
            We believe trust comes from transparency, not corporate badges.
          </p>
        </motion.div>

        {/* Goldie's Promise */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#A8D5BA]/20 to-[#98D8C8]/20 backdrop-blur-sm border border-[#A8D5BA]/40 rounded-[28px] p-6 mb-8 relative overflow-hidden"
        >
          {/* Subtle glow */}
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-0 w-32 h-32 bg-[#A8D5BA]/30 rounded-full blur-2xl"
          />

          <div className="relative z-10 flex items-start gap-4">
            {/* Goldie Avatar */}
            <motion.div
              animate={{
                rotate: [0, -5, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#FFD93D] via-[#FFC93D] to-[#FFB93D] shadow-lg flex items-center justify-center border-3 border-[#FFED4E]"
            >
              {/* Eyes */}
              <div className="absolute top-4 left-0 right-0 flex justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#2C2C2C] rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#2C2C2C] rounded-full" />
              </div>
              {/* Smile */}
              <div className="mt-3 w-5 h-2.5 border-b-2 border-[#2C2C2C] rounded-b-full" />
            </motion.div>

            <div className="flex-1">
              <div className="font-semibold text-[#2C2C2C] mb-1">Goldie</div>
              <p className="text-[#3D3D3D] leading-relaxed">
                I only know what you want me to know. You're in control, always.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Two-Column Breakdown */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          
          {/* Left: What We See */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-[24px] p-5 shadow-sm h-full">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-[#5A9F7E]" />
                </div>
                <h3 className="font-semibold text-[#2C2C2C] text-sm">We See</h3>
              </div>

              <div className="space-y-4">
                {whatWeSee.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="space-y-1"
                  >
                    <div className="flex items-start gap-2">
                      <item.icon className="w-4 h-4 text-[#5A9F7E] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-medium text-[#2C2C2C]">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-[#666] leading-snug">
                          {item.example}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-[#A8D5BA]/20">
                <div className="text-[10px] text-[#5A9F7E] leading-relaxed">
                  ✓ Helps us give you insights
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: What We Never See */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-[24px] p-5 shadow-sm h-full">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#FFB8A5]/20 flex items-center justify-center">
                  <EyeOff className="w-4 h-4 text-[#D97757]" />
                </div>
                <h3 className="font-semibold text-[#2C2C2C] text-sm">Never See</h3>
              </div>

              <div className="space-y-4">
                {whatWeNeverSee.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="space-y-1"
                  >
                    <div className="flex items-start gap-2">
                      <item.icon className="w-4 h-4 text-[#D97757] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-medium text-[#2C2C2C]">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-[#666] leading-snug">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-[#FFB8A5]/20">
                <div className="text-[10px] text-[#D97757] leading-relaxed">
                  🔒 Protected by your bank
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Delete Data Toggle - THE TRUST SIGNAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-md border-2 border-[#E5E5E5] rounded-[28px] p-6 shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFB8A5]/20 to-[#FFA07A]/20 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-[#D97757]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#2C2C2C] mb-1">
                  Delete All My Data
                </h3>
                <p className="text-sm text-[#666] leading-relaxed">
                  Not happy? Leave no trace. One tap, everything's gone forever.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full bg-gradient-to-r from-[#2C2C2C] to-[#3D3D3D] hover:from-[#3D3D3D] hover:to-[#4D4D4D] text-white font-semibold rounded-[16px] py-3.5 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Delete Everything Instantly
            </button>

            <div className="mt-3 text-center text-xs text-[#999]">
              No questions asked • No waiting period
            </div>
          </div>
        </motion.div>

        {/* How We Connect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <h3 className="text-sm font-semibold text-[#2C2C2C] mb-4">
            How We Connect to Your Bank
          </h3>
          
          <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-[24px] p-6 shadow-sm">
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center text-xs font-bold text-[#5A9F7E]">
                  1
                </div>
                <div>
                  <div className="text-sm font-medium text-[#2C2C2C] mb-1">
                    You connect through your bank
                  </div>
                  <div className="text-xs text-[#666] leading-relaxed">
                    You log in directly with your bank's app or website
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center text-xs font-bold text-[#5A9F7E]">
                  2
                </div>
                <div>
                  <div className="text-sm font-medium text-[#2C2C2C] mb-1">
                    Bank shares limited data with us
                  </div>
                  <div className="text-xs text-[#666] leading-relaxed">
                    Only what's needed: amounts, categories, dates
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center text-xs font-bold text-[#5A9F7E]">
                  3
                </div>
                <div>
                  <div className="text-sm font-medium text-[#2C2C2C] mb-1">
                    We help you understand it
                  </div>
                  <div className="text-xs text-[#666] leading-relaxed">
                    Insights, trends, and suggestions from Goldie
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Logos - Understated */}
            <div className="pt-5 border-t border-[#E5E5E5]/50">
              <div className="text-[10px] text-[#999] mb-3 text-center">
                Powered by trusted partners
              </div>
              
              <div className="flex items-center justify-center gap-6 mb-3">
                {/* Plaid Logo */}
                <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-[#E5E5E5]">
                  <div className="text-xs font-bold text-[#000000]">Plaid</div>
                </div>
                
                {/* TrueLayer Logo */}
                <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-[#E5E5E5]">
                  <div className="text-xs font-bold text-[#00D4AA]">TrueLayer</div>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-xs text-[#666]">
                  <Shield className="w-3 h-3" />
                  <span>Bank-grade encryption</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <div className="bg-white/40 backdrop-blur-sm rounded-[20px] p-4 border border-white/60">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#5A9F7E] flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-[#2C2C2C] mb-0.5">
                  GDPR Compliant
                </div>
                <div className="text-xs text-[#666]">
                  Your rights are protected by European law
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-sm rounded-[20px] p-4 border border-white/60">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#5A9F7E] flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-[#2C2C2C] mb-0.5">
                  Read-only access
                </div>
                <div className="text-xs text-[#666]">
                  We can never move money or make transactions
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-sm rounded-[20px] p-4 border border-white/60">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#5A9F7E] flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-[#2C2C2C] mb-0.5">
                  No ads, ever
                </div>
                <div className="text-xs text-[#666]">
                  We don't sell your data to advertisers
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => navigate("/settings")}
            className="text-sm text-[#666] hover:text-[#2C2C2C] underline transition-colors"
          >
            Read our full Privacy Policy
          </button>
        </motion.div>

      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isDeleting && setShowDeleteConfirm(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-6 top-1/2 -translate-y-1/2 z-50 bg-white rounded-[28px] p-6 shadow-2xl max-w-sm mx-auto"
            >
              {!deleted ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#FFB8A5]/20 flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-[#D97757]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">
                      Delete Everything?
                    </h3>
                    <p className="text-sm text-[#666] leading-relaxed">
                      This will permanently delete all your data from ProsperPals. This can't be undone.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleDeleteData}
                      disabled={isDeleting}
                      className="w-full bg-[#D97757] hover:bg-[#C96647] disabled:bg-[#D97757]/50 text-white font-semibold rounded-[16px] py-3.5 transition-all duration-300 shadow-md"
                    >
                      {isDeleting ? "Deleting..." : "Yes, Delete Everything"}
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={isDeleting}
                      className="w-full bg-[#F5F3F0] hover:bg-[#E5E3E0] disabled:bg-[#F5F3F0]/50 text-[#2C2C2C] font-semibold rounded-[16px] py-3.5 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="w-16 h-16 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-[#5A9F7E]" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">
                    All Data Deleted
                  </h3>
                  <p className="text-sm text-[#666]">
                    Your information has been permanently removed.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
