import React from "react";
import styles from "@/styles/Home.module.css";
import ProjectCard from "./ProjectCard";

export default function Projects() {
	const theme = "light";

	return (
		<div className={styles.grid}>
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
		</div>
	);
}
