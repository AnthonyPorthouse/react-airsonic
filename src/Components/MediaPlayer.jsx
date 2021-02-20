import { useDispatch, useSelector } from "react-redux";
import { getNextTrack, selectCurrentTrack } from "../features/playlistSlice";
import { selectAuth } from "../features/authSlice";
import { getStreamUrl } from "../features/api";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import Duration from "./Duration";
import MediaControls from "./MediaControls";
import TrackInfo from "./TrackInfo";
import AudioContext from "./AudioContext";

function MediaPlayer() {
  const auth = useSelector(selectAuth);

  const audio = useRef(new Audio());
  const currentTrack = useSelector(selectCurrentTrack);
  const currentTrackUrl = getStreamUrl({ id: currentTrack, ...auth });

  const dispatch = useDispatch();

  const [duration, setCurrentDuration] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio.current.addEventListener("loadeddata", (e) => {
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
    <AudioContext.Provider value={audio.current}>
      <div
        className={`w-full px-6 py-3 gap-x-6 bg-white shadow flex flex-col gap-y-3`}
      >
        <div className={`flex justify-items-stretch`}>
          <div className={`w-1/6`}>
            <MediaControls />
          </div>
          <div className={`w-2/3 mx-auto`}>
            <TrackInfo track={currentTrack} />
          </div>
          <div className={`w-1/6 flex gap-x-1 justify-end`}>
            <Duration time={currentTime} />
            <span>/</span>
            <Duration time={duration} />
          </div>
        </div>
        <div className={`w-full`}>
          <ProgressBar length={duration} position={currentTime} />
        </div>
      </div>
    </AudioContext.Provider>
  );
}

export default MediaPlayer;
