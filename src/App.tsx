import { useMemo, useState } from "react";
import Layout from "@pages/Layout";
import Router from "./Router";
import ThemeContext, { defaultTheme } from "@contexts/ThemeContext";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Web3ModalProvider } from "@contexts/walletConnect";
import { WalletStoreProvider } from "@contexts/walletContext";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );

  const themeContextValue = {
    getColor: (mode: "light" | "dark") => (mode === "dark" ? "#333" : "#fff"),
    getFontColor: (mode: "light" | "dark") =>
      mode === "dark" ? "#fff" : "#333",
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    },
  };

  const themeConfig = useMemo(
    () =>
      createTheme({
        ...defaultTheme,
        palette: {
          mode,
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: themeContextValue.getColor(mode),
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider theme={themeConfig}>
        <Web3ModalProvider>
          <WalletStoreProvider>
            <CssBaseline />
            <Layout>
              <Router />
            </Layout>
            <ToastContainer />
          </WalletStoreProvider>
        </Web3ModalProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
