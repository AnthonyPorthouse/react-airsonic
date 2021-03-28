import { useDispatch, useSelector } from "react-redux";
import { getNextTrack, selectCurrentTrack } from "../features/playlistSlice";
import { selectAuth } from "../features/authSlice";
import { getStreamUrl } from "../features/api";
import { useEffect, useRef, useState } from "react";
import AudioContext from "./AudioContext";
import MediaSession from "./MediaSession";
import TitleInfo from "./TitleInfo";
import AlbumArt from "./AlbumArt";
import { getSongById } from "../features/songSlice";
import MediaInfo from "./MediaPlayer/MediaInfo";

function MediaPlayer() {
  const auth = useSelector(selectAuth);

  const audio = useRef(new Audio());
  const currentTrack = useSelector(selectCurrentTrack);
  const currentTrackInfo = useSelector((state) =>
    getSongById(state, currentTrack)
  );
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
      <MediaSession track={currentTrack}>
        <TitleInfo nowPlaying={currentTrack} />

        <div className={`w-full px-6 py-3 gap-x-3 bg-white shadow flex z-50`}>
          <div
            className={`flex-shrink hidden md:block`}
            style={{ width: "100px" }}
          >
            <AlbumArt id={currentTrackInfo.coverArt} />
          </div>
          <MediaInfo
            track={currentTrack}
            duration={duration}
            currentTime={currentTime}
          />
        </div>
      </MediaSession>
    </AudioContext.Provider>
  );
}

export default MediaPlayer;
