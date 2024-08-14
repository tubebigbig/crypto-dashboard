import { createContext } from "react";

export const defaultTheme = {
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
  },
  palette: {
    mode: "light",
  },
};

const ThemeContext = createContext({
  getColor: (mode: "light" | "dark") => (mode === "dark" ? "#333" : "#fff"),
  getFontColor: (mode: "light" | "dark") => (mode === "dark" ? "#fff" : "#333"),
  toggleColorMode: () => {},
});

export default ThemeContext;
