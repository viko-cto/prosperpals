import { motion } from "motion/react";

interface SegmentedProgressRingProps {
  percentage: number;
  size?: "small" | "medium" | "large";
  showMilestones?: boolean;
  currentAmount?: number;
  targetAmount?: number;
}

export function SegmentedProgressRing({
  percentage,
  size = "medium",
  showMilestones = true,
  currentAmount,
  targetAmount,
}: SegmentedProgressRingProps) {
  const dimensions = {
    small: { size: 120, stroke: 8, radius: 52 },
    medium: { size: 160, stroke: 10, radius: 70 },
    large: { size: 200, stroke: 12, radius: 88 },
  };

  const { size: svgSize, stroke, radius } = dimensions[size];
  const circumference = 2 * Math.PI * radius;
  const milestones = [25, 50, 75, 100];

  // Determine segment colors based on milestone reached
  const getSegmentColor = (milestone: number) => {
    if (percentage >= milestone) {
      if (milestone === 100) return "#10B981"; // Green
      if (milestone === 75) return "#F59E0B"; // Orange
      if (milestone === 50) return "#FFD700"; // Gold
      return "#FFA500"; // Light orange
    }
    return "rgba(255, 255, 255, 0.1)"; // Gray
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={svgSize} height={svgSize} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={stroke}
          fill="none"
        />

        {/* Milestone segments */}
        {showMilestones &&
          milestones.map((milestone, index) => {
            const startAngle = index * 90;
            const endAngle = (index + 1) * 90;
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const x1 = svgSize / 2 + radius * Math.cos(startRad);
            const y1 = svgSize / 2 + radius * Math.sin(startRad);
            const x2 = svgSize / 2 + radius * Math.cos(endRad);
            const y2 = svgSize / 2 + radius * Math.sin(endRad);

            const pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`;

            return (
              <motion.path
                key={milestone}
                d={pathData}
                stroke={getSegmentColor(milestone)}
                strokeWidth={stroke}
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: percentage >= milestone ? 1 : percentage >= milestones[index - 1] ? (percentage - milestones[index - 1]) / 25 : 0 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              />
            );
          })}

        {/* Milestone markers */}
        {showMilestones &&
          milestones.map((milestone, index) => {
            const angle = index * 90 - 90; // Adjust for rotation
            const rad = (angle * Math.PI) / 180;
            const markerRadius = radius + stroke / 2;
            const x = svgSize / 2 + markerRadius * Math.cos(rad);
            const y = svgSize / 2 + markerRadius * Math.sin(rad);

            return (
              <motion.circle
                key={`marker-${milestone}`}
                cx={x}
                cy={y}
                r={percentage >= milestone ? 5 : 3}
                fill={percentage >= milestone ? "#FFFFFF" : "rgba(255, 255, 255, 0.3)"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
              />
            );
          })}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-center"
        >
          <div className="text-4xl font-bold text-white mb-1">{percentage}%</div>
          {currentAmount !== undefined && targetAmount !== undefined && (
            <div className="text-sm text-white/60">
              €{currentAmount.toLocaleString()} / €{targetAmount.toLocaleString()}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
