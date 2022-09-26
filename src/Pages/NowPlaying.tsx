import TrackList from "../Components/TrackList";
import { useTrackList } from "../hooks";

function NowPlaying() {
  const { trackList } = useTrackList();

  return <TrackList tracks={trackList} />;
}
export default NowPlaying;
