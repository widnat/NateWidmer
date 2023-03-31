import NavBar from "@/components/NavBar/NavBar";
import Title from "@/components/skullKing/Title";
import { useStoreSelector } from "@/hooks/store";
import { doodlerState } from "@/store/doodler/doodlerSlice";
import { useEffect, useState } from "react";
import Btn from "@/components/doodler/Btn";

type Props = {
	gameIndex: number;
	action: any;
};

export default function StartGame({ gameIndex, action }: Props) {
	const playersState = useStoreSelector(doodlerState).players;
	const [players, setPlayers] = useState(new Array<JSX.Element>());

	useEffect(() => {
		var updatedPlayers = playersState.map((player) => {
			return (
				<div className="m-3">
					<img
						className="border-2 rounded-md border-teal-500"
						key={player.name}
						src={player.pictureURL}
						width={200}
						height={200}
					/>
					<div className="flex mt-3 self-stretch justify-center text-lg text-teal-700 uppercase font-extrabold">
						{player.name}
					</div>
				</div>
			);
		});
		setPlayers(updatedPlayers);
	}, [playersState]);

	return (
		<div>
			{gameIndex != -1 && (
				<div className="flex self-stretch w-screen justify-center">
					<div className="flex-col space-y-3">
						<div className="flex self-stretch justify-center">
							Add player by entering this url in a browser
						</div>
						<div className="flex self-stretch justify-center">
							http://localhost:3000/doodler/{gameIndex}/player
						</div>
						<div className="flex self-stretch justify-center">
							<Btn action={() => action()} text="Start Game" />
						</div>

						<div className="flex self-stretch justify-center max-w-7xl">
							<div className="flex flex-wrap">{players}</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
