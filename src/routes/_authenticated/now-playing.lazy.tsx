import { createFileRoute } from "@tanstack/react-router";

import TrackList from "../../Components/TrackList.js";
import { useTrackList } from "../../Providers/TrackListProvider.js";

export const Route = createFileRoute("/_authenticated/now-playing")({
  component: NowPlaying,
});

function NowPlaying() {
  const { trackList } = useTrackList();

  return <TrackList tracks={trackList} />;
}
