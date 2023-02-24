import React from "react";

type Props = {
	route: string;
	text: string;
};

export default function NavBtn({ route, text }: Props) {
	return (
		<a
			href={route}
			className="text-white bg-teal-600 shadow-lg hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium no-underline"
		>
			{text}
		</a>
	);
}
