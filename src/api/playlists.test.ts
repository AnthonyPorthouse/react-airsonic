import axios from "axios";
import { describe } from "vitest";

import { getPlaylist, getPlaylists } from "./playlists";
import { Playlist, Song } from "./types";

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

  beforeEach(() => {
    vi.mock("axios");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns playlists on success", async () => {
    axiosGetMock.mockResolvedValueOnce({
      data: {
        "subsonic-response": {
          playlists: {
            playlist: [testPlaylist],
          },
        },
      },
    });

    const res = await getPlaylists({
      server: "https://example.com",
      username: "test",
      password: "test",
    });

    expect(res).toEqual([testPlaylist]);
  });
});

describe(getPlaylist, async () => {
  const axiosGetMock = vi.mocked(axios.get);

  beforeEach(() => {
    vi.mock("axios");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a playlist and its entries on success", async () => {
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

    const res = await getPlaylist("pl-1", {
      server: "https://example.com",
      username: "test",
      password: "test",
    });

    expect(res).toEqual([testPlaylist, [testSong]]);
  });

  it("returns a playlist and an empty list of songs for a playlist with no entries on success", async () => {
    axiosGetMock.mockResolvedValueOnce({
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
      password: "test",
    });

    expect(res).toEqual([testPlaylist, []]);
  });
});
