import { useStoreDispatch, useStoreSelector } from "@/hooks/store";
import { doodlerState, addPlayer } from "@/store/doodler/doodlerSlice";
import { useEffect, useState } from "react";
import { Message, AddPlayerMessage, Player } from "@/types/doodler";
import StartGame from "@/components/doodler/presenter/StartGame";

export default function Doodler() {
	const dispatch = useStoreDispatch();
	const playersState = useStoreSelector(doodlerState).players;
	var hasConstructed = false;
	const [gameIndex, setGameIndex] = useState(-1);
	const [round, setRound] = useState(0);
	let webSocket: WebSocket;

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

	function CreateDoodles() {
		setRound(round);
		var msg = {
			type: "create doodles",
			gameIndex: gameIndex,
			value: "",
		} as Message;

		webSocket.send();
	}

	return (
		<div>
			{round === 0 && <StartGame gameIndex={gameIndex} action={StartRound} />}
		</div>
	);
}
