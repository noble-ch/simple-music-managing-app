import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";
import songReducer from "./services/song/songSlice"; 
import dialogReducer from "./features/dialog/dialogSlice";
import songSaga from "./services/song/songSaga";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    songReducer,
    dialogReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([saga]),
});

saga.run(songSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
