import { useEffect, useRef, useState } from "react";
import AudioProvider from "./Audio/AudioProvider";
import MediaSession from "./MediaSession";
import TitleInfo from "./TitleInfo";
import AlbumArt from "./AlbumArt";
import MediaInfo from "./MediaPlayer/MediaInfo";
import { getStreamUrl } from "../api/stream";
import { useTrackList } from "../hooks";
import { useAuth } from "../api/auth";
import Fullscreen from "./MediaPlayer/Fullscreen";
import { FullscreenContext } from "./MediaPlayer/FullscreenContext";

function MediaPlayer() {
  const auth = useAuth();

  const audio = useRef(new Audio());

  const { getCurrentTrack, nextTrack } = useTrackList();

  const nowPlaying = getCurrentTrack();

  const currentTrackUrl = nowPlaying
    ? getStreamUrl(nowPlaying.id, auth.credentials)
    : null;

  const [duration, setCurrentDuration] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    audio.current.addEventListener("loadeddata", (e) => {
      audio.current.play().catch(() => {});
    });

    audio.current.addEventListener("ended", (e) => {
      nextTrack();
      setCurrentDuration(0);
      setCurrentTime(0);
    });

    audio.current.addEventListener("timeupdate", (e) => {
      setCurrentTime(audio.current.currentTime || 0);
      setCurrentDuration(audio.current.duration || 0);
    });
  }, [nextTrack, setCurrentTime]);

  useEffect(() => {
    if (!nowPlaying || !currentTrackUrl) {
      return;
    }

    if (audio.current.src !== currentTrackUrl) {
      audio.current.pause();
      audio.current.src = currentTrackUrl;
    }
  }, [audio, auth, nowPlaying, currentTrackUrl]);

  if (!nowPlaying) {
    audio.current.pause();
    return null;
  }

  return (
    <AudioProvider value={audio.current}>
      <FullscreenContext.Provider
        value={{
          isFullscreen,
          setIsFullscreen,
        }}
      >
        <MediaSession track={nowPlaying}>
          <TitleInfo nowPlaying={nowPlaying} />

          <div className={`w-full px-6 py-3 gap-x-3 bg-white shadow flex z-50`}>
            <div
              className={`flex-shrink hidden md:block`}
              style={{ width: "100px" }}
            >
              <AlbumArt id={nowPlaying.coverArt} sizes={`100px`} />
            </div>
            <MediaInfo
              track={nowPlaying}
              duration={duration}
              currentTime={currentTime}
            />
          </div>
        </MediaSession>
        <Fullscreen
          track={nowPlaying}
          duration={duration}
          currentTime={currentTime}
        />
      </FullscreenContext.Provider>
    </AudioProvider>
  );
}

export default MediaPlayer;
