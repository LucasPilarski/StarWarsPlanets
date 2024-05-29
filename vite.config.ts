import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "node:path";

const BASE_PATH = "src";

const alias = [
  "components",
  "utils",
  "screens",
  "types",
  "store",
  "public",
  "tests",
].reduce((acc, curr) => {
  acc[curr] = path.resolve(__dirname, `${BASE_PATH}/${curr}`);
  return acc;
}, {});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: `src`,
  publicDir: path.resolve(__dirname, `${BASE_PATH}/public`),
  resolve: {
    alias,
  },
  css: {
    postcss: {
      plugins: [require("postcss-prettify"), require("postcss-nesting")],
    },
  },
});
