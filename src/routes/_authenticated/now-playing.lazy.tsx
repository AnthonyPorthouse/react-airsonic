import { createLazyFileRoute } from "@tanstack/react-router";

import TrackList from "../../Components/TrackList.js";
import { useTrackList } from "../../Providers/TrackListProvider.js";

export const Route = createLazyFileRoute("/_authenticated/now-playing")({
  component: NowPlaying,
});

function NowPlaying() {
  const { trackList } = useTrackList();

  return <TrackList tracks={trackList} />;
}
