import { useDispatch, useSelector } from "react-redux";
import { getNextTrack, selectCurrentTrack } from "../features/playlistSlice";
import { selectAuth } from "../features/authSlice";
import { getStreamUrl } from "../features/api";
import { useEffect, useMemo, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import Duration from "./Duration";
import MediaControls from "./MediaControls";

function MediaPlayer() {
  const auth = useSelector(selectAuth);

  const audio = useRef(new Audio());
  const currentTrack = useSelector(selectCurrentTrack);
  const currentTrackUrl = getStreamUrl({ id: currentTrack, ...auth });

  const dispatch = useDispatch();

  const [duration, setCurrentDuration] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio.current.addEventListener("canplay", (e) => {
      audio.current.play().catch(() => {});
    });

    audio.current.addEventListener("ended", (e) => {
      dispatch(getNextTrack());
      setCurrentDuration(0);
      setCurrentTime(0);
    });

    audio.current.addEventListener("timeupdate", (e) => {
      setCurrentTime(audio.current.currentTime || 0);
      setCurrentDuration(audio.current.duration || 0);
    });
  }, [dispatch, setCurrentTime]);

  useEffect(() => {
    if (!currentTrack) {
      return;
    }

    if (!currentTrackUrl) {
      return;
    }

    if (audio.current.src !== currentTrackUrl) {
      audio.current.pause();
      audio.current.src = currentTrackUrl;
    }
  }, [audio, auth, currentTrack, currentTrackUrl]);

  if (!currentTrack) {
    return <div />;
  }

  return (
    <div
      className={`w-full px-6 py-3 gap-x-6 bg-white shadow flex justify-items-stretch`}
    >
      <div className={`w-1/6`}>
        <MediaControls />
      </div>
      <div className={`w-2/3 mx-auto`}>
        <ProgressBar length={duration} position={currentTime} />
      </div>
      <div className={`w-1/6 flex gap-x-1 justify-center`}>
        <span className={`w-16 text-right`}>
          <Duration time={currentTime} />
        </span>
        <span>/</span>
        <span className={`w-16 flex-grow text-left`}>
          <Duration time={duration} />
        </span>
      </div>
    </div>
  );
}

export default MediaPlayer;
