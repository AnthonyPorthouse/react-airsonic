export interface Auth {
  server: string;
  username: string;
  token: string;
  salt: string;
}

interface AuthParams {
  username: string;
  token: string;
  salt: string;
}

export type Album = {
  id: string;
  name: string;
  artist: string;
  artistId: string;
  coverArt: string;
  songCount: number;
  duration: number;
  created: string;
  year: number;
  genre: string;
  tracks: SongIds;
};
export type Albums = Album[];
export type AlbumIds = string[];

export type Song = {
  id: string;
  parent: string;
  title: string;
  album: string;
  artist: string;
  track: number;
  discNumber?: number;
  coverArt: string;
  albumId: string;
  artistId: string;
  duration: number;
};
export type Songs = Song[];
export type SongIds = string[];

export type Artist = {
  id: string;
  name: string;
  coverArt: string;
  albumCount: string;
  albums: AlbumIds;
};
export type Artists = Artist[];
export type ArtistIds = string[];

export type Playlist = {
  id: string;
  name: string;
  comment: string;
  songCount: number;
  coverArt: string;
  tracks: SongIds;
};
export type Playlists = Playlist[];
export type PlaylistIds = string[];

function generateAuthParams({ username, token, salt }: AuthParams) {
  return `u=${username}&t=${token}&s=${salt}&v=1.15.0&c=react-airsonic&f=json`;
}

export async function ping({ server, username, token, salt }: Auth) {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(`${server}/rest/ping?${authParams}`);
  const json = await result.json();

  return json["subsonic-response"].status === "ok";
}

export async function getAllAlbums({
  server,
  username,
  token,
  salt,
}: Auth): Promise<Albums> {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(
    `${server}/rest/getAlbumList2?type=alphabeticalByArtist&size=500&${authParams}`
  );
  const json = await result.json();

  return json["subsonic-response"].albumList2.album;
}

export async function getArtists({
  server,
  username,
  token,
  salt,
}: Auth): Promise<Artists> {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(`${server}/rest/getArtists?${authParams}`);
  const json = await result.json();

  const artists: Artist[] = [];

  json["subsonic-response"].artists.index.forEach(
    (index: { artist: Artist[] }) => {
      index.artist.forEach((artist) => artists.push(artist));
    }
  );

  return artists;
}

export interface ArtistRequest extends Auth {
  id: string;
}

export async function getArtist({
  id,
  server,
  username,
  token,
  salt,
}: ArtistRequest): Promise<[Artist, Albums]> {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(`${server}/rest/getArtist?id=${id}&${authParams}`);
  const json = await result.json();

  const { album: albums, ...artist } = json["subsonic-response"].artist;

  return [artist, albums];
}

export interface AlbumRequest extends Auth {
  id: string;
}

export async function getAlbum({
  id,
  server,
  username,
  token,
  salt,
}: AlbumRequest): Promise<[Album, Songs]> {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(`${server}/rest/getAlbum?id=${id}&${authParams}`);
  const json = await result.json();

  const { song: songs, ...album } = json["subsonic-response"].album;

  return [album, songs];
}

export async function getPlaylists({
  server,
  username,
  token,
  salt,
}: Auth): Promise<Playlists> {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(`${server}/rest/getPlaylists?${authParams}`);
  const json = await result.json();

  return json["subsonic-response"].playlists.playlist;
}

export interface PlaylistRequest extends Auth {
  id: string;
}

export async function getPlaylist({
  id,
  server,
  username,
  token,
  salt,
}: PlaylistRequest): Promise<[Playlist, Songs]> {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(
    `${server}/rest/getPlaylist?id=${id}&${authParams}`
  );
  const json = await result.json();

  const { entry: songs, ...playlist } = json["subsonic-response"].playlist;

  return [playlist, songs];
}

export interface SearchRequest extends Auth {
  query: string;
}

export async function getSearchResults({
  query,
  server,
  username,
  token,
  salt,
}: SearchRequest): Promise<[Artists, Albums, Songs]> {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(
    `${server}/rest/search3?query=${query}&artistCount=4&albumCount=4&songCount=100&${authParams}`
  );
  const json = await result.json();

  const {
    song: songs,
    album: albums,
    artist: artists,
  } = json["subsonic-response"].searchResult3;

  return [artists || [], albums || [], songs || []];
}

interface CoverArtRequest extends Auth {
  id: string;
}

export function getCoverArtUrl({
  id,
  server,
  username,
  token,
  salt,
}: CoverArtRequest) {
  const authParams = generateAuthParams({ username, token, salt });
  return `${server}/rest/getCoverArt?id=${id}&${authParams}`;
}

interface ScaledCoverArtRequest extends Auth {
  id: string;
  size: string;
}

export function getScaledCoverArtUrl({
  id,
  size,
  server,
  username,
  token,
  salt,
}: ScaledCoverArtRequest) {
  const authParams = generateAuthParams({ username, token, salt });
  return `${server}/rest/getCoverArt?id=${id}&size=${size}&${authParams}`;
}

interface StreamRequest extends Auth {
  id: string;
}

export function getStreamUrl({
  id,
  server,
  username,
  token,
  salt,
}: StreamRequest) {
  const authParams = generateAuthParams({ username, token, salt });
  return `${server}/rest/stream?id=${id}&${authParams}`;
}

const API = {
  ping,
  getAllAlbums,
  getAlbum,
  getArtists,
  getArtist,
  getSearchResults,
  getCoverArtUrl,
  getScaledCoverArtUrl,
  getStreamUrl,
};

export default API;
