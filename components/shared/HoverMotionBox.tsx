import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
const HoverMotionBox = motion(Box);

const HoverMotionBoxComp = ({ text }: { text: string }) => {
  const isMultiLine = text.length > 35; //Judging as multiple lines when 50 or more characters are used
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
      top={isMultiLine ? "-150%" : "-250%"}
      left="0%"
      width={300}
      transform="translateX(-50%)"
      zIndex="tooltip"
      whiteSpace="pre-wrap"
      wordBreak="break-word"
      overflowWrap="break-word"
    >
      {text}
    </HoverMotionBox>
  );
};

HoverMotionBoxComp.displayName = "HoverMotionBoxComp";

export default HoverMotionBoxComp;
