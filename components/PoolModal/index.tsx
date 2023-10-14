import { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import AmountSelect from "components/PoolModal/AmountSelect";
import { MODAL_PROPS } from "components/shared/Modal";
import { BaseAssetData } from "hooks/pool/indivisual/useBaseAsset";
import { CollateralAssetData } from "hooks/pool/indivisual/useCollateralAsset";
import { BaseAsset, CollateralAsset, PoolConfig } from "interfaces/pool";

export enum Mode {
  SUPPLY,
  WITHDRAW,
  BASE_SUPPLY,
  BASE_BORROW,
}

const DepositModal = ({
  defaultMode,
  poolData,
  index,
  isBase,
  isOpen,
  onClose,
  baseAssetData,
  collateralAssetData,
}: {
  defaultMode: Mode;
  poolData: PoolConfig;
  index: number;
  isBase: boolean;
  isOpen: boolean;
  onClose: () => any;
  baseAssetData: BaseAssetData | undefined,
  collateralAssetData: CollateralAssetData | undefined,
}) => {
  const [mode, setMode] = useState(defaultMode);

  useEffect(() => {
    setMode(defaultMode);
  }, [isOpen, defaultMode]);

  const baseAsset = poolData?.baseToken;
  const collateralAsset = !isBase
    ? poolData?.assetConfigs[index]
    : poolData?.assetConfigs[0];

  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent {...MODAL_PROPS}>
        <AmountSelect
          mode={mode}
          setMode={setMode}
          poolData={poolData}
          baseAsset={baseAsset}
          collateralAsset={collateralAsset}
          onClose={onClose}
          baseAssetData={baseAssetData}
          collateralAssetData={collateralAssetData}
        />
      </ModalContent>
    </Modal>
  );
};

export default DepositModal;
