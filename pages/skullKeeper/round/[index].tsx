import { useState, useEffect } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import SkullKeeperNavBar from "../../../components/skullKing/NavBar";
import Title from "../../../components/skullKing/Title";
import TextInput from "../../../components/skullKing/TextInput";
import { useStoreDispatch, useStoreSelector } from "../../../store/hooks";
import { roundsState, addRound } from "../../../store/skullKeeper/roundsSlice";
import { playersState } from "../../../store/skullKeeper/playersSlice";
import type { Player, RoundInfo } from "../../../types/skullKeeper";
import { useRouter } from "next/router";

export default function SkullKeeper() {
	const router = useRouter();
	const roundIndex = Number(router.query.index);
	const title = "Round " + roundIndex;
	const players = useStoreSelector(playersState).players;
	const round = getRound();
	round.playerRounds;
	const [PlayerRound1, setPlayer1] = useState("");
	const [PlayerRound2, setPlayer2] = useState("");
	const [PlayerRound3, setPlayer3] = useState("");
	const [PlayerRound4, setPlayer4] = useState("");
	const [PlayerRound5, setPlayer5] = useState("");
	const [PlayerRound6, setPlayer6] = useState("");
	const [PlayerRound7, setPlayer7] = useState("");
	const [PlayerRound8, setPlayer8] = useState("");
	const dispatch = useStoreDispatch();
	const previousRoute = "/skullKeeper/round[" + String(roundIndex - 1) + "]";
	const nextRoute = "/skullKeeper/round[1]";
	const playersRoute = "/skullKeeper/players";
	const resultsRoute = "/skullKeeper/results";

	function getRound() {
		var rounds = useStoreSelector(roundsState).rounds;
		if (rounds.length > roundIndex) return rounds[roundIndex];
		else {
			dispatch(
				addRound({
					numPlayers: players.length,
					roundIndex: roundIndex,
				} as RoundInfo)
			);
			return useStoreSelector(roundsState).rounds[roundIndex];
		}
	}

	function handleNavigate(route: string) {
		var index = 0;
		if (player1) addPlayerDispatch(player1, index);
		if (player2 && ++index) addPlayerDispatch(player2, index);
		if (player3 && ++index) addPlayerDispatch(player3, index);
		if (player4 && ++index) addPlayerDispatch(player4, index);
		if (player5 && ++index) addPlayerDispatch(player5, index);
		if (player6 && ++index) addPlayerDispatch(player6, index);
		if (player7 && ++index) addPlayerDispatch(player7, index);
		if (player8 && ++index) addPlayerDispatch(player7, index);
	}

	function addPlayerDispatch(name: string, index: number) {
		dispatch(
			addPlayer({
				name: name,
				index: index,
			} as Player)
		);
	}

	return (
		<div>
			<NavBar />
			<Title title="Skull Keeper" page={title} />
			<SkullKeeperNavBar
				page="Round"
				round={roundIndex}
				handleNavigate={handleNavigate}
			/>
			<form className="flex justify-center">
				<div className="flex flex-wrap justify-center -mx-3 mb-3 max-w-4xl">
					<TextInput
						header="Player 1"
						input={player1}
						handleChange={setPlayer1}
					/>
					<TextInput
						header="Player 2"
						input={player2}
						handleChange={setPlayer2}
					/>
					<TextInput
						header="Player 3"
						input={player3}
						handleChange={setPlayer3}
					/>
					<TextInput
						header="Player 4"
						input={player4}
						handleChange={setPlayer4}
					/>
					<TextInput
						header="Player 5"
						input={player5}
						handleChange={setPlayer5}
					/>
					<TextInput
						header="Player 6"
						input={player6}
						handleChange={setPlayer6}
					/>
					<TextInput
						header="Player 7"
						input={player7}
						handleChange={setPlayer7}
					/>
					<TextInput
						header="Player 8"
						input={player8}
						handleChange={setPlayer8}
					/>
				</div>
			</form>
		</div>
	);
}
