import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const target = process.env.VITE_API_URL || "http://localhost:3333";
const isHttps = target.startsWith("https");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target,
        changeOrigin: true,
        secure: isHttps,
      },
    },
  },
});
