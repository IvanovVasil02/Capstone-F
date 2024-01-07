import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import mainReducer from "../reducers/mainReducer";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import prescriptionReducer from "../reducers/prescriptionReducer";
import appointmentsReducer from "../reducers/appointmentsReducer";
import doctorReducer from "../reducers/doctorReducer";
import errorReducer from "../reducers/errorReducer";
import authenticationReducer from "../reducers/authenticatinoReducer";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "my-su2344per-sec234324ret-k423423ey",
    }),
  ],
};

const rootReducer = combineReducers({
  main: mainReducer,
  user: authenticationReducer,
  prescriptions: prescriptionReducer,
  appointments: appointmentsReducer,
  doctor: doctorReducer,
  error: errorReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
