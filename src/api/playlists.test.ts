import axios from "axios";
import { describe } from "vitest";

import { generateAuthParamsObject, sanitizeServer } from "./auth";
import { getPlaylist, getPlaylists } from "./playlists";
import { Playlist, Song } from "./types";

const mockedAuthResponse: ReturnType<typeof generateAuthParamsObject> = {
  u: "user",
  t: "token",
  s: "salt",
  v: "version",
  c: "test",
  f: "json",
};

const testPlaylist: Playlist = {
  id: "pl-1",
  name: "test playlist",
  comment: "",
  songCount: 1,
  coverArt: "",
  tracks: ["s-1"],
};

const testSong: Song = {
  id: "s-1",
  parent: "al-1",
  title: "test song",
  album: "test album",
  artist: "test artist",
  track: 1,
  coverArt: "",
  albumId: "al-1",
  artistId: "ar-1",
  duration: 0,
  isPodcast: false,
};

describe(getPlaylists, async () => {
  const axiosGetMock = vi.mocked(axios.get);
  const generateAuthParamsObjectMock = vi.mocked(generateAuthParamsObject);
  const sanitizeServerMock = vi.mocked(sanitizeServer);

  beforeEach(() => {
    vi.mock("axios");
    vi.mock("./auth.js");

    sanitizeServerMock.mockReturnValue("https://example.com");
    generateAuthParamsObjectMock.mockReturnValue(mockedAuthResponse);
    axiosGetMock.mockResolvedValueOnce({
      data: {
        "subsonic-response": {
          playlists: {
            playlist: [testPlaylist],
          },
        },
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("generates auth params for the passed credentials", async () => {
    await getPlaylists({
      server: "https://example.com",
      username: "test",
      password: "password",
    });

    expect(generateAuthParamsObjectMock).toHaveBeenCalledExactlyOnceWith({
      username: "test",
      password: "password",
    });
  });

  it("calls the api with the correct parameters", async () => {
    await getPlaylists({
      server: "https://example.com",
      username: "test",
      password: "password",
    });

    expect(axiosGetMock).toHaveBeenCalledExactlyOnceWith(
      "https://example.com/rest/getPlaylists.view",
      {
        params: {
          ...mockedAuthResponse,
        },
      },
    );
  });

  it("returns playlists on success", async () => {
    const res = await getPlaylists({
      server: "https://example.com",
      username: "test",
      password: "password",
    });

    expect(res).toEqual([testPlaylist]);
  });

  it("returns an empty array if no playlists exist", async () => {
    axiosGetMock.mockReset().mockResolvedValueOnce({
      data: {
        "subsonic-response": {},
      },
    });

    const res = await getPlaylists({
      server: "https://example.com",
      username: "test",
      password: "password",
    });

    expect(res).toEqual([]);
  });
});

describe(getPlaylist, async () => {
  const axiosGetMock = vi.mocked(axios.get);
  const generateAuthParamsObjectMock = vi.mocked(generateAuthParamsObject);
  const sanitizeServerMock = vi.mocked(sanitizeServer);

  beforeEach(() => {
    vi.mock("axios");
    vi.mock("./auth.js");

    sanitizeServerMock.mockReturnValue("https://example.com");
    generateAuthParamsObjectMock.mockReturnValue(mockedAuthResponse);
    axiosGetMock.mockResolvedValueOnce({
      data: {
        "subsonic-response": {
          playlist: {
            ...testPlaylist,
            entry: [testSong],
          },
        },
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("generates auth params for the passed credentials", async () => {
    await getPlaylist("pl-1", {
      server: "https://example.com",
      username: "test",
      password: "password",
    });

    expect(generateAuthParamsObjectMock).toHaveBeenCalledExactlyOnceWith({
      username: "test",
      password: "password",
    });
  });

  it("calls the api with the correct parameters", async () => {
    await getPlaylist("pl-1", {
      server: "https://example.com",
      username: "test",
      password: "password",
    });

    expect(axiosGetMock).toHaveBeenCalledExactlyOnceWith(
      "https://example.com/rest/getPlaylist.view",
      {
        params: {
          id: "pl-1",
          ...mockedAuthResponse,
        },
      },
    );
  });

  it("returns a playlist and its entries on success", async () => {
    const res = await getPlaylist("pl-1", {
      server: "https://example.com",
      username: "test",
      password: "password",
    });

    expect(res).toEqual([testPlaylist, [testSong]]);
  });

  it("returns a playlist and an empty list of songs for a playlist with no entries on success", async () => {
    axiosGetMock.mockReset().mockResolvedValueOnce({
      data: {
        "subsonic-response": {
          playlist: {
            ...testPlaylist,
          },
        },
      },
    });

    const res = await getPlaylist("pl-1", {
      server: "https://example.com",
      username: "test",
      password: "password",
    });

    expect(res).toEqual([testPlaylist, []]);
  });
});
