import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node, // ✅ Use Node.js instead of browser
    },
    extends: [
      "eslint:recommended",
      "plugin:node/recommended", // ✅ Enforce Node.js best practices
      "plugin:@typescript-eslint/recommended", // ✅ Enable TypeScript rules
      "plugin:prettier/recommended" // ✅ Enforce Prettier formatting
    ],
    rules: {
      "no-console": "off", // ❌ Allow console logs (can be turned on for production)
      "no-unused-vars": "warn", // ⚠️ Warn on unused variables
      "eqeqeq": "error", // 🔥 Enforce strict equality (=== instead of ==)
      "node/no-unsupported-features/es-syntax": "off", // 🚀 Allow ES modules in Node.js
      "@typescript-eslint/no-explicit-any": "warn", // ⚠️ Warn if 'any' is used
      "@typescript-eslint/explicit-module-boundary-types": "off", // ✅ No need to always define return types
    }
  }
];
