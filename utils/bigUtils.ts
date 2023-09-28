const smallFormatter = Intl.NumberFormat("en-US", {
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
  return smallFormatter.format(num);
}

export function shortUsdFormatter(num: number) {
  return "$" + shortFormatter.format(num);
}
