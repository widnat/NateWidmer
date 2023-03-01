import NavBar from "../../components/NavBar/NavBar";
import SkullKeeperNavBar from "../../components/skullKing/NavBar";
import Title from "../../components/skullKing/Title";
import PlayerNameInput from "../../components/skullKing/PlayerNameInput";
import { useStoreDispatch, useStoreSelector } from "../../store/hooks";
import { playersState } from "../../store/skullKeeper/playersSlice";
import { createRounds } from "../../store/skullKeeper/roundsSlice";
import type { Player } from "../../types/skullKeeper";
import { useRouter } from "next/router";

export default function SkullKeeper() {
	const router = useRouter();
	const dispatch = useStoreDispatch();
	const players = useStoreSelector(playersState);
	const nextRoute = "/skullKeeper/round/1";
	const playerInputs = players.players.map((player: Player) => {
		return <PlayerNameInput key={player.index} player={player} />;
	});
	function handleNavigate(route: string) {
		dispatch(createRounds(1));
		router.push(nextRoute);
	}

	return (
		<div>
			<NavBar />
			<Title title="Skull Keeper" page="Players" />
			<SkullKeeperNavBar
				page="Players"
				round={0}
				handleNavigate={handleNavigate}
			/>
			<form className="flex justify-center">
				<div className="flex flex-wrap justify-center -mx-3 mb-3 max-w-4xl">
					{playerInputs}
				</div>
			</form>
		</div>
	);
}
