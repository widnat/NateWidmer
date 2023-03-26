import NavBar from "@/components/NavBar/NavBar";
import Title from "@/components/skullKing/Title";
import { useStoreDispatch, useStoreSelector } from "@/hooks/store";
import { doodlerState } from "@/store/doodler/doodlerSlice";
import { useRouter } from "next/router";
import DrawingArea from "@/components/doodler/DrawingArea";
import { useEffect, useState } from "react";
import { AddPlayerMessage, Message } from "@/types/doodler";
import PlayerNameInput from "@/components/doodler/PlayerNameInput";
import Spinner from "@/components/Spinner";
let webSocket: WebSocket;

export default function Doodler() {
	const router = useRouter();
	const gameIndex = Number(router.query.gameIndex);
	const dispatch = useStoreDispatch();
	const game = useStoreSelector(doodlerState);
	const [connected, setConnected] = useState(false);
	const [playerName, setPlayerName] = useState("");
	const [waiting, setWaiting] = useState(false);
	var playerId;
	var hasConstructed = false;

	useEffect(() => {
		if (!hasConstructed) {
			hasConstructed = true;
			webSocket = new WebSocket("ws://localhost:8080", String(gameIndex));
			webSocket.onerror = (err) => console.error(err);
			webSocket.onopen = (event) => setConnected(true);
			webSocket.onmessage = (msg: any) => handleServerMessage(msg.data);
		}
	}, []);

	function handleServerMessage(msg: string) {
		const message = JSON.parse(msg) as Message;
		if (message.type === "player id") {
			playerId = Number(message.value);
		}
	}

	function joinGame(doodleURL: string) {
		if (playerName) {
			var addPlayer = {
				name: playerName,
				imageUrl: doodleURL,
			} as AddPlayerMessage;
			var jsonAddPlayer = JSON.stringify(addPlayer);
			var addPlayerMessage = {
				type: "add player",
				gameIndex: gameIndex,
				value: jsonAddPlayer,
			} as Message;
			var jsonRequest = JSON.stringify(addPlayerMessage);
			webSocket.send(jsonRequest);
			setWaiting(true);
		} else alert("Please enter a name");
	}

	return (
		<>
			<div className="h-screen">
				<NavBar />
				<Title title="Doodler" page="" />
				{connected && !waiting && (
					<div>
						<PlayerNameInput updateName={setPlayerName} />
						<DrawingArea action={joinGame} actionText="Join Game" />
					</div>
				)}
				{waiting && <Spinner message="waiting for other players to begin..." />}
			</div>
		</>
	);
}
