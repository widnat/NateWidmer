import React from "react";
import ShortInput from "./ShortInput";
import ShortDisplay from "./ShortDisplay";
import { useStoreDispatch, useStoreSelector } from "../../store/hooks";
import { playersState } from "../../store/skullKeeper/playersSlice";
import { Player, PlayerRound } from "../../types/skullKeeper";

type Props = {
	player: Player;
	playerRound: PlayerRound;
};

export default function PlayerInfo({ player, playerRound }: Props) {
	const dispatch = useStoreDispatch();

	return (
		<div className="flex-col">
			<label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
				Player Name
			</label>
			<form className="flex-row">
				<div className="flex flex-wrap justify-center -mx-3 mb-3 max-w-6xl">
					<ShortInput />
					<ShortInput />
					<ShortInput />
					<ShortDisplay />
				</div>
			</form>
		</div>
	);
}
