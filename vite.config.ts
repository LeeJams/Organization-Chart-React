import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig(({ mode }) => {
  const isLibraryBuild = mode === "lib";
  const isDemoBuild = mode === "demo";

  return {
    plugins: [
      react({
        jsxRuntime: isLibraryBuild ? "classic" : "automatic",
      }),
    ],
    base: isDemoBuild ? "/Organization-Chart-React/" : "/",
    build: isLibraryBuild
      ? {
          outDir: "dist",
          emptyOutDir: false,
          copyPublicDir: false,
          lib: {
            entry: resolve(__dirname, "src/library.ts"),
            name: "OrganizationChart",
            fileName: "organization-chart-react",
            cssFileName: "style",
          },
          rolldownOptions: {
            external: [
              "react",
              "react-dom",
            ],
            output: {
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
              },
            },
          },
        }
      : isDemoBuild
        ? {
            outDir: "docs",
            emptyOutDir: true,
          }
        : undefined,
    test: {
      environment: "jsdom",
      globals: true,
      include: ["tests/**/*.spec.tsx"],
    },
  };
});
