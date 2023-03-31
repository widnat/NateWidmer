import { useStoreDispatch, useStoreSelector } from "@/hooks/store";
import {
	doodlerState,
	addPlayer,
	updatePlayer,
} from "@/store/doodler/doodlerSlice";
import { useEffect, useRef, useState } from "react";
import {
	Message,
	AddPlayerMessage,
	Player,
	DoodleAssignment,
} from "@/types/doodler";
import StartGame from "@/components/doodler/presenter/StartGame";
import playersSlice from "@/store/skullKeeper/playersSlice";
import Spinner from "@/components/Spinner";
import NavBar from "@/components/NavBar/NavBar";
import Title from "@/components/skullKing/Title";
import CreateAssignmentDoodles from "@/components/doodler/presenter/CreateAssignmentDoodles";

export default function Doodler() {
	const dispatch = useStoreDispatch();
	const playersState = useStoreSelector(doodlerState).players;
	var hasConstructed = false;
	const [gameIndex, setGameIndex] = useState(-1);
	const [playerAssignmentIndex, setPlayerAssignmentIndex] = useState(-1);
	const [round, setRound] = useState(0);
	const [loading, setLoading] = useState(true);
	const ws = useRef<WebSocket>();
	var nextNewPlayerIndex = useRef(0);

	//start game
	//draw!
	// timer is going
	// timer ends
	// next page
	//what is it? shows an image
	// people guess from a list of choices and get points for guess
	// timer is going
	// when everyone has finished the next page goes
	// keep the image and show all the guesses
	// give points for guesses
	// music in background

	useEffect(() => {
		if (!hasConstructed) {
			hasConstructed = true;
			ws.current = new WebSocket("ws://localhost:8080", "presenter");
			ws.current.onerror = (err) => console.error(err);
			ws.current.onopen = (event) => setLoading(false);
			ws.current.onmessage = (msg: any) => handleServerMessage(msg.data);
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
				id: nextNewPlayerIndex.current,
				name: addPlayerMessage.name,
				pictureURL: addPlayerMessage.imageUrl,
				score: 0,
			} as Player;

			nextNewPlayerIndex.current++;
			dispatch(addPlayer(newPlayer));
		} else if (message.type === "submit doodle") {
			var player = playersState[message.playerId];
			player.assignment.drawingURL = message.value;
			dispatch(updatePlayer(player));
		}
	}

	function CreateDoodles() {
		setRound(1);
		playersState.forEach((playerState) => {
			var assignment = GetRandomDoodleAssignment();
			var player = {
				id: playerState.id,
				name: playerState.name,
				pictureURL: playerState.pictureURL,
				assignment: assignment,
				score: playerState.score,
			} as Player;
			dispatch(updatePlayer(player));
			var msg = {
				type: "create doodle",
				gameIndex: gameIndex,
				playerId: player.id,
				value: assignment.assignment,
			} as Message;
			var jsonRequest = JSON.stringify(msg);
			if (ws.current !== undefined) {
				ws.current.send(jsonRequest);
			}
		});
	}

	function GetRandomDoodleAssignment() {
		var acceptableGuesses = new Array<string>();
		acceptableGuesses.push("penguin");
		return {
			assignment: "a penguin",
			acceptableGuesses: acceptableGuesses,
		} as DoodleAssignment;
	}

	function GoToNextPlayerAssignment() {
		setPlayerAssignmentIndex(playerAssignmentIndex + 1);
	}

	return (
		<div>
			<NavBar />
			<Title title="Doodler" page="" />
			{loading && <Spinner message="loading..." />}
			{round === 0 && (
				<StartGame gameIndex={gameIndex} action={CreateDoodles} />
			)}
			{round === 1 && (
				<CreateAssignmentDoodles action={GoToNextPlayerAssignment} />
			)}
			{playerAssignmentIndex > 0 && (
				<>
					send assignment pic of first player to everyone except that player,
					send that player a waiting msg
				</>
			)}
		</div>
	);
}
