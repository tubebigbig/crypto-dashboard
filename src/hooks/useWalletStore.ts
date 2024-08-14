import { create } from "zustand";
import { CryptoPrices } from "@utils/fetchCryptoPrices";

type Account = {
  address: `0x${string}`;
  decimals: number;
  symbol: string;
  balance?: bigint;
};

type Asset = {
  address: `0x${string}`;
  decimals: number;
  symbol: string;
  balance?: bigint;
};

type Token = {
  address: string;
  decimals: number;
  symbol: string;
  logoURI: string;
  coinId: string;
};

type WalletStore = {
  account: Account;
  assets: Asset[];
  cryptoPrices: CryptoPrices;
  tokenList: Token[];
  setAcount: (account: Account) => void;
  setAssets: (assets: Asset[]) => void;
  setCryptoPrices: (cryptoPrices: CryptoPrices) => void;
  setTokenList: (tokenList: Token[]) => void;
};

const useWalletStore = create<WalletStore>((set) => ({
  account: {
    address: "0x0" as `0x${string}`,
    decimals: 0,
    symbol: "",
  },
  assets: [],
  cryptoPrices: {},
  tokenList: [],
  setAcount: (account: {
    address: `0x${string}`;
    decimals: number;
    symbol: string;
  }) => set({ account: account }),
  setAssets: (
    assets: {
      address: `0x${string}`;
      decimals: number;
      symbol: string;
    }[]
  ) => set({ assets: assets }),
  setCryptoPrices: (cryptoPrices: CryptoPrices) =>
    set({ cryptoPrices: cryptoPrices }),
  setTokenList: (tokenList: Token[]) => set({ tokenList: tokenList }),
}));

export default useWalletStore;
