import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Key,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  TrendingUp,
  User
} from "lucide-react";
import { useNavigate } from "react-router";

type AuthMode = "login" | "register";
type FormState = "idle" | "loading" | "error" | "success";

export function LoginAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [formState, setFormState] = useState<FormState>("idle");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [gdprAccepted, setGdprAccepted] = useState(false);
  
  // Error state
  const [errorMessage, setErrorMessage] = useState("");
  
  // Background particles
  const [particles, setParticles] = useState<Array<{x: number, y: number, size: number, delay: number}>>([]);

  useEffect(() => {
    // Generate random particles for background
    const newParticles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error
    setErrorMessage("");
    
    // Validation
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      setFormState("error");
      return;
    }

    if (mode === "register") {
      if (!fullName) {
        setErrorMessage("Please enter your full name");
        setFormState("error");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        setFormState("error");
        return;
      }
      if (!gdprAccepted) {
        setErrorMessage("Please accept the Terms of Service");
        setFormState("error");
        return;
      }
    }

    // Loading state
    setFormState("loading");

    // Simulate API call
    setTimeout(() => {
      setFormState("success");
      
      // Navigate after success
      setTimeout(() => {
        if (mode === "register") {
          navigate("/meet-goldie"); // Onboarding
        } else {
          navigate("/dashboard"); // Main app
        }
      }, 1500);
    }, 2000);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
      setTimeout(() => navigate("/dashboard"), 1500);
    }, 2000);
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setFormState("idle");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] relative overflow-hidden">
      {/* Animated Background with Gradient Glows */}
      <div className="absolute inset-0">
        {/* Gold glow center-left */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFD700] opacity-[0.08] rounded-full blur-[120px]" />
        
        {/* Blue glow lower right */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#4A90D9] opacity-[0.06] rounded-full blur-[100px]" />
        
        {/* Animated particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[rgba(255,215,0,0.15)]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 8 + particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* LEFT HERO PANEL - 55% */}
        <div className="hidden lg:flex lg:w-[55%] flex-col justify-between p-12 xl:p-16">
          {/* Top: Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-3xl filter drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]"
            >
              🗝️
            </motion.div>
            <div className="text-white font-bold text-[28px]">
              ProsperPals
            </div>
          </motion.div>

          {/* Center: Headline + Companions */}
          <div className="flex-1 flex flex-col justify-center max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white font-extrabold text-[52px] leading-tight mb-4"
            >
              How shall we{" "}
              <span className="bg-gradient-to-r from-[#FFD700] to-[#F59E0B] bg-clip-text text-transparent">
                Prosper
              </span>
              ?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[#9CA3AF] text-lg mb-12"
            >
              Your AI-powered journey to financial freedom starts here.
            </motion.p>

            {/* AI Companions Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative backdrop-blur-xl bg-[rgba(26,26,46,0.4)] border border-[rgba(255,255,255,0.1)] rounded-[16px] p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Goldie */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-[#FFD700]/20 to-[#F59E0B]/10 rounded-2xl p-6 border border-[#FFD700]/30">
                    {/* Goldie Character */}
                    <div className="relative mb-4">
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_40px_rgba(255,215,0,0.4)]"
                      >
                        <span className="text-5xl">🦉</span>
                      </motion.div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-[#FFD700] opacity-20 blur-xl rounded-full" />
                    </div>
                    
                    <h3 className="text-white font-bold text-xl text-center mb-2">
                      Goldie
                    </h3>
                    
                    {/* Speech bubble */}
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                      <p className="text-white text-sm text-center">
                        I'll guide your budget journey! 🌟
                      </p>
                      {/* Triangle pointer */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white/10" />
                    </div>
                  </div>
                </motion.div>

                {/* Fin */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-[#4A90D9]/20 to-[#357ABD]/10 rounded-2xl p-6 border border-[#4A90D9]/30">
                    {/* Fin Character */}
                    <div className="relative mb-4">
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-[#4A90D9] to-[#357ABD] flex items-center justify-center shadow-[0_0_40px_rgba(74,144,217,0.4)]"
                      >
                        <span className="text-5xl">🦊</span>
                      </motion.div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-[#4A90D9] opacity-20 blur-xl rounded-2xl" />
                    </div>
                    
                    <h3 className="text-white font-bold text-xl text-center mb-2">
                      Fin
                    </h3>
                    
                    {/* Speech bubble */}
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                      <p className="text-white text-sm text-center">
                        Smart investing made simple. 📈
                      </p>
                      {/* Triangle pointer */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white/10" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom: Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#9CA3AF] text-xs flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            Educational tool only — not financial advice
          </motion.p>
        </div>

        {/* RIGHT FORM PANEL - 45% */}
        <div className="w-full lg:w-[45%] flex items-center justify-center p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-md"
          >
            {/* Glassmorphism Card */}
            <div className="relative backdrop-blur-[20px] bg-[rgba(26,26,46,0.8)] border border-[rgba(255,255,255,0.1)] rounded-[24px] p-8 lg:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.3)]">
              {/* Success Confetti */}
              <AnimatePresence>
                {formState === "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none z-50"
                  >
                    {Array.from({ length: 30 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          background: i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#4A90D9" : "#10B981",
                          left: `${Math.random() * 100}%`,
                          top: "50%",
                        }}
                        animate={{
                          y: [0, -200 - Math.random() * 100],
                          x: [(Math.random() - 0.5) * 100],
                          opacity: [1, 0],
                          rotate: [0, Math.random() * 360],
                        }}
                        transition={{
                          duration: 1 + Math.random(),
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Logo (visible on small screens) */}
              <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                <span className="text-2xl">🗝️</span>
                <div className="text-white font-bold text-xl">ProsperPals</div>
              </div>

              {/* Card Header */}
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: formState === "success" ? [0, 360] : 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block mb-4"
                >
                  <Key className="w-12 h-12 text-[#FFD700] filter drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]" />
                </motion.div>
                
                <h2 className="text-white font-bold text-[28px] mb-2">
                  {mode === "login" ? "Welcome back" : "Create your account"}
                </h2>
                
                <p className="text-[#9CA3AF] text-sm">
                  {mode === "login" 
                    ? "Sign in to continue your prosperity journey"
                    : "Start your journey to financial freedom"}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name (Register only) */}
                <AnimatePresence>
                  {mode === "register" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                        <input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full h-[52px] bg-[#1a1a2e] border border-[rgba(255,255,255,0.15)] rounded-xl pl-12 pr-4 text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#FFD700] focus:shadow-[0_0_12px_rgba(255,215,0,0.3)] transition-all"
                          disabled={formState === "loading"}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={`w-full h-[52px] bg-[#1a1a2e] border ${
                        formState === "error" ? "border-[#EF4444]" : "border-[rgba(255,255,255,0.15)]"
                      } rounded-xl pl-12 pr-4 text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#FFD700] focus:shadow-[0_0_12px_rgba(255,215,0,0.3)] transition-all`}
                      disabled={formState === "loading"}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className={`w-full h-[52px] bg-[#1a1a2e] border ${
                        formState === "error" ? "border-[#EF4444]" : "border-[rgba(255,255,255,0.15)]"
                      } rounded-xl pl-12 pr-12 text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#FFD700] focus:shadow-[0_0_12px_rgba(255,215,0,0.3)] transition-all`}
                      disabled={formState === "loading"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD700] rounded"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password (Register only) */}
                <AnimatePresence>
                  {mode === "register" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label htmlFor="confirmPassword" className="block text-white text-sm font-medium mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm Password"
                          className={`w-full h-[52px] bg-[#1a1a2e] border ${
                            formState === "error" && password !== confirmPassword ? "border-[#EF4444]" : "border-[rgba(255,255,255,0.15)]"
                          } rounded-xl pl-12 pr-12 text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#FFD700] focus:shadow-[0_0_12px_rgba(255,215,0,0.3)] transition-all`}
                          disabled={formState === "loading"}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD700] rounded"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Message */}
                <AnimatePresence>
                  {formState === "error" && errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 text-[#EF4444] text-sm bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg p-3"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Remember Me & Forgot Password (Login only) */}
                {mode === "login" && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded bg-[#1a1a2e] border border-[rgba(255,255,255,0.15)] text-[#FFD700] focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-0 cursor-pointer accent-[#FFD700]"
                      />
                      <span className="text-white text-sm group-hover:text-[#FFD700] transition-colors">
                        Remember me
                      </span>
                    </label>
                    
                    <button
                      type="button"
                      className="text-[#FFD700] text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-[#FFD700] rounded px-1"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* GDPR Checkbox (Register only) */}
                <AnimatePresence>
                  {mode === "register" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={gdprAccepted}
                          onChange={(e) => setGdprAccepted(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded bg-[#1a1a2e] border border-[rgba(255,255,255,0.15)] text-[#FFD700] focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-0 cursor-pointer accent-[#FFD700]"
                          required
                        />
                        <span className="text-[#9CA3AF] text-sm group-hover:text-white transition-colors">
                          I agree to the{" "}
                          <a href="#" className="text-[#FFD700] hover:underline">
                            Terms of Service
                          </a>
                          {" "}and{" "}
                          <a href="#" className="text-[#FFD700] hover:underline">
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formState === "loading" || (mode === "register" && !gdprAccepted)}
                  whileHover={formState === "idle" ? { scale: 1.02, filter: "brightness(1.1)" } : {}}
                  whileTap={formState === "idle" ? { scale: 0.98 } : {}}
                  className={`w-full h-[52px] bg-gradient-to-r from-[#FFD700] to-[#F59E0B] rounded-xl font-bold text-black text-base flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,215,0,0.3)] transition-all ${
                    formState === "loading" || (mode === "register" && !gdprAccepted)
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-[0_6px_24px_rgba(255,215,0,0.4)]"
                  }`}
                >
                  {formState === "loading" ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                    />
                  ) : formState === "success" ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Success!
                    </>
                  ) : (
                    <>
                      {mode === "login" ? "Sign In" : "Create Account"}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Disclaimer */}
                <p className="text-[#9CA3AF] text-xs text-center leading-relaxed">
                  ⚠️ ProsperPals is an educational tool only and does not constitute financial advice. Always consult a qualified financial advisor.
                </p>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
                  <span className="text-[#9CA3AF] text-sm">or continue with</span>
                  <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Google */}
                  <motion.button
                    type="button"
                    onClick={() => handleSocialLogin("Google")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formState === "loading"}
                    className="h-[48px] bg-white rounded-xl font-semibold text-[#1F2937] flex items-center justify-center gap-2 hover:bg-[#F3F4F6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD700] disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </motion.button>

                  {/* Apple */}
                  <motion.button
                    type="button"
                    onClick={() => handleSocialLogin("Apple")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formState === "loading"}
                    className="h-[48px] bg-black rounded-xl font-semibold text-white flex items-center justify-center gap-2 hover:bg-[#1F2937] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD700] disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    Apple
                  </motion.button>
                </div>

                {/* Toggle Mode */}
                <div className="text-center pt-4">
                  <span className="text-[#9CA3AF] text-sm">
                    {mode === "login" ? "New here? " : "Already have an account? "}
                  </span>
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-[#FFD700] text-sm font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-[#FFD700] rounded px-1"
                  >
                    {mode === "login" ? "Create your account →" : "Sign in →"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
