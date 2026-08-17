import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@apis": path.resolve("src/apis"),
      "@assets": path.resolve("src/assets"),
      "@components": path.resolve("src/components"),
      "@hooks": path.resolve("src/hooks"),
      "@pages": path.resolve("src/pages"),
      "@routes": path.resolve("src/routes"),
      "@styles": path.resolve("src/styles"),
      "@utils": path.resolve("src/utils"),
      "@mocks": path.resolve("src/mocks"),
    },
  },
});
