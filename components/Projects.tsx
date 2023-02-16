import React from "react";
import ProjectCard from "./ProjectCard";
import Stack from "react-bootstrap/Stack";

export default function Projects() {
	const theme = "light";

	return (
		<Stack gap={3}>
			<ProjectCard
				route=""
				title="Memoizit"
				description="Similar to memoization, this is an app that helps to keep track of the helpful things learned"
				techStack="Tech Stack: nothing yet"
				variant={theme}
			/>
			<ProjectCard
				route=""
				title="Skull King"
				description="This is a simple score keeper for a game called Skull King."
				techStack="Tech Stack: DynamoDb"
				variant={theme}
			/>
			<ProjectCard
				route=""
				title="3"
				description="s"
				techStack=""
				variant={theme}
			/>
			<ProjectCard
				route=""
				title="4"
				description="a"
				techStack=""
				variant={theme}
			/>
		</Stack>
	);
}
