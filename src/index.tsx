import { AuthProvider } from "@providers/AuthProvider.js";
import { TrackListProvider } from "@providers/TrackListProvider.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import ReactModal from "react-modal";
import { registerSW } from "virtual:pwa-register";

import App from "./App.js";
import "./i18n";
import "./index.css";

const container = document.getElementById("root") as HTMLElement;

ReactModal.setAppElement(container);

const root = createRoot(container);

export const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TrackListProvider>
            <App />
          </TrackListProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
);

if (import.meta.env.DEV) {
  setTimeout(() => document.dispatchEvent(new Event("update_available")), 5000);
}

registerSW({
  onNeedRefresh: () => {
    document.dispatchEvent(new Event("update_available"));
  },
});
