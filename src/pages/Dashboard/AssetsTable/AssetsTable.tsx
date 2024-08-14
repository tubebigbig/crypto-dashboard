import ethTokenList from "@assets/Tokens/eth.json";
import sepoliaTokenList from "@assets/Tokens/sepolia.json";

export type AssetsTableProps = {
  chainId: string;
  acountAddress: string;
};

const AssetsTable = ({ chainId, acountAddress }: AssetsTableProps) => {
  const currentTokenList = [ethTokenList, sepoliaTokenList].find(
    ({ chainId }) => chainId === chainId
  );
  if (!currentTokenList) return <div>Token List not found</div>;
  return (
    <div>
      <h1>AssetsTable</h1>
    </div>
  );
};

export default AssetsTable;
