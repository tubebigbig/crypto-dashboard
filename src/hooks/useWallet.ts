import { useEffect, useMemo } from "react";
import { useBalance, useAccount, useReadContracts } from "wagmi";
import ethTokenList from "@assets/Tokens/eth.json";
import sepoliaTokenList from "@assets/Tokens/sepolia.json";
import useWalletStore from "@hooks/useWalletStore";
import fetchCryptoPrices from "@utils/fetchCryptoPrices";
import { erc20Abi } from "viem";

const CURRENCY_UNIT: string = "usd";

const useWallet = () => {
  const account = useAccount();
  const { data: balance, refetch } = useBalance({
    address: account.address,
  });
  const { setAcount, setAssets, setCryptoPrices, setTokenList } =
    useWalletStore();
  const currentTokenList = useMemo(
    () =>
      [ethTokenList, sepoliaTokenList].find(
        ({ chainId }) => chainId === account.chainId
      ),
    [account.chainId]
  );

  useEffect(() => {
    if (!currentTokenList) return;
    // const unwatchList = currentTokenList.tokens.map(({ address }) => {
    //   return client?.watchContractEvent({
    //     address: address as `0x${string}`,
    //     abi: erc20Abi,
    //     eventName: "Transfer",
    //     args: {
    //       to: account.address,
    //     },
    //     onLogs: (logs) => {
    //       logs.forEach((log) => {
    //         console.info(`log(${address.slice(0, 4)}): `, log);
    //       });
    //     },
    //   });
    // });

    // return () => unwatchList.forEach((unwatch) => unwatch?.());
  }, [currentTokenList]);

  if (!currentTokenList) return;
  const { data: assetBalances = [], refetch: refetchAssets } = useReadContracts(
    {
      allowFailure: false,
      contracts:
        currentTokenList?.tokens.map(({ address }) => ({
          abi: erc20Abi,
          address: address as `0x${string}`,
          functionName: "balanceOf",
          args: [account.address],
        })) || [],
    }
  );

  function handleLiveCryptoPrice() {
    const _fetchCryptoPrices = async () => {
      try {
        const cryptoPrices = await fetchCryptoPrices(
          currentTokenList?.tokens.map(({ coinId }) => coinId) || [],
          CURRENCY_UNIT
        );
        setCryptoPrices(cryptoPrices);
      } catch (error) {
        console.error(error);
      }
    };

    _fetchCryptoPrices();
    return setInterval(_fetchCryptoPrices, 10 * 1000);
  }

  useEffect(() => {
    setAcount({
      address: account.address || "0x0",
      decimals: balance?.decimals || 9,
      symbol: balance?.symbol || "ETH",
      balance: balance?.value || BigInt(0),
    });
  }, [account.address, balance]);

  useEffect(() => {
    if (!currentTokenList || assetBalances.length === 0) return;
    const newAssets = assetBalances.map((balance, index) => ({
      address: currentTokenList.tokens[index].address as `0x${string}`,
      decimals: currentTokenList?.tokens[index].decimals || 9,
      symbol: currentTokenList?.tokens[index].symbol || "ETH",
      balance: BigInt(balance || 0),
    }));
    setAssets(newAssets);
  }, [assetBalances, currentTokenList]);

  useEffect(() => {
    const interval = handleLiveCryptoPrice();
    clearInterval(interval);
    return () => clearInterval(interval);
  }, [account.chainId]);

  useEffect(() => {
    setTokenList(currentTokenList.tokens);
  }, [currentTokenList]);

  return () => {
    refetch();
    refetchAssets();
  };
};

export default useWallet;
