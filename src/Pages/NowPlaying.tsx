import TrackList from "../Components/TrackList.js";
import { useTrackList } from "../Providers/TrackListProvider.js";

function NowPlaying() {
  const { trackList } = useTrackList();

  return <TrackList tracks={trackList} />;
}
export default NowPlaying;
