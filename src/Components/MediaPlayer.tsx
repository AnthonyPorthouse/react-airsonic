import { useState } from "react";

import AudioProvider from "../Providers/AudioProvider.js";
import FullscreenProvider from "../Providers/FullscreenProvider.js";
import { useTrackList } from "../Providers/TrackListProvider.js";
import { Song } from "../api/songs.js";
import AlbumArt from "./AlbumArt.js";
import Fullscreen from "./MediaPlayer/Fullscreen.js";
import MediaInfo from "./MediaPlayer/MediaInfo.js";
import MediaSession from "./MediaSession.js";
import TitleInfo from "./TitleInfo.js";

function MediaPlayer() {
  const { getCurrentTrack } = useTrackList();

  const nowPlaying = getCurrentTrack();

  const getInitialProgress = (song: Song | null) => {
    if (song?.isPodcast) {
      return Number(localStorage.getItem(`podcast_${song.id}`) ?? 0);
    }

    return 0;
  };

  const [duration, setDuration] = useState(100);
  const [currentTime, setCurrentTime] = useState(
    getInitialProgress(nowPlaying),
  );

  if (!nowPlaying) {
    return null;
  }

  return (
    <AudioProvider
      setCurrentDuration={setDuration}
      setCurrentTime={setCurrentTime}
    >
      <FullscreenProvider>
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
      </FullscreenProvider>
    </AudioProvider>
  );
}

export default MediaPlayer;
