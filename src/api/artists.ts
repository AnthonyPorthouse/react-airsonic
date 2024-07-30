import Axios from "axios";

import {
  Credentials,
  generateAuthParamsObject,
  sanitizeServer,
} from "./auth.js";
import { Albums, Artist, Artists } from "./types.js";

export interface ArtistsResponse {
  "subsonic-response": {
    artists: {
      ignoredArticles: string;
      index: {
        name: string;
        artist: Artists;
      }[];
    };
  };
}

export interface ArtistResponse {
  "subsonic-response": {
    artist: Artist & { album: Albums };
  };
}

export async function getArtists({
  server,
  username,
  password,
}: Credentials): Promise<Artists> {
  const authParams = generateAuthParamsObject({ username, password });
  const serverUrl = sanitizeServer(server);

  const result = await Axios.get<ArtistsResponse>(
    `${serverUrl}/rest/getArtists.view`,
    {
      params: {
        ...authParams,
      },
    },
  );

  const artists: Artist[] = [];

  result.data["subsonic-response"].artists.index.forEach(
    (index: { artist: Artist[] }) => {
      index.artist.forEach((artist) => artists.push(artist));
    },
  );

  return artists;
}

export async function getArtist(
  id: string,
  { server, username, password }: Credentials,
): Promise<[Artist, Albums]> {
  const authParams = generateAuthParamsObject({ username, password });
  const serverUrl = sanitizeServer(server);

  const result = await Axios.get<ArtistResponse>(
    `${serverUrl}/rest/getArtist.view`,
    {
      params: {
        id,
        ...authParams,
      },
    },
  );

  const { album: albums, ...artist } = result.data["subsonic-response"].artist;

  return [artist, albums];
}
