import { Song } from "@/api/types";
import { useTrackList } from "@hooks/useTrackList";
import { act, renderHook } from "@testing-library/react";

import { TrackListProvider } from "./TrackListProvider";

const testSong: Song = {
  id: "s-1",
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

const testSong2: Song = {
  id: "s-2",
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

describe(TrackListProvider, async () => {
  describe("with a provider", async () => {
    it("returns an empty tracklist by default", async () => {
      const { result } = renderHook(() => useTrackList(), {
        wrapper: TrackListProvider,
      });
      expect(result.current.trackList).toEqual([]);
    });

    it("returns an tracks added to the tracklist", async () => {
      const { result } = renderHook(() => useTrackList(), {
        wrapper: TrackListProvider,
      });

      await act(async () => result.current.addTrack(testSong));

      expect(result.current.trackList).toEqual([testSong]);
    });

    it("returns an tracks when the tracklist is replaced", async () => {
      const { result } = renderHook(() => useTrackList(), {
        wrapper: TrackListProvider,
      });

      await act(async () => result.current.setTrackList([testSong]));

      expect(result.current.trackList).toEqual([testSong]);
    });

    it("returns null if there are no tracks", async () => {
      const { result } = renderHook(() => useTrackList(), {
        wrapper: TrackListProvider,
      });

      expect(result.current.getCurrentTrack()).toBeNull();
    });

    it("returns the current track", async () => {
      const { result } = renderHook(() => useTrackList(), {
        wrapper: TrackListProvider,
      });

      await act(async () => result.current.setTrackList([testSong]));

      expect(result.current.getCurrentTrack()).toEqual(testSong);
    });

    it("returns null if there is no next track", async () => {
      const { result } = renderHook(() => useTrackList(), {
        wrapper: TrackListProvider,
      });

      expect(result.current.getNextTrack()).toBeNull();
    });

    it("returns null if there is no next track after the current track", async () => {
      const { result } = renderHook(() => useTrackList(), {
        wrapper: TrackListProvider,
      });
      await act(async () => result.current.setTrackList([testSong]));
      expect(result.current.getNextTrack()).toBeNull();
    });

    it("returns the next track", async () => {
      const { result } = renderHook(() => useTrackList(), {
        wrapper: TrackListProvider,
      });

      await act(async () => result.current.setTrackList([testSong, testSong2]));

      expect(result.current.getNextTrack()).toEqual(testSong2);
    });

    it("moves to the next track", async () => {
      const { result } = renderHook(() => useTrackList(), {
        wrapper: TrackListProvider,
      });

      await act(async () => result.current.setTrackList([testSong, testSong2]));
      await act(async () => result.current.nextTrack());

      expect(result.current.getCurrentTrack()).toEqual(testSong2);
    });
  });

  describe("without a provider", async () => {
    it("should safely return no songs", async () => {
      const { result } = renderHook(() => useTrackList());
      expect(result.current.trackList).toEqual([]);
    });

    it("should not store any added songs", async () => {
      const { result } = renderHook(() => useTrackList());
      await act(async () => result.current.addTrack(testSong));
      expect(result.current.trackList).toEqual([]);
    });

    it("should not set the tracklist to anyting", async () => {
      const { result } = renderHook(() => useTrackList());
      await act(async () => result.current.setTrackList([testSong, testSong2]));
      expect(result.current.trackList).toEqual([]);
    });

    it("should return null for the current track", async () => {
      const { result } = renderHook(() => useTrackList());
      expect(result.current.getCurrentTrack()).toBeNull();
    });

    it("should return null for the next track", async () => {
      const { result } = renderHook(() => useTrackList());
      expect(result.current.getNextTrack()).toBeNull();
    });

    it("should do nothing when moving to the next track", async () => {
      const { result } = renderHook(() => useTrackList());
      await act(async () => result.current.nextTrack());
      expect(result.current.trackList).toEqual([]);
    });
  });
});
