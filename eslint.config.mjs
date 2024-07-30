// @ts-check
import eslint from "@eslint/js";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import prettier from "eslint-config-prettier";
import reacthooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["build/**", "*.config.*"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "react-hooks": reacthooks,
    },

    rules: reacthooks.configs.recommended.rules,
  },
  ...tanstackQuery.configs["flat/recommended"],
  {
    rules: prettier.rules,
  },
);
