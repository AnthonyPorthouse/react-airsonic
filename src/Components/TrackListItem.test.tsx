import { cleanup, render, screen } from "@testing-library/react";

import TrackListItem from "./TrackListItem";

describe("TrackListItem", async () => {
  afterEach(() => {
    cleanup();
  });

  it("Should display a songs info", async () => {
    render(
      <TrackListItem
        track={{
          id: "abc",
          title: "Test Track",
          track: 1,
          album: "Test Album",
          albumId: "123",
          artist: "Test Artist",
          artistId: "xyz",
          coverArt: "123456",
          duration: 60,
          isPodcast: false,
          parent: "",
        }}
      />,
    );

    expect(screen.getAllByText("Test Track")).toHaveLength(2);
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.getByText("01:00")).toBeInTheDocument();
  });

  it("Should have a play button", async () => {
    render(
      <TrackListItem
        track={{
          id: "abc",
          title: "Test Track",
          track: 1,
          album: "Test Album",
          albumId: "123",
          artist: "Test Artist",
          artistId: "xyz",
          coverArt: "123456",
          duration: 60,
          isPodcast: false,
          parent: "",
        }}
      />,
    );

    expect(screen.getByRole("button", { name: "playTrack" })).toBeInTheDocument;
  });

  it("Should not have an add button by default", async () => {
    render(
      <TrackListItem
        track={{
          id: "abc",
          title: "Test Track",
          track: 1,
          album: "Test Album",
          albumId: "123",
          artist: "Test Artist",
          artistId: "xyz",
          coverArt: "123456",
          duration: 60,
          isPodcast: false,
          parent: "",
        }}
      />,
    );

    expect(screen.queryByRole("button", { name: "addTrack" })).not
      .toBeInTheDocument;
  });

  it("Should have an add button if requested", async () => {
    render(
      <TrackListItem
        track={{
          id: "abc",
          title: "Test Track",
          track: 1,
          album: "Test Album",
          albumId: "123",
          artist: "Test Artist",
          artistId: "xyz",
          coverArt: "123456",
          duration: 60,
          isPodcast: false,
          parent: "",
        }}
        includeAdd
      />,
    );

    expect(screen.getByRole("button", { name: "addTrack" })).toBeInTheDocument;
  });
});
