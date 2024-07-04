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