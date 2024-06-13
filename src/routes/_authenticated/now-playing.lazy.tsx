import Spinner from "@components/Spinner.js";
import TrackList from "@components/TrackList.js";
import { useTrackList } from "@providers/TrackListProvider.js";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/now-playing")({
  component: NowPlaying,
  pendingComponent: Spinner,
});

function NowPlaying() {
  const { trackList } = useTrackList();

  return <TrackList tracks={trackList} />;
}
