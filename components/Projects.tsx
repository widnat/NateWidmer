import React from "react";
import Racism from "./projects/Racism";
import Stack from "react-bootstrap/Stack";

export default function Projects() {
	const theme = "light";

	return (
		<Stack gap={3}>
			<Racism variant={theme} />
		</Stack>
	);
}
