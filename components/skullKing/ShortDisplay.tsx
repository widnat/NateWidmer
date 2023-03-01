import React from "react";

type Props = {
	title: string;
	value: number;
};

export default function ShortDisplay({ title, value }: Props) {
	return (
		<div className="flex-col w-28 px-3 mb-3">
			<label className="flex uppercase tracking-wide text-teal-600 text-xs font-bold mb-2">
				{title}
			</label>
			<label className="flex h-12 items-center uppercase tracking-wide text-gray-700 text-m font-medium mb-2">
				{value}
			</label>
		</div>
	);
}
