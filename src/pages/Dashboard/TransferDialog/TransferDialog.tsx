import { Fragment, useEffect, useState, useRef, useContext } from "react";
import {
  useGasPrice,
  useWriteContract,
  useEstimateGas,
  useWaitForTransactionReceipt,
} from "wagmi";
import { erc20Abi, formatEther, parseUnits } from "viem";
import debounce from "@mui/material/utils/debounce";
import useWalletStore from "@hooks/useWalletStore";
import { toast, Id as ToastId, ToastOptions } from "react-toastify";
import WalletConext from "@contexts/walletContext";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Spinner from "@mui/material/CircularProgress";

export type TransferDialogProps = {
  open: boolean;
  onClose?: () => void;
  token: `0x${string}`;
  decimals: number;
};

const TransferDialog = ({
  token,
  decimals,
  open,
  onClose,
}: TransferDialogProps) => {
  const account = useWalletStore((state) => state.account);
  const toastId = useRef<ToastId>("");
  const { updateAllBalance } = useContext(WalletConext);
  const { data: gasPrice } = useGasPrice({
    query: {
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
    },
  });
  const [transferAddress, setTransferAddress] = useState<`0x${string}` | null>(
    null
  );
  const [transferAmount, setTransferAmount] = useState(0);
  const preContract = useWriteContract();
  const transferContract = useWaitForTransactionReceipt({
    hash: preContract.data,
  });
  const isPending =
    preContract.isPending || (preContract.data && transferContract.isPending);
  console.log("preContract", preContract);
  console.log("transferContract", transferContract);
  const { data: gas } = useEstimateGas({
    account: account.address,
    to: transferAddress,
    value: parseUnits(transferAmount.toString(), decimals),
    query: {
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
    },
  });
  const totalGas = gasPrice && gas ? formatEther(gas * gasPrice) : "0";

  const handleContract = debounce(() => {
    if (!token) return;
    if (!account.address) return;
    if (!transferAddress) return;
    preContract.writeContract({
      abi: erc20Abi,
      address: token,
      functionName: "transferFrom",
      args: [
        account.address,
        transferAddress,
        parseUnits(transferAmount.toString(), decimals),
      ],
    });
  }, 500);

  const getSnackbarMsg = () => {
    if (preContract.error && "shortMessage" in preContract.error)
      return preContract.error.shortMessage;
    else if (transferContract.error && "shortMessage" in transferContract.error)
      return transferContract.error.shortMessage;
    else if (preContract.isError || transferContract.isError)
      return "Error Occurred";
    else if (transferContract.isSuccess) return "Transaction success";
    return "";
  };

  const updateToastMsg = (msg: string, options?: ToastOptions) => {
    toast.update(toastId.current, { render: msg, ...options });
  };

  useEffect(() => {
    if (!transferAddress) return;
    if (preContract.isPending)
      toastId.current = toast("Waiting for confirmation", { autoClose: false });
    else if (transferContract.isPending)
      updateToastMsg("Transaction in progress");
    if (preContract.isError || transferContract.isError)
      updateToastMsg(getSnackbarMsg(), { type: "error" });
    if (transferContract.isSuccess) {
      setTimeout(() => updateAllBalance(), 5 * 1000);
      updateToastMsg(getSnackbarMsg(), { type: "success", autoClose: 5000 });
    }
  }, [
    preContract.isPending,
    preContract.isError,
    transferContract.isPending,
    transferContract.isSuccess,
    transferContract.isError,
  ]);

  useEffect(() => {
    if (open) setTransferAddress(null);
  }, [open]);

  const LoadingJSX = () => (
    <Box
      position="absolute"
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      left="0"
      top="0"
      bgcolor="rgba(255, 255, 255, 0.3)"
    >
      <Spinner size={60} />
    </Box>
  );

  return (
    <Fragment>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Transfer</DialogTitle>
        <DialogContent>
          {isPending && <LoadingJSX />}
          <DialogContentText>
            To transfer your assets, please enter the recipient's address and
            the amount you want to transfer.
          </DialogContentText>
          <Typography>Total gas fee: {totalGas}</Typography>
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Recipient's Address"
            type="text"
            fullWidth
            value={transferAddress}
            onChange={(e) =>
              setTransferAddress(e.target.value as `0x${string}`)
            }
            disabled={isPending}
          />
          <TextField
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            value={transferAmount}
            onChange={(e) => setTransferAmount(parseInt(e.target.value, 10))}
            disabled={isPending}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleContract}
            disabled={isPending}
          >
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default TransferDialog;
