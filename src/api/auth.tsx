import axios from "axios";
import md5 from "md5";
import { v4 as uuid } from "uuid";

export interface Credentials {
  server: string;
  username: string;
  password: string;
}

export const salt = uuid();

function getToken(password: string) {
  return md5(`${password}${salt}`);
}

export function generateAuthParamsObject({
  username,
  password,
}: Readonly<{ username: string; password: string }>) {
  return {
    u: username,
    t: getToken(password),
    s: salt,
    v: "1.15.0",
    c: "react-airsonic",
    f: "json",
  };
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
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    throw new Error(`Invalid Server URL ${url}`);
  }

  return url;
}

export async function ping({ server, username, password }: Credentials) {
  const authParams = generateAuthParamsObject({ username, password });

  const result = await axios.get<{
    "subsonic-response": {
      status: "ok" | "failed";
    };
  }>(`${sanitizeServer(server)}/rest/ping.view`, {
    params: authParams,
  });

  return { authenticated: result.data["subsonic-response"].status === "ok" };
}
