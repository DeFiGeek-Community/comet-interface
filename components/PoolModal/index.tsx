import { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import AmountSelect from "components/PoolModal/AmountSelect";
import { MODAL_PROPS } from "components/shared/Modal";
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
}: {
  defaultMode: Mode;
  poolData: PoolConfig;
  index: number;
  isBase: boolean;
  isOpen: boolean;
  onClose: () => any;
}) => {
  const [mode, setMode] = useState(defaultMode);

  useEffect(() => {
    setMode(defaultMode);
  }, [isOpen, defaultMode]);

  let baseAsset;
  let collateralAsset;
  if(isBase) { baseAsset = poolData?.baseToken; }
  if(!isBase) { collateralAsset = poolData?.assetConfigs[index]; }

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
        />
      </ModalContent>
    </Modal>
  );
};

export default DepositModal;
