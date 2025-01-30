import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/resume-builder/", //  
  optimizeDeps: {
    include: ["pdf-lib"], //  
  },
  build: {
    rollupOptions: {
      external: ["pdf-lib"], //  
    },
    commonjsOptions: {
      transformMixedEsModules: true, //  
    },
  },
});
