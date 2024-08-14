export type CryptoPrices = {
  [key in string]: {
    [key in string]: number;
  };
};

const fetchCryptoPrices = async (
  cryptoList: string[],
  currencyUnit = "usd"
) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoList.join(",")}&vs_currencies=${currencyUnit}`
    );
    if (!response.ok) throw response;
    return response.json() as Promise<CryptoPrices>;
  } catch (error) {
    throw new Error("Failed to fetch crypto prices");
  }
};

export default fetchCryptoPrices;
