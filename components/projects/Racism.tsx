import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

type Props = {
	variant: string;
};

export default function ProjectCard({ variant }: Props) {
	const router = useRouter();
	const bgColor = variant.toLowerCase() === "light" ? "white" : "dark";
	const contrastColor = variant.toLowerCase() === "light" ? "dark" : "white";
	const contrastVariant = variant.toLowerCase() === "light" ? "dark" : "light";
	var constructed = false;

	useEffect(() => {
		if (!constructed) {
			constructed = true;
			// setLastingEffectsSlaver(<iframe
			// 	width="560"
			// 	height="315"
			// 	src="https://www.youtube.com/embed/7l7JahjEfE0?start=109"
			// 	title="YouTube video player"
			// 	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			// 	allowFullScreen
			// ></iframe>);
		}
	}, []);

	function navigate() {
		// router.push(route);
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
				<Card.Title>Racism</Card.Title>
				<div className="mx-4">
					<div>Slavery</div>
					<div className="mx-4">
						<div>Effects of slavery</div>
						<iframe
							width="560"
							height="315"
							src="https://www.youtube.com/embed/7l7JahjEfE0?start=109"
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						></iframe>
					</div>
				</div>
				<Button variant={contrastVariant} onClick={navigate}>
					Check It Out
				</Button>
			</Card.Body>
		</Card>
	);
}
