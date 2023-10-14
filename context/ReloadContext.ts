import { createContext, useContext } from "react";

export const ReloadContext = createContext<() => void>(() => {});


export const useReload = () => {
  return useContext(ReloadContext);
};