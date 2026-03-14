import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { 
  Sparkles, 
  Wallet, 
  BookOpen, 
  Gamepad2, 
  Target, 
  Users, 
  TrendingUp, 
  PieChart, 
  RefreshCw, 
  ArrowRight,
  MessageSquare,
  BarChart3
} from "lucide-react";

export function Landing() {
  const features = [
    {
      title: "Budget Central",
      description: "Track your daily spending with Goldie's warm encouragement",
      icon: <Wallet className="w-6 h-6" />,
      path: "/budget-central",
      gradient: "from-yellow-500/20 to-yellow-600/20",
      accent: "border-yellow-500/30",
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-500"
    },
    {
      title: "Learning Hub",
      description: "Master financial concepts with interactive lessons",
      icon: <BookOpen className="w-6 h-6" />,
      path: "/learning-hub",
      gradient: "from-purple-500/20 to-purple-600/20",
      accent: "border-purple-500/30",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500"
    },
    {
      title: "Virtual Portfolio",
      description: "Practice investing risk-free with €10,000 virtual cash",
      icon: <Gamepad2 className="w-6 h-6" />,
      path: "/virtual-portfolio",
      gradient: "from-indigo-500/20 to-indigo-600/20",
      border: "border-indigo-500/30"
    },
    {
      title: "Goals & Milestones",
      description: "Set and achieve your financial dreams",
      icon: <Target className="w-6 h-6" />,
      path: "/goals",
      gradient: "from-green-500/20 to-green-600/20",
      accent: "border-green-500/30",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500"
    },
    {
      title: "Family Space",
      description: "Manage household finances together",
      icon: <Users className="w-6 h-6" />,
      path: "/family-space",
      gradient: "from-pink-500/20 to-pink-600/20",
      accent: "border-pink-500/30",
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-500"
    },
    {
      title: "Net Worth Tracker",
      description: "Visualize your complete financial picture",
      icon: <TrendingUp className="w-6 h-6" />,
      path: "/net-worth",
      gradient: "from-cyan-500/20 to-cyan-600/20",
      accent: "border-cyan-500/30",
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-500"
    },
    {
      title: "Spending Insights",
      description: "Understand where your money goes",
      icon: <PieChart className="w-6 h-6" />,
      path: "/spending-insights",
      gradient: "from-orange-500/20 to-orange-600/20",
      accent: "border-orange-500/30",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500"
    },
    {
      title: "Subscriptions",
      description: "Track and manage recurring expenses",
      icon: <RefreshCw className="w-6 h-6" />,
      path: "/subscriptions",
      gradient: "from-red-500/20 to-red-600/20",
      accent: "border-red-500/30",
      iconBg: "bg-red-500/10",
      iconColor: "text-red-500"
    }
  ];

  const companions = [
    {
      name: "Goldie",
      emoji: "🪙",
      description: "Your warm and encouraging daily budgeting companion",
      specialty: "Daily Budgeting & Spending",
      path: "/chat-goldie",
      gradient: "from-yellow-500 to-yellow-300",
      bgGradient: "from-yellow-500/10 via-yellow-400/5 to-transparent",
      features: ["Smart spending tips", "Daily check-ins", "Budget alerts", "Encouragement"]
    },
    {
      name: "Fin",
      emoji: "📊",
      description: "Your analytical and trustworthy investing educator",
      specialty: "Investing & Financial Education",
      path: "/chat-fin",
      gradient: "from-blue-500 to-blue-300",
      bgGradient: "from-blue-500/10 via-blue-400/5 to-transparent",
      features: ["Investment basics", "Market insights", "Portfolio tips", "Risk analysis"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/10">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-blue-500/5" />
        
        {/* Top Navigation */}
        <div className="relative max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="font-bold text-xl bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
              ProsperPals
            </span>
          </div>
          <Link
            to="/auth"
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-all"
          >
            Sign In
          </Link>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-16">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-12 h-12 text-yellow-400" />
              <h1 className="font-bold text-5xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-blue-400 bg-clip-text text-transparent">
                ProsperPals
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
              Your AI-powered companions for financial wellness
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Master budgeting with Goldie and learn investing with Fin. Together, they'll help you build lasting financial confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4 pt-6">
              <Link
                to="/auth"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl font-semibold text-[#0f0f1a] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/learning-hub"
                className="flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                <BookOpen className="w-5 h-5" />
                Explore Learning
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* AI Companions Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Meet Your AI Companions</h2>
          <p className="text-white/60 text-lg">Two specialized assistants, one complete financial wellness journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {companions.map((companion) => (
            <Link
              key={companion.name}
              to={companion.path}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${companion.bgGradient} opacity-50`} />
              
              <div className="relative space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{companion.emoji}</div>
                    <div>
                      <h3 className={`text-2xl font-bold bg-gradient-to-r ${companion.gradient} bg-clip-text text-transparent`}>
                        {companion.name}
                      </h3>
                      <p className="text-sm text-white/50">{companion.specialty}</p>
                    </div>
                  </div>
                  <MessageSquare className="w-6 h-6 text-white/30 group-hover:text-white/60 transition-colors" />
                </div>

                {/* Description */}
                <p className="text-white/70">{companion.description}</p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3">
                  {companion.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-white/60"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${companion.gradient}`} />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors pt-2">
                  Chat with {companion.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Tools for Your Financial Journey</h2>
          <p className="text-white/60 text-lg">Everything you need to take control of your financial wellness</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.path}
              className={`group relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-xl border ${feature.accent} p-6 hover:bg-white/10 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative space-y-4">
                {/* Icon */}
                <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center ${feature.iconColor}`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-bold mb-2 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-white/80 transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                2 AI Companions
              </div>
              <p className="text-white/60">Specialized in budgeting & investing</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                8+ Features
              </div>
              <p className="text-white/60">Comprehensive financial tools</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                €10,000 Virtual
              </div>
              <p className="text-white/60">Practice portfolio to learn safely</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-white/10">
        <div className="max-w-4xl mx-auto px-8 py-16 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to transform your financial future?</h2>
          <p className="text-white/60 text-lg">
            Join ProsperPals today and start your journey toward financial confidence
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link
              to="/chat-goldie"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl font-semibold text-[#0f0f1a] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all"
            >
              🪙 Chat with Goldie
            </Link>
            <Link
              to="/chat-fin"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl font-semibold text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all"
            >
              📊 Chat with Fin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}