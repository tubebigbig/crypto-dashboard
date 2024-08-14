import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    "plugin:storybook/recommended",
  ],
  files: ["**/*.{ts,tsx}"],
  ignores: ["dist"],
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@app", "./src"],
          ["@components", "./src/components"],
          ["@contexts", "./src/contexts"],
          ["@hooks", "./src/hooks"],
          ["@pages", "./src/pages"],
          ["@utils", "./src/utils"],
          ["@assets", "./src/assets"],
        ],
        extensions: [".ts", ".tsx"],
      },
    },
  },
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
});
