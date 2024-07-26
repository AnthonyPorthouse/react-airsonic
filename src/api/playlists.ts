import { Credentials, generateAuthParams, sanitizeServer } from "./auth.js";
import { Playlist, Playlists, Songs } from "./types.js";

export async function getPlaylists({
  server,
  username,
  password,
}: Credentials): Promise<Playlists> {
  const authParams = generateAuthParams({ username, password });
  const result = await fetch(
    `${sanitizeServer(server)}/rest/getPlaylists.view?${authParams}`,
  );

  if (!result.ok) {
    throw new Error("Network Request Failed");
  }

  const json = await result.json();

  return json["subsonic-response"].playlists.playlist;
}

export async function getPlaylist(
  id: string,
  { server, username, password }: Credentials,
): Promise<[Playlist, Songs]> {
  const authParams = generateAuthParams({ username, password });
  const result = await fetch(
    `${sanitizeServer(server)}/rest/getPlaylist.view?id=${id}&${authParams}`,
  );

  if (!result.ok) {
    throw new Error("Network Request Failed");
  }

  const json = await result.json();

  const { entry: songs, ...playlist } = json["subsonic-response"].playlist;

  return [playlist, songs];
}
