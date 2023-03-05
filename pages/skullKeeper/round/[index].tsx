import NavBar from "../../../components/NavBar/NavBar";
import SkullKeeperNavBar from "../../../components/skullKing/NavBar";
import Title from "../../../components/skullKing/Title";
import PlayerInfo from "../../../components/skullKing/PlayerInfo";
import { useStoreSelector } from "../../../store/hooks";
import { roundsState } from "../../../store/skullKeeper/roundsSlice";
import { playersState } from "../../../store/skullKeeper/playersSlice";
import { useRouter } from "next/router";

export default function SkullKeeper() {
	const router = useRouter();
	const roundIndex = Number(router.query.index);
	const title = "Round " + roundIndex;
	const players = useStoreSelector(playersState);
	const round = useStoreSelector(roundsState)[roundIndex];
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
		if (route === "players") router.push("/skullKeeper/players");
		else if (route === "previous")
			router.push("/skullKeeper/round/" + Number(roundIndex - 1));
		else if (route === "next")
			router.push("/skullKeeper/round/" + Number(roundIndex + 1));
		else if (route === "results") router.push("/skullKeeper/results");
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
