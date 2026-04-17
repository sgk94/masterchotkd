import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        test: {
          name: "unit",
          environment: "node",
          include: ["tests/unit/**/*.test.ts"],
        },
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "./src"),
          },
        },
      },
      {
        plugins: [react()],
        test: {
          name: "components",
          environment: "happy-dom",
          setupFiles: ["./tests/setup.ts"],
          include: ["tests/**/*.test.tsx"],
        },
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "./src"),
          },
        },
      },
    ],
    coverage: {
      reporter: ["text", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/layout.tsx",
        "**/loading.tsx",
        "**/global-error.tsx",
        "**/error.tsx",
        "**/not-found.tsx",
        "**/preview/**",
        "**/sign-in/**",
        "**/sign-up/**",
        "**/robots.ts",
        "**/sitemap.ts",
        "**/instrumentation.ts",
        "**/proxy.ts",
        "**/types/**",
        "**/lib/db.ts",
      ],
      thresholds: {
        statements: 85,
        branches: 75,
        functions: 85,
        lines: 85,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
