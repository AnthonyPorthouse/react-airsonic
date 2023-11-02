import md5 from "md5";
import { createContext, useContext } from "react";
import { v4 as uuid } from "uuid";

export interface Credentials {
  server: string;
  username: string;
  password: string;
}

export type Authenticated = {
  logout(): void;
  isAuthenticated: boolean;
  credentials: Credentials;
};

export const AuthContext = createContext<Authenticated>({
  logout: () => {},
  isAuthenticated: false,
  credentials: {
    server: localStorage.getItem("ra.server") || "",
    username: localStorage.getItem("ra.username") || "",
    password: localStorage.getItem("ra.password") || "",
  },
});

AuthContext.displayName = "Auth";

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

  console.log(username, password);

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
