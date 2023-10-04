import React from "react";
import { Text } from "@chakra-ui/react";
import { Row } from "utils/chakraUtils";

const StatsRow = ({
  label,
  value,
  secondaryValue,
  color,
}: {
  label: string;
  value: string | number;
  secondaryValue?: string | number;
  color?: string;
}) => (
  <Row
    mainAxisAlignment="space-between"
    crossAxisAlignment="center"
    width="100%"
    color={color}
  >
    <Text fontWeight="bold" flexShrink={0}>
      {label}
    </Text>
    <Text fontWeight="bold" flexShrink={0} fontSize={secondaryValue ? "sm" : "lg"}>
      {value}
      {secondaryValue && (
        <>
          {" → "}
          {secondaryValue}
        </>
      )}
    </Text>
  </Row>
);

export default StatsRow;
