import { AlbumIds, Albums } from "./albums";
import { Credentials, generateAuthParams, sanitizeServer } from "./auth";

export type Artist = {
  id: string;
  name: string;
  coverArt: string;
  albumCount: string;
  albums: AlbumIds;
};
export type Artists = Artist[];
export type ArtistIds = string[];

export async function getArtists({
  server,
  username,
  password,
}: Credentials): Promise<Artists> {
  const authParams = generateAuthParams({ username, password });
  const result = await fetch(
    `${sanitizeServer(server)}/rest/getArtists.view?${authParams}`
  );

  if (!result.ok) {
    throw new Error("Network Request Failed");
  }

  const json = await result.json();

  const artists: Artist[] = [];

  json["subsonic-response"].artists.index.forEach(
    (index: { artist: Artist[] }) => {
      index.artist.forEach((artist) => artists.push(artist));
    }
  );

  return artists;
}

export async function getArtist(
  id: string,
  { server, username, password }: Credentials
): Promise<[Artist, Albums]> {
  const authParams = generateAuthParams({ username, password });
  const result = await fetch(
    `${sanitizeServer(server)}/rest/getArtist.view?id=${id}&${authParams}`
  );

  if (!result.ok) {
    throw new Error("Network Request Failed");
  }

  const json = await result.json();

  const { album: albums, ...artist } = json["subsonic-response"].artist;

  return [artist, albums];
}
