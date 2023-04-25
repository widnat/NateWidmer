import { useEffect, useRef, useState } from "react";
import {
	Message,
	AddPlayerMessage,
	Player,
	DoodleAssignment,
} from "@/types/doodler";
import StartGame from "@/components/doodler/presenter/StartGame";
import Spinner from "@/components/Spinner";
import NavBar from "@/components/NavBar/NavBar";
import Title from "@/components/Title";
import CreateAssignmentDoodles from "@/components/doodler/presenter/CreateAssignmentDoodles";
import { GetRandomDoodleAssignment } from "@/components/doodler/DoodlerEngine";
import FirstGuess from "@/components/doodler/presenter/FirstGuess";
import SecondGuess from "@/components/doodler/presenter/SecondGuess";

export default function Doodler() {
	const [_players, _setPlayers] = useState<Player[]>([]);
	const playersRef = useRef(_players);
	const setPlayers = (updatedPlayers: Player[]) => {
		playersRef.current = updatedPlayers;
		_setPlayers(updatedPlayers);
	};
	const [isFirstGuess, setIsFirstGuess] = useState(false);
	const [options, setOptions] = useState(new Array<string>());
	const [isSecondGuess, setIsSecondGuess] = useState(false);
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
			var logMsg =
				"added " +
				addPlayerMessage.name +
				" with playerId:" +
				nextNewPlayerIndex.current;
			console.log(logMsg);

			nextNewPlayerIndex.current++;
			setPlayers([...playersRef.current, newPlayer]);
		} else if (message.type === "submit assignment doodle") {
			var players = new Array<Player>();
			playersRef.current.forEach((player) => {
				if (player.id === message.playerId)
					player.assignment.drawingURL = message.value;

				players.push(player);
			});

			setPlayers(players);
			var logMsg = "got assignment doodle from playerId:" + message.playerId;
			console.log(logMsg);
			logMsg =
				"the assignment drawing url has a value: " +
				(playersRef.current[message.playerId].assignment.drawingURL !== "");
			console.log(logMsg);
		} else if (message.type === "submit first guess") {
			var players = new Array<Player>();
			playersRef.current.forEach((player) => {
				if (player.id === message.playerId) player.firstGuess = message.value;

				players.push(player);
			});

			setPlayers(players);
			var logMsg = "got first guess from playerId:" + message.playerId;
			console.log(logMsg);
		} else if (message.type === "submit second guess") {
			//show results for this round then start next round
		}
	}

	function CreateDoodles() {
		setRound(1);
		var updatedPlayers = new Array<Player>();
		playersRef.current.forEach((player) => {
			var assignment = GetRandomDoodleAssignment();
			var newPlayer = {
				id: player.id,
				name: player.name,
				pictureURL: player.pictureURL,
				assignment: assignment,
				score: player.score,
			} as Player;
			updatedPlayers.push(newPlayer);
			var msg = {
				type: "create doodle",
				gameIndex: gameIndex,
				playerId: newPlayer.id,
				value: assignment.assignment,
			} as Message;
			SendMessage(msg);
		});

		setPlayers(updatedPlayers);
	}

	function GoToNextPlayerAssignment() {
		setRound(-1);
		setIsFirstGuess(true);
		setIsSecondGuess(false);
		console.log("in GoToNextPlayerAssignment");
		var index = playerAssignmentIndex + 1;
		var assignmentIndexMsg = "player assignment index: " + index;
		console.log(assignmentIndexMsg);
		setPlayerAssignmentIndex(index);
		var updatedPlayers = playersRef.current;
		updatedPlayers.forEach((player) => {
			player.firstGuess = "";
			player.secondGuess = "";
		});
		setPlayers(updatedPlayers);

		playersRef.current.forEach((player) => {
			if (player.id === index) {
				var logMsg =
					"playerId: " + player.id + " is waiting for others to guess";
				console.log(logMsg);
				var msg = {
					type: "sit back and relax",
					gameIndex: gameIndex,
					playerId: player.id,
				} as Message;
				SendMessage(msg);
			} else {
				var logMsg =
					"playerId: " + player.id + " is about to make their first guess";
				console.log(logMsg);
				var msg = {
					type: "time to guess",
					gameIndex: gameIndex,
					playerId: player.id,
				} as Message;
				SendMessage(msg);
			}
		});
	}

	function StartSecondGuess() {
		console.log("in StartSecondGuess");
		var updatedOptions = new Array<string>();
		playersRef.current.forEach((player) => {
			if (player.firstGuess)
				updatedOptions.push(player.firstGuess);
		});
		setOptions(updatedOptions);
		var updatedOptionsString = JSON.stringify(updatedOptions);
		playersRef.current.forEach((player) => {
			if (player.id !== playerAssignmentIndex) {
				var logMsg =
					"playerId: " + player.id + " is about to make their second guess";
				console.log(logMsg);
				var msg = {
					type: "time to guess again",
					gameIndex: gameIndex,
					playerId: player.id,
					value: updatedOptionsString,
				} as Message;
				SendMessage(msg);
			}
		});
	}

	function FinishSecondGuess() {
		console.log("in FinishSecondGuess");
	}

	function SendMessage(msg: Message) {
		var jsonRequest = JSON.stringify(msg);
		if (ws.current !== undefined) {
			ws.current.send(jsonRequest);
		}
	}

	return (
		<div>
			<NavBar />
			<Title title="Doodler" page="" />
			{loading && <Spinner message="loading..." />}
			{round === 0 && (
				<StartGame
					gameIndex={gameIndex}
					action={CreateDoodles}
					players={playersRef.current}
				/>
			)}
			{round === 1 && (
				<CreateAssignmentDoodles
					action={GoToNextPlayerAssignment}
					players={playersRef.current}
				/>
			)}
			{playerAssignmentIndex > -1 && isFirstGuess && (
				<FirstGuess
					action={StartSecondGuess}
					players={playersRef.current}
					playerAssignmentIndex={playerAssignmentIndex}
				/>
			)}
			{playerAssignmentIndex > -1 && isSecondGuess && (
				<SecondGuess
					action={FinishSecondGuess}
					players={playersRef.current}
					playerAssignmentIndex={playerAssignmentIndex}
					options={options}
				/>
			)}
		</div>
	);
}
