import React from "react";
import BidBtn from "./BidBtn";
import WonBtn from "./WonBtn";
import BonusBtn from "./BonusBtn";
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
		<div className="flex-col mx-2 mb-2">
			<label className="uppercase tracking-wide text-gray-700 text-xs font-bold">
				{player.name}
			</label>
			<form className="flex-row">
				<div className="flex">
					<BidBtn player={player} playerRound={playerRound} />
					<WonBtn player={player} playerRound={playerRound} />
					<BonusBtn player={player} playerRound={playerRound} />
					<ShortDisplay title="Total" value={playerRound.total} />
				</div>
			</form>
		</div>
	);
}
