import axios from "axios";
import { afterEach, describe } from "vitest";

import { getAlbum, getAlbums } from "./albums";
import { Album, Song } from "./types";

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
  beforeEach(() => {
    vi.mock("axios");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns albums on success", async () => {
    const axiosGetMock = vi.mocked(axios.get);

    axiosGetMock.mockResolvedValueOnce({
      data: {
        "subsonic-response": {
          albumList2: {
            album: [testAlbum],
          },
        },
      },
    });

    const res = await getAlbums({
      server: "https://example.com",
      username: "test",
      password: "test",
    });

    expect(axiosGetMock).toHaveBeenCalledOnce();
    expect(res).toEqual([testAlbum]);
  });
});

describe(getAlbum, async () => {
  beforeEach(() => {
    vi.mock("axios");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns an album on success", async () => {
    const axiosGetMock = vi.mocked(axios.get);

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

    const res = await getAlbum("al-1", {
      server: "https://example.com",
      username: "test",
      password: "test",
    });

    expect(axiosGetMock).toHaveBeenCalledOnce();
    expect(res).toEqual([testAlbum, [testSong]]);
  });
});
