import axios from "axios";
import { beforeEach, describe, it } from "vitest";

import { SearchResultsResponse, getSearchResults } from "./search";
import { Album, Artist, Song } from "./types";

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

const testArtist: Artist = {
  id: "ar-1",
  name: "test artist",
  albumCount: "1",
  albums: ["al-1"],
  coverArt: "",
};

describe(getSearchResults, async () => {
  const axiosGetMock = vi.mocked(axios.get);

  beforeEach(() => {
    vi.mock("axios");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns results on success", async () => {
    axiosGetMock.mockResolvedValueOnce({
      data: {
        "subsonic-response": {
          searchResult3: {
            album: [testAlbum],
            artist: [testArtist],
            song: [testSong],
          },
        },
      } as SearchResultsResponse,
    });

    const res = await getSearchResults("test", {
      server: "https://example.com",
      username: "",
      password: "",
    });

    expect(axiosGetMock).toHaveBeenCalledOnce();
    expect(res).toEqual([[testArtist], [testAlbum], [testSong]]);
  });

  it("returns no results on success", async () => {
    axiosGetMock.mockResolvedValueOnce({
      data: {
        "subsonic-response": {
          searchResult3: {},
        },
      } as SearchResultsResponse,
    });

    const res = await getSearchResults("test", {
      server: "https://example.com",
      username: "",
      password: "",
    });

    expect(axiosGetMock).toHaveBeenCalledOnce();
    expect(res).toEqual([[], [], []]);
  });
});
