import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
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
} from "./songSlice";

import {
  fetchSongsAPI,
  fetchSongByIdAPI,
  createSongAPI,
  editSongAPI,
  deleteSongAPI,
  fetchSongStatisticsAPI,
} from "./songAPI";

import { Song, SongStatistics } from "../../../types";

function* fetchSongsSaga() {
  try {
    const songs: Song[] = yield call(fetchSongsAPI);
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchSongsFailure(error.message));
    } else {
      yield put(fetchSongsFailure("Failed to fetch songs"));
    }
  }
}

function* fetchSongByIdSaga(action: PayloadAction<number>) {
  try {
    const song: Song = yield call(fetchSongByIdAPI, action.payload);
    yield put(fetchSongByIdSuccess(song));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchSongByIdFailure(error.message));
    } else {
      yield put(fetchSongByIdFailure("Failed to fetch song"));
    }
  }
}

function* createSongSaga(action: PayloadAction<Song>) {
  try {
    const song: Song = yield call(createSongAPI, action.payload);
    yield put(createSongSuccess(song));
  } catch (error) {
    if (error instanceof Error) {
      yield put(createSongFailure(error.message));
    } else {
      yield put(createSongFailure("Failed to create song"));
    }
  }
}

function* editSongSaga(action: PayloadAction<Song>) {
  try {
    const song: Song = yield call(editSongAPI, action.payload);
    yield put(editSongSuccess(song));
  } catch (error) {
    if (error instanceof Error) {
      yield put(editSongFailure(error.message));
    } else {
      yield put(editSongFailure("Failed to edit song"));
    }
  }
}

function* deleteSongSaga(action: PayloadAction<string>) {
  try {
    yield call(deleteSongAPI, action.payload);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    if (error instanceof Error) {
      yield put(deleteSongFailure(error.message));
    } else {
      yield put(deleteSongFailure("Failed to delete song"));
    }
  }
}

//statistics-related saga

function* fetchSongStatisticsSaga() {
  try {
    const statistics: SongStatistics = yield call(fetchSongStatisticsAPI);
    yield put(fetchSongStatisticsSuccess(statistics));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchSongStatisticsFailure(error.message));
    } else {
      yield put(fetchSongStatisticsFailure("Failed to fetch song statistics"));
    }
  }
}

export default function* songSaga() {
  yield takeLatest(fetchSongsStart.type, fetchSongsSaga);
  yield takeLatest(fetchSongByIdStart.type, fetchSongByIdSaga);
  yield takeLatest(createSongStart.type, createSongSaga);
  yield takeLatest(editSongStart.type, editSongSaga);
  yield takeLatest(deleteSongStart.type, deleteSongSaga);
  yield takeLatest(fetchSongStatisticsStart.type, fetchSongStatisticsSaga);
}
