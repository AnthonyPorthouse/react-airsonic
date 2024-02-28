/// <reference types="vitest" />
/// <reference types="vite/client" />
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
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
            src: "logo192.webp",
            sizes: "192x192",
          },
          {
            src: "logo192.png",
            sizes: "192x192",
          },
          {
            src: "logo256.webp",
            sizes: "256x256",
          },
          {
            src: "logo256.png",
            sizes: "256x256",
          },
          {
            src: "logo512.webp",
            sizes: "512x512",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
          },
          {
            src: "logo1024.webp",
            sizes: "1024x1024",
          },
          {
            src: "logo1024.png",
            sizes: "1024x1024",
          },
          {
            src: "logo192maskable.webp",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "logo192maskable.png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "logo512maskable.webp",
            sizes: "512x512",
            purpose: "maskable",
          },
          {
            src: "logo512maskable.png",
            sizes: "512x512",
            purpose: "maskable",
          },
          {
            src: "logo1024maskable.webp",
            sizes: "1024x1024",
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
            src: "/screenshots/wide_albums.webp",
            sizes: "1920x1080",
            form_factor: "wide",
            label: "Desktop album list",
          },
          {
            src: "/screenshots/wide_album.webp",
            sizes: "1920x1080",
            form_factor: "wide",
            label: "Desktop album view",
          },
          {
            src: "/screenshots/wide_fullscreen.webp",
            sizes: "1920x1080",
            form_factor: "wide",
            label: "Desktop fullscreen media view",
          },
          {
            src: "/screenshots/phone_albums.webp",
            sizes: "721x1601",
            form_factor: "narrow",
            label: "Phone album list",
          },
          {
            src: "/screenshots/phone_album.webp",
            sizes: "721x1601",
            form_factor: "narrow",
            label: "Phone album view",
          },
        ],
      },
    }),
    TanStackRouterVite({}),
  ],
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: "build",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
});
