import React from "react";

type Props = {
	title: string;
	value: number;
};

export default function ShortDisplay({ title, value }: Props) {
	return (
		<div className="flex w-52 h-8">
			<label className="w-full uppercase tracking-wide text-gray-700 text-m font-medium">
				{title}:
			</label>
			<label className="uppercase tracking-wide text-gray-700 text-m font-medium">
				{value}
			</label>
		</div>
	);
}
