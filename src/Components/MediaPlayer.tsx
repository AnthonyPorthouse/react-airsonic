import { useEffect, useMemo, useRef, useState } from "react";

import { useAuth } from "../api/auth.js";
import { getStreamUrl } from "../api/stream.js";
import { useTrackList } from "../hooks.js";
import AlbumArt from "./AlbumArt.js";
import AudioProvider from "./Audio/AudioProvider.js";
import Fullscreen from "./MediaPlayer/Fullscreen.js";
import { FullscreenContext } from "./MediaPlayer/FullscreenContext.js";
import MediaInfo from "./MediaPlayer/MediaInfo.js";
import MediaSession from "./MediaSession.js";
import TitleInfo from "./TitleInfo.js";
import { Song } from "../api/songs.js";

function MediaPlayer() {
  const auth = useAuth();

  const audio = useRef(new Audio());

  const { getCurrentTrack, nextTrack } = useTrackList();

  const nowPlaying = getCurrentTrack();

  const getInitialProgress = (song: Song | null) => {
    if (!song || !song.isPodcast) { 
      return 0
    }

    return Number(localStorage.getItem(`podcast_${song.id}`) || 0)
  }

  const currentTrackUrl = nowPlaying
    ? getStreamUrl(nowPlaying.id, auth.credentials)
    : null;

  const [duration, setCurrentDuration] = useState(100);
  const [currentTime, setCurrentTime] = useState(getInitialProgress(nowPlaying));

  const [isFullscreen, setIsFullscreen] = useState(false);

  const setFullscreen = async (enableFullscreen: boolean) => {
    if (enableFullscreen) {
      try {
        await document.body.requestFullscreen();
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await document.exitFullscreen();
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(document.fullscreenElement !== null);
    }

    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

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

      if (nowPlaying?.isPodcast) {
        localStorage.setItem(`podcast_${nowPlaying?.id}`, String(audio.current.currentTime || 0))
      } 

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
      audio.current.currentTime = getInitialProgress(nowPlaying)
    }
  }, [audio, auth, nowPlaying, currentTrackUrl]);

  const fullscreenValue = {
    isFullscreen,
    setIsFullscreen: setFullscreen,
  };

  if (!nowPlaying) {
    audio.current.pause();
    return null;
  }

  return (
    <AudioProvider value={audio.current}>
      <FullscreenContext.Provider value={fullscreenValue}>
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
