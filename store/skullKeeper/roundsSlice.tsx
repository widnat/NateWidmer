import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { StoreState } from "../store";
import type {
	Rounds,
	Round,
	RoundInfo,
	PlayerRound,
} from "../../types/skullKeeper";

const initialState: Rounds = {
	rounds: [],
};

export const roundsSlice = createSlice({
	name: "rounds",
	initialState,
	reducers: {
		addRound: (state, action: PayloadAction<RoundInfo>) => {
			var round = {
				roundIndex: action.payload.roundIndex,
				playerRounds: [],
			} as Round;
			for (var i = 0; i < action.payload.numPlayers; ++i) {
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
		},
		updateRound: (state, action: PayloadAction<Round>) => {
			if (state.rounds.length > action.payload.roundIndex)
				state.rounds[action.payload.roundIndex] = action.payload;
			else alert("roundSlice.updateRound: unable to update round");
		},
	},
});

export const { addRound, updateRound } = roundsSlice.actions;

export const rounds = (state: StoreState) => state.rounds;

export default roundsSlice.reducer;
