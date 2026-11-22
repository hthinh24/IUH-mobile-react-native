import { configureStore } from "@reduxjs/toolkit";

// TODO BT10.8: Register cart and favorites reducers.
export const store = configureStore({ reducer: {} });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
