import Axios from "axios";

import {
  Credentials,
  generateAuthParamsObject,
  sanitizeServer,
} from "./auth.js";
import { Album, Albums, Songs } from "./types.js";

interface AlbumsResponse {
  "subsonic-response": {
    albumList2: {
      album: Albums;
    };
  };
}

interface AlbumResponse {
  "subsonic-response": {
    album: Album & { song: Songs };
  };
}

export async function getAlbums({
  server,
  username,
  password,
}: Credentials): Promise<Albums> {
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

  return result.data["subsonic-response"].albumList2.album;
}

export async function getAlbum(
  id: string,
  { server, username, password }: Credentials,
): Promise<[Album, Songs]> {
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

  const { song: songs, ...album } = result.data["subsonic-response"].album;

  return [album, songs];
}
