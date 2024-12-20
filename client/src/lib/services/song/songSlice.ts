import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song, SongState, SongStatistics } from "../../../types";

const initialState: SongState = {
  songs: [],
  song: null,
  loading: false,
  songId: null,

  fetchSongsSuccess: false,
  fetchSongByIdSuccess: false,
  createSongSuccess: false,
  editSongSuccess: false,
  deleteSongSuccess: false,
  fetchSongStatisticsSuccess: false,

  fetchSongsError: null,
  fetchSongByIdError: null,
  createSongError: null,
  editSongError: null,
  deleteSongError: null,
  fetchSongStatisticsError: null,

  songStatistics: null,
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    fetchSongsStart(state) {
      state.loading = true;
      state.fetchSongsError = null;
      state.fetchSongsSuccess = false;
      state.fetchSongByIdSuccess = false;
      state.editSongSuccess = false;
      state.deleteSongSuccess = false;
      state.createSongSuccess = false;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
      state.loading = false;
      state.fetchSongsSuccess = true;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.fetchSongsError = action.payload;
      state.fetchSongsSuccess = false;
    },
    updateSongId(state, action: PayloadAction<string>) {
      state.songId = action.payload;
    },

    fetchSongByIdStart(state, action: PayloadAction<string>) {
      state.loading = true;
      state.fetchSongByIdError = null;
      state.songId = action.payload;
      state.fetchSongByIdSuccess = false;
      state.editSongSuccess = false;
      state.deleteSongSuccess = false;
      state.createSongSuccess = false;
    },
    fetchSongByIdSuccess(state, action: PayloadAction<Song>) {
      state.song = action.payload;
      state.loading = false;
      state.fetchSongByIdSuccess = true;
    },
    fetchSongByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.fetchSongByIdError = action.payload;
      state.fetchSongByIdSuccess = false;
    },

    createSongStart(state, action: PayloadAction<Song>) {
      state.loading = true;
      state.createSongError = null;
      state.song = action.payload;
      state.fetchSongByIdSuccess = false;
      state.editSongSuccess = false;
      state.deleteSongSuccess = false;
      state.createSongSuccess = false;
    },
    createSongSuccess(state, action: PayloadAction<Song>) {
      state.songs.push(action.payload);
      state.loading = false;
      state.createSongSuccess = true;
    },
    createSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.createSongError = action.payload;
      state.createSongSuccess = false;
    },

    editSongStart(state, action: PayloadAction<Song>) {
      state.loading = true;
      state.editSongError = null;
      state.song = action.payload;
      state.fetchSongByIdSuccess = false;
      state.editSongSuccess = false;
      state.deleteSongSuccess = false;
      state.createSongSuccess = false;
    },
    editSongSuccess(state, action: PayloadAction<Song>) {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.loading = false;
      state.editSongSuccess = true;
    },
    editSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.editSongError = action.payload;
      state.editSongSuccess = false;
    },

    deleteSongStart(state, action: PayloadAction<string>) {
      state.loading = true;
      state.deleteSongError = null;
      state.songId = action.payload;
      state.fetchSongByIdSuccess = false;
      state.editSongSuccess = false;
      state.deleteSongSuccess = false;
      state.createSongSuccess = false;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
      state.loading = false;
      state.deleteSongSuccess = true;
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.deleteSongError = action.payload;
      state.deleteSongSuccess = false;
    },

    //song statistics
    fetchSongStatisticsStart(state) {
      state.loading = true;
      state.fetchSongStatisticsError = null;
      state.fetchSongStatisticsSuccess = false;
    },
    fetchSongStatisticsSuccess(state, action: PayloadAction<SongStatistics>) {
      state.songStatistics = action.payload;
      state.loading = false;
      state.fetchSongStatisticsSuccess = true;
    },
    fetchSongStatisticsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.fetchSongStatisticsError = action.payload;
      state.fetchSongStatisticsSuccess = false;
    },
  },
});

export const {
  updateSongId,

  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,

  fetchSongByIdStart,
  fetchSongByIdSuccess,
  fetchSongByIdFailure,

  createSongStart,
  createSongSuccess,
  createSongFailure,

  editSongStart,
  editSongSuccess,
  editSongFailure,

  deleteSongFailure,
  deleteSongStart,
  deleteSongSuccess,

  fetchSongStatisticsStart,
  fetchSongStatisticsSuccess,
  fetchSongStatisticsFailure,
} = songSlice.actions;

export default songSlice.reducer;
