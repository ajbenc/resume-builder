import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["pdf-lib"], // ✅ Ensure pdf-lib is pre-bundled properly
  },
  build: {
    rollupOptions: {
      external: ["pdf-lib"], // ✅ Force pdf-lib to be treated as external
    },
    commonjsOptions: {
      transformMixedEsModules: true, // ✅ Allow mixed ESM and CJS modules
    },
  },
});
