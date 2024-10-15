import { Credentials } from "@/api/auth";
import { createContext } from "react";

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
