function generateAuthParams({ username, token, salt }) {
  return `u=${username}&t=${token}&s=${salt}&v=1.15.0&c=react-airsonic&f=json`;
}

export async function ping({ server, username, token, salt }) {
  const authParams = generateAuthParams({ username, token, salt });
  return fetch(`${server}/rest/ping?${authParams}`);
}

export async function getAllAlbums({ server, username, token, salt }) {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(
    `${server}/rest/getAlbumList2?type=alphabeticalByArtist&size=500&${authParams}`
  );
  const json = await result.json();

  return json["subsonic-response"].albumList2.album;
}

export async function getArtists({ server, username, token, salt }) {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(`${server}/rest/getArtists?${authParams}`);
  const json = await result.json();

  const artists = [];

  json["subsonic-response"].artists.index.forEach((index) => {
    index.artist.forEach((artist) => artists.push(artist));
  });

  return artists;
}

export async function getArtist({ id, server, username, token, salt }) {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(`${server}/rest/getArtist?id=${id}&${authParams}`);
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

export async function getAlbum({ id, server, username, token, salt }) {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(`${server}/rest/getAlbum?id=${id}&${authParams}`);
  const json = await result.json();

  const album = {
    id: json["subsonic-response"].album.id,
    name: json["subsonic-response"].album.name,
    year: json["subsonic-response"].album.year,
    coverArt: json["subsonic-response"].album.coverArt,
    songCount: json["subsonic-response"].album.songCount,
    artist: json["subsonic-response"].album.artist,
    artistId: json["subsonic-response"].album.artistId,
  };

  const tracks = json["subsonic-response"].album.song;

  return [album, tracks];
}

export function getCoverArtUrl({ id, server, username, token, salt }) {
  const authParams = generateAuthParams({ username, token, salt });
  return `${server}/rest/getCoverArt?id=${id}&${authParams}`;
}

export function getStreamUrl({ id, server, username, token, salt }) {
  const authParams = generateAuthParams({ username, token, salt });
  return `${server}/rest/stream?id=${id}&${authParams}`;
}

const API = {
  ping,
  getAllAlbums,
  getAlbum,
  getArtists,
  getArtist,
  getCoverArtUrl,
  getStreamUrl,
};

export default API;
