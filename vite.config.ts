import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    // Forward API calls to the Express backend in backend/ (npm run api).
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    // backend/ has its own tests (node:test), run with npm --prefix backend test.
    exclude: ["**/node_modules/**", "**/dist/**", "backend/**"],
    globals: true,
  },
}));
