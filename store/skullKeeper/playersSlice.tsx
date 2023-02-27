import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { StoreState } from "../store";
import type { Players, Player } from "../../types/skullKeeper";

const initialState: Players = {
	players: [],
};

export const playersSlice = createSlice({
	name: "players",
	initialState,
	reducers: {
		addPlayer: (state, action: PayloadAction<Player>) => {
			action.payload.index = state.players.length;
			state.players.push(action.payload);
		},
		updatePlayer: (state, action: PayloadAction<Player>) => {
			if (state.players.length > action.payload.index)
				state.players[action.payload.index].name = action.payload.name;
			else alert("playersSlice.updatePlayer: unable to update player");
		},
	},
});

export const { addPlayer, updatePlayer } = playersSlice.actions;

export const playersState = (state: StoreState) => state.players;

export default playersSlice.reducer;
