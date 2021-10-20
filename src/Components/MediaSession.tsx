import { ReactNode, useEffect } from "react";
import { getSongById } from "../app/features/songSlice";
import { getCoverArtUrl } from "../app/features/api";
import { selectAuth } from "../app/features/authSlice";
import { getNextTrack } from "../app/features/playlistSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

interface MediaSessionProps {
  track: string;
  children: ReactNode;
}

function MediaSession({ track, children }: MediaSessionProps) {
  const dispatch = useAppDispatch();

  const auth = useAppSelector(selectAuth);

  const song = useAppSelector((state) => getSongById(state, track));

  useEffect(() => {
    if (!("mediaSession" in navigator)) {
      return;
    }

    if (!song) {
      return;
    }

    const mediaSession = navigator.mediaSession;

    const artwork = getCoverArtUrl({ id: song.coverArt, ...auth });

    mediaSession.metadata = new window.MediaMetadata({
      title: song.title,
      artist: song.artist,
      album: song.album,

      artwork: [
        {
          src: `${artwork}`,
          sizes: `192x192`,
        },
      ],
    });

    mediaSession.setActionHandler("nexttrack", () => {
      dispatch(getNextTrack());
    });
  }, [auth, dispatch, song, track]);

  return <div>children</div>;
}

export default MediaSession;
