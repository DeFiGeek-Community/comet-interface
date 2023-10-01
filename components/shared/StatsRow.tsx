import React from "react";
import { Text } from "@chakra-ui/react";
import { Row } from "utils/chakraUtils";

const StatsRow = ({
  label,
  value,
  secondaryValue,
  color,
  fontSize = "lg",
}: {
  label: string;
  value: string | number;
  secondaryValue?: string | number;
  color?: string;
  fontSize?: string;
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
    <Text fontWeight="bold" flexShrink={0} fontSize={fontSize}>
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
