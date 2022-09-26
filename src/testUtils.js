// Import your own reducer
import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender } from "@testing-library/react";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";

import { reducers } from "./app/store";

function render(
  ui,
  {
    initialState,
    store = configureStore({ reducer: reducers, preloadedState: initialState }),
    wrapper: ParentWrapper,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    if (ParentWrapper) {
      return (
        <Provider store={store}>
          <HelmetProvider>
            <ParentWrapper>{children}</ParentWrapper>
          </HelmetProvider>
        </Provider>
      );
    }

    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
