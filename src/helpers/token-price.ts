import axios from "axios";

const cache: { [key: string]: number } = {};

export const loadTokenPrices = async () => {
  const url = "https://api.coingecko.com/api/v3/simple/price?ids=farmers-only&vs_currencies=usd";
  const { data } = await axios.get(url);

  cache["HARMONY"] = data["harmony"].usd;
  cache["FOX"] = data["farmers-only"].usd;
  cache["AVAX"] = data["avalanche-2"].usd;
};

export const getTokenPrice = (symbol: string): number => {
  return Number(cache[symbol]);
};
