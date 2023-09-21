import { useWindowSize } from "utils/chakraUtils";

export const useIsSmallScreen = () => {
  const { width } = useWindowSize();
  return width ? width < 1030 : 0;
};
