import { Credentials } from "@api/auth.js";
import { redirect } from "@tanstack/react-router";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";

import { AuthContext } from "../Contexts/AuthContext";

export interface Authentication {
  isAuthenticated: boolean;
  credentials: Credentials;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    server: localStorage.getItem("ra.server") ?? "",
    username: localStorage.getItem("ra.username") ?? "",
    password: localStorage.getItem("ra.password") ?? "",
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
