import React from "react";
import { Avatar, AvatarProps } from "@chakra-ui/react";
import { helpSvgUrl } from "constants/urls";

interface RenderAvatarProps extends Omit<AvatarProps, "name" | "src"> {
  isBaseAsset: boolean;
  name?: string;
  src?: string;
}

const RenderAvatar = ({
  isBaseAsset,
  name,
  src,
  ...props
}: RenderAvatarProps) => {
  return (
    <Avatar
      bg="#FFF"
      boxSize={isBaseAsset ? "35px" : "20px"}
      name={name ?? ""}
      position="relative"
      zIndex="1"
      src={src ?? helpSvgUrl}
      {...props}
    />
  );
};

RenderAvatar.displayName = "RenderAvatar";

export default RenderAvatar;
