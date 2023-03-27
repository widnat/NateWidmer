import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
	AddPlayerMessage,
	DoodleAssignment,
	Message,
	Player,
} from "@/types/doodler";
import JoinGame from "@/components/doodler/player/JoinGame";
import CreateDoodle from "@/components/doodler/player/CreateDoodle";
let webSocket: WebSocket;

export default function Doodler() {
	const router = useRouter();
	const gameIndex = Number(router.query.gameIndex);
	const [connected, setConnected] = useState(false);
	var hasConstructed = false;
	let playerId;
	let doodleAssignment = "";
	const [round, setRound] = useState(0);

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
		} else if (message.type === "create doodle") {
			doodleAssignment = message.value;
			setRound(1);
		}
	}

	function joinGame(playerName: string, doodleURL: string) {
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
	}

	function submitDoodle(doodleURL: string) {
		var msg = {
			type: "submit doodle",
			gameIndex: gameIndex,
			value: doodleURL,
		} as Message;
		var jsonRequest = JSON.stringify(msg);
		webSocket.send(jsonRequest);
	}

	return (
		<>
			{connected && round === 0 && <JoinGame action={joinGame} />}
			{connected && round === 1 && (
				<CreateDoodle action={submitDoodle} assignment={doodleAssignment} />
			)}
		</>
	);
}
