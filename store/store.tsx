import { configureStore, combineReducers } from "@reduxjs/toolkit";
import doodlerSlice from "./doodler/doodlerSlice";
import playersSlice from "./skullKeeper/playersSlice";
import roundsSlice from "./skullKeeper/roundsSlice";

export const store = configureStore({
	reducer: combineReducers({
		players: playersSlice,
		rounds: roundsSlice,
		game: doodlerSlice,
	}),
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
