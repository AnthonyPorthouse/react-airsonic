import { Credentials, generateAuthParams, sanitizeServer } from "./auth";
import { SongIds, Songs } from "./songs";

export type Album = {
  id: string;
  name: string;
  artist: string;
  artistId: string;
  coverArt?: string;
  songCount: number;
  duration: number;
  created: string;
  year: number;
  genre: string;
  tracks: SongIds;
};
export type Albums = Album[];
export type AlbumIds = string[];

export async function getAlbums({
  server,
  username,
  password,
}: Credentials): Promise<Albums> {
  const authParams = generateAuthParams({ username, password });
  const result = await fetch(
    `${sanitizeServer(
      server
    )}/rest/getAlbumList2.view?type=alphabeticalByArtist&size=500&${authParams}`
  );

  if (!result.ok) {
    throw new Error("Network Request Failed");
  }

  const json = await result.json();

  return json["subsonic-response"].albumList2.album;
}

export async function getAlbum(
  id: string,
  { server, username, password }: Credentials
): Promise<[Album, Songs]> {
  const authParams = generateAuthParams({ username, password });
  const result = await fetch(
    `${sanitizeServer(server)}/rest/getAlbum.view?id=${id}&${authParams}`
  );

  if (!result.ok) {
    throw new Error("Network Request Failed");
  }

  const json = await result.json();

  const { song: songs, ...album } = json["subsonic-response"].album;

  return [album, songs];
}
