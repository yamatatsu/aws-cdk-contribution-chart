import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: "esbuild",
    target: "esnext",
  },
  base: "/aws-cdk-contribution-chart/",
});
