import { formatUnits } from "viem";

//migrate from numberUtils

export const toNumber = (
  value: bigint | undefined,
  decimals: number,
): number => {
  if (value === undefined) {
    return 0;
  }
  return Number(formatUnits(value, decimals));
};

export function truncateTo2DecimalPlaces(num: number): number {
  return Math.floor(num * 100) / 100;
}

export function truncateTo3DecimalPlaces(num: number): number {
  return Math.floor(num * 1000) / 1000;
}

export function nonNegativeNumber(value: number): number {
  return value < 0 ? 0 : value;
}

// formatter for USD and JPY

function getFormatter(currency: string) {
  if (currency === "JPY") {
    return jformatter;
  } else {
    return formatter;
  }
}

function getfourDecimalFormatter(currency: string) {
  if (currency === "JPY") {
    return jfourDecimalUsdFormatter;
  } else {
    return fourDecimalUsdFormatter;
  }
}

const formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const fourDecimalUsdFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});

const shortFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  notation: "compact",
});

const jformatter = Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const jfourDecimalUsdFormatter = Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const jshortFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  notation: "compact",
});

// Function Formatter

export function smallUsdFormatter(num: number, currency: string, rate: number) {
  const selectedFormatter = getFormatter(currency);
  return selectedFormatter.format(num / rate);
}

export function formatUsdWithFourDecimals(
  num: number,
  currency: string,
  rate: number,
) {
  const selectedFormatter = getfourDecimalFormatter(currency);
  return selectedFormatter.format(num / rate);
}

export function smallUsdPriceFormatter(
  num: number | undefined,
  price: number,
  currency: string,
  rate: number,
) {
  const selectedFormatter = getFormatter(currency);
  if (num === undefined) return selectedFormatter.format(0);
  return selectedFormatter.format((num * price) / rate);
}

/** not in use
export function smallFormatter(num: number) {
  return smallUsdFormatter(num).replace("$", "");
}

export function shortUsdFormatter(num: number) {
  return "$" + shortFormatter.format(num);
}
*/

export function smallJpyFormatter(num: number) {
  return jformatter.format(num);
}
export function formatJpyWithFourDecimals(num: number) {
  return jfourDecimalUsdFormatter.format(num);
}
export function smallJpyPriceFormatter(num: number | undefined, price: number) {
  if (num === undefined) return formatter.format(0);
  return jformatter.format(num * price);
}
export function shortJpyFormatter(num: number) {
  return "¥" + jshortFormatter.format(num);
}
