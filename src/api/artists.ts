import { NotFoundError, notFound } from "@tanstack/react-router";
import Axios from "axios";

import {
  Credentials,
  generateAuthParamsObject,
  sanitizeServer,
} from "./auth.js";
import {
  Albums,
  Artist,
  Artists,
  ErrorResponse,
  SuccessResponse,
  isErrorMessage,
} from "./types.js";

export type ArtistsResponse =
  | (SuccessResponse & {
      "subsonic-response": {
        artists: {
          ignoredArticles: string;
          index: {
            name: string;
            artist: Artists;
          }[];
        };
      };
    })
  | ErrorResponse;

export type ArtistResponse = SuccessResponse & {
  "subsonic-response": {
    artist: Artist & { album: Albums };
  };
};

export async function getArtists({
  server,
  username,
  password,
}: Credentials): Promise<Artists | NotFoundError> {
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

  if (isErrorMessage(result.data)) {
    return notFound();
  }

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
): Promise<[Artist, Albums] | NotFoundError> {
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

  if (isErrorMessage(result.data)) {
    return notFound();
  }

  const { album: albums, ...artist } = result.data["subsonic-response"].artist;

  return [artist, albums];
}
