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
