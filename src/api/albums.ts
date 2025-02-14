import { NotFoundError, notFound } from "@tanstack/react-router";
import Axios from "axios";

import {
  Credentials,
  generateAuthParamsObject,
  sanitizeServer,
} from "./auth.js";
import {
  Album,
  Albums,
  ErrorResponse,
  Songs,
  SuccessResponse,
  isErrorMessage,
} from "./types.js";

export type AlbumsResponse =
  | (SuccessResponse & {
      "subsonic-response": {
        albumList2: {
          album: Albums;
        };
      };
    })
  | ErrorResponse;

export type AlbumResponse =
  | (SuccessResponse & {
      "subsonic-response": {
        album: Album & { song: Songs };
      };
    })
  | ErrorResponse;

export async function getAlbums({
  server,
  username,
  password,
}: Credentials): Promise<Albums | NotFoundError> {
  const authParams = generateAuthParamsObject({ username, password });

  const serverUrl = sanitizeServer(server);

  const result = await Axios.get<AlbumsResponse>(
    `${serverUrl}/rest/getAlbumList2.view`,
    {
      params: {
        type: "alphabeticalByArtist",
        size: 500,
        ...authParams,
      },
    },
  );

  if (isErrorMessage(result.data)) {
    return notFound();
  }

  return result.data["subsonic-response"].albumList2.album;
}

export async function getAlbum(
  id: string,
  { server, username, password }: Credentials,
): Promise<[Album, Songs] | NotFoundError> {
  const authParams = generateAuthParamsObject({ username, password });
  const serverUrl = sanitizeServer(server);

  const result = await Axios.get<AlbumResponse>(
    `${serverUrl}/rest/getAlbum.view`,
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

  const { song: songs, ...album } = result.data["subsonic-response"].album;

  return [album, songs];
}
