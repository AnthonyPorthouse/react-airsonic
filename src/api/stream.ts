import { Credentials, generateAuthParams, sanitizeServer } from "./auth";

export function getStreamUrl(
  id: string,
  { server, username, password }: Credentials
) {
  const authParams = generateAuthParams({ username, password });
  return `${sanitizeServer(server)}/rest/stream?id=${id}&${authParams}`;
}
