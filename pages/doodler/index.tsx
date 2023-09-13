import { useEffect, useRef, useState } from "react";
const axios = require('axios').default;
import { Message, AddPlayerMessage, Player, ChatGptResponse, DoodleAssignment } from "@/types/doodler";
import StartGame from "@/components/doodler/presenter/StartGame";
import Spinner from "@/components/Spinner";
import NavBar from "@/components/NavBar/NavBar";
import Title from "@/components/Title";
import CreateAssignmentDoodles from "@/components/doodler/presenter/CreateAssignmentDoodles";
import FirstGuess from "@/components/doodler/presenter/FirstGuess";
import SecondGuess from "@/components/doodler/presenter/SecondGuess";
import Results from "@/components/doodler/presenter/Results";
import { PresenterComponent, MessageType } from "@/enums/doodler";

export default function Doodler() {
	const [_players, _setPlayers] = useState<Player[]>([]);
	const playersRef = useRef(_players);
	const setPlayers = (updatedPlayers: Player[]) => {
		playersRef.current = updatedPlayers;
		_setPlayers(updatedPlayers);
	};
	const serverAddress = "ws://localhost:8080"; // change this in production
	const [options, setOptions] = useState(new Array<string>());
	var hasConstructed = false;
	const [gameIndex, setGameIndex] = useState(-1);
	const [playerAssignmentIndex, setPlayerAssignmentIndex] = useState(-1);
	const [component, setComponent] = useState(PresenterComponent.StartGame);
	const [loading, setLoading] = useState(true);
	const [resultsMessage, setResultsMessage] = useState(
		"That was a great round!"
	);
	const ws = useRef<WebSocket>();
	var nextNewPlayerIndex = useRef(0);

	useEffect(() => {
		if (!hasConstructed) {
			hasConstructed = true;
			ws.current = new WebSocket(serverAddress, "presenter"); 
			ws.current.onerror = (err) => console.error(err);
			ws.current.onopen = (event) => setLoading(false);
			ws.current.onmessage = (msg: any) => handleServerMessage(msg.data);
		}
	}, []);

	function handleServerMessage(msg: string) {
		const message = JSON.parse(msg) as Message;
		if (message.type === MessageType.GameIndex) {
			setGameIndex(Number(message.value));
		} else if (message.type === MessageType.AddPlayer) {
			const addPlayerMessage = JSON.parse(message.value) as AddPlayerMessage;
			addPlayer(addPlayerMessage);
		} else if (message.type === MessageType.SubmitAssignmentDoodle) {
			submitAssignmentDoodle(message);
		} else if (message.type === MessageType.SubmitFirstGuess) {
			submitFirstGuess(message);
		} else if (message.type === MessageType.SubmitSecondGuess) {
			submitSecondGuess(message);
		}
	}

	function addPlayer(message : AddPlayerMessage) {
		var newPlayer = {
			id: nextNewPlayerIndex.current,
			name: message.name,
			pictureURL: message.imageUrl,
			score: 0,
		} as Player;
		var logMsg = `added ${message.name} with playerid: ${nextNewPlayerIndex.current}`;
		console.log(logMsg);
		nextNewPlayerIndex.current++;
		setPlayers([...playersRef.current, newPlayer]);
	}

	function submitAssignmentDoodle(message : Message) {
		var players = new Array<Player>();
		playersRef.current.forEach((player) => {
			if (player.id === message.playerId)
				player.assignment.drawingURL = message.value;

			players.push(player);
		});

		setPlayers(players);
		var logMsg = `got assignment doodle from playerId:  ${message.playerId}`;
		console.log(logMsg);
		logMsg =
			"the assignment drawing url has a value: " +
			(playersRef.current[message.playerId].assignment.drawingURL !== "");
		console.log(logMsg);
	}

	function submitFirstGuess(message : Message) {
		var players = new Array<Player>();
		playersRef.current.forEach((player) => {
			if (player.id === message.playerId) player.firstGuess = message.value;

			players.push(player);
		});

		setPlayers(players);
		var logMsg = "got first guess from playerId:" + message.playerId;
		console.log(logMsg);
	}
	
	function submitSecondGuess(message : Message) {
		var players = new Array<Player>();
		playersRef.current.forEach((player) => {
			if (player.id === message.playerId) player.secondGuess = message.value;

			players.push(player);
		});

		setPlayers(players);
		var logMsg = "got second guess from playerId:" + message.playerId;
		console.log(logMsg);
	}

	function CreateDoodles() {
		if (playersRef.current.length > 1) {
			setComponent(PresenterComponent.CreateAssignment);
			var updatedPlayers = new Array<Player>();
			playersRef.current.forEach((player) => {
				axios.get('ws://localhost:8080/getChatGptDrawingAssignment') // change this in production
				.then(function (response : ChatGptResponse) {
					console.log(response);
					if (response.success) {
						var newPlayer = AskPlayerToCreateDoodle(player, response.content);
						updatedPlayers.push(newPlayer);
					}
				  })
				  .catch(function (error : any) {
					console.log(`issue getting drawing description from server: ${error}`)
					//how should I notify the user or try again
				  })
			});

			setPlayers(updatedPlayers);
		}
	}

	function AskPlayerToCreateDoodle(player: Player, drawingDescription: string) {
		var doodleAssignment:DoodleAssignment = {
			assignment: drawingDescription,
			drawingURL: ''
		};
		var newPlayer = {
			id: player.id,
			name: player.name,
			pictureURL: player.pictureURL,
			assignment: doodleAssignment,
			score: player.score,
		} as Player;
		var msg = {
			type: MessageType.CreateDoodle,
			gameIndex: gameIndex,
			playerId: newPlayer.id,
			value: doodleAssignment.assignment,
		} as Message;
		SendMessage(msg);

		return newPlayer;
	}

	function GoToNextPlayerAssignment() {
		setComponent(PresenterComponent.FirstGuess);
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
					type: MessageType.WaitingForOtherPlayers,
					gameIndex: gameIndex,
					playerId: player.id,
				} as Message;
				SendMessage(msg);
			} else {
				var logMsg =
					"playerId: " + player.id + " is about to make their first guess";
				console.log(logMsg);
				var msg = {
					type: MessageType.MakeAGuess,
					gameIndex: gameIndex,
					playerId: player.id,
				} as Message;
				SendMessage(msg);
			}
		});
	}

	function FinishFirstGuess() {
		setComponent(PresenterComponent.SecondGuess)
		console.log("in FinishFirstGuess");
		var updatedOptions = new Array<string>();
		playersRef.current.forEach((player) => {
			if (player.firstGuess) updatedOptions.push(player.firstGuess);
		});
		var curAssignment = playersRef.current[playerAssignmentIndex].assignment;
		var randomIndex = Math.floor(Math.random() * updatedOptions.length);
		updatedOptions.splice(randomIndex, 0, curAssignment.assignment);
		setOptions(updatedOptions);
		var updatedOptionsString = JSON.stringify(updatedOptions);
		playersRef.current.forEach((player) => {
			if (player.id !== playerAssignmentIndex) {
				var logMsg =
					"playerId: " + player.id + " is about to make their second guess";
				console.log(logMsg);
				var msg = {
					type: MessageType.ChooseYourAnswer,
					gameIndex: gameIndex,
					playerId: player.id,
					value: updatedOptionsString,
				} as Message;
				SendMessage(msg);
			}
		});
	}

	function FinishSecondGuess() {
		if (playerAssignmentIndex == playersRef.current.length - 1)
			setResultsMessage("Here are the final results!");

		console.log("in FinishSecondGuess");
		var playerAssignment = playersRef.current[playerAssignmentIndex].assignment;
		var updatedPlayers = new Array<Player>();
		playersRef.current.forEach((player) => {
			player.score += GetPoints(player.firstGuess, playerAssignment.answers);
			player.score += GetPoints(player.secondGuess, playerAssignment.answers);
			updatedPlayers.push(player);
		});
		setPlayers(updatedPlayers);
		setComponent(PresenterComponent.Results)
		setTimeout(function () {
			if (playerAssignmentIndex < playersRef.current.length - 1)
				GoToNextPlayerAssignment();
		}, 5000);
	}

	function GetPoints(guess: string, answers: string[]) {
		var points = 0;
		answers.forEach((answer) => {
			if (guess.includes(answer)) points += 5;
		});

		return points;
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
			{component === PresenterComponent.StartGame && (
				<StartGame
					gameIndex={gameIndex}
					action={CreateDoodles}
					players={playersRef.current}
				/>
			)}
			{component === PresenterComponent.CreateAssignment && (
				<CreateAssignmentDoodles
					action={GoToNextPlayerAssignment}
					players={playersRef.current}
				/>
			)}
			{component === PresenterComponent.FirstGuess && (
				<FirstGuess
					action={FinishFirstGuess}
					players={playersRef.current}
					playerAssignmentIndex={playerAssignmentIndex}
				/>
			)}
			{component === PresenterComponent.SecondGuess && (
				<SecondGuess
					action={FinishSecondGuess}
					players={playersRef.current}
					playerAssignmentIndex={playerAssignmentIndex}
					options={options}
				/>
			)}
			{component === PresenterComponent.Results && (
				<Results message={resultsMessage} players={playersRef.current} />
			)}
		</div>
	);
}
