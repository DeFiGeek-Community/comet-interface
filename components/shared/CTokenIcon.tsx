import React, { forwardRef } from "react";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import { RewardAsset } from "interfaces/pool";

const CTokenIconComponent = forwardRef(
  (
    {
      rewardToken,
      ...avatarProps
    }: {
      rewardToken: RewardAsset;
      [key: string]: any;
    },
    ref: any, // ref を引数として追加
  ) => {

    return (
      <Avatar
        {...avatarProps}
        ref={ref} // Avatar に ref を渡す
        key={rewardToken.address}
        bg="#FFF"
        borderWidth="1px"
        name={rewardToken?.symbol ?? "Loading..."}
        src={
          rewardToken?.logoURL ??
          "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
        }
      />
    );
  },
);

CTokenIconComponent.displayName = "CTokenIcon";

export const CTokenIcon = CTokenIconComponent;

export const CTokenAvatarGroup = ({
  tokenAddresses,
  popOnHover = false,
  ...props
}: {
  tokenAddresses: string[];
  popOnHover: boolean;
  [x: string]: any;
}) => {
  return (
    <AvatarGroup size="xs" max={30} {...props}>
      {tokenAddresses.map((tokenAddress) => {
        return (
          <CTokenIcon
            key={tokenAddress}
            address={tokenAddress}
            _hover={popOnHover ? { transform: "scale(1.2)", zIndex: 5 } : null}
          />
        );
      })}
    </AvatarGroup>
  );
};
