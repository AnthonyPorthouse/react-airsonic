import md5 from "md5";
import uuid from "uuid";

function generateAuthParams(username, password) {
    const salt = uuid.v4();
    const token = md5(`${password}${salt}`);

    return `u=${username}&t=${token}&s=${salt}&v=1.15.0&c=react-airsonic&f=json`
}

export async function ping(serverUrl, username, password) {
    const authParams = generateAuthParams(username, password);
    return fetch(`${serverUrl}/rest/ping?${authParams}`);
}

export async function getArtists(serverUrl, username, password) {
    const authParams = generateAuthParams(username, password);
    const result = await fetch(`${serverUrl}/rest/getArtists?${authParams}`);
    const json = await result.json();

    const artists = [];

    json['subsonic-response'].artists.index.forEach((index) => {
        index.artist.forEach((artist) => artists.push(artist));
    });

    return artists;
}

export function getCoverArtUrl(id, serverUrl, username, password) {
    const authParams = generateAuthParams(username, password);
    return `${serverUrl}/rest/getCoverArt?id=${id}&${authParams}`
}

const API = {
    ping,
    getArtists,
    getCoverArtUrl,
}

export default API
