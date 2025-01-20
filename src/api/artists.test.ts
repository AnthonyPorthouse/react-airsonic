import axios from "axios";
import { afterEach, beforeEach, describe } from "vitest";

import { getArtist, getArtists } from "./artists";
import { generateAuthParamsObject, sanitizeServer } from "./auth";
import { Album, Artist } from "./types";

const mockedAuthResponse: ReturnType<typeof generateAuthParamsObject> = {
  u: "user",
  t: "token",
  s: "salt",
  v: "version",
  c: "test",
  f: "json",
};

const testArtist: Artist = {
  id: "ar-1",
  name: "test artist",
  albumCount: "1",
  albums: ["al-1"],
  coverArt: "",
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

describe(getArtists, async () => {
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
          artists: {
            ignoredArticles: "the",
            index: [
              {
                name: "T",
                artist: [testArtist],
              },
            ],
          },
        },
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("generates auth params for the passed credentials", async () => {
    await getArtists({
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
    await getArtists({
      server: "https://example.com",
      username: "test",
      password: "password",
    });

    expect(axiosGetMock).toHaveBeenCalledExactlyOnceWith(
      "https://example.com/rest/getArtists.view",
      {
        params: {
          ...mockedAuthResponse,
        },
      },
    );
  });

  it("returns artists on success", async () => {
    const res = await getArtists({
      server: "https://example.com",
      username: "test",
      password: "password",
    });

    expect(res).toEqual([testArtist]);
  });
});

describe(getArtist, async () => {
  const axiosGetMock = vi.mocked(axios.get);
  const generateAuthParamsObjectMock = vi.mocked(generateAuthParamsObject);
  const sanitizeServerMock = vi.mocked(sanitizeServer);

  beforeEach(() => {
    vi.mock("axios");
    vi.mock("./auth.js");

    generateAuthParamsObjectMock.mockReturnValue(mockedAuthResponse);
    sanitizeServerMock.mockReturnValue("https://example.com");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns artists on success", async () => {
    axiosGetMock.mockResolvedValueOnce({
      data: {
        "subsonic-response": {
          artist: {
            ...testArtist,
            album: [testAlbum],
          },
        },
      },
    });

    const res = await getArtist("ar-1", {
      server: "https://example.com",
      username: "test",
      password: "password",
    });

    expect(sanitizeServerMock).toHaveBeenCalledExactlyOnceWith(
      "https://example.com",
    );
    expect(generateAuthParamsObjectMock).toHaveBeenCalledExactlyOnceWith({
      username: "test",
      password: "password",
    });

    expect(axiosGetMock).toHaveBeenCalledExactlyOnceWith(
      "https://example.com/rest/getArtist.view",
      {
        params: {
          id: "ar-1",
          ...mockedAuthResponse,
        },
      },
    );

    expect(res).toEqual([testArtist, [testAlbum]]);
  });
});
