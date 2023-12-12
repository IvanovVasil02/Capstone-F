import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import mainReducer from "../reducers/mainReducer";
import persistStore from "redux-persist/es/persistStore";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducers = combineReducers({
  main: mainReducer,
});

const persistReducers = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistReducers,
  middleware: getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

export const persistore = persistStore(store);
