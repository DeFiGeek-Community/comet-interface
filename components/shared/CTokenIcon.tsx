import React, { forwardRef } from "react";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import { useTokenData } from "../../hooks/useTokenData";

export const CTokenIcon = forwardRef((
  {
    address,
    ...avatarProps
  }: {
    address: string;
    [key: string]: any;
  },
  ref: any // ref を引数として追加
) => {
  const tokenData = useTokenData(address);

  return (
    <Avatar
      {...avatarProps}
      ref={ref} // Avatar に ref を渡す
      key={address}
      bg="#FFF"
      borderWidth="1px"
      name={tokenData?.symbol ?? "Loading..."}
      src={
        tokenData?.logoURL ??
        "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
      }
    />
  );
});

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
