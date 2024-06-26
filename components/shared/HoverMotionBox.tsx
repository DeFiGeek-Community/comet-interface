import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
const HoverMotionBox = motion(Box);

const HoverMotionBoxComp = ({
  isBase,
  text,
}: {
  isBase: boolean;
  text: string;
}) => {
  return (
    <HoverMotionBox
      p="2"
      bgColor="gray.700"
      color="white"
      borderRadius="md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      position="absolute"
      top="-150%"
      left="0%"
      width={isBase ? 100 : 300}
      transform="translateX(-50%)"
      zIndex="tooltip"
    >
      {text}
    </HoverMotionBox>
  );
};

HoverMotionBoxComp.displayName = "HoverMotionBoxComp";

export default HoverMotionBoxComp;
