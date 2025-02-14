import { NotFoundError, notFound } from "@tanstack/react-router";
import axios from "axios";

import {
  Credentials,
  generateAuthParamsObject,
  sanitizeServer,
} from "./auth.js";
import {
  ErrorResponse,
  Playlist,
  Playlists,
  Songs,
  SuccessResponse,
  isErrorMessage,
} from "./types.js";

export type PlaylistsResponse =
  | (SuccessResponse & {
      "subsonic-response": {
        playlists: {
          playlist?: Playlists;
        };
      };
    })
  | ErrorResponse;

export type PlaylistResponse =
  | (SuccessResponse & {
      "subsonic-response": {
        playlist: Playlist & { entry?: Songs };
      };
    })
  | ErrorResponse;

export async function getPlaylists({
  server,
  username,
  password,
}: Credentials): Promise<Playlists | NotFoundError> {
  const authParams = generateAuthParamsObject({ username, password });
  const serverUrl = sanitizeServer(server);

  const result = await axios.get<PlaylistsResponse>(
    `${serverUrl}/rest/getPlaylists.view`,
    { params: authParams },
  );

  if (isErrorMessage(result.data)) {
    return notFound();
  }

  return result.data["subsonic-response"].playlists?.playlist ?? [];
}

export async function getPlaylist(
  id: string,
  { server, username, password }: Credentials,
): Promise<[Playlist, Songs] | NotFoundError> {
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

  if (isErrorMessage(result.data)) {
    return notFound();
  }

  const { entry: songs, ...playlist } =
    result.data["subsonic-response"].playlist;

  return [playlist, songs ?? []];
}
