import React from "react";

type Props = {
	submitGuess: any;
};

export default function PlayersFirstGuess({ submitGuess }: Props) {
	return (
		<div className="flex items-center justify-center">
			<div className="w-96 px-3 mb-3">
				<label className="block uppercase tracking-wide text-teal-700 text-xs font-bold mb-2">
					What is this doodle?
				</label>
				<input
					className="appearance-none block w-full text-gray-700 border border-green-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					type="text"
					onChange={(e) => submitGuess(e.target.value)}
				/>
			</div>
		</div>
	);
}
