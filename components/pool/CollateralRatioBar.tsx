import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Progress, Text } from "@chakra-ui/react";
import { Row } from "utils/chakraUtils";
import { smallUsdFormatter } from "utils/bigUtils";
import DashboardBox from "components/shared/DashboardBox";
import { SimpleTooltip } from "components/shared/SimpleTooltip";

const CollateralRatioBar = () => {
  const { t } = useTranslation();

  return (
    <DashboardBox width="100%" height="65px" mt={4} p={4}>
      <Row mainAxisAlignment="flex-start" crossAxisAlignment="center" expand>
        <SimpleTooltip
          label={t("Keep this bar from filling up to avoid being liquidated!")}
        >
          <Text flexShrink={0} mr={4}>
            {t("Borrow Limit")}
          </Text>
        </SimpleTooltip>

        <SimpleTooltip label={t("This is how much you have borrowed.")}>
          <Text flexShrink={0} mt="2px" mr={3} fontSize="10px">
            {smallUsdFormatter(100)}
          </Text>
        </SimpleTooltip>

        <SimpleTooltip
          label={`You're using ${1}% of your ${smallUsdFormatter(
            100,
          )} borrow limit.`}
        >
          <Box width="100%">
            <Progress
              size="xs"
              width="100%"
              colorScheme={"whatsapp"}
              borderRadius="10px"
              value={10}
            />
          </Box>
        </SimpleTooltip>

        <SimpleTooltip
          label={t(
            "If your borrow amount reaches this value, you will be liquidated.",
          )}
        >
          <Text flexShrink={0} mt="2px" ml={3} fontSize="10px">
            {smallUsdFormatter(100)}
          </Text>
        </SimpleTooltip>
      </Row>
    </DashboardBox>
  );
};

export default CollateralRatioBar;
