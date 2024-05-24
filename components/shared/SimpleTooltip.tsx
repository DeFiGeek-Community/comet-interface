import { Tooltip } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useIsMobile } from "utils/chakraUtils";

export const SimpleTooltip = ({
  label,
  isOpen,
  children,
  placement,
}: {
  label: string;
  isOpen?: boolean;
  placement?:
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "auto"
    | "auto-start"
    | "auto-end"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "right-start"
    | "right-end"
    | "left-start"
    | "left-end";
  children: ReactNode;
}) => {
  const isMobile = useIsMobile();
  return (
    <Tooltip
      p={1}
      hasArrow
      bg="#000"
      textAlign="center"
      zIndex={999999999}
      placement={placement ?? "top"}
      aria-label={label}
      label={label}
      isOpen={isMobile ? isOpen : undefined}
    >
      {children}
    </Tooltip>
  );
};
