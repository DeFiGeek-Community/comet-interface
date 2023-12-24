import React, { useState } from "react";
import { Box } from '@chakra-ui/react';
import HoverMotionBoxComp from "components/shared/HoverMotionBox";

const HoverIcon = () => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverText = "TXJP";
  
    return (
      <Box
        position="relative"
        display="inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src="/crown.png" height="30px" width="30px" />
        {isHovered && <HoverMotionBoxComp text={hoverText} />}
      </Box>
    );
  };

  HoverIcon.displayName = "HoverIcon";

export default HoverIcon;