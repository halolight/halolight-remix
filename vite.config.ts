import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    cloudflareDevProxy(),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  server: {
    // API 代理配置 - 解决跨域问题
    proxy: {
      "/api": {
        target: process.env.VITE_API_BACKEND_URL || "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
