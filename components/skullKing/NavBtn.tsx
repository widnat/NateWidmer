import React from "react";

type Props = {
	route: string;
	text: string;
	handleNavigate: any;
};

export default function NavBtn({ route, text, handleNavigate }: Props) {
	return (
		<a
			onClick={() => handleNavigate(route)}
			className="text-white bg-teal-600 shadow-lg hover:shadow-none hover:cursor-pointer duration-500 hover:text-teal-600 hover:bg-white hover:border-teal-600 px-3 py-2 rounded-md text-sm font-medium no-underline"
		>
			{text}
		</a>
	);
}
