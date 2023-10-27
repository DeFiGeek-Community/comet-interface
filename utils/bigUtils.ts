const formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const shortFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  notation: "compact",
});

export function smallUsdFormatter(num: number) {
  return formatter.format(num);
}
export function smallUsdPriceFormatter(num: number | undefined, price: number) {
  if (num === undefined) return formatter.format(0);
  return formatter.format(num * price);
}
export function smallFormatter(num: number) {
  return smallUsdFormatter(num).replace("$", "");
}

export function shortUsdFormatter(num: number) {
  return "$" + shortFormatter.format(num);
}
