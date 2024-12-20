export interface songDefaultState {
  value: {
    isLoading: boolean;
    isError: boolean;
    isDialogOpen: boolean;
  };
}

export interface SongCardProps {
  data: Song;
}

export interface Song {
  _id: string;
  title: string;
  artistName: string;
  duration: number;
  songArt: string;
  year: number;
  album: string | null;
  description: string | null;
  genre: string | null;
}

export interface SongState {
  songs: Song[];
  song: Song | null;
  loading: boolean;
  songId: string | null;

  fetchSongsSuccess: boolean;
  fetchSongByIdSuccess: boolean;
  createSongSuccess: boolean;
  editSongSuccess: boolean;
  deleteSongSuccess: boolean;
  fetchSongStatisticsSuccess: boolean; // Add this field
  songStatistics: SongStatistics | null; // Add this field

  fetchSongsError: null | string;
  fetchSongByIdError: null | string;
  createSongError: null | string;
  editSongError: null | string;
  deleteSongError: null | string;
  fetchSongStatisticsError: null | string; // Add this field
}

export interface SongStatistics {
  totalSongs: number;
  genreDistribution: Array<{ _id: string; count: number }>;
  releaseYearDistribution: Array<{ _id: number; count: number }>;
  totalArtists: number; // Add totalArtists field
  totalAlbums: number;  // Add totalAlbums field
  artistCounts: Array<{ _id: string; songCount: number; albumCount: number }>; // Add artistCounts field
  albumCounts: Array<{ album: string; songCount: number }>; // Add albumCounts field
}
