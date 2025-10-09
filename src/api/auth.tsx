import axios from "axios";
import md5 from "md5";
import { nanoid } from "nanoid";

export interface Credentials {
  server: string;
  username: string;
  password: string;
}

let memoSalt: string | undefined;

const salt = () => {
  if (memoSalt) return memoSalt;

  return (memoSalt = nanoid(11));
};

function getToken(password: string) {
  return md5(`${password}${salt()}`);
}

export function generateAuthParamsObject({
  username,
  password,
}: Readonly<{ username: string; password: string }>) {
  return {
    u: username,
    t: getToken(password),
    s: salt(),
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
  )}&s=${salt()}&v=1.15.0&c=react-airsonic&f=json`;
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

export async function checkServerInfo(server: string) {
  const { f, c, v } = generateAuthParamsObject({ username: "", password: "" });

  const result = await axios.get<{
    "subsonic-response": {
      status: "failed";
      version: string;
      type?: string;
      openSubsonic?: boolean;
      serverVersion?: string;
      error: {
        code: 10;
        message: string;
      };
    };
  }>(`${sanitizeServer(server)}/rest/ping.view`, {
    params: { f, c, v },
  });

  return {
    valid: true,
    version: result.data["subsonic-response"].version,
    serverType: result.data["subsonic-response"].type ?? "unknown",
    isOpenSubsonic: result.data["subsonic-response"].openSubsonic ?? false,
    serverVersion: result.data["subsonic-response"].serverVersion,
  };
}

export async function checkAuthentication(
  server: string,
  username: string,
  password: string,
) {
  const auth = generateAuthParamsObject({ username, password });

  const result = await axios.get<{
    "subsonic-response": {
      status: "failed" | "ok";
      version: string;
      type?: string;
      openSubsonic?: boolean;
      serverVersion?: string;
    };
  }>(`${sanitizeServer(server)}/rest/ping.view`, {
    params: auth,
  });

  if (result.data["subsonic-response"].status === "failed") {
    throw new Error("Invalid credentials");
  }

  return {
    valid: result.data["subsonic-response"].status === "ok",
  };
}
