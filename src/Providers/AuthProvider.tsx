import { Credentials } from "@api/auth.js";
import { redirect } from "@tanstack/react-router";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";

import { AuthContext } from "../Contexts/AuthContext";

export interface Authentication {
  isAuthenticated: boolean;
  credentials: Credentials;
}

export function AuthProvider({
  defaultServer,
  defaultUsername,
  defaultPassword,
  children,
}: PropsWithChildren<{
  defaultServer?: string;
  defaultUsername?: string;
  defaultPassword?: string;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    server: localStorage.getItem("ra.server") ?? defaultServer ?? "",
    username: localStorage.getItem("ra.username") ?? defaultUsername ?? "",
    password: localStorage.getItem("ra.password") ?? defaultPassword ?? "",
  });

  const setAuth = useCallback(
    (authentication: Authentication) => {
      setCredentials(authentication.credentials);
      setIsAuthenticated(authentication.isAuthenticated);
    },
    [setCredentials, setIsAuthenticated],
  );

  const logout = useCallback(() => {
    redirect({
      to: "/",
    });

    localStorage.setItem("ra.password", "");

    setAuth({
      isAuthenticated: false,
      credentials: {
        username: credentials.username,
        password: "",
        server: credentials.server,
      },
    });
  }, [setAuth, credentials]);

  const authValue = useMemo(
    () => ({ logout, setAuth, credentials, isAuthenticated, setCredentials }),
    [credentials, isAuthenticated, logout, setAuth, setCredentials],
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
