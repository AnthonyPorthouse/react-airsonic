import { Credentials, generateAuthParams, sanitizeServer } from "./auth.js";

export function getStreamUrl(
  id: string,
  { server, username, password }: Credentials,
) {
  const authParams = generateAuthParams({ username, password });
  return `${sanitizeServer(server)}/rest/stream.view?id=${id}&${authParams}`;
}
