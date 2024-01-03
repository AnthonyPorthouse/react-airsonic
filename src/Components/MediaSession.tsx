import { ReactNode, useEffect } from "react";

import { useAuth } from "../Providers/AuthProvider.js";
import { useTrackList } from "../Providers/TrackListProvider.js";
import { getCoverArtUrl } from "../api/artwork.js";
import { Song } from "../api/songs.js";

interface MediaSessionProps {
  track: Song;
  children: ReactNode;
}

function MediaSession({ track, children }: MediaSessionProps) {
  const auth = useAuth();
  const { nextTrack } = useTrackList();

  useEffect(() => {
    if (!("mediaSession" in navigator)) {
      return;
    }

    if (!track) {
      return;
    }

    const mediaSession = navigator.mediaSession;

    const artwork = getCoverArtUrl(track.coverArt, auth.credentials);

    mediaSession.metadata = new window.MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: track.album,

      artwork: [
        {
          src: `${artwork}`,
          sizes: `192x192`,
        },
      ],
    });

    mediaSession.setActionHandler("nexttrack", () => {
      nextTrack();
    });
  }, [auth, nextTrack, track]);

  return <div>{children}</div>;
}

export default MediaSession;
