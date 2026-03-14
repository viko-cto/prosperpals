import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Check } from "lucide-react";
import { useNavigate } from "react-router";

export function BudgetOverspendNotification() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleResponse = (option: "adjust" | "handle") => {
    setSelectedOption(option);
    setShowConfirmation(true);
    
    // Navigate back after showing confirmation
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  const budgetData = [
    { category: "Groceries", spent: 1200, budget: 1500, color: "from-[#A8D5BA] to-[#98D8C8]" },
    { category: "Food", spent: 1230, budget: 1000, color: "from-[#FFB93D] to-[#FFA93D]", over: true },
    { category: "Transport", spent: 450, budget: 600, color: "from-[#98D8C8] to-[#88C8B8]" },
    { category: "Entertainment", spent: 280, budget: 400, color: "from-[#D4A5D4] to-[#C495C4]" },
  ];

  const foodCategory = budgetData.find(item => item.category === "Food");
  const overspend = foodCategory ? foodCategory.spent - foodCategory.budget : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFF5E6] to-[#FFEBCC] relative overflow-hidden">
      {/* Subtle animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-10 w-60 h-60 bg-[#FFD93D] rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.04, 0.06, 0.04],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-40 left-10 w-80 h-80 bg-[#FFC93D] rounded-full blur-3xl"
      />

      <div className="relative z-10 px-6 pt-8 pb-24 flex flex-col min-h-screen">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#666] hover:text-[#2C2C2C] transition-colors mb-6 self-start"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </motion.button>

        {/* Header - Calm, No Alarms */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-[#2C2C2C] mb-2">
            Weekly Check-in
          </h1>
          <p className="text-[#666] text-sm">
            Let's look at how this week went
          </p>
        </motion.div>

        {/* Goldie - Calm & Empathetic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex flex-col items-start mb-6"
        >
          {/* Goldie Character */}
          <div className="flex items-start gap-3 mb-4">
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative flex-shrink-0"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD93D] via-[#FFC93D] to-[#FFB93D] shadow-[0_8px_32px_rgba(255,217,61,0.4)] flex items-center justify-center border-[4px] border-[#FFED4E]">
                {/* Calm, empathetic face */}
                <div className="relative">
                  {/* Eyes - Gentle, understanding */}
                  <div className="absolute top-1 left-0 right-0 flex justify-center gap-3">
                    <motion.div
                      animate={{
                        scaleY: [1, 0.1, 1],
                      }}
                      transition={{
                        duration: 0.2,
                        repeat: Infinity,
                        repeatDelay: 4,
                      }}
                      className="w-2 h-2 bg-[#2C2C2C] rounded-full"
                    />
                    <motion.div
                      animate={{
                        scaleY: [1, 0.1, 1],
                      }}
                      transition={{
                        duration: 0.2,
                        repeat: Infinity,
                        repeatDelay: 4,
                      }}
                      className="w-2 h-2 bg-[#2C2C2C] rounded-full"
                    />
                  </div>
                  {/* Gentle, understanding smile */}
                  <div className="mt-5 w-6 h-3 border-b-[2.5px] border-[#2C2C2C] rounded-b-full" />
                </div>
              </div>
            </motion.div>

            {/* Speech Bubble */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative flex-1 max-w-[280px]"
            >
              {/* Triangle pointer */}
              <div className="absolute left-0 top-6 -translate-x-2">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[10px] border-r-white" />
              </div>
              
              {/* Bubble content */}
              <div className="bg-white rounded-[24px] px-5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-2 border-white/80">
                <p className="text-[#2C2C2C] leading-relaxed">
                  Hey, your food budget went over by <span className="font-bold">{overspend} kr</span> this week. Totally normal — want me to adjust next week's plan so it balances out?
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Visual - Soft Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-md border-2 border-white rounded-[28px] p-6 mb-6 shadow-[0_12px_48px_rgba(0,0,0,0.08)]"
        >
          <h3 className="text-[#2C2C2C] font-bold mb-2">This Week's Spending</h3>
          <p className="text-[#666] text-xs mb-6">
            Food went a bit over, but everything else is looking good
          </p>

          <div className="space-y-5">
            {budgetData.map((item, index) => {
              const percentage = (item.spent / item.budget) * 100;
              const displayPercentage = Math.min(percentage, 115); // Cap visual at 115% for layout
              
              return (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#2C2C2C] font-semibold text-sm">
                        {item.category}
                      </span>
                      {item.over && (
                        <span className="text-[#E8A75F] text-xs font-semibold bg-[#E8A75F]/10 px-2 py-0.5 rounded-full">
                          +{item.spent - item.budget} kr
                        </span>
                      )}
                    </div>
                    <span className="text-[#666] text-xs">
                      {item.spent} / {item.budget} kr
                    </span>
                  </div>
                  
                  <div className="relative h-10 bg-[#F5F3F0] rounded-[12px] overflow-visible">
                    {/* Budget line marker */}
                    <div className="absolute left-0 top-0 bottom-0 w-full">
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-[#D5D5D5]"
                        style={{ left: '100%' }}
                      >
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 bg-[#D5D5D5] rounded-full" />
                      </div>
                    </div>

                    {/* Spent amount bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${displayPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.8 + index * 0.1 }}
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r ${
                        item.over 
                          ? "from-[#E8A75F] to-[#D89750]" // Warm amber, not red
                          : item.color
                      } rounded-[12px] flex items-center justify-end px-3`}
                    >
                      {item.over && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.5, type: "spring", stiffness: 300 }}
                          className="w-2 h-2 bg-white rounded-full shadow-lg"
                        />
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-6 pt-4 border-t border-[#E5E5E5]">
            <div className="flex items-center justify-between">
              <span className="text-[#666] text-sm">Weekly total</span>
              <div className="text-right">
                <div className="text-[#2C2C2C] font-bold">3,160 kr</div>
                <div className="text-[#E8A75F] text-xs font-semibold">
                  {overspend} kr over budget
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Response Options - Chat Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-3"
        >
          <p className="text-[#666] text-xs text-center mb-4">
            How would you like to handle this?
          </p>

          {/* Option 1: Adjust it */}
          <motion.button
            onClick={() => handleResponse("adjust")}
            disabled={selectedOption !== null}
            whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
            whileTap={{ scale: selectedOption === null ? 0.98 : 1 }}
            className={`w-full bg-gradient-to-r ${
              selectedOption === "adjust"
                ? "from-[#A8D5BA] to-[#98D8C8]"
                : "from-[#FFD93D] to-[#FFC93D] hover:from-[#FFC93D] hover:to-[#FFB93D]"
            } transition-all duration-300 rounded-[24px] py-4 px-5 shadow-lg disabled:opacity-50 relative overflow-hidden`}
          >
            {/* Shimmer effect */}
            {selectedOption === null && (
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
            )}
            
            <div className="relative flex items-center justify-between">
              <span className={`font-bold text-lg ${
                selectedOption === "adjust" ? "text-white" : "text-[#2C2C2C]"
              }`}>
                Yeah, adjust it
              </span>
              {selectedOption === "adjust" && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center"
                >
                  <Check className="w-5 h-5 text-[#A8D5BA]" strokeWidth={3} />
                </motion.div>
              )}
            </div>
          </motion.button>

          {/* Option 2: I'll handle it */}
          <motion.button
            onClick={() => handleResponse("handle")}
            disabled={selectedOption !== null}
            whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
            whileTap={{ scale: selectedOption === null ? 0.98 : 1 }}
            className={`w-full ${
              selectedOption === "handle"
                ? "bg-gradient-to-r from-[#A8D5BA] to-[#98D8C8]"
                : "bg-white/80 hover:bg-white border-2 border-[#E5E5E5] hover:border-[#D5D5D5]"
            } backdrop-blur-md transition-all duration-300 rounded-[24px] py-4 px-5 shadow-lg disabled:opacity-50 relative`}
          >
            <div className="relative flex items-center justify-between">
              <span className={`font-bold text-lg ${
                selectedOption === "handle" ? "text-white" : "text-[#2C2C2C]"
              }`}>
                Nah, I'll handle it
              </span>
              {selectedOption === "handle" && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center"
                >
                  <Check className="w-5 h-5 text-[#A8D5BA]" strokeWidth={3} />
                </motion.div>
              )}
            </div>
          </motion.button>
        </motion.div>

        {/* Reassuring note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-6"
        >
          <p className="text-xs text-[#999] leading-relaxed">
            Going over budget happens to everyone. What matters is how we adjust.
          </p>
        </motion.div>
      </div>

      {/* Confirmation Overlay */}
      <AnimatePresence>
        {showConfirmation && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-x-6 top-1/3 z-50 bg-white rounded-[32px] p-8 shadow-2xl max-w-sm mx-auto"
            >
              <div className="text-center">
                {/* Goldie celebrating */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFD93D] to-[#FFC93D] flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-[#FFED4E]"
                >
                  <span className="text-4xl">🪙</span>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-[#2C2C2C] mb-2">
                  {selectedOption === "adjust" ? "Got it!" : "You got this!"}
                </h3>
                <p className="text-[#666] leading-relaxed">
                  {selectedOption === "adjust" 
                    ? "I'll adjust next week's plan to help balance things out."
                    : "Let me know if you need help adjusting your budget."
                  }
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
