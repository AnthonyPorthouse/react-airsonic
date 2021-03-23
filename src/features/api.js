function generateAuthParams({ username, token, salt }) {
  return `u=${username}&t=${token}&s=${salt}&v=1.15.0&c=react-airsonic&f=json`;
}

export async function ping({ server, username, token, salt }) {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(`${server}/rest/ping?${authParams}`);
  const json = await result.json();

  return json["subsonic-response"].status === "ok";
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

  const { album: albums, ...artist } = json["subsonic-response"].artist;

  return [artist, albums];
}

export async function getAlbum({ id, server, username, token, salt }) {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(`${server}/rest/getAlbum?id=${id}&${authParams}`);
  const json = await result.json();

  const { song: songs, ...album } = json["subsonic-response"].album;

  return [album, songs];
}

export async function getPlaylists({ server, username, token, salt }) {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(`${server}/rest/getPlaylists?${authParams}`);
  const json = await result.json();

  return json["subsonic-response"].playlists.playlist;
}

export async function getPlaylist({ id, server, username, token, salt }) {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(
    `${server}/rest/getPlaylist?id=${id}&${authParams}`
  );
  const json = await result.json();

  const { entry: songs, ...playlist } = json["subsonic-response"].playlist;

  return [playlist, songs];
}

export async function getSearchResults({
  query,
  server,
  username,
  token,
  salt,
}) {
  const authParams = generateAuthParams({ username, token, salt });
  const result = await fetch(
    `${server}/rest/search3?query=${query}&artistCount=4&albumCount=4&songCount=100&${authParams}`
  );
  const json = await result.json();

  const { song: songs, album: albums, artist: artists } = json[
    "subsonic-response"
  ].searchResult3;

  return [artists || [], albums || [], songs || []];
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
  getSearchResults,
  getCoverArtUrl,
  getStreamUrl,
};

export default API;
