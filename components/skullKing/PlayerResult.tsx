import React from "react";
import ShortDisplay from "./ShortDisplay";
import { useStoreDispatch, useStoreSelector } from "../../store/hooks";
import { Player, PlayerRound } from "../../types/skullKeeper";

type Props = {
	player: Player;
	playerRound: PlayerRound;
};

export default function PlayerResult({ player, playerRound }: Props) {
	return (
		<div className="flex-col mx-2 mb-2">
			<label className="uppercase tracking-wide text-gray-700 text-xs font-bold">
				{player.name}
			</label>
			<form className="flex-row">
				<div className="flex">
					<ShortDisplay title="Total" value={playerRound.total} />
				</div>
			</form>
		</div>
	);
}
