import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
import { Mode } from "components/PoolModal";

export const TabBar = ({
  color,
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: (mode: Mode) => any;
  color: string | null | undefined;
}) => {
  const isSupplySide = mode < 2;
  const { t } = useTranslation();

  return (
    <>
      <style>
        {`
            
            .chakra-tabs__tab {
              color: ${color ?? "#FFFFFF"} !important;

              border-bottom-width: 1px;
            }

            .chakra-tabs__tablist {
              border-bottom: 1px solid;
              border-color: #272727;
            }
            
        `}
      </style>
      <Box px={3} width="100%" mt={1} mb="-1px" zIndex={99999}>
        <Tabs
          isFitted
          width="100%"
          align="center"
          index={isSupplySide ? mode : mode - 2}
          onChange={(index: number) => {
            if (isSupplySide) {
              return setMode(index);
            } else {
              return setMode(index + 2);
            }
          }}
        >
          <TabList>
            {isSupplySide ? (
              <>
                <Tab fontWeight="bold" _active={{}} mb="-1px">
                  {t("Supply")}
                </Tab>
                <Tab fontWeight="bold" _active={{}} mb="-1px">
                  {t("Withdraw")}
                </Tab>
              </>
            ) : (
              <>
                <Tab fontWeight="bold" _active={{}} mb="-1px">
                  {t("Supply (Repay)")}
                </Tab>
                <Tab fontWeight="bold" _active={{}} mb="-1px">
                  {t("Withdraw (Borrow)")}
                </Tab>
              </>
            )}
          </TabList>
        </Tabs>
      </Box>
    </>
  );
};
