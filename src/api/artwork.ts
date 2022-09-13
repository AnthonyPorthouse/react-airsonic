import { Credentials, generateAuthParams } from "./auth";

export function getCoverArtUrl(
  id: string,
  { server, username, password }: Credentials
) {
  const authParams = generateAuthParams({ username, password });
  return `${server}/rest/getCoverArt?id=${id}&${authParams}`;
}

export function getScaledCoverArtUrl(
  id: string,
  size: string,
  { server, username, password }: Credentials
) {
  const authParams = generateAuthParams({ username, password });
  return `${server}/rest/getCoverArt?id=${id}&size=${size}&${authParams}`;
}
