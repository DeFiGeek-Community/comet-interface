import { Currency } from "context/AppDataContext";
import {
  OneSextillionN,
  OneQuitillionN,
  OneQuadrillionN,
  OneTrillionN,
  OneBillionN,
  OneMillionN,
  OneThousandN,
  OneGaiN,
  OneKeiN,
  OneChouN,
  OneOkuN,
  OneManN,
} from "constants/aprs";

interface FormatNetAPRTextProps {
  aprType: string;
  rewardType: string;
  aprPercent: number;
  rewardAPR: number;
  t: (key: string) => string;
}

export const formatNetAPRText = ({
  aprType,
  rewardType,
  aprPercent,
  rewardAPR,
  t,
}: FormatNetAPRTextProps): string => {
  return (
    t(aprType) +
    ": " +
    aprPercent.toFixed(2) +
    " % " +
    t(rewardType) +
    ": " +
    rewardAPR.toFixed(3) +
    " %"
  );
};

interface CalculateFlooredValueProps {
  isCollateralBalances: boolean;
  totalPoolObjectValue: number;
  assetPrice: number;
  rate: number;
}

export const calculateFlooredValue = ({
  isCollateralBalances,
  totalPoolObjectValue,
  assetPrice,
  rate,
}: CalculateFlooredValueProps): number => {
  return Math.floor(
    isCollateralBalances
      ? totalPoolObjectValue / rate
      : (totalPoolObjectValue * assetPrice) / rate,
  );
};

interface GetNumberOrTextProps {
  totalValue: string;
  needsNumber: boolean;
  isUSD: boolean;
}

export const getNumberOrText = ({
  totalValue,
  needsNumber,
  isUSD,
}: GetNumberOrTextProps): BigInt | string => {
  const thresholds = isUSD
    ? [
        {
          threshold: BigInt(OneSextillionN),
          divisor: BigInt(OneSextillionN),
          unit: "S",
        },
        {
          threshold: BigInt(OneQuitillionN),
          divisor: BigInt(OneQuitillionN),
          unit: "Qui",
        },
        {
          threshold: BigInt(OneQuadrillionN),
          divisor: BigInt(OneQuadrillionN),
          unit: "Qua",
        },
        {
          threshold: BigInt(OneTrillionN),
          divisor: BigInt(OneTrillionN),
          unit: "T",
        },
        {
          threshold: BigInt(OneBillionN),
          divisor: BigInt(OneBillionN),
          unit: "B",
        },
        {
          threshold: BigInt(OneMillionN),
          divisor: BigInt(OneMillionN),
          unit: "M",
        },
        {
          threshold: BigInt(OneThousandN),
          divisor: BigInt(OneThousandN),
          unit: "K",
        },
        { threshold: BigInt("0"), divisor: BigInt(1), unit: "" },
      ]
    : [
        {
          threshold: BigInt(OneGaiN),
          divisor: BigInt(OneGaiN),
          unit: "垓",
        },
        {
          threshold: BigInt(OneKeiN),
          divisor: BigInt(OneKeiN),
          unit: "京",
        },
        {
          threshold: BigInt(OneChouN),
          divisor: BigInt(OneChouN),
          unit: "兆",
        },
        {
          threshold: BigInt(OneOkuN),
          divisor: BigInt(OneOkuN),
          unit: "億",
        },
        {
          threshold: BigInt(OneManN),
          divisor: BigInt(OneManN),
          unit: "万",
        },
        { threshold: BigInt("0"), divisor: BigInt(1), unit: "" },
      ];
  const totalBigInt = BigInt(totalValue);
  const { divisor, unit } = thresholds.find(
    ({ threshold }) => totalBigInt >= threshold,
  ) || { divisor: BigInt(1), unit: "" };

  if (needsNumber) {
    return (totalBigInt * BigInt(10)) / divisor;
  } else {
    return unit;
  }
};

export const divideBigIntWithDecimal = (
  numerator: bigint,
  denominator: bigint,
  decimalPlaces: number = 1,
): string => {
  const multiplier: bigint = BigInt(Math.pow(10, decimalPlaces));
  const result: bigint = (numerator * multiplier) / denominator;
  return (Number(result) / Math.pow(10, decimalPlaces)).toFixed(decimalPlaces);
};

export const getFormattedValue = (
  totalPoolObjectValue: number,
  assetPrice: number | undefined,
  currency: Currency,
  isCollateralBalances: boolean,
  rate?: number,
): string => {
  const isUSD = currency === "USD" ? true : false;

  let flooredValue: number = 0;
  if (assetPrice && rate != undefined) {
    flooredValue = calculateFlooredValue(
      {isCollateralBalances,
      totalPoolObjectValue,
      assetPrice,
      rate,}
    );
  }

  const flooredNumber = String(flooredValue);

  const roundedFlooredNumber: bigint = getNumberOrText(
    { totalValue: flooredNumber, needsNumber: true, isUSD }
  ) as bigint;
  const dividedRoundedFlooredNumber = divideBigIntWithDecimal(
    roundedFlooredNumber,
    BigInt(10),
  );

  const valueFormatted = (isUSD ? "$" : "¥") + dividedRoundedFlooredNumber;

  return valueFormatted + getNumberOrText({ totalValue: flooredNumber, needsNumber: false, isUSD });
};
