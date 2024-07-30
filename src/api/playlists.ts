import axios from "axios";

import {
  Credentials,
  generateAuthParamsObject,
  sanitizeServer,
} from "./auth.js";
import { Playlist, Playlists, Songs } from "./types.js";

export interface PlaylistsResponse {
  "subsonic-response": {
    playlists: {
      playlist: Playlists;
    };
  };
}

export interface PlaylistResponse {
  "subsonic-response": {
    playlist: Playlist & { entry?: Songs };
  };
}

export async function getPlaylists({
  server,
  username,
  password,
}: Credentials): Promise<Playlists> {
  const authParams = generateAuthParamsObject({ username, password });
  const serverUrl = sanitizeServer(server);

  const result = await axios.get<PlaylistsResponse>(
    `${serverUrl}/rest/getPlaylists.view`,
    { params: authParams },
  );

  return result.data["subsonic-response"].playlists.playlist;
}

export async function getPlaylist(
  id: string,
  { server, username, password }: Credentials,
): Promise<[Playlist, Songs]> {
  const authParams = generateAuthParamsObject({ username, password });
  const serverUrl = sanitizeServer(server);

  const result = await axios.get<PlaylistResponse>(
    `${serverUrl}/rest/getPlaylist.view`,
    {
      params: {
        id,
        ...authParams,
      },
    },
  );

  const { entry: songs, ...playlist } =
    result.data["subsonic-response"].playlist;

  return [playlist, songs ?? []];
}
