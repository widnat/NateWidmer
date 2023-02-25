import { configureStore, combineReducers } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: combineReducers({}),
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
