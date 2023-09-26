import Image from "next/image";
import { AvatarComponent } from "@rainbow-me/rainbowkit";

export const CustomAvatar: AvatarComponent = ({ ensImage, size }) => {
  return ensImage ? (
    <Image
      src={ensImage}
      width={size}
      height={size}
      alt="ENS Image"
      className="rounded-full"
    />
  ) : (
    <Image src="/dfgc-logo.png" width={size} height={size} alt="DFGC Logo" />
  );
};
