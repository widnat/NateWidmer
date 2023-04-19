import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AddPlayerMessage, Message } from "@/types/doodler";
import JoinGame from "@/components/doodler/player/JoinGame";
import CreateAssignmentDoodle from "@/components/doodler/player/CreateAssignmentDoodle";
import NavBar from "@/components/NavBar/NavBar";
import Title from "@/components/Title";
import PlayersFirstGuess from "@/components/doodler/player/PlayersFirstGuess";

export default function Doodler() {
	const router = useRouter();
	const gameIndex = Number(router.query.gameIndex);
	const [connected, setConnected] = useState(false);
	var hasConstructed = false;
	const playerId = useRef<number>(-1);
	const [doodleAssignment, setDoodleAssignment] = useState("");
	const [round, setRound] = useState(0);
	const [isPlayersAssignment, setIsPlayersAssignment] = useState(false);
	const [isFirstGuess, setIsFirstGuess] = useState(false);
	const ws = useRef<WebSocket>();

	useEffect(() => {
		if (!hasConstructed && router.isReady) {
			hasConstructed = true;
			ws.current = new WebSocket("ws://localhost:8080", String(gameIndex));
			ws.current.onerror = (err) => console.error(err);
			ws.current.onopen = (event) => setConnected(true);
			ws.current.onmessage = (msg: any) => handleServerMessage(msg.data);
		}
	}, [router.isReady]);

	function handleServerMessage(msg: string) {
		const message = JSON.parse(msg) as Message;
		if (message.type === "player id") {
			playerId.current = Number(message.value);
		} else if (message.type === "create doodle") {
			setDoodleAssignment(message.value);
			setRound(1);
		} else if (message.type === "sit back and relax") {
			console.log("waiting for other players to guess");
			setRound(-1);
			setIsPlayersAssignment(true);
		} else if (message.type === "time to guess") {
			console.log("ready to guess");
			setRound(-1);
			setIsPlayersAssignment(false);
			setIsFirstGuess(true);
		}
	}

	function joinGame(playerName: string, doodleURL: string) {
		var addPlayer = {
			name: playerName,
			imageUrl: doodleURL,
		} as AddPlayerMessage;
		var jsonAddPlayer = JSON.stringify(addPlayer);
		var msg = {
			type: "add player",
			gameIndex: gameIndex,
			value: jsonAddPlayer,
		} as Message;
		SendMessage(msg);
	}

	function submitAssignmentDoodle(doodleURL: string) {
		var msg = {
			type: "submit assignment doodle",
			gameIndex: gameIndex,
			playerId: playerId.current,
			value: doodleURL,
		} as Message;
		SendMessage(msg);
	}

	function submitFirstGuess(guess: string) {
		var msg = {
			type: "submit first guess",
			gameIndex: gameIndex,
			playerId: playerId.current,
			value: guess,
		} as Message;
		SendMessage(msg);
	}

	function SendMessage(msg: Message) {
		var jsonRequest = JSON.stringify(msg);
		if (ws.current !== undefined) {
			ws.current.send(jsonRequest);
		}
	}

	return (
		<>
			<NavBar />
			<Title title="Doodler" page="" />
			{connected && round === 0 && <JoinGame action={joinGame} />}
			{connected && round === 1 && (
				<CreateAssignmentDoodle
					action={submitAssignmentDoodle}
					assignment={doodleAssignment}
				/>
			)}
			{connected && isPlayersAssignment && (
				<div className="h-screen">
					<div className="flex items-center justify-center">
						sit back and relax while the others guess!
					</div>
				</div>
			)}
			{connected && isFirstGuess && (
				<div className="h-screen">
					<PlayersFirstGuess submitGuess={submitFirstGuess} />
				</div>
			)}
		</>
	);
}
