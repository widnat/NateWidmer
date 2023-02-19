import { useState, useEffect } from "react";
// import GameSetup from '../../components/calculator'

export default function Calculator() {
	const [round, setRound] = useState();

	return (
		<>
			<ButtonComponent cssClass="e-round-corner">Button</ButtonComponent>
		</>
	);
}
