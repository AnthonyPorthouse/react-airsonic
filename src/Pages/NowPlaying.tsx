import TrackList from "../Components/TrackList.js";
import { useTrackList } from "../hooks.js";

function NowPlaying() {
  const { trackList } = useTrackList();

  return <TrackList tracks={trackList} />;
}
export default NowPlaying;
