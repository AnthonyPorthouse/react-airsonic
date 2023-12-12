import { Credentials, generateAuthParams, sanitizeServer } from "./auth.js";

export function getCoverArtUrl(
  id: string,
  { server, username, password }: Credentials,
) {
  const authParams = generateAuthParams({ username, password });
  return `${sanitizeServer(
    server,
  )}/rest/getCoverArt.view?id=${id}&${authParams}`;
}

export function getScaledCoverArtUrl(
  id: string,
  size: string,
  { server, username, password }: Credentials,
) {
  const authParams = generateAuthParams({ username, password });
  return `${sanitizeServer(
    server,
  )}/rest/getCoverArt.view?id=${id}&size=${size}&${authParams}`;
}
