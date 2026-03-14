import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Key, Mail, Lock, Eye, EyeOff, Check, User, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { PremiumCheckbox } from "../components/PremiumCheckbox";

export function Auth() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(false);

  // Password strength calculator
  const getPasswordStrength = (pass: string): { level: string; color: string; width: string } => {
    if (pass.length === 0) return { level: "", color: "", width: "0%" };
    if (pass.length < 6) return { level: "Weak", color: "bg-red-500", width: "33%" };
    if (pass.length < 10) return { level: "Medium", color: "bg-orange-500", width: "66%" };
    return { level: "Strong", color: "bg-green-500", width: "100%" };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] relative overflow-hidden flex items-center justify-center">
      {/* Animated Constellation Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3
            }}
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              boxShadow: "0 0 4px rgba(255, 215, 0, 0.8)"
            }}
          />
        ))}
      </div>

      {/* Floating Golden Key Icon */}
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-32 left-1/2 -translate-x-1/2"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full scale-150" />
          
          {/* Key icon */}
          <Key className="w-24 h-24 text-yellow-400 relative z-10" strokeWidth={1.5} />
          
          {/* Sparkles around key */}
          {[0, 90, 180, 270].map((rotation, i) => (
            <motion.div
              key={i}
              animate={{ 
                rotate: 360,
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, delay: i * 0.5 }
              }}
              className="absolute top-1/2 left-1/2"
              style={{ 
                transform: `rotate(${rotation}deg) translateY(-50px)`,
                transformOrigin: "center"
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[440px] mx-4"
      >
        <div className="bg-[#1a1a2e]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_60px_rgba(255,215,0,0.1)] p-8">
          {/* Logo and Tagline */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center justify-center gap-2 mb-3"
            >
              <Key className="w-8 h-8 text-yellow-400" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                ProsperPals
              </h1>
              <motion.div
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </motion.div>
            </motion.div>
            <p className="text-lg bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent font-semibold">
              Unlock Your Prosperity
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex gap-2 mb-6 bg-white/5 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("signin")}
              className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all ${
                activeTab === "signin"
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1a1a2e]"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all ${
                activeTab === "signup"
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1a1a2e]"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {activeTab === "signin" ? (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-11 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <PremiumCheckbox
                    checked={rememberMe}
                    onChange={setRememberMe}
                    label="Remember me"
                    variant="gold"
                  />
                  <button className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
                    Forgot password?
                  </button>
                </div>

                {/* Sign In Button */}
                <Link to="/home">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-[#1a1a2e] font-bold py-3.5 px-6 rounded-lg transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] mt-2"
                  >
                    Sign In
                  </motion.button>
                </Link>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-sm text-white/40">or continue with</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Social Auth Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg py-3 px-4 transition-all group">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                      <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                      <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                      <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                    </svg>
                    <span className="text-sm text-white/80 hidden sm:inline">Google</span>
                  </button>

                  <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg py-3 px-4 transition-all group">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="white" />
                    </svg>
                    <span className="text-sm text-white/80 hidden sm:inline">Apple</span>
                  </button>

                  <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg py-3 px-4 transition-all group">
                    <div className="w-5 h-5 bg-gradient-to-br from-red-500 to-red-700 rounded flex items-center justify-center text-white font-bold text-xs">
                      M
                    </div>
                    <span className="text-sm text-white/80 hidden sm:inline">MitID</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Full Name Field */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                {/* Password Field with Strength Meter */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-11 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {password.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/60">Password Strength:</span>
                        <span className={`text-xs font-semibold ${
                          passwordStrength.level === "Weak" ? "text-red-400" :
                          passwordStrength.level === "Medium" ? "text-orange-400" :
                          "text-green-400"
                        }`}>
                          {passwordStrength.level}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: passwordStrength.width }}
                          transition={{ duration: 0.3 }}
                          className={`${passwordStrength.color} h-full rounded-full`}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-11 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-2">
                  <PremiumCheckbox
                    checked={agreedToTerms}
                    onChange={setAgreedToTerms}
                    variant="gold"
                    label={
                      <span>
                        I agree to the{" "}
                        <button 
                          type="button"
                          className="text-yellow-400 hover:text-yellow-300 hover:underline transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            // Handle Terms of Service click
                          }}
                        >
                          Terms of Service
                        </button>{" "}
                        and{" "}
                        <button 
                          type="button"
                          className="text-yellow-400 hover:text-yellow-300 hover:underline transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            // Handle Privacy Policy click
                          }}
                        >
                          Privacy Policy
                        </button>
                      </span>
                    }
                  />

                  <PremiumCheckbox
                    checked={agreedToDisclaimer}
                    onChange={setAgreedToDisclaimer}
                    variant="gold"
                    label="I understand ProsperPals is an educational tool, not financial advice"
                  />
                </div>

                {/* Create Account Button */}
                <Link to="/home">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!agreedToTerms || !agreedToDisclaimer}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-[#1a1a2e] font-bold py-3.5 px-6 rounded-lg transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] disabled:shadow-none mt-2"
                  >
                    Create Account
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Security Information */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/60 mb-3 flex items-center justify-center gap-2">
            <span>🇪🇺</span>
            By signing in, your data stays in the EU
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-white/40">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span>Bank-level encryption</span>
            </div>
            <div className="w-px h-3 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <span>GDPR Compliant</span>
            </div>
            <div className="w-px h-3 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              <span>No data sales</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Companion Characters */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed bottom-8 left-8 z-20"
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            y: [0, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <div className="text-6xl">🪙</div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 text-2xl"
          >
            👋
          </motion.div>
        </motion.div>
        <div className="mt-2 text-center">
          <p className="text-sm font-bold text-yellow-400">Goldie</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed bottom-8 right-8 z-20"
      >
        <motion.div
          animate={{ 
            rotate: [0, -5, 5, 0],
            y: [0, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="relative"
        >
          <div className="text-6xl">📊</div>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -left-2 text-2xl"
          >
            👀
          </motion.div>
        </motion.div>
        <div className="mt-2 text-center">
          <p className="text-sm font-bold text-blue-400">Fin</p>
        </div>
      </motion.div>
    </div>
  );
}