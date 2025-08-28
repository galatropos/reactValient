import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ mode }) => {
  if (mode === "temp") {
    return {
      plugins: [react(), viteSingleFile()],
      build: {
        outDir: "dist/temp",
        assetsInlineLimit: 100000000,
      },
    };
  }

  // build normal
  return {
    plugins: [react(), viteSingleFile()],
    build: {
      outDir: "dist",
      assetsInlineLimit: 100000000,
    },
  };
});