import md5 from "md5";
import uuid from "uuid";

function generateAuthParams(username, password) {
  const salt = uuid.v4();
  const token = md5(`${password}${salt}`);

  return `u=${username}&t=${token}&s=${salt}&v=1.15.0&c=react-airsonic&f=json`;
}

export async function ping(serverUrl, username, password) {
  const authParams = generateAuthParams(username, password);
  return fetch(`${serverUrl}/rest/ping?${authParams}`);
}

export async function getAllAlbums(serverUrl, username, password) {
  const authParams = generateAuthParams(username, password);
  const result = await fetch(
    `${serverUrl}/rest/getAlbumList2?type=alphabeticalByArtist&size=500&${authParams}`
  );
  const json = await result.json();

  return json["subsonic-response"].albumList2.album;
}

export async function getArtists(serverUrl, username, password) {
  const authParams = generateAuthParams(username, password);
  const result = await fetch(`${serverUrl}/rest/getArtists?${authParams}`);
  const json = await result.json();

  const artists = [];

  json["subsonic-response"].artists.index.forEach((index) => {
    index.artist.forEach((artist) => artists.push(artist));
  });

  return artists;
}

export async function getArtist(id, serverUrl, username, password) {
  const authParams = generateAuthParams(username, password);
  const result = await fetch(
    `${serverUrl}/rest/getArtist?id=${id}&${authParams}`
  );
  const json = await result.json();

  const artist = {
    id: json["subsonic-response"].artist.id,
    name: json["subsonic-response"].artist.name,
    coverArt: json["subsonic-response"].artist.coverArt,
    albumCount: json["subsonic-response"].artist.albumCount,
  };

  const albums = json["subsonic-response"].artist.album;

  return [artist, albums];
}

export async function getAlbum(id, serverUrl, username, password) {
  const authParams = generateAuthParams(username, password);
  const result = await fetch(
    `${serverUrl}/rest/getAlbum?id=${id}&${authParams}`
  );
  const json = await result.json();

  const album = {
    id: json["subsonic-response"].album.id,
    name: json["subsonic-response"].album.name,
    coverArt: json["subsonic-response"].album.coverArt,
    songCount: json["subsonic-response"].album.songCount,
    artist: json["subsonic-response"].album.artist,
    artistId: json["subsonic-response"].album.artistId,
  };

  const tracks = json["subsonic-response"].album.song;

  return [album, tracks];
}

export function getCoverArtUrl(id, serverUrl, username, password) {
  const authParams = generateAuthParams(username, password);
  return `${serverUrl}/rest/getCoverArt?id=${id}&${authParams}`;
}

const API = {
  ping,
  getAllAlbums,
  getAlbum,
  getArtists,
  getArtist,
  getCoverArtUrl,
};

export default API;
