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
      onChange={(event) => updateAmount(event.target.value)}
      mr={4}
      disabled={disabled}
    />
  );
};
