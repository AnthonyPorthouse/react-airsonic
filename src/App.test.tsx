import { waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "./App";
import { render, screen } from "./testUtils";

test("Shows the log in form", async () => {
  render(<App />, { initialState: {}, wrapper: MemoryRouter });
  const loginButton = screen.getByText(/log in/i);
  expect(loginButton).toBeInTheDocument();
});

test("Has the title set", async () => {
  render(<App />, { initialState: {}, wrapper: MemoryRouter });
  await waitFor(() => expect(document.title).toBe("Ra"));
});
