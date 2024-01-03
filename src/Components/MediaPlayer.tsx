import { useEffect, useState } from "react";

import { useTrackList } from "../Providers/TrackListProvider.js";
import { Song } from "../api/songs.js";
import AlbumArt from "./AlbumArt.js";
import AudioProvider from "./Audio/AudioProvider.js";
import Fullscreen from "./MediaPlayer/Fullscreen.js";
import { FullscreenContext } from "./MediaPlayer/FullscreenContext.js";
import MediaInfo from "./MediaPlayer/MediaInfo.js";
import MediaSession from "./MediaSession.js";
import TitleInfo from "./TitleInfo.js";

function MediaPlayer() {
  const { getCurrentTrack } = useTrackList();

  const nowPlaying = getCurrentTrack();

  const getInitialProgress = (song: Song | null) => {
    if (!song || !song.isPodcast) {
      return 0;
    }

    return Number(localStorage.getItem(`podcast_${song.id}`) || 0);
  };

  const [duration, setCurrentDuration] = useState(100);
  const [currentTime, setCurrentTime] = useState(
    getInitialProgress(nowPlaying),
  );

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

  const fullscreenValue = {
    isFullscreen,
    setIsFullscreen: setFullscreen,
  };

  if (!nowPlaying) {
    return null;
  }

  return (
    <AudioProvider
      setCurrentDuration={setCurrentDuration}
      setCurrentTime={setCurrentTime}
    >
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
