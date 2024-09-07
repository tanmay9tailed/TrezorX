import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "./features/slice/slice";
import localStorageMiddleware from "./middleware/localStorageMiddleware";

const store = configureStore({
  reducer: {
    accounts: accountsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
