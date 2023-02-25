import React from "react";
import NavBtn from "./NavBtn";

type Props = {
	page: string;
	round: number;
};

export default function NavBar({ page, round }: Props) {
	const previousRoute = "/skullKeeper/round[" + String(round - 1) + "]";
	const nextRoute = "/skullKeeper/round[" + String(round + 1) + "]";
	const playersRoute = "/skullKeeper/players";
	const resultsRoute = "/skullKeeper/results";

	return (
		<nav>
			<div className="mx-auto px-2 mb-2 sm:px-6 lg:px-8">
				<div className="flex h-12 items-center justify-center">
					<div className="flex space-x-4">
						{page !== "Players" && (
							<NavBtn route={playersRoute} text="Players" />
						)}
						{page !== "Players" && page !== "Round 1" && (
							<NavBtn
								route={previousRoute}
								text={"Round " + String(round - 1)}
							/>
						)}
						{page !== "Round 10" && page !== "Results" && (
							<NavBtn route={nextRoute} text={"Round " + String(round + 1)} />
						)}
						{page !== "Results" && (
							<NavBtn route={resultsRoute} text="Results" />
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
