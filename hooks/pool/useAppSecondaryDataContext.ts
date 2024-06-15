import { useContext } from "react";
import AppSecondaryDataContext from "context/AppSecondaryDataContext";

export const useAppSecondaryDataContext = () => {
  const context = useContext(AppSecondaryDataContext);

  if (!context) {
    throw new Error(
      "useAppSecondaryDataContext must be used within a AppSecondaryDataProvider",
    );
  }

  return context;
};
