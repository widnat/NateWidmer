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
	const players = useStoreSelector(playersState);
	const round = useStoreSelector(roundsState)[roundIndex];
	const previousRoute = "/skullKeeper/round[" + String(roundIndex - 1) + "]";
	const nextRoute = "/skullKeeper/round/1";
	const playersRoute = "/skullKeeper/players";
	const resultsRoute = "/skullKeeper/results";
	const playerInfoList = players.map((player) => {
		if (player.name)
			return (
				<PlayerInfo
					key={player.index}
					player={player}
					playerRound={round.playerRounds[player.index]}
				/>
			);
	});

	function handleNavigate(route: string) {
		// var numPlayers = 0;
		// players.forEach((player: Player) => {
		// 	if (player.name) ++numPlayers;
		// });
		// dispatch(createRounds(numPlayers));
		// router.push("/skullKeeper/round/1");
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
				<div className="flex justify-center lg:max-w-5xl sm:max-w-xs">
					<div className="flex flex-wrap justify-start">{playerInfoList}</div>
				</div>
			</div>
		</div>
	);
}
