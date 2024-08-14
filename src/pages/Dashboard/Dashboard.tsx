import { useState, useContext, useMemo, Fragment } from "react";
import ThemeContext from "@contexts/ThemeContext";
import formatUnits from "@utils/formatUnits";
import useWalletStore from "@hooks/useWalletStore";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import useTheme from "@mui/material/styles/useTheme";
import Pie from "@components/Chart/Pie";
import TransferDialog from "./TransferDialog";

const CURRENCY_UNIT: string = "usd";

const Dashboard = () => {
  const { account, assets, cryptoPrices, tokenList } = useWalletStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transferData, setTransferData] = useState<{
    token: `0x${string}`;
    decimals: number;
  }>({
    token: "0x0",
    decimals: 0,
  });
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();

  // get the amount of the asset in the currency unit
  function getCoverUnitValue(coinId: string, coinValue: number) {
    if (!cryptoPrices) return 0;
    const cryptoPrice = cryptoPrices?.[coinId]?.[CURRENCY_UNIT] || 0;
    return cryptoPrice * coinValue;
  }

  const pieData = useMemo(
    () =>
      tokenList.map(({ coinId, decimals }, index) =>
        getCoverUnitValue(
          coinId,
          parseInt(
            formatUnits(assets[index]?.balance || BigInt(0), { decimals }),
            10
          )
        )
      ),
    [assets, tokenList, cryptoPrices]
  );

  if (account.address === "0x0")
    return (
      <Grid container justifyContent="center">
        Connect Wallet First!
      </Grid>
    );

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            component={Paper}
            p={2}
            display="flex"
            flexDirection="column"
            overflow="auto"
          >
            <Typography variant="h5">Account</Typography>
            <Typography variant="subtitle1" color="gray">
              View your account information.
            </Typography>
            <div>Address: {account.address}</div>
            <div>
              ETH Balance:{" "}
              {formatUnits(account.balance, {
                decimals: account.decimals,
              })}
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box component={Paper} p={2} height="100%">
            <Typography variant="h5">Asset List</Typography>
            <Typography variant="subtitle1" color="gray">
              View your cryptocurrency assets and their current value.
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Asset</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tokenList.map((token, index) => (
                    <TableRow key={token.address}>
                      <TableCell>
                        <Grid container spacing={1}>
                          <Grid item justifyContent="center">
                            <img
                              src={token.logoURI}
                              alt={token.symbol}
                              width="20"
                              height="20"
                            />
                          </Grid>
                          <Grid item>{token.symbol}</Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        {formatUnits(BigInt(assets[index]?.balance || "0"), {
                          decimals: token.decimals,
                        })}
                      </TableCell>
                      <TableCell>
                        {getCoverUnitValue(
                          token.coinId,
                          parseInt(
                            formatUnits(BigInt(assets[index]?.balance || "0"), {
                              decimals: token.decimals,
                            }),
                            10
                          )
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            setTransferData({
                              token: token.address as `0x${string}`,
                              decimals: token.decimals,
                            });
                            setIsDialogOpen(true);
                          }}
                        >
                          <ArrowOutwardIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container component={Paper} direction="column" p={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Asset Value</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="gray">
                Breakdown of your total asset value across different
                cryptocurrencies.
              </Typography>
            </Grid>
            <Grid item container xs={12} p={2} justifyContent="center">
              <Box height="300px" width="300px">
                <Pie
                  data={pieData}
                  labels={tokenList.map(({ symbol }) => symbol)}
                  labelsColor={themeContext.getFontColor(theme.palette.mode)}
                  toolTipLabel="Asset Value"
                  legendPosition="bottom"
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <TransferDialog
        open={isDialogOpen}
        token={transferData.token}
        decimals={transferData.decimals}
        onClose={() => {
          setTransferData({ token: "0x0", decimals: 0 });
          setIsDialogOpen(false);
        }}
      />
    </Fragment>
  );
};

export default Dashboard;
