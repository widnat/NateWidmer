import { useEffect, useState } from "react";
import Btn from "@/components/doodler/Btn";
import { Player } from "@/types/doodler";

type Props = {
	action: any;
	players: Player[];
	playerAssignmentIndex: number;
};

export default function Results({ action, players }: Props) {
	const playerDisplays = players.map((player) => {
		return (
			<div key={player.id} className="m-3">
				<img
					className="border-2 rounded-md border-teal-500"
					key={player.name}
					src={player.pictureURL}
					width={200}
					height={200}
				/>
				<div className="flex mt-3 self-stretch justify-center text-lg text-teal-700 uppercase font-extrabold">
					{player.name}
					{"s score: "}
					{player.score}
				</div>
			</div>
		);
	});

	return (
		<div className="flex self-stretch w-screen justify-center">
			<div className="flex-col space-y-3">
				<div className="flex self-stretch justify-center">Results</div>
				<div className="flex self-stretch justify-center max-w-7xl">
					<div className="flex flex-wrap">{playerDisplays}</div>
				</div>
			</div>
		</div>
	);
}
