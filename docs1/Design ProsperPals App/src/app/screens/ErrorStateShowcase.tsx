import { useState } from "react";
import { 
  ErrorState,
  NetworkError,
  BankSyncError,
  TransactionFailedError,
  DataLoadError,
  InvestmentError,
  InlineError,
  ErrorToast
} from "../components/ErrorStates";

export function ErrorStateShowcase() {
  const [activeState, setActiveState] = useState<string>("generic");
  const [showToast, setShowToast] = useState(false);

  const states = [
    { id: "generic", label: "Generic Error", emoji: "😅" },
    { id: "network", label: "Network Error", emoji: "📡" },
    { id: "bank", label: "Bank Sync Error", emoji: "🏦" },
    { id: "transaction", label: "Transaction Failed", emoji: "💳" },
    { id: "data", label: "Data Load Error", emoji: "📊" },
    { id: "investment", label: "Investment Error", emoji: "📈" },
    { id: "inline", label: "Inline & Toasts", emoji: "🔔" },
  ];

  const handleGoHome = () => {
    console.log('Navigate to home');
  };

  const handleReportIssue = () => {
    console.log('Report issue');
  };

  const handleRetry = () => {
    console.log('Retry action');
  };

  return (
    <div className="flex-1 bg-[#0f0f1a] overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Error State Showcase</h1>
          <p className="text-white/60">Errors that feel recoverable, not scary</p>
        </div>

        {/* State Selector */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {states.map((state) => (
            <button
              key={state.id}
              onClick={() => setActiveState(state.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeState === state.id
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1a1a2e] shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                  : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="text-xl">{state.emoji}</span>
              {state.label}
            </button>
          ))}
        </div>

        {/* Active Error State Display */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          
          {/* GENERIC ERROR */}
          {activeState === "generic" && (
            <ErrorState
              title="Well, that's unexpected!"
              message="Something went wrong, but don't worry — we'll get you back on track."
              errorCode="ERR_500"
              onGoHome={handleGoHome}
              onReportIssue={handleReportIssue}
              companion="goldie"
            />
          )}

          {/* NETWORK ERROR */}
          {activeState === "network" && (
            <NetworkError
              onRetry={handleRetry}
              onGoHome={handleGoHome}
            />
          )}

          {/* BANK SYNC ERROR */}
          {activeState === "bank" && (
            <div className="space-y-8 p-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Bank Connection Failed</h3>
                <BankSyncError
                  bankName="Nordea"
                  bankLogo="🏦"
                  errorMessage="We couldn't connect to your bank"
                  onRetry={handleRetry}
                  onGoHome={handleGoHome}
                />
              </div>

              <div className="border-t border-white/10 pt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Different Bank Example</h3>
                <BankSyncError
                  bankName="Revolut"
                  bankLogo="💳"
                  errorMessage="Authentication failed"
                  onRetry={handleRetry}
                  onGoHome={handleGoHome}
                />
              </div>
            </div>
          )}

          {/* TRANSACTION FAILED */}
          {activeState === "transaction" && (
            <TransactionFailedError
              transactionType="purchase"
              amount="€49.99"
              onRetry={handleRetry}
              onGoHome={handleGoHome}
            />
          )}

          {/* DATA LOAD ERROR */}
          {activeState === "data" && (
            <div className="space-y-8 p-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Transactions Failed to Load</h3>
                <DataLoadError
                  dataType="transactions"
                  onRetry={handleRetry}
                  onGoHome={handleGoHome}
                />
              </div>

              <div className="border-t border-white/10 pt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Goals Failed to Load</h3>
                <DataLoadError
                  dataType="goals"
                  onRetry={handleRetry}
                  onGoHome={handleGoHome}
                />
              </div>
            </div>
          )}

          {/* INVESTMENT ERROR (Fin) */}
          {activeState === "investment" && (
            <InvestmentError
              onRetry={handleRetry}
              onGoHome={handleGoHome}
            />
          )}

          {/* INLINE & TOASTS */}
          {activeState === "inline" && (
            <div className="space-y-8 p-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Inline Error Messages</h3>
                <div className="space-y-4 max-w-lg">
                  <InlineError message="Please enter a valid email address" />
                  <InlineError message="Password must be at least 8 characters" />
                  <InlineError message="This username is already taken" />
                  <InlineError message="Insufficient funds for this transaction" />
                </div>
              </div>

              <div className="border-t border-white/10 pt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Error Toast Notification</h3>
                <div className="space-y-4">
                  <button 
                    onClick={() => setShowToast(!showToast)}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-[#1a1a2e] font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all"
                  >
                    {showToast ? "Hide Toast" : "Show Error Toast"}
                  </button>

                  {showToast && (
                    <div className="max-w-md">
                      <ErrorToast
                        message="Failed to save your budget"
                        errorCode="ERR_SAVE_FAILED"
                        onDismiss={() => setShowToast(false)}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-white/10 pt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Form with Inline Errors</h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-lg space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 bg-white/10 border border-red-500/50 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-red-500"
                      placeholder="your@email.com"
                      value="invalid-email"
                    />
                    <InlineError message="Please enter a valid email address" className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Password</label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-2 bg-white/10 border border-red-500/50 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-red-500"
                      placeholder="Enter password"
                      value="short"
                    />
                    <InlineError message="Password must be at least 8 characters" className="mt-2" />
                  </div>

                  <button className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white/40 cursor-not-allowed">
                    Submit (Disabled)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Design Principles */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
            <h3 className="text-lg font-bold text-green-400 mb-3">✅ What We Do</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Use Goldie/Fin to soften the message</li>
              <li>• Make errors feel recoverable and friendly</li>
              <li>• Provide clear error codes for support</li>
              <li>• Offer actionable solutions (Retry, Go Home)</li>
              <li>• Use warm, encouraging language</li>
              <li>• Add playful animations (worried face, question marks)</li>
            </ul>
          </div>

          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
            <h3 className="text-lg font-bold text-red-400 mb-3">❌ What We Avoid</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Scary red screens or alarming visuals</li>
              <li>• Technical jargon without explanation</li>
              <li>• Blaming the user</li>
              <li>• Dead-end errors with no action</li>
              <li>• Harsh or robotic language</li>
              <li>• Overwhelming stack traces</li>
            </ul>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-6 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-3">💡 Usage Examples</h3>
          <div className="space-y-2 text-sm text-white/80 font-mono">
            <p>// Generic error handler:</p>
            <p className="text-blue-400">
              {`{error && <ErrorState errorCode="ERR_500" onGoHome={...} />}`}
            </p>
            
            <p className="mt-4">// Network-specific error:</p>
            <p className="text-blue-400">
              {`{!isOnline && <NetworkError onRetry={refetch} />}`}
            </p>
            
            <p className="mt-4">// Form validation:</p>
            <p className="text-blue-400">
              {`{emailError && <InlineError message={emailError} />}`}
            </p>

            <p className="mt-4">// Toast notification:</p>
            <p className="text-blue-400">
              {`<ErrorToast message="Save failed" errorCode="ERR_401" />`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
