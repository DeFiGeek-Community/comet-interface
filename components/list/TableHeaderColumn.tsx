import React, { useState } from "react";
import { Text, Box } from "@chakra-ui/react";
import { Row } from "utils/chakraUtils";

interface TableHeaderColumnProps {
  text: string;
  width: string;
  hovertext?: string;
}

export const TableHeaderColumnBase: React.FC<TableHeaderColumnProps> = ({
  text,
  width,
}) => (
  <Row
    mainAxisAlignment="center"
    crossAxisAlignment="center"
    height="100%"
    width={width}
  >
    <Text textAlign="left" fontWeight="bold" width="100%" pl={3}>
      {text}
    </Text>
  </Row>
);

export const TableHeaderColumn: React.FC<TableHeaderColumnProps> = ({
  text,
  width,
  hovertext,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Row
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      mainAxisAlignment="center"
      crossAxisAlignment="center"
      height="100%"
      width={width}
    >
      <Text textAlign="center" fontWeight="bold" width="100%">
        {text}
      </Text>
      {hovertext && isHovered && (
        <Box
          position="absolute"
          bg="gray.700"
          p={2}
          mt={-20}
          boxShadow="md"
          borderRadius="md"
          zIndex="tooltip"
        >
          {hovertext}
        </Box>
      )}
    </Row>
  );
};

TableHeaderColumn.displayName = "TableHeaderColumn";
