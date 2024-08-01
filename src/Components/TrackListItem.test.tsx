import { useAlbumTracks } from "@/Providers/AlbumProvider";
import type { Song } from "@api/types.js";
import { useTrackList } from "@providers/TrackListProvider.js";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TrackListItem from "./TrackListItem";

const trackData: Song = {
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

describe(TrackListItem, async () => {
  vi.mock("@providers/TrackListProvider");
  vi.mock("@providers/AlbumProvider");

  const addTrackMock = vi.fn();
  const setTrackListMock = vi.fn();

  vi.mock("react-i18next", () => ({
    useTranslation: () => {
      return {
        t: (str: string) => str,
        i18n: {
          changeLanguage: async () => () => {},
        },
      };
    },
    initReactI18next: {
      type: "3rdParty",
      init: () => {},
    },
  }));

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useAlbumTracks).mockReturnValue([trackData]);
    vi.mocked(useTrackList).mockReturnValue({
      getCurrentTrack: vi.fn().mockReturnValue(null),
      getNextTrack: vi.fn(),
      addTrack: addTrackMock,
      setTrackList: setTrackListMock,
      nextTrack: vi.fn(),
      trackList: [],
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("Should display a songs info", async () => {
    render(<TrackListItem track={trackData} />);

    expect(screen.getAllByText("Test Track")).toHaveLength(2);
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.getByText("01:00")).toBeInTheDocument();
  });

  it("Should have a play button", async () => {
    render(<TrackListItem track={trackData} />);

    expect(
      screen.getByRole("button", { name: "playTrack" }),
    ).toBeInTheDocument();
  });

  it("Should not have an add button by default", async () => {
    render(<TrackListItem track={trackData} />);

    expect(
      screen.queryByRole("button", { name: "addTrack" }),
    ).not.toBeInTheDocument();
  });

  it("Should have an add button if requested", async () => {
    render(<TrackListItem track={trackData} includeAdd />);

    expect(
      screen.getByRole("button", { name: "addTrack" }),
    ).toBeInTheDocument();
  });

  it("Should both track and disk if both are specified", async () => {
    render(<TrackListItem track={trackData} />);

    expect(screen.getByText("1 / 1")).toBeInTheDocument();
  });

  it("Should only track number if disk is not specified", async () => {
    render(<TrackListItem track={{ ...trackData, discNumber: undefined }} />);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("Should show the now-playing button if the track is the current track", async () => {
    vi.mocked(useTrackList).mockReturnValue({
      getCurrentTrack: vi.fn().mockReturnValue(trackData),
      getNextTrack: vi.fn(),
      addTrack: vi.fn(),
      setTrackList: vi.fn(),
      nextTrack: vi.fn(),
      trackList: [],
    });

    render(<TrackListItem track={trackData} />);

    expect(vi.mocked(useTrackList)).toHaveBeenCalled();

    expect(
      screen.getByRole("generic", { name: "currentlyPlaying" }),
    ).toBeInTheDocument();
  });

  it("should update the tracklist when the play button is clicked", async () => {
    render(<TrackListItem track={trackData} />);

    const playButton = await screen.findByRole("button", { name: "playTrack" });

    await userEvent.click(playButton);

    expect(setTrackListMock).toHaveBeenCalledWith([trackData]);
  });

  it("should push a track to the tracklist when the add button is clicked", async () => {
    render(<TrackListItem includeAdd track={trackData} />);

    const addButton = await screen.findByRole("button", { name: "addTrack" });

    await userEvent.click(addButton);

    expect(addTrackMock).toHaveBeenCalledOnce();
  });
});
