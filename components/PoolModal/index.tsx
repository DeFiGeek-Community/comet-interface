import { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import AmountSelect from "components/PoolModal/AmountSelect";
import { MODAL_PROPS } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";

export enum Mode {
  SUPPLY,
  WITHDRAW,
  BASE_SUPPLY,
  BASE_BORROW,
}

enum UserAction {
  NO_ACTION,
  WAITING_FOR_TRANSACTIONS,
  ERROR,
  APPROVE_EXECUTING,
  APPROVE_IN_PROGRESS,
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
  const [userAction, setUserAction] = useState(UserAction.NO_ACTION);

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
      onClose={()=>{
        setUserAction(UserAction.NO_ACTION);
        onClose();
      }}
      // closeOnOverlayClick={}
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
          userAction={userAction}
          setUserAction={setUserAction}
        />
      </ModalContent>
    </Modal>
  );
};

export default DepositModal;
