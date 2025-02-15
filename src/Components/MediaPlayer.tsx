import type { Song } from "@api/types.js";
import { useTrackList } from "@hooks/useTrackList.js";
import { AudioProvider } from "@providers/AudioProvider.js";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import AlbumArt from "./AlbumArt.js";
import Fullscreen from "./MediaPlayer/Fullscreen.js";
import MediaInfo from "./MediaPlayer/MediaInfo.js";
import MediaSession from "./MediaSession.js";
import TitleInfo from "./TitleInfo.js";

function MediaPlayer() {
  const { getCurrentTrack } = useTrackList();

  const nowPlaying = useMemo(() => getCurrentTrack(), [getCurrentTrack]);

  const getInitialProgress = (song: Song | null) => {
    if (song?.isPodcast) {
      return Number(localStorage.getItem(`podcast_${song.id}`) ?? 0);
    }

    return 0;
  };

  const [state, setState] = useState<"playing" | "paused" | "stopped">(
    "stopped",
  );
  const [duration, setDuration] = useState(nowPlaying?.duration ?? 60);
  const [currentTime, setCurrentTime] = useState(
    getInitialProgress(nowPlaying),
  );

  const artwork = useMemo(
    () => nowPlaying && <AlbumArt id={nowPlaying.coverArt} sizes={`100px`} />,
    [nowPlaying],
  );

  if (!nowPlaying) {
    return null;
  }

  return (
    <AudioProvider
      setCurrentDuration={setDuration}
      setCurrentTime={setCurrentTime}
      setState={setState}
    >
      <MediaSession track={nowPlaying}>
        <TitleInfo nowPlaying={nowPlaying} />

        <div
          className={`z-50 flex w-full gap-x-3 bg-white px-6 py-3 shadow-sm`}
        >
          <div className={`hidden shrink md:block`} style={{ width: "100px" }}>
            <Link
              to="/albums/$albumId"
              params={{ albumId: nowPlaying.albumId }}
            >
              {artwork}
            </Link>
          </div>
          <MediaInfo
            track={nowPlaying}
            duration={duration}
            currentTime={currentTime}
            state={state}
          />
        </div>
      </MediaSession>
      <Fullscreen
        track={nowPlaying}
        duration={duration}
        currentTime={currentTime}
      />
    </AudioProvider>
  );
}

export default MediaPlayer;
