// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   extends: [
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:react-hooks/recommended",
//     "plugin:@tanstack/eslint-plugin-query/recommended",
//     "prettier",
//   ],
//   overrides: [
//     {
//       env: {
//         node: true,
//       },
//       files: [".eslintrc.{js,cjs}"],
//       parserOptions: {
//         sourceType: "script",
//       },
//     },
//   ],
//   parser: "@typescript-eslint/parser",
//   parserOptions: {
//     ecmaVersion: "latest",
//     sourceType: "module",
//   },
//   plugins: ["react-refresh"],
//   rules: {},
//   ignorePatterns: ["**/*.gen.ts", "build", ".eslintrc.cjs", "*.config.js"],
// };
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
