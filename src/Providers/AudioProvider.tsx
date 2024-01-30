import { ReactNode, useEffect, useRef } from "react";

import AudioContext from "../Components/Audio/AudioContext.js";
import { Song } from "../api/songs.js";
import { getStreamUrl } from "../api/stream.js";
import { useAuth } from "./AuthProvider.js";
import { useTrackList } from "./TrackListProvider.js";

interface AudioProviderProps {
  children: ReactNode;
  setCurrentDuration: (pos: number) => void;
  setCurrentTime: (pos: number) => void;
}

function AudioProvider({
  children,
  setCurrentDuration,
  setCurrentTime,
}: Readonly<AudioProviderProps>) {
  const auth = useAuth();

  const audio = useRef(new Audio());

  const { getCurrentTrack, nextTrack } = useTrackList();

  const nowPlaying = getCurrentTrack();

  const currentTrackUrl = nowPlaying
    ? getStreamUrl(nowPlaying.id, auth.credentials)
    : null;

  const getInitialProgress = (song: Song | null) => {
    if (song?.isPodcast) {
      return Number(localStorage.getItem(`podcast_${song.id}`) ?? 0);
    }

    return 0;
  };

  useEffect(() => {
    audio.current.addEventListener("loadeddata", () => {
      audio.current.play().catch(() => {});
    });

    audio.current.addEventListener("ended", () => {
      nextTrack();
      setCurrentDuration(0);
      setCurrentTime(0);
    });

    audio.current.addEventListener("timeupdate", () => {
      if (nowPlaying?.isPodcast) {
        localStorage.setItem(
          `podcast_${nowPlaying?.id}`,
          String(audio.current.currentTime || 0),
        );
      }

      setCurrentTime(audio.current.currentTime || 0);
      setCurrentDuration(audio.current.duration || 0);
    });
  }, [nextTrack, setCurrentTime, setCurrentDuration, nowPlaying]);

  useEffect(() => {
    if (!nowPlaying || !currentTrackUrl) {
      return;
    }

    if (audio.current.src !== currentTrackUrl) {
      audio.current.pause();
      audio.current.src = currentTrackUrl;
      audio.current.currentTime = getInitialProgress(nowPlaying);
    }
  }, [audio, auth, nowPlaying, currentTrackUrl]);

  return (
    <AudioContext.Provider value={audio.current}>
      {children}
    </AudioContext.Provider>
  );
}

export default AudioProvider;
