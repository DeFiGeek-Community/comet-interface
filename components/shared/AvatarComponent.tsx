import { AvatarComponent } from "@rainbow-me/rainbowkit";

export const CustomAvatar: AvatarComponent = ({ ensImage, size }) => {
  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
    />
  ) : (
    <img src="/dfgc-logo.png" width={size} height={size} alt="" />
  );
};
