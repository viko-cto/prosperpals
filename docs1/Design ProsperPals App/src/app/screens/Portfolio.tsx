import { TrendingUp, MessageCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface Holding {
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  color: string;
  trend: number[];
}

export function Portfolio() {
  const holdings: Holding[] = [
    { 
      symbol: "AAPL", 
      name: "Apple Inc.", 
      shares: 5, 
      avgPrice: 150.00, 
      currentPrice: 165.50, 
      value: 827.50, 
      color: "#4A90D9",
      trend: [145, 148, 152, 155, 160, 163, 165.5]
    },
    { 
      symbol: "MSFT", 
      name: "Microsoft", 
      shares: 3, 
      avgPrice: 300.00, 
      currentPrice: 320.00, 
      value: 960.00, 
      color: "#7C3AED",
      trend: [295, 300, 305, 310, 312, 318, 320]
    },
    { 
      symbol: "GOOGL", 
      name: "Alphabet", 
      shares: 2, 
      avgPrice: 2500.00, 
      currentPrice: 2650.00, 
      value: 5300.00, 
      color: "#10B981",
      trend: [2480, 2500, 2520, 2550, 2580, 2620, 2650]
    },
  ];

  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const totalCost = holdings.reduce((sum, h) => sum + (h.shares * h.avgPrice), 0);
  const totalGain = totalValue - totalCost;
  const gainPercent = ((totalGain / totalCost) * 100).toFixed(2);
  const todayGain = 437.50;
  const pcEarned = 1240;

  // Prepare data for donut chart
  const chartData = holdings.map(h => ({
    name: h.symbol,
    value: h.value,
    color: h.color,
    percentage: ((h.value / totalValue) * 100).toFixed(1)
  }));

  return (
    <div className="min-h-screen bg-[#0f0f1a] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[32px] font-extrabold text-white mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
              My Portfolio 📈
            </h1>
            <p className="text-[#9CA3AF] text-[16px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Your virtual investment journey
            </p>
          </div>
          <button className="h-[44px] px-6 bg-gradient-to-r from-[#FFD700] to-[#F59E0B] hover:brightness-110 rounded-xl text-[#1a1a2e] font-bold transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            ➕ Add Investment
          </button>
        </div>

        {/* Hero Stats Row - Three Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Card 1: Total Value */}
          <div className="bg-[rgba(26,26,46,0.6)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6">
            <div className="text-[#9CA3AF] text-[13px] font-semibold uppercase tracking-wide mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Total Value
            </div>
            <div className="text-white text-[36px] font-extrabold mb-1 leading-none" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
              €{totalValue.toFixed(2)}
            </div>
            <div className="text-[#10B981] text-[13px] flex items-center gap-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              ↑ +€{todayGain.toFixed(2)} today
            </div>
          </div>

          {/* Card 2: Total Return */}
          <div className="bg-[rgba(26,26,46,0.6)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6">
            <div className="text-[#9CA3AF] text-[13px] font-semibold uppercase tracking-wide mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Total Return
            </div>
            <div className="text-[#10B981] text-[36px] font-extrabold mb-1 leading-none" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
              +{gainPercent}%
            </div>
            <div className="text-[#9CA3AF] text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Since inception
            </div>
          </div>

          {/* Card 3: ProsperCoins Earned */}
          <div className="bg-[rgba(26,26,46,0.6)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6">
            <div className="text-[#9CA3AF] text-[13px] font-semibold uppercase tracking-wide mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              PC Earned Investing
            </div>
            <div className="text-[#FFD700] text-[36px] font-extrabold mb-1 leading-none" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
              {pcEarned} PC
            </div>
            <div className="text-[#9CA3AF] text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              From virtual investments
            </div>
          </div>
        </div>

        {/* Allocation Chart Card */}
        <div className="bg-[rgba(26,26,46,0.6)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 mb-8">
          <h2 className="text-[18px] font-bold text-white mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            Portfolio Allocation
          </h2>
          <div className="flex items-center gap-12">
            {/* Left: Donut Chart */}
            <div className="w-[40%] flex justify-center">
              <div className="relative w-[180px] h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="text-white text-[24px] font-extrabold leading-none" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
                    €{(totalValue / 1000).toFixed(1)}k
                  </div>
                  <div className="text-[#9CA3AF] text-[12px] mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    Total
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Legend */}
            <div className="w-[60%] space-y-4">
              {holdings.map((holding) => {
                const percentage = ((holding.value / totalValue) * 100).toFixed(1);
                const gain = holding.value - (holding.shares * holding.avgPrice);
                const holdingGainPercent = ((gain / (holding.shares * holding.avgPrice)) * 100).toFixed(2);
                
                return (
                  <div key={holding.symbol} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: holding.color }} />
                      <div className="flex items-baseline gap-2 flex-1">
                        <span className="text-white text-[15px] font-semibold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                          {holding.symbol}
                        </span>
                        <span className="text-[#9CA3AF] text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                          {holding.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div className="text-white text-[14px] font-semibold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        {percentage}%
                      </div>
                      <div className="text-white text-[15px] font-bold min-w-[90px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                        €{holding.value.toFixed(2)}
                      </div>
                      <div className="text-[#10B981] text-[13px] font-semibold min-w-[110px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        +€{gain.toFixed(2)} (+{holdingGainPercent}%)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Holdings List */}
        <div className="mb-8">
          <h2 className="text-[20px] font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            Holdings
          </h2>
          <div className="space-y-4">
            {holdings.map((holding) => {
              const gain = holding.value - (holding.shares * holding.avgPrice);
              const holdingGainPercent = ((gain / (holding.shares * holding.avgPrice)) * 100).toFixed(2);
              
              return (
                <div 
                  key={holding.symbol} 
                  className="bg-[rgba(26,26,46,0.6)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-xl p-5 hover:bg-[rgba(255,215,0,0.04)] hover:border-[rgba(255,215,0,0.15)] transition-all duration-150"
                >
                  <div className="flex items-center justify-between">
                    {/* Left: Mini Sparkline */}
                    <div className="w-[60px] h-[32px]">
                      <MiniSparkline data={holding.trend} color={holding.color} />
                    </div>

                    {/* Center: Holding Info */}
                    <div className="flex-1 px-6">
                      {/* Top Row: Ticker and Name */}
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3 className="text-white text-[20px] font-extrabold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
                          {holding.symbol}
                        </h3>
                        <span className="text-[#9CA3AF] text-[14px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                          {holding.name}
                        </span>
                      </div>
                      
                      {/* Middle Row: Shares and Current Price */}
                      <div className="flex items-center gap-6 text-[13px] text-[#9CA3AF] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        <span>{holding.shares} shares @ €{holding.avgPrice.toFixed(2)}</span>
                        <span className="text-white font-semibold">Current: €{holding.currentPrice.toFixed(2)} <span className="text-[#10B981]">(+{holdingGainPercent}%)</span></span>
                      </div>
                      
                      {/* Bottom Row: Total Value */}
                      <div className="text-white text-[22px] font-extrabold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
                        €{holding.value.toFixed(2)}
                      </div>
                    </div>

                    {/* Right: Gain Badge */}
                    <div className="bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.3)] rounded-full px-4 py-2">
                      <div className="text-[#10B981] text-[15px] font-bold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                        +€{gain.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fin Insight Card */}
        <div className="bg-gradient-to-br from-[rgba(74,144,217,0.1)] to-[rgba(255,215,0,0.05)] border-2 border-[rgba(74,144,217,0.3)] rounded-2xl p-6">
          <div className="flex items-start gap-4">
            {/* Fin Avatar */}
            <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#4A90D9] to-[#2563EB] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg font-bold">F</span>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="text-[#FFD700] text-[14px] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                Fin says:
              </div>
              <p className="text-white text-[15px] mb-3 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                Your portfolio is 74.8% concentrated in GOOGL. Consider diversifying into more holdings to reduce risk and potentially increase returns.
              </p>
              <button className="flex items-center gap-2 text-[#4A90D9] text-[14px] font-semibold hover:text-[#5BA3E8] transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                <MessageCircle className="w-4 h-4" />
                Chat with Fin →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mini Sparkline Component
function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const width = 60;
  const height = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
