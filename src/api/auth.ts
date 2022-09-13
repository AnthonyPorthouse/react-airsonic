import { v4 as uuid } from "uuid";
import md5 from "md5";
import { createContext, useContext } from "react";

export interface Credentials {
  server: string;
  username: string;
  password: string;
}

export type Authenticated = {
  isAuthenticated: boolean;
  credentials: Credentials;
};

export const AuthContext = createContext<Authenticated>({
  isAuthenticated: false,
  credentials: {
    server: localStorage.getItem("ra.server") || "",
    username: localStorage.getItem("ra.username") || "",
    password: localStorage.getItem("ra.password") || "",
  },
});

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
    password
  )}&s=${salt}&v=1.15.0&c=react-airsonic&f=json`;
}

export async function ping({ server, username, password }: Credentials) {
  const authParams = generateAuthParams({ username, password });
  const result = await fetch(`${server}/rest/ping?${authParams}`);

  if (!result.ok) {
    throw new Error("Network Request Failed");
  }

  const json = await result.json();

  return { authenticated: json["subsonic-response"].status === "ok" };
}
