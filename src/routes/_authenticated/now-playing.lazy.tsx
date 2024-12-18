import Spinner from "@components/Spinner.js";
import TrackList from "@components/TrackList.js";
import { useTrackList } from "@hooks/useTrackList";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/now-playing")({
  component: NowPlaying,
  pendingComponent: Spinner,
});

function NowPlaying() {
  const { trackList } = useTrackList();

  if (trackList.length === 0) {
    return (
      <div className="flex justify-center">
        <span className="text-gray-500">Nothing Currently Playing</span>
      </div>
    );
  }

  return <TrackList tracks={trackList} />;
}
