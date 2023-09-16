import React, { useState } from "react";
import { Avatar, Text, useDisclosure,   AvatarGroup } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { SimpleTooltip } from "../shared/SimpleTooltip";
import { CTokenIcon } from "../shared/CTokenIcon";
import { Column, Row, useIsMobile } from "../../utils/chakraUtils";
import { smallUsdFormatter } from "../../utils/bigUtils";
import { USDPricedFuseAsset } from "../../utils/fetchFusePoolData";
import { useTokenData } from "../../hooks/useTokenData";
import PoolModal, { Mode } from "../PoolModal";

const APYComponent = ({
  supplyIncentive,
  width,
} : {
  supplyIncentive: string;
  width: string;
}) => {
  const rewardTokenData = useTokenData(supplyIncentive);
  const color =
  rewardTokenData?.color ??
  "white";

  const [hovered, setHovered] = useState<number>(-1);

  const handleMouseEnter = (index: number) => setHovered(index);
  const handleMouseLeave = () => setHovered(-1);
  return (
    <Column
      mainAxisAlignment="flex-start"
      crossAxisAlignment="center"
      width={width}
      my={2}
    >
      <>
        <Text color={"#FF"} fontWeight="bold" fontSize="17px">
          10%
        </Text>
        <Row
          crossAxisAlignment="center"
          mainAxisAlignment="flex-start"
          pt={1}
        >
          <Text fontWeight="bold">
            +
          </Text>
          <AvatarGroup size="xs" max={30} ml={2} mr={1} spacing={1}>
            <SimpleTooltip label={rewardTokenData?.name ?? ""}>
              <CTokenIcon
                address={supplyIncentive}
                boxSize="20px"
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
                _hover={{
                  zIndex: 9,
                  border: ".5px solid white",
                  transform: "scale(1.3);",
                }}
              />
            </SimpleTooltip>
          </AvatarGroup>
          <Text color={color} fontWeight="bold" pl={1} fontSize="sm">
            100% APR
          </Text>
        </Row>
      </>
    </Column>
  );
};

export default APYComponent;
