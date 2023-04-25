import { Player } from "../../../types/doodler";
import { useEffect, useState } from "react";

type Props = {
	action: any;
	playerAssignmentIndex: number;
	players: Player[];
	options: string[];
};

export default function SecondGuess({
	action,
	players,
	playerAssignmentIndex,
	options,
}: Props) {
	const [playerDisplays, setPlayerDisplays] = useState(
		new Array<JSX.Element>()
	);
	const optionDisplays = options.map((option: string) => {
		return <div className="flex-row">{option}</div>;
	});
	const [message, setMessage] = useState(
		"What option describes the Doodle the best?"
	);

	useEffect(() => {
		var readyToContinue = true;
		var updatedPlayers = players.map((player) => {
			if (!player.firstGuess) readyToContinue = false;

			return (
				<div key={player.id}>
					{player.firstGuess && (
						<div className="m-3">
							<img
								className="border-2 rounded-md border-teal-500"
								key={player.name}
								src={player.pictureURL}
								width={200}
								height={200}
							/>
							<div className="flex mt-3 self-stretch justify-center text-lg text-teal-700 uppercase font-extrabold">
								{player.name} Finished!
							</div>
						</div>
					)}
				</div>
			);
		});

		setPlayerDisplays(updatedPlayers);
		if (readyToContinue) {
			setMessage("All finished!");
			setTimeout(function () {
				setMessage("Lets see the results!");
			}, 1500);
			setTimeout(function () {
				action();
			}, 1500);
		}
	}, [players]);

	return (
		<div className="flex self-stretch w-screen justify-center">
			<div className="flex-col space-y-3">
				<div className="flex self-stretch justify-center">{message}</div>
				<div className="flex self-stretch justify-center">
					<img
						className="border-2 rounded-md border-teal-500"
						src={players[playerAssignmentIndex].assignment.drawingURL}
						width={200}
						height={200}
					/>
				</div>
				{optionDisplays}
				<div>list of options</div>
				<div className="flex self-stretch justify-center max-w-7xl">
					<div className="flex flex-wrap">{playerDisplays}</div>
				</div>
			</div>
		</div>
	);
}
