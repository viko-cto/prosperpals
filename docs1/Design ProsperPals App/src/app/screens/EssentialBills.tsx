import { useState } from "react";
import { motion } from "motion/react";
import { 
  Home as HomeIcon,
  Zap,
  Shield,
  Smartphone,
  Wifi,
  Car,
  Heart,
  ChevronRight,
  CheckCircle2,
  Clock,
  Calendar,
  TrendingUp,
  Info
} from "lucide-react";
import { useNavigate } from "react-router";

type Bill = {
  id: string;
  name: string;
  amount: number;
  dueDate: number; // Day of month
  category: string;
  icon: any;
  autoPayEnabled: boolean;
  color: string;
};

export function EssentialBills() {
  const navigate = useNavigate();
  
  const bills: Bill[] = [
    {
      id: "1",
      name: "Rent",
      amount: 8500,
      dueDate: 1,
      category: "Housing",
      icon: HomeIcon,
      autoPayEnabled: true,
      color: "from-[#8B9DC3] to-[#7B8DB3]"
    },
    {
      id: "2",
      name: "Electricity",
      amount: 450,
      dueDate: 5,
      category: "Utilities",
      icon: Zap,
      autoPayEnabled: true,
      color: "from-[#F4C430] to-[#E4B420]"
    },
    {
      id: "3",
      name: "Home Insurance",
      amount: 320,
      dueDate: 10,
      category: "Insurance",
      icon: Shield,
      autoPayEnabled: true,
      color: "from-[#A8D5BA] to-[#98C5AA]"
    },
    {
      id: "4",
      name: "Phone Plan",
      amount: 299,
      dueDate: 15,
      category: "Communication",
      icon: Smartphone,
      autoPayEnabled: false,
      color: "from-[#9B9EBD] to-[#8B8EAD]"
    },
    {
      id: "5",
      name: "Internet",
      amount: 399,
      dueDate: 18,
      category: "Communication",
      icon: Wifi,
      autoPayEnabled: true,
      color: "from-[#7EAAB8] to-[#6E9AA8]"
    },
    {
      id: "6",
      name: "Car Insurance",
      amount: 890,
      dueDate: 22,
      category: "Insurance",
      icon: Car,
      autoPayEnabled: true,
      color: "from-[#B8A8D5] to-[#A898C5]"
    },
    {
      id: "7",
      name: "Health Insurance",
      amount: 1542,
      dueDate: 28,
      category: "Insurance",
      icon: Heart,
      autoPayEnabled: false,
      color: "from-[#D5A8B8] to-[#C59AA8]"
    },
  ];

  const totalEssentials = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const monthlyIncome = 26500; // Mock data
  const essentialsPercentage = Math.round((totalEssentials / monthlyIncome) * 100);

  // Current day for timeline
  const today = 24; // February 24th

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F8F9FB] to-[#F0F2F5] px-6 pt-8 pb-6 border-b border-[#E1E4E8]">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#374151] transition-colors mb-4"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span className="text-sm font-medium">Back</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-[#1F2937] mb-2">
            Essential Bills
          </h1>
          <p className="text-sm text-[#6B7280]">
            Your non-negotiable monthly expenses
          </p>
        </motion.div>
      </div>

      <div className="px-6 pt-6 space-y-5">
        {/* Total Essentials Card with Goldie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden bg-gradient-to-br from-white to-[#FFFBF5] rounded-[24px] p-6 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-[#F3E9DC]"
        >
          {/* Subtle decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD93D]/5 rounded-full blur-2xl" />
          
          <div className="relative">
            <div className="flex items-start gap-3 mb-4">
              {/* Goldie avatar - small and friendly */}
              <motion.div
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FFD93D] to-[#FFC93D] flex items-center justify-center shadow-lg border-2 border-[#FFED4E] flex-shrink-0"
              >
                <span className="text-xl">🪙</span>
              </motion.div>
              
              <div className="flex-1">
                <div className="text-xs font-semibold text-[#B8860B] mb-1 uppercase tracking-wide">
                  Monthly Total
                </div>
                <div className="text-4xl font-bold text-[#1F2937] mb-2">
                  {totalEssentials.toLocaleString()} kr
                </div>
              </div>
            </div>

            <p className="text-[#4B5563] leading-relaxed text-sm">
              These are your non-negotiables — the foundation expenses that keep everything running smoothly.
            </p>
          </div>
        </motion.div>

        {/* Calendar Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[20px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-[#E5E7EB]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#6B7280]" />
              <h3 className="text-[#1F2937] font-bold text-sm">Payment Schedule</h3>
            </div>
            <span className="text-xs text-[#9CA3AF] font-medium">February 2026</span>
          </div>

          {/* Timeline visualization */}
          <div className="relative">
            {/* Month line */}
            <div className="relative h-12 bg-gradient-to-r from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] rounded-full overflow-hidden">
              {/* Today marker */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-0 bottom-0 w-0.5 bg-[#4B5563]"
                style={{ left: `${(today / 28) * 100}%` }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#4B5563] rounded-full" />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-[#4B5563]">
                  Today
                </div>
              </motion.div>

              {/* Bill markers */}
              {bills.map((bill, index) => {
                const position = (bill.dueDate / 28) * 100;
                const isPast = bill.dueDate < today;
                const isUpcoming = bill.dueDate >= today && bill.dueDate <= today + 5;
                
                return (
                  <motion.div
                    key={bill.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.05, type: "spring", stiffness: 300 }}
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: `${position}%` }}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      isPast 
                        ? "bg-[#D1D5DB]" 
                        : isUpcoming 
                        ? "bg-[#FFA726] ring-2 ring-[#FFA726]/30" 
                        : "bg-[#60A5FA]"
                    }`} />
                  </motion.div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#D1D5DB]" />
                <span className="text-[#9CA3AF]">Paid</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#FFA726]" />
                <span className="text-[#9CA3AF]">Due soon</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#60A5FA]" />
                <span className="text-[#9CA3AF]">Upcoming</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bills List */}
        <div className="space-y-3">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm font-bold text-[#6B7280] uppercase tracking-wide px-1"
          >
            All Bills ({bills.length})
          </motion.h3>

          {bills.map((bill, index) => {
            const Icon = bill.icon;
            const daysUntil = bill.dueDate - today;
            const isPast = daysUntil < 0;
            const isDueSoon = daysUntil >= 0 && daysUntil <= 5;
            
            return (
              <motion.div
                key={bill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="bg-white rounded-[20px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#E5E7EB] hover:border-[#D1D5DB] transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-[14px] bg-gradient-to-br ${bill.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-[#1F2937] font-bold text-base truncate">
                            {bill.name}
                          </h4>
                          {/* Auto-pay status dot */}
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            bill.autoPayEnabled ? "bg-[#10B981]" : "bg-[#FFA726]"
                          }`} />
                        </div>
                        <div className="text-xs text-[#9CA3AF]">
                          {bill.category}
                        </div>
                      </div>
                      
                      <div className="text-right ml-3 flex-shrink-0">
                        <div className="text-[#1F2937] font-bold text-lg">
                          {bill.amount.toLocaleString()} kr
                        </div>
                      </div>
                    </div>

                    {/* Due date & status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {bill.autoPayEnabled ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                            <span className="text-xs text-[#10B981] font-medium">Auto-pay</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3.5 h-3.5 text-[#FFA726]" />
                            <span className="text-xs text-[#FFA726] font-medium">Manual</span>
                          </>
                        )}
                      </div>

                      <div className={`text-xs font-medium ${
                        isPast 
                          ? "text-[#9CA3AF]" 
                          : isDueSoon 
                          ? "text-[#F59E0B] bg-[#FEF3C7] px-2 py-0.5 rounded-full" 
                          : "text-[#6B7280]"
                      }`}>
                        {isPast 
                          ? `Paid on ${bill.dueDate}th` 
                          : isDueSoon 
                          ? `Due in ${daysUntil}d` 
                          : `Due ${bill.dueDate}th`
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fin's Analysis Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#EEF6FC] to-[#E3F2FD] rounded-[20px] p-5 shadow-[0_2px_12px_rgba(74,144,226,0.15)] border border-[#BBDEFB]"
        >
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#4A90E2]/10 rounded-full blur-xl" />
          
          <div className="relative flex items-start gap-3">
            {/* Fin avatar - small, analytical */}
            <motion.div
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-[#4A90E2] to-[#357ABD] flex items-center justify-center shadow-md border-2 border-[#5BA3F5] flex-shrink-0"
            >
              <span className="text-xl">📊</span>
            </motion.div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xs font-semibold text-[#1E40AF] uppercase tracking-wide">
                  Fin's Analysis
                </div>
                <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
              </div>

              <p className="text-[#1F2937] leading-relaxed mb-3">
                Your essentials are <span className="font-bold text-[#4A90E2]">{essentialsPercentage}%</span> of your income — that's <span className="font-bold">healthy</span>. You're leaving plenty of room for savings and flexibility.
              </p>

              {/* Mini insights */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/60 backdrop-blur-sm rounded-[12px] p-2.5">
                  <div className="text-xs text-[#6B7280] mb-0.5">Income</div>
                  <div className="text-[#1F2937] font-bold text-sm">
                    {monthlyIncome.toLocaleString()} kr
                  </div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-[12px] p-2.5">
                  <div className="text-xs text-[#6B7280] mb-0.5">Flexibility</div>
                  <div className="text-[#10B981] font-bold text-sm">
                    {(100 - essentialsPercentage)}% free
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-start gap-2 p-4 bg-[#F9FAFB] rounded-[16px] border border-[#E5E7EB]"
        >
          <Info className="w-4 h-4 text-[#9CA3AF] flex-shrink-0 mt-0.5" />
          <div className="text-xs text-[#6B7280] leading-relaxed">
            <span className="font-semibold text-[#4B5563]">Tip:</span> Essential bills with auto-pay are less likely to incur late fees. Consider enabling auto-pay for manual bills.
          </div>
        </motion.div>

        {/* Legend for Status Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex items-center justify-center gap-6 pb-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span className="text-xs text-[#6B7280]">Auto-pay enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFA726]" />
            <span className="text-xs text-[#6B7280]">Manual payment</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
