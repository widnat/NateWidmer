import NavBar from "../../components/NavBar/NavBar";
import Title from "../../components/skullKing/Title";
import { useStoreDispatch, useStoreSelector } from "../../hooks/store";
import { doodlerState, addPlayer } from "../../store/doodler/doodlerSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Message, AddPlayerMessage, Player } from "../../types/doodler";

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
		}
	}, []);

	function handleServerMessage(msg: string) {
		const message = JSON.parse(msg) as Message;
		if (message.type === "game index") {
			setGameIndex(Number(message.value));
		} else if (message.type === "add player") {
			const addPlayerMessage = JSON.parse(message.value) as AddPlayerMessage;
			addPlayerMessage.imageUrl;
			var newPlayer = {
				index: playersState.length,
				name: addPlayerMessage.name,
				pictureURL: addPlayerMessage.imageUrl,
				drawingURL: "",
				score: 0,
			} as Player;

			dispatch(addPlayer(newPlayer));
		}
	}

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
			<NavBar />
			<Title title="Doodler" page="" />
			{gameIndex != -1 && (
				<div className="flex self-stretch w-screen justify-center">
					<div className="flex-col">
						<div>Add player by entering this url in a browser</div>
						<div>http://localhost:3000/doodler/{gameIndex}/add-player</div>
						<div className="flex self-stretch justify-center max-w-7xl">
							<div className="flex flex-wrap">{players}</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
