import React from "react";

type Props = {
	title: string;
	value: number;
};

export default function ShortDisplay({ title, value }: Props) {
	return (
		<div className="flex w-28 px-3 h-11">
			<label className="flex items-center uppercase tracking-wide text-gray-700 text-m font-medium">
				{title}: <span className="text-teal-600 ml-1 text-lg">{value}</span>
			</label>
		</div>
	);
}
