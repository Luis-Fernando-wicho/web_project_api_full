import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/users": "http://localhost:3000",
      "/cards": "http://localhost:3000",
      "/signin": "http://localhost:3000",
      "/signup": "http://localhost:3000",
    },
  },
});
