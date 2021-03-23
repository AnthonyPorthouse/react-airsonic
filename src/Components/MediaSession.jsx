import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongById } from "../features/songSlice";
import { getCoverArtUrl } from "../features/api";
import { selectAuth } from "../features/authSlice";
import { getNextTrack } from "../features/playlistSlice";

function MediaSession({ track, children }) {
  const dispatch = useDispatch();

  const auth = useSelector(selectAuth);

  const song = useSelector((state) => getSongById(state, track));

  useEffect(() => {
    if (!("mediaSession" in navigator)) {
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

  return children;
}

export default MediaSession;