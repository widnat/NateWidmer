import React from "react";
import BidBtn from "./BidBtn";
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
				{player.name}
			</label>
			<form className="flex-row">
				<div className="flex -mx-3 mb-3">
					<BidBtn roundIndex={1} player={player} playerRound={playerRound} />
					{/* <BidBtn />
					<BidBtn />
					<ShortDisplay /> */}
				</div>
			</form>
		</div>
	);
}
