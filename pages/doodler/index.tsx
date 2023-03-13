import NavBar from "../../components/NavBar/NavBar";
import Title from "../../components/skullKing/Title";
import { useStoreDispatch, useStoreSelector } from "../../hooks/store";
import { doodlerState } from "../../store/doodler/doodlerSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Player, Message, Connection } from "../../types/doodler";

export default function Doodler() {
	const router = useRouter();
	const dispatch = useStoreDispatch();
	const playersState = useStoreSelector(doodlerState).players;
	var hasConstructed = false;
	const [players, setPlayers] = useState(new Array<JSX.Element>());
	const [gameIndex, setGameIndex] = useState(-1);
	let webSocket: WebSocket;

	useEffect(() => {
		if (!hasConstructed) {
			hasConstructed = true;
			webSocket = new WebSocket("ws://localhost:8080", "presenter");
			webSocket.onerror = (err) => console.error(err);
			webSocket.onmessage = (msg: any) => handleServerMessage(msg.data);
			// webSocket.onmessage = (msg) => console.log(JSON.parse(msg.data));
		}
	}, []);

	function handleServerMessage(msg: string) {
		const message = JSON.parse(msg) as Message;
		if (message.type === "game index") {
			setGameIndex(Number(message.value));
		}
		// else if (message.type === "add player") {
		// 	const addPlayerUpdate = JSON.parse(message.value) as AddPlayerUpdate;
		// 	addPlayerUpdate.
		// }
	}

	useEffect(() => {
		var updatedPlayers = playersState.map((player) => {
			return <div>hey</div>;
		});
		setPlayers(updatedPlayers);
	}, [playersState]);

	return (
		<div>
			<NavBar />
			<Title title="Doodler" page="" />
			{gameIndex != -1 && (
				<div className="flex self-stretch w-screen justify-center">
					<div className="flex-col">
						<div>Add player by entering this url in a browser</div>
						<div>http://localhost:3000/doodler/{gameIndex}/add_player}</div>
					</div>
					{players}
				</div>
			)}
		</div>
	);
}
