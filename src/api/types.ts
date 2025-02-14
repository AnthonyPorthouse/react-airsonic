export type AirsonicResponse = {
  "subsonic-response": {
    status: "ok" | "failed";
    version: string;
  };
};

export type SuccessResponse = AirsonicResponse & {
  "subsonic-response": {
    status: "ok";
    version: string;
  };
};

export type ErrorResponse = AirsonicResponse & {
  "subsonic-response": {
    status: "failed";
    version: string;
    error: {
      code: number;
      message: string;
    };
  };
};

export function isErrorMessage(
  response: AirsonicResponse,
): response is ErrorResponse {
  return response["subsonic-response"].status === "failed";
}

export type Album = {
  id: string;
  name: string;
  artist: string;
  artistId: string;
  coverArt?: string;
  songCount: number;
  duration: number;
  created: string;
  year: number;
  genre: string;
  tracks: SongIds;
};
export type Albums = Album[];
export type AlbumIds = string[];

export type Song = {
  id: string;
  parent: string;
  title: string;
  album: string;
  artist: string;
  track: number;
  discNumber?: number;
  coverArt: string;
  albumId: string;
  artistId: string;
  duration: number;
  isPodcast: boolean;
};
export type Songs = Song[];
export type SongIds = string[];

export type Podcast = {
  id: string;
  url: string;
  title: string;
  description: string;
  coverArt: string;
  originalImageUrl: string;
  status: string;
};

export type Podcasts = Podcast[];

export type SkippedEpisode = {
  id: string;
  status: "skipped";
  title: string;
  description: string;
  publishDate: string;
};

export type DownloadedEpisode = Song & {
  status: "completed";
  publishDate: string;
  streamId: string;
};

export type Episode = SkippedEpisode | DownloadedEpisode;

export type Artist = {
  id: string;
  name: string;
  coverArt: string;
  albumCount: string;
  albums: AlbumIds;
};
export type Artists = Artist[];
export type ArtistIds = string[];

export type Playlist = {
  id: string;
  name: string;
  comment: string;
  songCount: number;
  coverArt: string;
  tracks: SongIds;
};
export type Playlists = Playlist[];
export type PlaylistIds = string[];
