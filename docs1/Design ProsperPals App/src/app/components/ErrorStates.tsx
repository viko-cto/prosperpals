import { motion } from "motion/react";
import { Home, AlertCircle, RefreshCw, Send, Wifi, Database, CreditCard, TrendingUp } from "lucide-react";

// GENERIC ERROR STATE
export function ErrorState({
  title = "Well, that's unexpected!",
  message = "Something went wrong, but don't worry — we'll get you back on track.",
  errorCode = "ERR_500",
  onGoHome,
  onReportIssue,
  companion = "goldie"
}: {
  title?: string;
  message?: string;
  errorCode?: string;
  onGoHome?: () => void;
  onReportIssue?: () => void;
  companion?: "goldie" | "fin";
}) {
  const isGoldie = companion === "goldie";
  const emoji = isGoldie ? "🪙" : "🐋";
  const bgGradient = isGoldie 
    ? "from-yellow-400 to-yellow-600" 
    : "from-blue-400 to-blue-700";

  return (
    <div className="flex items-center justify-center min-h-[500px] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Goldie/Fin with worried expression */}
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotate: [-3, 3, -3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <div className="relative inline-block">
            {/* Character */}
            <div className={`w-32 h-32 bg-gradient-to-br ${bgGradient} rounded-full flex items-center justify-center text-6xl shadow-[0_0_40px_rgba(255,215,0,0.2)]`}>
              {emoji}
            </div>
            
            {/* Confused emoji overlay */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-2 -right-2 text-4xl"
            >
              😅
            </motion.div>

            {/* Question marks floating */}
            <motion.div
              animate={{
                y: [-10, -20, -10],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -left-6 top-4 text-2xl"
            >
              ❓
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <h3 className="text-3xl font-bold text-white mb-3">
          {title}
        </h3>
        <p className="text-lg text-white/60 mb-6">
          {message}
        </p>

        {/* Error Code */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg mb-8">
          <AlertCircle className="w-4 h-4 text-white/40" />
          <span className="text-xs text-white/40 font-mono">
            Error Code: {errorCode}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-8">
          <button 
            onClick={onGoHome || (() => window.location.href = '/home')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
          <button 
            onClick={onReportIssue || (() => console.log('Report issue'))}
            className="px-6 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl text-white font-semibold transition-all flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Report Issue
          </button>
        </div>

        {/* Goldie's Comforting Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">{emoji}</div>
            <p className="text-sm text-white/70 italic text-left">
              "Oops! Looks like something hiccupped. Don't stress — these things happen. Let's try again, okay?" 
              <span className="text-yellow-400 font-semibold"> — {isGoldie ? "Goldie" : "Fin"}</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// NETWORK ERROR
export function NetworkError({
  onRetry,
  onGoHome
}: {
  onRetry?: () => void;
  onGoHome?: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[500px] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Goldie with disconnected WiFi */}
        <motion.div
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-6xl shadow-[0_0_40px_rgba(255,215,0,0.2)]">
              🪙
            </div>
            
            {/* Disconnected WiFi icon */}
            <motion.div
              animate={{
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -right-4 -top-2 w-16 h-16 bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-full flex items-center justify-center"
            >
              <Wifi className="w-8 h-8 text-red-400" />
            </motion.div>
          </div>
        </motion.div>

        <h3 className="text-3xl font-bold text-white mb-3">
          Connection Lost
        </h3>
        <p className="text-lg text-white/60 mb-6">
          We can't reach our servers right now. Check your internet connection and try again.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg mb-8">
          <AlertCircle className="w-4 h-4 text-white/40" />
          <span className="text-xs text-white/40 font-mono">
            Error Code: ERR_NETWORK
          </span>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <button 
            onClick={onRetry || (() => window.location.reload())}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <button 
            onClick={onGoHome || (() => window.location.href = '/home')}
            className="px-6 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl text-white font-semibold transition-all flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">🪙</div>
            <p className="text-sm text-white/70 italic text-left">
              "No worries! Sometimes the internet takes a little break. Let's give it another shot when you're ready." 
              <span className="text-yellow-400 font-semibold"> — Goldie</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// BANK SYNC ERROR
export function BankSyncError({
  bankName = "Nordea",
  bankLogo = "🏦",
  errorMessage = "We couldn't connect to your bank",
  onRetry,
  onGoHome
}: {
  bankName?: string;
  bankLogo?: string;
  errorMessage?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[500px] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Bank logo with error */}
        <motion.div
          animate={{
            x: [-5, 5, -5]
          }}
          transition={{
            duration: 0.5,
            repeat: 3,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="text-7xl mb-4">{bankLogo}</div>
            
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -right-6 top-0 w-14 h-14 bg-red-500/20 backdrop-blur-xl border-2 border-red-500/40 rounded-full flex items-center justify-center"
            >
              <span className="text-2xl">❌</span>
            </motion.div>
          </div>
        </motion.div>

        <h3 className="text-3xl font-bold text-white mb-3">
          Bank Connection Failed
        </h3>
        <p className="text-lg text-white/60 mb-2">
          {errorMessage}
        </p>
        <p className="text-sm text-white/40 mb-6">
          {bankName} might be experiencing issues, or your credentials may need updating.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg mb-8">
          <AlertCircle className="w-4 h-4 text-white/40" />
          <span className="text-xs text-white/40 font-mono">
            Error Code: ERR_BANK_SYNC_401
          </span>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <button 
            onClick={onRetry || (() => console.log('Retry sync'))}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Retry Connection
          </button>
          <button 
            onClick={onGoHome || (() => window.location.href = '/settings')}
            className="px-6 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl text-white font-semibold transition-all"
          >
            Update Credentials
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">🪙</div>
            <p className="text-sm text-white/70 italic text-left">
              "Banks can be finicky sometimes! Try reconnecting, or we can help you update your login details." 
              <span className="text-yellow-400 font-semibold"> — Goldie</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// TRANSACTION FAILED ERROR
export function TransactionFailedError({
  transactionType = "purchase",
  amount = "€49.99",
  onRetry,
  onGoHome
}: {
  transactionType?: string;
  amount?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[500px] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Transaction icon with error */}
        <motion.div
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 0]
              }}
              transition={{
                duration: 0.5,
                repeat: 2,
              }}
              className="w-32 h-32 bg-gradient-to-br from-red-400/20 to-red-600/10 border-2 border-red-500/30 rounded-full flex items-center justify-center"
            >
              <CreditCard className="w-16 h-16 text-red-400" />
            </motion.div>
            
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-3xl">
              🪙
            </div>
          </div>
        </motion.div>

        <h3 className="text-3xl font-bold text-white mb-3">
          Transaction Failed
        </h3>
        <p className="text-lg text-white/60 mb-2">
          Your {transactionType} of {amount} couldn't be processed
        </p>
        <p className="text-sm text-white/40 mb-6">
          This could be due to insufficient funds, a network issue, or a temporary problem with the payment processor.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg mb-8">
          <AlertCircle className="w-4 h-4 text-white/40" />
          <span className="text-xs text-white/40 font-mono">
            Error Code: ERR_TRANSACTION_DECLINED
          </span>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <button 
            onClick={onRetry || (() => console.log('Retry transaction'))}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <button 
            onClick={onGoHome || (() => window.location.href = '/home')}
            className="px-6 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl text-white font-semibold transition-all flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">🪙</div>
            <p className="text-sm text-white/70 italic text-left">
              "Hmm, that didn't go through. Let's double-check your account balance and try once more!" 
              <span className="text-yellow-400 font-semibold"> — Goldie</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// DATA LOAD ERROR
export function DataLoadError({
  dataType = "transactions",
  onRetry,
  onGoHome
}: {
  dataType?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[500px] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <motion.div
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-6xl shadow-[0_0_40px_rgba(255,215,0,0.2)]"
            >
              🪙
            </motion.div>
            
            <motion.div
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -right-4 top-4 w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center"
            >
              <Database className="w-8 h-8 text-red-400" />
            </motion.div>
          </div>
        </motion.div>

        <h3 className="text-3xl font-bold text-white mb-3">
          Couldn't Load Data
        </h3>
        <p className="text-lg text-white/60 mb-6">
          We had trouble loading your {dataType}. Let's give it another shot!
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg mb-8">
          <AlertCircle className="w-4 h-4 text-white/40" />
          <span className="text-xs text-white/40 font-mono">
            Error Code: ERR_DATA_FETCH
          </span>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <button 
            onClick={onRetry || (() => window.location.reload())}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Reload
          </button>
          <button 
            onClick={onGoHome || (() => window.location.href = '/home')}
            className="px-6 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl text-white font-semibold transition-all flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">🪙</div>
            <p className="text-sm text-white/70 italic text-left">
              "Oops, we dropped the ball on loading that data. Hit reload and we'll fetch it right away!" 
              <span className="text-yellow-400 font-semibold"> — Goldie</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// INVESTMENT ERROR (Fin version)
export function InvestmentError({
  onRetry,
  onGoHome
}: {
  onRetry?: () => void;
  onGoHome?: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[500px] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <motion.div
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{
                y: [0, -5, 0],
                rotate: [-2, 2, -2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center text-6xl shadow-[0_0_40px_rgba(59,130,246,0.2)]"
            >
              🐋
            </motion.div>
            
            <motion.div
              animate={{
                y: [-2, 2, -2]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -right-4 -top-2 w-16 h-16 bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-full flex items-center justify-center"
            >
              <TrendingUp className="w-8 h-8 text-red-400 rotate-180" />
            </motion.div>
          </div>
        </motion.div>

        <h3 className="text-3xl font-bold text-white mb-3">
          Portfolio Unavailable
        </h3>
        <p className="text-lg text-white/60 mb-6">
          We're having trouble accessing your investment portfolio right now
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg mb-8">
          <AlertCircle className="w-4 h-4 text-white/40" />
          <span className="text-xs text-white/40 font-mono">
            Error Code: ERR_PORTFOLIO_503
          </span>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <button 
            onClick={onRetry || (() => window.location.reload())}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-semibold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Retry
          </button>
          <button 
            onClick={onGoHome || (() => window.location.href = '/home')}
            className="px-6 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl text-white font-semibold transition-all flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">🐋</div>
            <p className="text-sm text-white/70 italic text-left">
              "Market data services can be temperamental. Your investments are safe — we just need a moment to reconnect." 
              <span className="text-blue-400 font-semibold"> — Fin</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// INLINE ERROR MESSAGE (for forms, etc.)
export function InlineError({ 
  message,
  className = "" 
}: { 
  message: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg ${className}`}
    >
      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
      <span className="text-sm text-red-300">{message}</span>
    </motion.div>
  );
}

// ERROR TOAST/NOTIFICATION
export function ErrorToast({
  message,
  errorCode,
  onDismiss
}: {
  message: string;
  errorCode?: string;
  onDismiss?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="bg-gradient-to-r from-red-500/20 to-red-600/10 backdrop-blur-xl border border-red-500/30 rounded-xl p-4 shadow-xl max-w-md"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-red-400" />
        </div>
        
        <div className="flex-1">
          <div className="text-sm font-semibold text-white mb-1">{message}</div>
          {errorCode && (
            <div className="text-xs text-white/40 font-mono">{errorCode}</div>
          )}
        </div>
        
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className="text-white/40 hover:text-white transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
}
