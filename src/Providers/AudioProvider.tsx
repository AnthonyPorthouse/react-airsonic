import { getStreamUrl } from "@api/stream.js";
import type { Song } from "@api/types.js";
import { useAuth } from "@hooks/useAuth.js";
import { useTrackList } from "@hooks/useTrackList.js";
import { PropsWithChildren, memo, useCallback, useEffect, useRef } from "react";

import { AudioContext } from "../Contexts/AudioContext.js";

interface AudioProviderProps {
  setCurrentDuration: (pos: number) => void;
  setCurrentTime: (pos: number) => void;
}

export const AudioProvider = memo(function AudioProvider({
  children,
  setCurrentDuration,
  setCurrentTime,
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

      setCurrentTime(Math.floor(audio.currentTime || 0));
      setCurrentDuration(audio.duration || 0);

      // If we are in the last 10 seconds, start preloading the next media item
      if (
        audio.currentTime &&
        audio.duration &&
        audio.currentTime >= audio.duration - 10
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
});
