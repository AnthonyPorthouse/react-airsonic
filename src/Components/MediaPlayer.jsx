import { useDispatch, useSelector } from "react-redux";
import { getNextTrack, selectCurrentTrack } from "../features/playlistSlice";
import { selectAuth } from "../features/authSlice";
import { getStreamUrl } from "../features/api";
import { useEffect, useMemo, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import Duration from "./Duration";
import { ReactComponent as Play } from "../images/play.svg";
import { ReactComponent as Pause } from "../images/pause.svg";
import { ReactComponent as Stop } from "../images/stop.svg";
import { ReactComponent as FastForward } from "../images/fast-forward.svg";

function MediaPlayer() {
  const auth = useSelector(selectAuth);

  const audio = useRef(new Audio());
  const currentTrack = useSelector(selectCurrentTrack);
  const currentTrackUrl = useMemo(
    () => getStreamUrl({ id: currentTrack, ...auth }),
    [currentTrack, auth]
  );

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

  const skipTrack = (e) => {
    e.preventDefault();
    dispatch(getNextTrack());
  };

  if (currentTrack) {
    return (
      <div
        className={`w-full px-6 py-3 bg-white shadow flex justify-items-stretch`}
      >
        <div className={`flex`}>
          <button className={`inline-block w-6`} title={`Play Track`}>
            <Play className={`w-full`} />
          </button>
          <button className={`inline-block w-6`} title={`Pause Track`}>
            <Pause className={`w-full`} />
          </button>
          <button className={`inline-block w-6`} title={`Stop Track`}>
            <Stop className={`w-full`} />
          </button>
          <button
            onClick={skipTrack}
            className={`inline-block w-6`}
            title={`Next Track`}
          >
            <FastForward className={`w-full`} />
          </button>
        </div>
        <div className={`w-2/3 mx-auto`}>
          <ProgressBar length={duration} position={currentTime} />
        </div>
        <div>
          <Duration time={currentTime} /> / <Duration time={duration} />
        </div>
      </div>
    );
  }

  return <div />;
}

export default MediaPlayer;
