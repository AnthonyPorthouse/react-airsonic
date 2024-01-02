import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import ReactModal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";

import App from "./App.js";
import { AuthProvider } from "./api/auth.js";
import "./i18n";
import "./index.css";
import reportWebVitals from "./reportWebVitals.js";

const container = document.getElementById("root") as HTMLElement;

ReactModal.setAppElement(container);

const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if (import.meta.env.DEV) {
  reportWebVitals(console.log);
}
