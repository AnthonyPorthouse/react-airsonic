import { getStreamUrl } from "@api/stream.js";
import type { Song } from "@api/types.js";
import { useAuth } from "@hooks/useAuth.js";
import { useTrackList } from "@hooks/useTrackList.js";
import { PropsWithChildren, useCallback, useEffect, useRef } from "react";

import { AudioContext } from "../Contexts/AudioContext.js";

interface AudioProviderProps {
  setCurrentDuration: (pos: number) => void;
  setCurrentTime: (pos: number) => void;
  setState: (state: "playing" | "paused" | "stopped") => void;
}

export const AudioProvider = function AudioProvider({
  children,
  setCurrentDuration,
  setCurrentTime,
  setState,
}: Readonly<PropsWithChildren<AudioProviderProps>>) {
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

  const loadedDataEventListener = useCallback(
    (audio: HTMLAudioElement) => () => {
      audio.play().catch(() => {});
    },
    [],
  );

  const endedEventListener = useCallback(
    () => () => {
      nextTrack();
      setCurrentDuration(0);
      setCurrentTime(0);
      setState("stopped");
    },
    [nextTrack, setCurrentDuration, setCurrentTime, setState],
  );

  const timeUpdateEventListener = useCallback(
    (audio: HTMLAudioElement) => () => {
      if (nowPlaying?.isPodcast) {
        localStorage.setItem(
          `podcast_${nowPlaying?.id}`,
          String(audio.currentTime || 0),
        );
      }

      const duration =
        audio.duration === Infinity
          ? nowPlaying?.duration || 0
          : audio.duration;

      setCurrentTime(parseFloat(audio.currentTime.toFixed(2)) || 0);
      setCurrentDuration(duration);

      // If we are in the last 10 seconds, start preloading the next media item
      if (
        audio.currentTime &&
        nowPlaying?.duration &&
        audio.currentTime >= duration - 10
      ) {
        const nextTrack = getNextTrack();

        // If there is no next track, we don't need to preload it
        if (!nextTrack) {
          return;
        }

        const nextTrackUrl = getStreamUrl(nextTrack.id, auth.credentials);

        if (nextAudio.current?.src !== nextTrackUrl) {
          nextAudio.current = new Audio(nextTrackUrl);
          nextAudio.current.preload = "auto";
        }
      }
    },
    [
      auth.credentials,
      getNextTrack,
      nowPlaying?.duration,
      nowPlaying?.id,
      nowPlaying?.isPodcast,
      setCurrentDuration,
      setCurrentTime,
    ],
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
      audio.current.addEventListener("play", () => setState("playing"));
      audio.current.addEventListener("pause", () => setState("paused"));
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
      audio.current.addEventListener("play", () => setState("playing"));
      audio.current.addEventListener("pause", () => setState("paused"));
      audio.current.addEventListener("ended", endedEventListener());
      audio.current.addEventListener(
        "timeupdate",
        timeUpdateEventListener(audio.current),
      );
      audio.current.currentTime = getInitialProgress(nowPlaying);
      audio.current.play();
    }
  }, [
    audio,
    auth,
    nowPlaying,
    currentTrackUrl,
    getNextTrack,
    endedEventListener,
    timeUpdateEventListener,
    loadedDataEventListener,
    setState,
  ]);

  return (
    <AudioContext.Provider value={audio}>{children}</AudioContext.Provider>
  );
};
