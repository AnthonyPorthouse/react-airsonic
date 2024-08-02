import { act, renderHook } from "@testing-library/react";
import { MockInstance, afterEach, beforeEach, describe, expect } from "vitest";

import { AuthProvider, useAuth } from "./AuthProvider";

describe(AuthProvider, async () => {
  describe("initial state", async () => {
    it("should start with empty credentials", async () => {
      const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
      expect(result.current.credentials).toEqual({
        server: "",
        username: "",
        password: "",
      });
      expect(result.current.isAuthenticated).toBe(false);
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
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should have pre-populated credentials", async () => {
      const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

      expect(getItemSpy).toHaveBeenCalledWith("ra.server");
      expect(getItemSpy).toHaveBeenCalledWith("ra.username");
      expect(getItemSpy).toHaveBeenCalledWith("ra.password");

      expect(result.current.credentials).toEqual({
        server: "server",
        username: "username",
        password: "password",
      });
    });
  });

  describe("populated with setAuth", async () => {
    it("should return the new credentials after they're set", async () => {
      const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

      await act(async () =>
        result.current.setAuth({
          isAuthenticated: true,
          credentials: {
            server: "server",
            username: "username",
            password: "password",
          },
        }),
      );

      expect(result.current.isAuthenticated).toBe(true);

      expect(result.current.credentials).toEqual({
        server: "server",
        username: "username",
        password: "password",
      });
    });
  });
});
