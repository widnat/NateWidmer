import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { StoreState } from "../store";
import type {
	Rounds,
	Round,
	PlayerRound,
	PlayerRoundUpdate,
} from "../../types/skullKeeper";

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
				for (var k = 0; k < action.payload; ++k) {
					var playerRound = {
						playerIndex: k,
						bid: -1,
						won: -1,
						bonus: -1,
						total: 0,
					} as PlayerRound;
					round.playerRounds.push(playerRound);
				}
				state.rounds.push(round);
			}
		},
		updatePlayerRoundBid: (state, action: PayloadAction<PlayerRoundUpdate>) => {
			var update = action.payload;
			state.rounds[update.roundIndex].playerRounds[update.playerIndex].bid =
				update.value;
		},
	},
});

export const { createRounds, updatePlayerRoundBid } = roundsSlice.actions;

export const roundsState = (state: StoreState) => state.rounds.rounds;

export default roundsSlice.reducer;
