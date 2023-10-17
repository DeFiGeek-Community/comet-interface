import React, { useState } from "react";
import { Text, AvatarGroup, Spinner } from "@chakra-ui/react";
import { Column, Row, Center } from "utils/chakraUtils";
import { SimpleTooltip } from "components/shared/SimpleTooltip";
import { CTokenIcon } from "components/shared/CTokenIcon";
import { RewardAsset } from "interfaces/pool";
import { truncateTo3DecimalPlaces } from "utils/numberUtils";

const APRComponent = ({
  rewardToken,
  baseAPR,
  tokenReward,
  width,
}: {
  rewardToken: RewardAsset;
  baseAPR: number | undefined;
  tokenReward: number | undefined;
  width: string;
}) => {
  const color = rewardToken?.color ?? "white";

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
        {baseAPR !== undefined ? (
          <Text color={"#FF"} fontWeight="bold" fontSize="17px">
            {truncateTo3DecimalPlaces(baseAPR * 100)} %
          </Text>
        ) : (
          <Center height="35px">
            <Spinner />
          </Center>
        )}
        {tokenReward !== undefined ? (
          <Row
            crossAxisAlignment="center"
            mainAxisAlignment="flex-start"
            pt={1}
          >
            <Text fontWeight="bold">+</Text>
            <AvatarGroup size="xs" max={30} ml={2} mr={1} spacing={1}>
              <SimpleTooltip label={rewardToken.name ?? ""}>
                <CTokenIcon
                  rewardToken={rewardToken}
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
              {truncateTo3DecimalPlaces(tokenReward)} %
            </Text>
          </Row>
        ) : (
          <Center height="35px">
            <Spinner />
          </Center>
        )}
      </>
    </Column>
  );
};

export default APRComponent;
