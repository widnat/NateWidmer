import NavBar from "@/components/NavBar/NavBar";
import Title from "@/components/skullKing/Title";
import { useState } from "react";
import DrawingArea from "@/components/doodler/DrawingArea";
import PlayerNameInput from "@/components/doodler/PlayerNameInput";
import Spinner from "@/components/Spinner";

type Props = {
	action: any;
	assignment: string;
};

export default function CreateDoodle({ action, assignment }: Props) {
	const [playerName, setPlayerName] = useState("");
	const [waiting, setWaiting] = useState(false);

	function doneDrawing(doodleURL: string) {
		setWaiting(true);
		action(doodleURL);
	}

	return (
		<>
			<div className="h-screen">
				{!waiting && (
					<div>
						<div className="flex items-center justify-center">
							draw {assignment}
						</div>
						<DrawingArea action={doneDrawing} actionText="Join Game" />
					</div>
				)}
				{waiting && (
					<Spinner message="waiting for other players to finish..." />
				)}
			</div>
		</>
	);
}
