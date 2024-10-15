import { Song } from "@/api/types";
import { useAlbumTracks } from "@hooks/useAlbumTracks";
import { renderHook } from "@testing-library/react";

import { AlbumProvider } from "./AlbumProvider";

const testSong: Song = {
  id: "abc",
  title: "Test Track",
  track: 1,
  discNumber: 1,
  album: "Test Album",
  albumId: "123",
  artist: "Test Artist",
  artistId: "xyz",
  coverArt: "123456",
  duration: 60,
  isPodcast: false,
  parent: "",
};

describe(AlbumProvider, async () => {
  it("should return an empty array on no tracks", async () => {
    const { result } = renderHook(() => useAlbumTracks());
    expect(result.current).toEqual([]);
  });

  it("should return the tracks if there are any", async () => {
    const { result } = renderHook(() => useAlbumTracks(), {
      wrapper: ({ children }) => (
        <AlbumProvider tracks={[testSong]}>{children}</AlbumProvider>
      ),
    });
    expect(result.current).toEqual([testSong]);
  });
});
