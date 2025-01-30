import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/resume-builder/", // ✅ Fix GitHub Pages base path
  build: {
    rollupOptions: {
      external: [],  
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
