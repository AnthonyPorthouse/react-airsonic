import md5 from "md5";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { redirect } from "react-router-dom";
import { v4 as uuid } from "uuid";

export interface Authentication {
  isAuthenticated: boolean;
  credentials: Credentials;
}

export interface Credentials {
  server: string;
  username: string;
  password: string;
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
  setCredentials: (credentials: Credentials) => {},
  setAuth: (auth) => {},
});

AuthContext.displayName = "Auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    server: localStorage.getItem("ra.server") || "",
    username: localStorage.getItem("ra.username") || "",
    password: localStorage.getItem("ra.password") || "",
  });

  const setAuth = useCallback(
    (authentication: Authentication) => {
      setCredentials(authentication.credentials);
      setIsAuthenticated(authentication.isAuthenticated);
    },
    [setCredentials, setIsAuthenticated],
  );

  const logout = useCallback(() => {
    redirect("/login");

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

export const salt = uuid();

function getToken(password: string) {
  return md5(`${password}${salt}`);
}

export function generateAuthParams({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  return `u=${username}&t=${getToken(
    password,
  )}&s=${salt}&v=1.15.0&c=react-airsonic&f=json`;
}

export function sanitizeServer(url: string) {
  if (
    (url !== null || url !== "") &&
    !url.startsWith("http://") &&
    !url.startsWith("https://")
  ) {
    throw new Error(`Invalid Server URL ${url}`);
  }

  return url;
}

export async function ping({ server, username, password }: Credentials) {
  const authParams = generateAuthParams({ username, password });

  let result: Response | null = null;
  try {
    result = await fetch(
      `${sanitizeServer(server)}/rest/ping.view?${authParams}`,
    );
  } catch (e: any) {
    console.warn(e);
  }

  if (!result || !result.ok) {
    throw new Error("Network Request Failed");
  }

  const json = await result.json();

  return { authenticated: json["subsonic-response"].status === "ok" };
}
