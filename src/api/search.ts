import { Albums } from "./albums.js";
import { Artists } from "./artists.js";
import { Credentials, generateAuthParams, sanitizeServer } from "./auth.js";
import { Songs } from "./songs.js";

export async function getSearchResults(
  query: string,
  { server, username, password }: Credentials,
): Promise<[Artists, Albums, Songs]> {
  const authParams = generateAuthParams({ username, password });
  const result = await fetch(
    `${sanitizeServer(
      server,
    )}/rest/search3.view?query=${encodeURIComponent(query)}&artistCount=4&albumCount=4&songCount=100&${authParams}`,
  );

  if (!result.ok) {
    throw new Error("Network Request Failed");
  }

  const json = await result.json();

  const {
    song: songs,
    album: albums,
    artist: artists,
  } = json["subsonic-response"].searchResult3;

  return [artists || [], albums || [], songs || []];
}
