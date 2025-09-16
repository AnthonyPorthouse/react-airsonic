import axios from "axios";

import {
  Credentials,
  generateAuthParamsObject,
  sanitizeServer,
} from "./auth.js";
import { Albums, Artists, Songs } from "./types.js";

export interface SearchResultsResponse {
  "subsonic-response": {
    searchResult3: {
      song?: Songs;
      album?: Albums;
      artist?: Artists;
    };
  };
}

export async function getSearchResults(
  query: string,
  { server, username, password }: Credentials,
): Promise<[Artists, Albums, Songs]> {
  const authParams = generateAuthParamsObject({ username, password });
  const serverUrl = sanitizeServer(server);

  console.log(query);

  const result = await axios.get<SearchResultsResponse>(
    `${serverUrl}/rest/search3.view`,
    {
      params: {
        ...authParams,
        query: query,
        artistCount: 4,
        albumCount: 4,
        songCount: 100,
      },
    },
  );

  const {
    song: songs,
    album: albums,
    artist: artists,
  } = result.data["subsonic-response"].searchResult3;

  return [artists || [], albums || [], songs || []];
}
