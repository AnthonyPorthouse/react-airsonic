import { render, screen } from "../testUtils";
import userEvent from "@testing-library/user-event";
import LogIn from "./LogIn";
import { MemoryRouter } from "react-router-dom";
import { waitFor } from "@testing-library/react";

const mockHistoryPush = jest.fn();

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test.skip("page repopulates with old data", async () => {
  render(<LogIn />);

  await waitFor(() => {
    expect(localStorage.getItem).toHaveBeenLastCalledWith("server");
    expect(localStorage.getItem).toHaveBeenLastCalledWith("username");
    expect(localStorage.getItem).toHaveBeenLastCalledWith("password");
  });
});

test.skip("submitting login form authenticates user", async () => {
  render(<LogIn />, { wrapper: MemoryRouter });
  userEvent.type(screen.getByTestId("server"), "https://example.com");
  userEvent.type(screen.getByTestId("username"), "user");
  userEvent.type(screen.getByTestId("password"), "password");
  userEvent.click(screen.getByTestId("login"));

  expect(mockHistoryPush).toHaveBeenCalledWith("/");
});
