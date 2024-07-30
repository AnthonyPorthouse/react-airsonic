import axios from "axios";
import { afterEach, beforeEach, describe } from "vitest";

import { getArtist, getArtists } from "./artists";
import { Album, Artist } from "./types";

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

  beforeEach(() => {
    vi.mock("axios");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns artists on success", async () => {
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

    const res = await getArtists({
      server: "https://example.com",
      username: "test",
      password: "test",
    });

    expect(res).toEqual([testArtist]);
  });
});

describe(getArtist, async () => {
  const axiosGetMock = vi.mocked(axios.get);

  beforeEach(() => {
    vi.mock("axios");
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
      password: "test",
    });

    expect(res).toEqual([testArtist, [testAlbum]]);
  });
});
