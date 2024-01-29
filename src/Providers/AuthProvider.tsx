import { redirect } from "@tanstack/react-router";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { Credentials } from "../api/auth.js";

export interface Authentication {
  isAuthenticated: boolean;
  credentials: Credentials;
}

export type Authenticated = {
  logout(): void;
  isAuthenticated: boolean;
  credentials: Credentials;
  setCredentials(credentials: Credentials): void;
  setAuth(auth: { isAuthenticated: boolean; credentials: Credentials }): void;
};

export const AuthContext = createContext<Authenticated>({
  logout: () => {},
  isAuthenticated: false,
  credentials: {
    server: "",
    username: "",
    password: "",
  },
  setCredentials: () => {},
  setAuth: () => {},
});

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
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

export function useAuth() {
  return useContext<Authenticated>(AuthContext);
}
