import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Lock, Eye, CreditCard, TrendingUp, ChevronLeft, Check } from "lucide-react";
import { useNavigate } from "react-router";

export function BankConnection() {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({
    transactions: true,
    balances: true,
    accountInfo: true,
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }, 2000);
  };

  const allPermissionsOff = !permissions.transactions && !permissions.balances && !permissions.accountInfo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FAF8F5] to-[#F0E6F5] relative overflow-hidden">
      {/* Subtle animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-10 w-60 h-60 bg-[#D4A5D4] rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-40 left-10 w-80 h-80 bg-[#FFD93D] rounded-full blur-3xl"
      />

      <div className="relative z-10 px-6 pt-8 pb-24 flex flex-col min-h-screen">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#666] hover:text-[#2C2C2C] transition-colors mb-8 self-start"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-[#2C2C2C] mb-2">
            Connect Your Bank
          </h1>
          <p className="text-[#666] text-sm leading-relaxed">
            This helps us give you personalized insights
          </p>
        </motion.div>

        {/* Goldie - Larger, Reassuring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex flex-col items-center mb-8"
        >
          {/* Goldie Character - Extra Large */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative mb-4"
          >
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#FFD93D] via-[#FFC93D] to-[#FFB93D] shadow-[0_12px_48px_rgba(255,217,61,0.4)] flex items-center justify-center border-[5px] border-[#FFED4E] relative">
              {/* Face */}
              <div className="relative">
                {/* Eyes - Gentle, warm */}
                <div className="absolute top-2 left-0 right-0 flex justify-center gap-4">
                  <motion.div
                    animate={{
                      scaleY: [1, 0.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="w-2.5 h-2.5 bg-[#2C2C2C] rounded-full"
                  />
                  <motion.div
                    animate={{
                      scaleY: [1, 0.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="w-2.5 h-2.5 bg-[#2C2C2C] rounded-full"
                  />
                </div>
                {/* Warm smile */}
                <div className="mt-6 w-8 h-4 border-b-[3px] border-[#2C2C2C] rounded-b-full" />
              </div>

              {/* Pulsing shield icon */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-[#A8D5BA] to-[#98D8C8] rounded-full flex items-center justify-center shadow-lg border-3 border-white"
              >
                <Shield className="w-6 h-6 text-white" />
              </motion.div>

              {/* Sparkles */}
              <motion.div
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="absolute -top-2 -left-2 text-2xl"
              >
                ✨
              </motion.div>
              <motion.div
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: 1,
                }}
                className="absolute -top-2 -right-2 text-2xl"
              >
                ✨
              </motion.div>
            </div>
          </motion.div>

          {/* Speech Bubble */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-xs"
          >
            {/* Triangle pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full">
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[14px] border-b-white" />
            </div>
            
            {/* Bubble content */}
            <div className="bg-white rounded-[28px] px-6 py-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-2 border-white/80">
              <p className="text-[#2C2C2C] text-center leading-relaxed font-medium">
                I'll only peek at what you're comfortable with.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Permission Toggles Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-md border-2 border-white rounded-[32px] p-6 shadow-[0_12px_48px_rgba(0,0,0,0.08)] mb-6"
        >
          <h3 className="font-bold text-[#2C2C2C] mb-2 text-center">
            You Choose What to Share
          </h3>
          <p className="text-xs text-[#666] text-center mb-6">
            Toggle what you're comfortable sharing. You can change this anytime.
          </p>

          <div className="space-y-4">
            {/* Transactions Toggle */}
            <div className="bg-gradient-to-r from-[#F5F3F0] to-[#FAF8F5] rounded-[20px] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                    permissions.transactions 
                      ? 'bg-gradient-to-br from-[#A8D5BA] to-[#98D8C8]' 
                      : 'bg-[#E5E5E5]'
                  }`}>
                    <TrendingUp className={`w-5 h-5 ${permissions.transactions ? 'text-white' : 'text-[#999]'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#2C2C2C] text-sm mb-0.5">
                      Transactions
                    </div>
                    <div className="text-xs text-[#666]">
                      Where you spend your money
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => togglePermission('transactions')}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    permissions.transactions ? 'bg-[#A8D5BA]' : 'bg-[#D5D5D5]'
                  }`}
                >
                  <motion.div
                    animate={{
                      x: permissions.transactions ? 24 : 2,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>
            </div>

            {/* Balances Toggle */}
            <div className="bg-gradient-to-r from-[#F5F3F0] to-[#FAF8F5] rounded-[20px] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                    permissions.balances 
                      ? 'bg-gradient-to-br from-[#A8D5BA] to-[#98D8C8]' 
                      : 'bg-[#E5E5E5]'
                  }`}>
                    <Eye className={`w-5 h-5 ${permissions.balances ? 'text-white' : 'text-[#999]'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#2C2C2C] text-sm mb-0.5">
                      Balances
                    </div>
                    <div className="text-xs text-[#666]">
                      How much is in your accounts
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => togglePermission('balances')}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    permissions.balances ? 'bg-[#A8D5BA]' : 'bg-[#D5D5D5]'
                  }`}
                >
                  <motion.div
                    animate={{
                      x: permissions.balances ? 24 : 2,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>
            </div>

            {/* Account Info Toggle */}
            <div className="bg-gradient-to-r from-[#F5F3F0] to-[#FAF8F5] rounded-[20px] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                    permissions.accountInfo 
                      ? 'bg-gradient-to-br from-[#A8D5BA] to-[#98D8C8]' 
                      : 'bg-[#E5E5E5]'
                  }`}>
                    <CreditCard className={`w-5 h-5 ${permissions.accountInfo ? 'text-white' : 'text-[#999]'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#2C2C2C] text-sm mb-0.5">
                      Account Info
                    </div>
                    <div className="text-xs text-[#666]">
                      Account names and types
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => togglePermission('accountInfo')}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    permissions.accountInfo ? 'bg-[#A8D5BA]' : 'bg-[#D5D5D5]'
                  }`}
                >
                  <motion.div
                    animate={{
                      x: permissions.accountInfo ? 24 : 2,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Warning if all off */}
          <AnimatePresence>
            {allPermissionsOff && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 bg-[#FFB8A5]/20 border border-[#FFB8A5]/40 rounded-[16px] p-3"
              >
                <p className="text-xs text-[#D97757] text-center">
                  At least one permission is needed for Goldie to help you.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Security Reassurance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-3 text-xs text-[#666] mb-8 flex-wrap"
        >
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>256-bit encryption</span>
          </div>
          <span className="text-[#D5D5D5]">•</span>
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>Read-only access</span>
          </div>
          <span className="text-[#D5D5D5]">•</span>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Delete anytime</span>
          </div>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={handleConnect}
            disabled={allPermissionsOff || isConnecting}
            className="w-full bg-gradient-to-r from-[#D4AF37] via-[#E5C68D] to-[#C9B382] hover:shadow-[0_16px_48px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-[24px] py-5 shadow-[0_8px_32px_rgba(212,175,55,0.3)] group relative overflow-hidden"
          >
            {/* Shimmer effect */}
            <motion.div
              animate={{
                x: [-200, 200],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            
            <div className="relative flex items-center justify-center gap-3">
              {isConnecting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Lock className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-white font-bold text-lg">
                    Connecting Securely...
                  </span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-lg">
                    Connect Securely
                  </span>
                </>
              )}
            </div>
          </button>

          {/* Alternative option - NO HIDING */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={() => navigate("/home")}
            className="w-full mt-4 text-[#666] text-sm hover:text-[#2C2C2C] transition-colors py-3"
          >
            I'll connect later
          </motion.button>
        </motion.div>

        {/* Additional trust indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center mt-4"
        >
          <button
            onClick={() => navigate("/data-privacy")}
            className="text-xs text-[#999] hover:text-[#666] underline transition-colors"
          >
            How we protect your data
          </button>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-x-6 top-1/2 -translate-y-1/2 z-50 bg-white rounded-[32px] p-8 shadow-2xl max-w-sm mx-auto"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-[#A8D5BA] to-[#98D8C8] flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#2C2C2C] mb-2">
                  You're Connected!
                </h3>
                <p className="text-[#666] leading-relaxed">
                  Goldie is getting to know your finances. Let's start building your prosperity! 🎉
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
