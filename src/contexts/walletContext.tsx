import { createContext, PropsWithChildren } from "react";
import useWallet from "@hooks/useWallet";

const WalletConext = createContext({
  updateAllBalance: () => {},
});

export const WalletStoreProvider = ({ children }: PropsWithChildren) => {
  const updateAllBalance = useWallet();
  return (
    <WalletConext.Provider value={{ updateAllBalance }}>
      {children}
    </WalletConext.Provider>
  );
};

export default WalletConext;
