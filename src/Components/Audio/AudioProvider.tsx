import { ReactNode, useEffect, useRef } from "react";

import { useAuth } from "../../Providers/AuthProvider.js";
import { useTrackList } from "../../Providers/TrackListProvider.js";
import { Song } from "../../api/songs.js";
import { getStreamUrl } from "../../api/stream.js";
import AudioContext from "./AudioContext.js";

interface AudioProviderProps {
  children: ReactNode;
  setCurrentDuration: (pos: number) => void;
  setCurrentTime: (pos: number) => void;
}

function AudioProvider({
  children,
  setCurrentDuration,
  setCurrentTime,
}: AudioProviderProps) {
  const auth = useAuth();

  const audio = useRef(new Audio());

  const { getCurrentTrack, nextTrack } = useTrackList();

  const nowPlaying = getCurrentTrack();

  const currentTrackUrl = nowPlaying
    ? getStreamUrl(nowPlaying.id, auth.credentials)
    : null;

  const getInitialProgress = (song: Song | null) => {
    if (!song || !song.isPodcast) {
      return 0;
    }

    return Number(localStorage.getItem(`podcast_${song.id}`) || 0);
  };

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
        localStorage.setItem(
          `podcast_${nowPlaying?.id}`,
          String(audio.current.currentTime || 0),
        );
      }

      setCurrentTime(audio.current.currentTime || 0);
      setCurrentDuration(audio.current.duration || 0);
    });
  }, [nextTrack, setCurrentTime]);

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
        localStorage.setItem(
          `podcast_${nowPlaying?.id}`,
          String(audio.current.currentTime || 0),
        );
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
