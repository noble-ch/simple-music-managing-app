
export interface SongStats {
  totalSongs: number;
  genreDistribution: Array<{ _id: string; count: number }>;
  releaseYearDistribution: Array<{ _id: number; count: number }>;
  totalArtists: number;
  totalAlbums: number;
  artistCounts: Array<{ _id: string; songCount: number; albumCount: number }>;
  albumCounts: Array<{ album: string; songCount: number }>;
}