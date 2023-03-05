import NavBar from "../../components/NavBar/NavBar";
import SkullKeeperNavBar from "../../components/skullKing/NavBar";
import Title from "../../components/skullKing/Title";
import PlayerResult from "../../components/skullKing/PlayerResult";
import { useStoreDispatch, useStoreSelector } from "../../store/hooks";
import { roundsState, createRounds } from "../../store/skullKeeper/roundsSlice";
import { playersState } from "../../store/skullKeeper/playersSlice";
import { useRouter } from "next/router";
import { Player, PlayerRound } from "../../types/skullKeeper";

export default function Results() {
	const router = useRouter();
	const roundIndex = 9;
	const title = "Results";
	const round = useStoreSelector(roundsState)[roundIndex];
	var playerRounds = new Array<PlayerRound>();
	round.playerRounds.forEach((playerRound) => playerRounds.push(playerRound));
	const players = useStoreSelector(playersState);
	const sortedPlayerRounds = playerRounds.sort((playerRound1, playerRound2) =>
		getPlayer(playerRound1, playerRound2)
	);
	const dispatch = useStoreDispatch();
	const playerResults = sortedPlayerRounds.map((playerRound: PlayerRound) => {
		return (
			<PlayerResult
				key={playerRound.playerIndex}
				player={players[playerRound.playerIndex]}
				playerRound={playerRound}
			/>
		);
	});

	function getPlayer(playerRound1: PlayerRound, playerRound2: PlayerRound) {
		if (playerRound1.total < playerRound2.total) return playerRound1.total;

		return playerRound2.total;
	}

	function handleNavigate(route: string) {
		if (route === "previous") router.push("/skullKeeper/round/10");
		else if (route === "new game") router.push("/skullKeeper/players");
	}

	return (
		<div>
			<NavBar />
			<Title title="Skull Keeper" page={title} />
			<SkullKeeperNavBar
				page={title}
				round={roundIndex}
				handleNavigate={handleNavigate}
			/>
			<div className="flex justify-center">
				<div className="flex-col">{playerResults}</div>
			</div>
		</div>
	);
}
