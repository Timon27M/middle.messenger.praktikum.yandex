import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  {
    ignores: ["dist/*"],
  },
  {
    rules: {
        "eol-last": ["error", "always"],

  },
},
  ...tseslint.configs.recommended,
];
