import React, { useState, useEffect } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

/* Typings */
export type MainAxisAlignmentStrings =
  | "space-between"
  | "space-around"
  | "flex-start"
  | "center"
  | "flex-end";

export type MainAxisAlignment =
  | MainAxisAlignmentStrings
  | { md: MainAxisAlignmentStrings; base: MainAxisAlignmentStrings };

export type CrossAxisAlignmentStrings =
  | "flex-start"
  | "center"
  | "flex-end"
  | "stretch";

export type CrossAxisAlignment =
  | CrossAxisAlignmentStrings
  | {
      md: CrossAxisAlignmentStrings;
      base: CrossAxisAlignmentStrings;
    };


/**************************************
 *
 *
 *  Components
 *    - Center.tsx
 *    - Column.tsx
 *    - Row.tsx
 *    - RowOnDesktopColumnOnMobile.tsx
 *    - RowOrColumn.tsx
 *
 ***************************************
 */

/**
 *  Center.tsx
 *
 *  Creates a Flex where `justifyContent === 'center'` and `alignItems === 'center'`
 * If `expand === true` it will set the height and width of the Flex to 100%.
 * Passes all extra props to the Flex.
 */

export type CenterProps = {
  children: React.ReactNode;
  expand?: boolean;
} & FlexProps;

export const Center = ({ children, expand, ...others }: CenterProps) => {
  if (expand) {
    others.height = "100%";
    others.width = "100%";
  }

  return (
    <Flex justifyContent="center" alignItems="center" {...others}>
      {children}
    </Flex>
  );
};

/**
 * Column.tsx
 *
 * Creates a Flex with a column direction
 * and sets the `justifyContent` to the `mainAxisAlignment`
 * and the `alignItems` to the `crossAxisAlignment`.
 * If `expand === true` it will set the height and width of the Flex to 100%.
 * Passes all extra props to the Flex.
 */

export type ColumnProps = {
  mainAxisAlignment: MainAxisAlignment;
  crossAxisAlignment: CrossAxisAlignment;
  children: React.ReactNode;
  expand?: boolean;
} & FlexProps;

export const Column = ({
  mainAxisAlignment,
  crossAxisAlignment,
  children,
  expand,
  ...others
}: ColumnProps) => {
  if (expand) {
    others.height = "100%";
    others.width = "100%";
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent={mainAxisAlignment}
      alignItems={crossAxisAlignment}
      {...others}
    >
      {children}
    </Flex>
  );
};

/**
 * Row.tsx
 *
 * Creates a Flex with a row direction
 * and sets the `justifyContent` to the `mainAxisAlignment`
 * and the `alignItems` to the `crossAxisAlignment`.
 * If `expand === true` it will set the height and width of the Flex to 100%.
 * Passes all extra props to the Flex.
 */

export type RowProps = {
  mainAxisAlignment: MainAxisAlignment;
  crossAxisAlignment: CrossAxisAlignment;
  children: React.ReactNode;
  expand?: boolean;
} & FlexProps;

export const Row = ({
  mainAxisAlignment,
  crossAxisAlignment,
  children,
  expand,
  ...others
}: RowProps) => {
  if (expand) {
    others.height = "100%";
    others.width = "100%";
  }

  return (
    <Flex
      flexDirection="row"
      justifyContent={mainAxisAlignment}
      alignItems={crossAxisAlignment}
      {...others}
    >
      {children}
    </Flex>
  );
};


/**
 * RowOrColumn.tsx
 *
 * Creates a Flex which will be a row if `isRow` is true
 * and sets the `justifyContent` to the `mainAxisAlignment`
 * and the `alignItems` to the `crossAxisAlignment`.
 * If `expand === true` it will set the height and width of the Flex to 100%.
 * Passes all extra props to the Flex.
 */
export const RowOrColumn = ({
  mainAxisAlignment,
  crossAxisAlignment,
  children,
  expand,
  isRow,
  ...others
}: RowProps & { isRow: boolean }) => {
  if (expand) {
    others.height = "100%";
    others.width = "100%";
  }

  return (
    <Flex
      flexDirection={isRow ? "row" : "column"}
      justifyContent={mainAxisAlignment}
      alignItems={crossAxisAlignment}
      {...others}
    >
      {children}
    </Flex>
  );
};

/**************************************
 *
 *
 *  Hooks
 *    - useWindowSize.ts
 *    - useLockedViewHeight.ts
 *    - useIsMobile.ts
 *    - useSpacedLayout.ts
 *
 ***************************************
 */

/**
 * useWindowSize.ts
 *
 * Gets the height and width of the current window.
 */

type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};

export const useWindowSize = (): WindowSize => {
  // 初期状態を undefined に設定
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
};


/**
 * useIsMobile.ts
 *
 * Returns whether the width of the window makes it likely a mobile device.
 * */
export function useIsMobile() {
  const { width } = useWindowSize();

  return width ? width < 768 : 0;
}

