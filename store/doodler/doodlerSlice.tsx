import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { StoreState } from "../store";
import type { Game, Player } from "../../types/doodler";

const initialState: Game = {
	webSocket: new WebSocket("ws://localhost:8080"),
	players: [],
};

export const doodlerSlice = createSlice({
	name: "doodler",
	initialState,
	reducers: {
		addPlayer: (state, action: PayloadAction<Player>) => {
			var playerNameTaken = false;
			state.players.forEach((currentPlayer) => {
				if (currentPlayer.name === action.payload.name) {
					playerNameTaken = true;
					var msg = currentPlayer.name + " is already taken";
					alert(msg);
				}
			});
			if (!playerNameTaken) state.players.push(action.payload);
		},
		updatePlayer: (state, action: PayloadAction<Player>) => {
			state.players[action.payload.index] = action.payload;
		},
	},
});

export const doodlerState = (state: StoreState) => state.game;

export default doodlerSlice.reducer;
