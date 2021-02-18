import { useSelector } from "react-redux";
import { selectCurrentTrack } from "../features/playlistSlice";
import { selectAuth } from "../features/authSlice";
import { getStreamUrl } from "../features/api";
import { useEffect, useMemo, useRef } from "react";

function MediaPlayer() {
  const auth = useSelector(selectAuth);

  const audio = useRef();
  const currentTrack = useSelector(selectCurrentTrack);
  const currentTrackUrl = useMemo(
    () => getStreamUrl({ id: currentTrack, ...auth }),
    [currentTrack, auth]
  );

  useEffect(() => {
    if (!currentTrack) {
      return;
    }

    if (audio.current) {
      audio.current.pause();
    }
    audio.current = new Audio(currentTrackUrl);
    audio.current.play();
  }, [audio, auth, currentTrack, currentTrackUrl]);

  return <div />;
}

export default MediaPlayer;
