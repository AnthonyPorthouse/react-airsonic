import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgrPlugin(),
    VitePWA({
      manifestFilename: "ra.webmanifest",
      manifest: {
        id: "/",
        short_name: "Ra",
        name: "Ra",
        description: "An opinionated frontend for airsonic",
        icons: [
          {
            src: "logo192.png",
            sizes: "192x192",
          },
          {
            src: "logo256.png",
            sizes: "256x256",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
          },
          {
            src: "logo1024.png",
            sizes: "1024x1024",
          },
          {
            src: "logo192maskable.png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "logo512maskable.png",
            sizes: "512x512",
            purpose: "maskable",
          },
          {
            src: "logo1024maskable.png",
            sizes: "1024x1024",
            purpose: "maskable",
          },
        ],
        start_url: ".",
        display_override: ["window-controls-overlay", "minimal-ui"],
        display: "standalone",
        theme_color: "#000000",
        background_color: "#000000",
        screenshots: [
          {
            src: "/screenshots/wide_albums.png",
            sizes: "1920x1080",
            form_factor: "wide",
            label: "Desktop album list",
          },
          {
            src: "/screenshots/wide_album.png",
            sizes: "1920x1080",
            form_factor: "wide",
            label: "Desktop album view",
          },
          {
            src: "/screenshots/wide_fullscreen.png",
            sizes: "1920x1080",
            form_factor: "wide",
            label: "Desktop fullscreen media view",
          },
          {
            src: "/screenshots/phone_albums.png",
            sizes: "721x1601",
            form_factor: "narrow",
            label: "Phone album list",
          },
          {
            src: "/screenshots/phone_album.png",
            sizes: "721x1601",
            form_factor: "narrow",
            label: "Phone album view",
          },
        ],
      },
    }),
  ],
  build: {
    outDir: "build",
  },
});
