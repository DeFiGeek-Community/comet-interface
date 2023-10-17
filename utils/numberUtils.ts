import { formatUnits } from "viem";

const formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Convert the given value using the provided decimals and return as a number.
 * If the value is undefined, return 0.
 *
 * @param value The value to be converted.
 * @param decimals The number of decimals to use for conversion.
 * @returns The converted number.
 */
export const toNumber = (
  value: bigint | undefined,
  decimals: number,
): number => {
  if (value === undefined) {
    return 0;
  }
  return Number(formatUnits(value, decimals));
};

/**
 * Convert the given value using the provided decimals, truncate to 2 decimal places, and return as a number.
 * If the value is undefined, return 0.
 *
 * @param value The value to be converted.
 * @param decimals The number of decimals to use for conversion.
 * @returns The converted number truncated to 2 decimal places.
 */
export const toFixed2 = (
  value: bigint | undefined,
  decimals: number,
): number => {
  const numberValue = toNumber(value, decimals);
  return Math.floor(numberValue * 100) / 100;
};

/**
 * Format the given number as a USD string.
 *
 * @param num The number to be formatted.
 * @returns The formatted USD string.
 */
export function smallUsdFormatter(value: bigint, decimals: number): string {
  return formatter.format(toNumber(value, decimals));
}

/**
 * Multiply the given number by the provided price and format as a USD string.
 *
 * @param num The number to be multiplied.
 * @param price The price to multiply by.
 * @returns The formatted USD string.
 */
export function smallUsdPriceFormatter(
  value: bigint,
  decimals: number,
  price: number,
): string {
  return formatter.format(toNumber(value, decimals) * price);
}

/**
 * Truncate the given number to 2 decimal places.
 *
 * @param num The number to be truncated.
 * @returns The number truncated to 2 decimal places.
 */
export function truncateTo2DecimalPlaces(num: number): number {
  return Math.floor(num * 100) / 100;
}

export function truncateTo3DecimalPlaces(num: number): number {
  return Math.floor(num * 1000) / 1000;
}

export function nonNegativeNumber(value: number): number {
  return value < 0 ? 0 : value;
}
