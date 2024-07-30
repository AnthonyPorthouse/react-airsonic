import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SyntheticEvent } from "react";
import { MockInstance, afterEach, beforeEach, describe, expect } from "vitest";

import { AuthProvider, useAuth } from "./AuthProvider";

function AuthProviderTest() {
  const auth = useAuth();

  return (
    <div>
      <dl>
        <dt>Server</dt>
        <dd data-testid="server-url">{auth.credentials.server}</dd>

        <dt>Username</dt>
        <dd data-testid="username">{auth.credentials.username}</dd>

        <dt>Password</dt>
        <dd data-testid="password">{auth.credentials.password}</dd>

        <dt>Is Authenticated</dt>
        <dd data-testid="is-authenticated">{auth.isAuthenticated}</dd>
      </dl>

      <button
        onClick={(e: SyntheticEvent) => {
          e.preventDefault();
          auth.setAuth({
            isAuthenticated: true,
            credentials: {
              server: "server",
              username: "username",
              password: "password",
            },
          });
        }}
      >
        Set Auth
      </button>

      <button onClick={() => auth.logout()}>Log Out</button>
    </div>
  );
}

describe(AuthProvider, async () => {
  describe("initial state", async () => {
    beforeEach(() => {
      render(
        <AuthProvider>
          <AuthProviderTest />
        </AuthProvider>,
      );
    });

    it("should start with an empty server address", async () => {
      const server = await screen.findByTestId("server-url");
      expect(server).toHaveTextContent("");
    });

    it("should start with an empty username", async () => {
      const username = await screen.findByTestId("username");
      expect(username).toHaveTextContent("");
    });

    it("should start with an empty password", async () => {
      const password = await screen.findByTestId("password");
      expect(password).toHaveTextContent("");
    });
  });

  describe("populated with initial state from localstorage", async () => {
    let getItemSpy: MockInstance<typeof Storage.prototype.getItem>;

    beforeEach(() => {
      getItemSpy = vi.spyOn(Storage.prototype, "getItem");
      getItemSpy
        .mockReturnValueOnce("server")
        .mockReturnValueOnce("username")
        .mockReturnValueOnce("password");

      render(
        <AuthProvider>
          <AuthProviderTest />
        </AuthProvider>,
      );
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should start with an empty server address", async () => {
      const server = await screen.findByTestId("server-url");
      expect(getItemSpy).toHaveBeenCalledWith("ra.server");
      expect(server).toHaveTextContent("server");
    });

    it("should start with an empty username", async () => {
      const username = await screen.findByTestId("username");
      expect(getItemSpy).toHaveBeenCalledWith("ra.username");
      expect(username).toHaveTextContent("username");
    });

    it("should start with an empty password", async () => {
      const password = await screen.findByTestId("password");
      expect(getItemSpy).toHaveBeenCalledWith("ra.password");
      expect(password).toHaveTextContent("password");
    });
  });

  describe("populated with setAuth", async () => {
    beforeEach(() => {
      render(
        <AuthProvider>
          <AuthProviderTest />
        </AuthProvider>,
      );
    });

    it("should set the auth when clicked", async () => {
      const button = await screen.findByRole("button", { name: "Set Auth" });

      await userEvent.click(button);

      const server = await screen.findByTestId("server-url");
      expect(server).toHaveTextContent("server");
      const username = await screen.findByTestId("username");
      expect(username).toHaveTextContent("username");
      const password = await screen.findByTestId("password");
      expect(password).toHaveTextContent("password");
    });
  });

  describe("populated with setAuth", async () => {
    beforeEach(() => {
      render(
        <AuthProvider>
          <AuthProviderTest />
        </AuthProvider>,
      );
    });

    it("should set the auth when clicked", async () => {
      const button = await screen.findByRole("button", { name: "Set Auth" });

      await userEvent.click(button);

      const server = await screen.findByTestId("server-url");
      expect(server).toHaveTextContent("server");
      const username = await screen.findByTestId("username");
      expect(username).toHaveTextContent("username");
      const password = await screen.findByTestId("password");
      expect(password).toHaveTextContent("password");
    });
  });
});
