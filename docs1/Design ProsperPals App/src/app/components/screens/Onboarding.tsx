import { Link } from 'react-router';
import CompanionAvatar from '../CompanionAvatar';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function Onboarding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] flex items-center justify-center p-8 relative overflow-hidden">
      {/* Constellation background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <Sparkles className="w-12 h-12 text-[#FFD700]" />
          <h1 className="text-5xl font-bold">ProsperPals</h1>
        </motion.div>

        {/* Companions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-12 mb-12"
        >
          {/* Goldie */}
          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col items-center gap-4"
          >
            <CompanionAvatar type="goldie" size="xl" />
            <div>
              <h3 className="text-2xl font-bold text-[#FFD700] mb-1">Goldie</h3>
              <p className="text-gray-400">Your budgeting buddy</p>
            </div>
          </motion.div>

          {/* Fin */}
          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col items-center gap-4"
          >
            <CompanionAvatar type="fin" size="xl" />
            <div>
              <h3 className="text-2xl font-bold text-[#4A90D9] mb-1">Fin</h3>
              <p className="text-gray-400">Your investing guide</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Welcome text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Meet Your Financial Companions</h2>
          <p className="text-xl text-gray-300">
            Goldie helps with daily budgeting. Fin teaches you to invest.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-6"
        >
          <Link
            to="/chat-goldie"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1a1a2e] font-bold text-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all hover:scale-105"
          >
            Start with Goldie
          </Link>
          <Link
            to="/chat-fin"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#4A90D9] to-[#2563EB] text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(74,144,217,0.5)] transition-all hover:scale-105"
          >
            Start with Fin
          </Link>
        </motion.div>

        {/* Skip link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <Link
            to="/budget-central"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Skip to Budget Central →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
