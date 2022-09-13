import { Credentials, generateAuthParams } from "./auth";

export function getStreamUrl(
  id: string,
  { server, username, password }: Credentials
) {
  const authParams = generateAuthParams({ username, password });
  return `${server}/rest/stream?id=${id}&${authParams}`;
}
