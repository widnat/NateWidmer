import { useState, useEffect } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import SkullKeeperNavBar from "../../../components/skullKing/NavBar";
import Title from "../../../components/skullKing/Title";
import PlayerInfo from "../../../components/skullKing/PlayerInfo";
import { useStoreDispatch, useStoreSelector } from "../../../store/hooks";
import { roundsState } from "../../../store/skullKeeper/roundsSlice";
import { playersState } from "../../../store/skullKeeper/playersSlice";
import type { Player, PlayerRound } from "../../../types/skullKeeper";
import { useRouter } from "next/router";

export default function SkullKeeper() {
	const router = useRouter();
	const roundIndex = Number(router.query.index);
	const title = "Round " + roundIndex;
	const dispatch = useStoreDispatch();
	const players = useStoreSelector(playersState).players;
	const round = useStoreSelector(roundsState).rounds[roundIndex];
	const previousRoute = "/skullKeeper/round[" + String(roundIndex - 1) + "]";
	const nextRoute = "/skullKeeper/round/1";
	const playersRoute = "/skullKeeper/players";
	const resultsRoute = "/skullKeeper/results";

	function handleNavigate(route: string) {
		var index = 0;
		// if (player1) addPlayerDispatch(player1, index);
		// if (player2 && ++index) addPlayerDispatch(player2, index);
		// if (player3 && ++index) addPlayerDispatch(player3, index);
		// if (player4 && ++index) addPlayerDispatch(player4, index);
		// if (player5 && ++index) addPlayerDispatch(player5, index);
		// if (player6 && ++index) addPlayerDispatch(player6, index);
		// if (player7 && ++index) addPlayerDispatch(player7, index);
		// if (player8 && ++index) addPlayerDispatch(player7, index);
	}

	// function addPlayerDispatch(name: string, index: number) {
	// 	dispatch(
	// 		addPlayer({
	// 			name: name,
	// 			index: index,
	// 		} as Player)
	// 	);
	// }

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
				<PlayerInfo player={players[0]} playerRound={round.playerRounds[0]} />
			</div>
		</div>
	);
}
