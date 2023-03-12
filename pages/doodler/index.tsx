import NavBar from "../../components/NavBar/NavBar";
import Title from "../../components/skullKing/Title";
import { useStoreDispatch, useStoreSelector } from "../../hooks/store";
import { doodlerState } from "../../store/doodler/doodlerSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Player } from "../../types/doodler";

export default function Doodler() {
	const router = useRouter();
	const dispatch = useStoreDispatch();
	const playersState = useStoreSelector(doodlerState).players;
	const webSocket = useStoreSelector(doodlerState).webSocket;
	var hasConstructed = false;
	const [players, setPlayers] = useState(new Array<JSX.Element>());

	useEffect(() => {
		if (!hasConstructed) {
			hasConstructed = true;
			webSocket.onerror = (err) => console.error(err);
			webSocket.onopen = () => console.log("open");
			webSocket.onmessage = (msg) => console.log(msg.data);
			// webSocket.onmessage = (msg) => console.log(JSON.parse(msg.data));
		}
	}, []);

	useEffect(() => {
		var updatedPlayers = playersState.map((player: Player) => {
			return <div>hey</div>;
		});
		setPlayers(updatedPlayers);
	}, [playersState]);

	return (
		<div>
			<NavBar />
			<Title title="Doodler" page="" />
			<div className="flex self-stretch w-screen justify-center">
				<div className="flex-col">
					<div>Add player by entering this url in a browser</div>
					<div>http://localhost:3000/add_player</div>
				</div>
				{players}
			</div>
		</div>
	);
}