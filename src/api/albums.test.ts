import axios from "axios";
import { afterEach, describe } from "vitest";

import { getAlbum, getAlbums } from "./albums";
import { generateAuthParamsObject, sanitizeServer } from "./auth";
import { Album, Song } from "./types";

const mockedAuthResponse: ReturnType<typeof generateAuthParamsObject> = {
  u: "user",
  t: "token",
  s: "salt",
  v: "version",
  c: "test",
  f: "json",
};

const testAlbum: Album = {
  id: "al-1",
  name: "test album",
  artistId: "ar-1",
  artist: "test artist",
  songCount: 0,
  tracks: [],
  duration: 0,
  genre: "testing",
  year: 2024,
  created: "2024-07-30T12:00:00Z",
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

describe(getAlbums, async () => {
  const axiosGetMock = vi.mocked(axios.get);
  const generateAuthParamsObjectMock = vi.mocked(generateAuthParamsObject);
  const sanitizeServerMock = vi.mocked(sanitizeServer);

  beforeEach(() => {
    vi.mock("axios");
    vi.mock("./auth.js");

    generateAuthParamsObjectMock.mockReturnValue(mockedAuthResponse);
    sanitizeServerMock.mockReturnValue("https://example.com");
    axiosGetMock.mockResolvedValueOnce({
      data: {
        "subsonic-response": {
          albumList2: {
            album: [testAlbum],
          },
        },
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("generates auth params for the passed credentials", async () => {
    await getAlbums({
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
    await getAlbums({
      server: "https://example.com",
      username: "test",
      password: "password",
    });

    expect(axiosGetMock).toHaveBeenCalledExactlyOnceWith(
      "https://example.com/rest/getAlbumList2.view",
      {
        params: {
          type: "alphabeticalByArtist",
          size: 500,
          ...mockedAuthResponse,
        },
      },
    );
  });

  it("returns albums on success", async () => {
    const res = await getAlbums({
      server: "https://example.com",
      username: "test",
      password: "password",
    });

    expect(res).toEqual([testAlbum]);
  });
});

describe(getAlbum, async () => {
  const axiosGetMock = vi.mocked(axios.get);
  const generateAuthParamsObjectMock = vi.mocked(generateAuthParamsObject);
  const sanitizeServerMock = vi.mocked(sanitizeServer);

  beforeEach(() => {
    vi.mock("axios");
    vi.mock("./auth.js");

    generateAuthParamsObjectMock.mockReturnValue(mockedAuthResponse);
    sanitizeServerMock.mockReturnValue("https://example.com");
    axiosGetMock.mockResolvedValueOnce({
      data: {
        "subsonic-response": {
          album: {
            ...testAlbum,
            song: [testSong],
          },
        },
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("generates auth params for the passed credentials", async () => {
    await getAlbum("al-1", {
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
    await getAlbum("al-1", {
      server: "https://example.com",
      username: "test",
      password: "password",
    });

    expect(axiosGetMock).toHaveBeenCalledExactlyOnceWith(
      "https://example.com/rest/getAlbum.view",
      {
        params: {
          id: "al-1",
          ...mockedAuthResponse,
        },
      },
    );
  });

  it("returns an album on success", async () => {
    const res = await getAlbum("al-1", {
      server: "https://example.com",
      username: "test",
      password: "password",
    });

    expect(res).toEqual([testAlbum, [testSong]]);
  });
});
