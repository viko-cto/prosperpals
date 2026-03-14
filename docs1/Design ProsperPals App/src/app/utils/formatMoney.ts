/**
 * ProsperPals Money Formatting Utility
 * Ensures consistent financial display across the entire app
 */

interface FormatMoneyOptions {
  showSign?: boolean;
  decimals?: number;
}

export function formatMoney(
  amount: number,
  options: FormatMoneyOptions = {}
): string {
  const { showSign = false, decimals = 2 } = options;
  
  const formatted = Math.abs(amount).toLocaleString('en-IE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  if (amount < 0) {
    return `-€${formatted}`;
  } else if (amount > 0 && showSign) {
    return `+€${formatted}`;
  } else {
    return `€${formatted}`;
  }
}

export function formatMoneyDelta(amount: number): {
  formatted: string;
  className: string;
  isPositive: boolean;
  isNegative: boolean;
  isNeutral: boolean;
} {
  const isPositive = amount > 0;
  const isNegative = amount < 0;
  const isNeutral = amount === 0;

  return {
    formatted: formatMoney(amount, { showSign: true }),
    className: isPositive 
      ? 'text-green-400' 
      : isNegative 
        ? 'text-red-400' 
        : 'text-white/60',
    isPositive,
    isNegative,
    isNeutral,
  };
}

export function formatPercent(
  value: number,
  options: { showSign?: boolean; decimals?: number } = {}
): string {
  const { showSign = false, decimals = 1 } = options;
  const sign = value > 0 && showSign ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}
