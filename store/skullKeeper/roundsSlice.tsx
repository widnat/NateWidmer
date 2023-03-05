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

function getTotal(playerRound: PlayerRound) {
	var score = 0;
	if (playerRound.bid !== -1 && playerRound.won != -1) {
		score = Math.abs(playerRound.bid - playerRound.won);
		score = score === 0 ? playerRound.roundIndex * 10 : score * -1 * 10;
	}

	if (score > 0 && playerRound.bonus > 0) score = score + playerRound.bonus;

	return score + playerRound.previousRoundTotal;
}

export const roundsSlice = createSlice({
	name: "rounds",
	initialState,
	reducers: {
		createRounds: (state, action: PayloadAction<number>) => {
			state.rounds = [];
			for (var i = 0; i < 11; ++i) {
				var round = {
					roundIndex: i,
					playerRounds: [],
				} as Round;
				for (var k = 0; k < action.payload; ++k) {
					var playerRound = {
						playerIndex: k,
						roundIndex: i,
						bid: -1,
						won: -1,
						bonus: -1,
						total: 0,
						previousRoundTotal: 0,
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
			var total = getTotal(
				state.rounds[update.roundIndex].playerRounds[update.playerIndex]
			);
			state.rounds[update.roundIndex].playerRounds[update.playerIndex].total =
				total;
			if (update.roundIndex < 8)
				state.rounds[update.roundIndex + 1].playerRounds[
					update.playerIndex
				].previousRoundTotal = total;
		},
		updatePlayerRoundWon: (state, action: PayloadAction<PlayerRoundUpdate>) => {
			var update = action.payload;
			state.rounds[update.roundIndex].playerRounds[update.playerIndex].won =
				update.value;
			var total = getTotal(
				state.rounds[update.roundIndex].playerRounds[update.playerIndex]
			);
			state.rounds[update.roundIndex].playerRounds[update.playerIndex].total =
				total;
			if (update.roundIndex < 8)
				state.rounds[update.roundIndex + 1].playerRounds[
					update.playerIndex
				].previousRoundTotal = total;
		},
		updatePlayerRoundBonus: (
			state,
			action: PayloadAction<PlayerRoundUpdate>
		) => {
			var update = action.payload;
			state.rounds[update.roundIndex].playerRounds[update.playerIndex].bonus =
				update.value;
			var total = getTotal(
				state.rounds[update.roundIndex].playerRounds[update.playerIndex]
			);
			state.rounds[update.roundIndex].playerRounds[update.playerIndex].total =
				total;
			if (update.roundIndex < 8)
				state.rounds[update.roundIndex + 1].playerRounds[
					update.playerIndex
				].previousRoundTotal = total;
		},
	},
});

export const {
	createRounds,
	updatePlayerRoundBid,
	updatePlayerRoundWon,
	updatePlayerRoundBonus,
} = roundsSlice.actions;

export const roundsState = (state: StoreState) => state.rounds.rounds;

export default roundsSlice.reducer;
