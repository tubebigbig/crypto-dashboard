import { formatUnits as viemFormatUnits } from "viem";

export default function formatUnits(
  value: bigint = BigInt(0),
  options: {
    decimals?: number;
    fixedDecimals?: number;
  } = {}
) {
  const coinValue = viemFormatUnits(value, options.decimals || 9);
  return parseFloat(
    parseFloat(coinValue).toFixed(options.fixedDecimals || 4)
  ).toString();
}
