import { useContext, Fragment } from "react";
import { useTheme } from "@mui/material";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import ThemeContext from "@contexts/ThemeContext";
import formatUnits from "@utils/formatUnits";
import useWalletStore from "@hooks/useWalletStore";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThemeToggle from "@components/ThemeToggle";

export const Header = () => {
  const theme = useTheme();
  const account = useWalletStore((state) => state.account);
  const themeContext = useContext(ThemeContext);
  const { open: openWeb3Modal, close: closeWeb3Modal } = useWeb3Modal();
  const { open: isWev3MOdalOpen } = useWeb3ModalState();
  const profileInfo = account.balance
    ? `${formatUnits(account.balance, { decimals: account.decimals })} ${account.symbol} / ${account.address?.slice(0, 6)}...${account.address?.slice(-4)}`
    : "Connect Wallet";

  return (
    <Fragment>
      <AppBar component="nav" color="default">
        <Toolbar>
          <Typography variant="h5" component="h1" sx={{ padding: "0 1rem" }}>
            Crypto Glance
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            size="small"
            variant="contained"
            onClick={() =>
              isWev3MOdalOpen ? closeWeb3Modal() : openWeb3Modal()
            }
            sx={{ mr: "1rem" }}
          >
            {account.address ? profileInfo : "Connect Wallet"}
          </Button>
          <ThemeToggle
            theme={theme.palette.mode}
            onToggle={themeContext.toggleColorMode}
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
};

export default Header;
