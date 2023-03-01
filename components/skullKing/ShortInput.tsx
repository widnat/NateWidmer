import React from "react";

type Props = {
	header: string;
	input: string;
	handleChange: any;
};

export default function ShortInput({ header, input, handleChange }: Props) {
	return (
		<div className="w-28 px-3 mb-3">
			<label className="block uppercase tracking-wide text-teal-600 text-xs font-bold mb-2">
				bid
			</label>
			<input
				className="appearance-none block w-full text-gray-700 border border-green-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
				type="text"
				value="hey"
				onChange={(e) => {
					e.target.value;
				}}
			/>
		</div>
	);
}
