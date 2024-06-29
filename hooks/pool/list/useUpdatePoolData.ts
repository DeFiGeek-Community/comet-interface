import { useEffect, useState, useRef } from "react";
import { useAppData } from "context/AppDataContext";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import useBaseAsset from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssets from "hooks/pool/indivisual/useCollateralAssets";
import useTokenRewardData from "hooks/pool/shared/useTokenReward";
import usePositionSummary from "hooks/pool/indivisual/usePositionSummary";
import { PoolBaseDataType } from "context/AppDataContext";

interface PoolDataComponentProps {
  poolConfig: PoolConfig | undefined;
}

const useUpdatePoolData = ({ poolConfig }: PoolDataComponentProps) => {
  const {
    chainId,
    priceFeedMapping,
    totalPoolMapping,
    baseAssetMapping,
    collateralAssetMapping,
    tokenRewardMapping,
    positionSummaryMapping,
    updateData,
  } = useAppData();
  const poolName = poolConfig?.baseToken.symbol ?? "";
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSecondary, setIsLoadingSecondary] = useState(false);
  const [poolBaseData, setPoolBaseData] = useState<
    PoolBaseDataType | undefined
  >();
  const isFirstRender = useRef(true);

  const { priceFeedData } = usePriceFeedData(poolConfig);

  useEffect(() => {
    if (priceFeedData && priceFeedMapping[poolName] !== priceFeedData) {
      updateData("priceFeedMapping", poolName, priceFeedData);
    }
  }, [poolConfig, priceFeedData, priceFeedMapping, updateData]);

  const { totalPoolData } = useTotalPoolData(poolConfig);

  useEffect(() => {
    if (totalPoolData && totalPoolMapping[poolName] !== totalPoolData) {
      updateData("totalPoolMapping", poolName, totalPoolData);
    }
  }, [poolConfig, totalPoolData, totalPoolMapping, updateData]);

  const { baseAssetData } = useBaseAsset(poolConfig);

  useEffect(() => {
    if (baseAssetData && baseAssetMapping[poolName] !== baseAssetData) {
      updateData("baseAssetMapping", poolName, baseAssetData);
    }
  }, [poolConfig, baseAssetData, baseAssetMapping, updateData]);

  const { collateralAssetsData } = useCollateralAssets(poolConfig);

  useEffect(() => {
    if (
      collateralAssetsData &&
      collateralAssetMapping[poolName] !== collateralAssetsData
    ) {
      updateData("collateralAssetMapping", poolName, collateralAssetsData);
    }
  }, [poolConfig, collateralAssetsData, collateralAssetMapping, updateData]);

  const { tokenRewardData } = useTokenRewardData(poolConfig, poolBaseData);

  useEffect(() => {
    if (tokenRewardData && tokenRewardMapping[poolName] !== tokenRewardData) {
      updateData("tokenRewardMapping", poolName, tokenRewardData);
    }
  }, [poolConfig, tokenRewardData, tokenRewardMapping, updateData]);

  const { positionSummary } = usePositionSummary(poolConfig, poolBaseData);

  useEffect(() => {
    if (
      positionSummary &&
      positionSummaryMapping[poolName] !== positionSummary
    ) {
      updateData("positionSummaryMapping", poolName, positionSummary);
    }
  }, [poolConfig, positionSummary, positionSummaryMapping, updateData]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (chainId) {
        setIsLoading(true);
        setIsLoadingSecondary(true);
      }
    }
  }, [chainId]);

  useEffect(() => {
    if (
      priceFeedData &&
      totalPoolData &&
      baseAssetData &&
      collateralAssetsData
    ) {
      setIsLoading(false);
      setPoolBaseData({
        priceFeedData: priceFeedData,
        totalPoolData: totalPoolData,
        baseAssetData: baseAssetData,
        collateralAssetsData: collateralAssetsData,
      });
    }
  }, [priceFeedData, totalPoolData, baseAssetData, collateralAssetsData]);

  useEffect(() => {
    if (tokenRewardData && positionSummary) {
      setIsLoadingSecondary(false);
    }
  }, [tokenRewardData, positionSummary]);

  return {
    priceFeedData: !isLoading ? priceFeedMapping[poolName] : undefined,
    totalPoolData: !isLoading ? totalPoolMapping[poolName] : undefined,
    baseAssetData: !isLoading ? baseAssetMapping[poolName] : undefined,
    collateralAssetData: !isLoading
      ? collateralAssetMapping[poolName]
      : undefined,
    tokenRewardData: !isLoadingSecondary
      ? tokenRewardMapping[poolName]
      : undefined,
    positionSummary: !isLoadingSecondary
      ? positionSummaryMapping[poolName]
      : undefined,
  };
};

export default useUpdatePoolData;
