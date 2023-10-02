import React from "react";
import { Input } from "@chakra-ui/react";

export const AmountInput = ({
  displayAmount,
  updateAmount,
  color,
  disabled = false,
}: {
  displayAmount: string;
  updateAmount: (symbol: string) => any;
  color: string;
  disabled?: boolean;
}) => {

  const maxValue = 10000;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    // 数値以外の文字を削除
    value = value.replace(/[^0-9.]/g, '');

    // maxValueを超える値を制限
    if (parseFloat(value) > maxValue) {
      value = maxValue.toString();
    }

    updateAmount(value);
  };

  return (
    <Input
      type="number"
      inputMode="decimal"
      fontSize="3xl"
      fontWeight="bold"
      variant="unstyled"
      _placeholder={{ color }}
      placeholder="0.0"
      value={displayAmount}
      color={color}
      onChange={handleInputChange}
      mr={4}
      disabled={disabled}
      max={maxValue} // HTML5のバリデーションも追加
    />
  );
};
