import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import {
  Heading,
  Box,
  Button,
  Text,
  Image,
  Input,
  Tab,
  TabList,
  Tabs,
  Spinner,
} from "@chakra-ui/react";
import { HashLoader } from "react-spinners";
import { useBalance, useAccount } from "wagmi";
import { smallUsdFormatter, smallFormatter } from "utils/bigUtils";
import { Row, Column, useIsMobile, Center } from "utils/chakraUtils";
import useBaseAssetData from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssetData from "hooks/pool/indivisual/useCollateralAsset";
import DashboardBox from "components/shared/DashboardBox";
import { ModalDivider } from "components/shared/Modal";
import { Mode } from "components/PoolModal";
import { PoolConfig, BaseAsset, CollateralAsset } from "interfaces/pool";

const StatsRow = ({
  label,
  value,
  secondaryValue,
  color,
  fontSize = "lg",
}: {
  label: string;
  value: string | number;
  secondaryValue?: string | number;
  color?: string;
  fontSize?: string;
}) => (
  <Row
    mainAxisAlignment="space-between"
    crossAxisAlignment="center"
    width="100%"
    color={color}
  >
    <Text fontWeight="bold" flexShrink={0}>
      {label}
    </Text>
    <Text fontWeight="bold" flexShrink={0} fontSize={fontSize}>
      {value}
      {secondaryValue && (
        <>
          {" → "}
          {secondaryValue}
        </>
      )}
    </Text>
  </Row>
);

export default StatsRow;
