import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import HoverMotionBoxComp from "components/shared/HoverMotionBox";

const HoverIcon = ({
  hoverText,
  children,
}: {
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
      width={"60%"}
    >
      {children}
      {isHovered && <HoverMotionBoxComp text={hoverText} />}
    </Box>
  );
};

HoverIcon.displayName = "HoverIcon";

export default HoverIcon;
