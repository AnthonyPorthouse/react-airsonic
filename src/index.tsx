import { AuthProvider } from "@providers/AuthProvider.js";
import { TrackListProvider } from "@providers/TrackListProvider.js";
import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import ReactModal from "react-modal";

import App from "./App.js";
import "./i18n";
import "./index.css";
import { router } from "./router";

Sentry.init({
  dsn: "https://7f604bbfd4d89d353f3fa13222854efc@sentry.porthouse.dev/2",
  integrations: [
    Sentry.tanstackRouterBrowserTracingIntegration(router),
    Sentry.replayIntegration(),
  ],

  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/ra.porthou.se/],
  // Session Replay and then sample at a lower rate in production.
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const container = document.getElementById("root") as HTMLElement;

ReactModal.setAppElement(container);

const root = createRoot(container, {
  onUncaughtError: Sentry.reactErrorHandler((err, errInfo) => {
    console.warn("Uncaught error", err, errInfo.componentStack);
  }),
  onCaughtError: Sentry.reactErrorHandler(),
  onRecoverableError: Sentry.reactErrorHandler(),
});

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
