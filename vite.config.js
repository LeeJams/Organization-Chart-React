import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Organization-Chart-React/",
  build: {
    outDir: "docs",
    // lib: {
    //   entry: resolve(__dirname, "src/index.js"),
    //   name: "OrganizationChart",
    //   fileName: "organization-chart-react",
    // },
    // rollupOptions: {
    //   external: ["react"],
    //   output: {
    //     globals: {
    //       react: "React",
    //     },
    //   },
    // },
  },
});
