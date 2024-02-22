import { ReactNode, useCallback, useEffect, useRef } from "react";

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
  const nextAudio = useRef(new Audio());

  const { getCurrentTrack, getNextTrack, nextTrack } = useTrackList();

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

  const loadedDataEventListener = (audio: HTMLAudioElement) => () => {
    audio.play().catch(() => {});
  };

  const endedEventListener = useCallback(
    () => () => {
      nextTrack();
      setCurrentDuration(0);
      setCurrentTime(0);
    },
    [nextTrack, setCurrentDuration, setCurrentTime],
  );

  const timeUpdateEventListener = useCallback(
    (audio: HTMLAudioElement) => () => {
      if (nowPlaying?.isPodcast) {
        localStorage.setItem(
          `podcast_${nowPlaying?.id}`,
          String(audio.currentTime || 0),
        );
      }

      setCurrentTime(audio.currentTime || 0);
      setCurrentDuration(audio.duration || 0);
    },
    [nowPlaying?.id, nowPlaying?.isPodcast, setCurrentDuration, setCurrentTime],
  );

  useEffect(() => {
    if (!nowPlaying || !currentTrackUrl) {
      return;
    }

    if (audio.current.src !== currentTrackUrl) {
      audio.current.pause();
    }

    // If the next track is preloaded
    if (nextAudio.current && nextAudio.current.src === currentTrackUrl) {
      audio.current = nextAudio.current;
      audio.current.addEventListener(
        "loadeddata",
        loadedDataEventListener(audio.current),
      );
      audio.current.addEventListener("ended", endedEventListener());
      audio.current.addEventListener(
        "timeupdate",
        timeUpdateEventListener(audio.current),
      );
      audio.current.currentTime = getInitialProgress(nowPlaying);
      audio.current.play();
    }

    if (audio.current.src !== currentTrackUrl) {
      audio.current = new Audio(currentTrackUrl);
      audio.current.addEventListener(
        "loadeddata",
        loadedDataEventListener(audio.current),
      );
      audio.current.addEventListener("ended", endedEventListener());
      audio.current.addEventListener(
        "timeupdate",
        timeUpdateEventListener(audio.current),
      );
      audio.current.currentTime = getInitialProgress(nowPlaying);
      audio.current.play();
    }

    const nextTrack = getNextTrack();
    if (nextTrack) {
      nextAudio.current = new Audio(
        getStreamUrl(nextTrack.id, auth.credentials),
      );
      nextAudio.current.preload = "auto";
    }
  }, [
    audio,
    auth,
    nowPlaying,
    currentTrackUrl,
    getNextTrack,
    endedEventListener,
    timeUpdateEventListener,
  ]);

  return (
    <AudioContext.Provider value={audio.current}>
      {children}
    </AudioContext.Provider>
  );
}

export default AudioProvider;
