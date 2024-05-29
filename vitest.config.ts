/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

const BASE_PATH = "src";

const alias = [
  "components",
  "utils",
  "screens",
  "types",
  "store",
  "layouts",
  "public",
].reduce((acc, curr) => {
  acc[curr] = path.resolve(__dirname, `${BASE_PATH}/${curr}`);
  return acc;
}, {});

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    alias,
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html", "clover", "text-summary"],
    },
  },
});
