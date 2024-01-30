import { createLazyFileRoute } from "@tanstack/react-router";

import Spinner from "../../Components/Spinner.js";
import TrackList from "../../Components/TrackList.js";
import { useTrackList } from "../../Providers/TrackListProvider.js";

export const Route = createLazyFileRoute("/_authenticated/now-playing")({
  component: NowPlaying,
  pendingComponent: Spinner,
});

function NowPlaying() {
  const { trackList } = useTrackList();

  return <TrackList tracks={trackList} />;
}
