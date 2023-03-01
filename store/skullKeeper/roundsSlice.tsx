import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { StoreState } from "../store";
import type { Rounds, Round, PlayerRound } from "../../types/skullKeeper";

const initialState: Rounds = {
	rounds: [],
};

export const roundsSlice = createSlice({
	name: "rounds",
	initialState,
	reducers: {
		createRounds: (state, action: PayloadAction<number>) => {
			for (var i = 0; i < 10; ++i) {
				var round = {
					roundIndex: i,
					playerRounds: [],
				} as Round;
				for (var i = 0; i < action.payload; ++i) {
					var playerRound = {
						playerIndex: i,
						bid: -1,
						won: -1,
						bonus: -1,
						total: -1,
					} as PlayerRound;
					round.playerRounds.push(playerRound);
				}
				state.rounds.push(round);
			}
		},
		updateRound: (state, action: PayloadAction<Round>) => {
			if (state.rounds.length > action.payload.roundIndex)
				state.rounds[action.payload.roundIndex] = action.payload;
			else alert("roundSlice.updateRound: unable to update round");
		},
	},
});

export const { createRounds, updateRound } = roundsSlice.actions;

export const roundsState = (state: StoreState) => state.rounds;

export default roundsSlice.reducer;
