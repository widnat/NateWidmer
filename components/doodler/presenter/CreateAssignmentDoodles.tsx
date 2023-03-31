import { useStoreSelector } from "@/hooks/store";
import { doodlerState } from "@/store/doodler/doodlerSlice";
import { useEffect, useState } from "react";

type Props = {
	action: any;
};

export default function CreateAssignmentDoodles({ action }: Props) {
	const playersState = useStoreSelector(doodlerState).players;
	const [players, setPlayers] = useState(new Array<JSX.Element>());

	useEffect(() => {
		var readyToContinue = true;
		var updatedPlayers = playersState.map((player) => {
			if (!player.assignment?.drawingURL) readyToContinue = false;

			return (
				<>
					{player.assignment?.drawingURL && (
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
				</>
			);
		});

		setPlayers(updatedPlayers);
		if (readyToContinue) action();
	}, [playersState]);

	return (
		<div className="flex self-stretch w-screen justify-center">
			<div className="flex-col space-y-3">
				<div className="flex self-stretch justify-center">
					Doodlers, do your best to draw your assignment!
				</div>
				<div className="flex self-stretch justify-center max-w-7xl">
					<div className="flex flex-wrap">{players}</div>
				</div>
			</div>
		</div>
	);
}
