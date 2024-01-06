import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import HoverMotionBoxComp from "components/shared/HoverMotionBox";

const HoverIcon = ({
  isBase,
  hoverText,
  children,
}: {
  isBase: boolean;
  hoverText: string;
  children: any;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      position="relative"
      display="inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      width={isBase?"40%":"60%"}
    >
      {children}
      {isHovered && <HoverMotionBoxComp isBase={isBase} text={hoverText} />}
    </Box>
  );
};

HoverIcon.displayName = "HoverIcon";

export default HoverIcon;
