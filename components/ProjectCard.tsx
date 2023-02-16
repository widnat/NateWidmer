import React from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

type Props = {
	route: string;
	title: string;
	description: string;
	techStack: string;
	variant: string;
};

export default function ProjectCard({
	route,
	title,
	description,
	techStack,
	variant,
}: Props) {
	const router = useRouter();
	const bgColor = variant.toLowerCase() === "light" ? "white" : "dark";
	const contrastColor = variant.toLowerCase() === "light" ? "dark" : "white";
	const contrastVariant = variant.toLowerCase() === "light" ? "dark" : "light";

	function navigate() {
		router.push(route);
	}

	return (
		<Card
			style={{ margin: "1rem" }}
			bg={bgColor}
			key={variant}
			text={contrastColor}
			className="mb-2"
		>
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text>{description}</Card.Text>
				<Card.Text>{techStack}</Card.Text>
				<Button variant={contrastVariant} onClick={navigate}>
					Check It Out
				</Button>
			</Card.Body>
		</Card>
	);
}
