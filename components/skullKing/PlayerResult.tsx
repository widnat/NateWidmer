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
		<ShortDisplay title={player.name} value={playerRound.total} />
	);
}
