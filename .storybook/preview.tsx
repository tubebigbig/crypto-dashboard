import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider, createTheme } from "@mui/material";
import { useGlobals } from "storybook/internal/preview-api";

const withThemeProvider = (Story, context) => {
  const [globals] = useGlobals();
  const theme = createTheme({
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
      mode: globals.backgrounds?.value === "#333" ? "dark" : "light",
    },
  });
  console.log(globals);

  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  );
};

export const decorators = [withThemeProvider];

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#fff",
        },
        {
          name: "dark",
          value: "#333",
        },
      ],
    },
    controls: {
      matchers: {
        date: /Date$/i,
      },
    },
  },
};

export default preview;
