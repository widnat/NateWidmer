import React from "react";
import HrefBtn from "./HrefBtn";
import MobileHrefBtn from "./MobileHrefBtn";
import MenuBtn from "./MenuBtn";

export default function NavBar() {
	return (
		<nav className="bg-gray-800">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<MenuBtn />
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<div className="hidden sm:ml-6 sm:block">
							<div className="flex space-x-4">
								<HrefBtn route="#" text="Home" />
								<HrefBtn route="#" text="Memoizit" />
								<HrefBtn route="#" text="skull King Keeper" />
								<HrefBtn route="#" text="Calculator" />
							</div>
						</div>
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<HrefBtn route="#" text="About Me" />
					</div>
				</div>
			</div>

			{/* Mobile menu, show/hide based on menu state. */}
			<div className="sm:hidden" id="mobile-menu">
				<div className="space-y-1 px-2 pt-2 pb-3">
					<MobileHrefBtn route="#" text="Home" />
					<MobileHrefBtn route="#" text="Memoizit" />
					<MobileHrefBtn route="#" text="skull King Keeper" />
					<MobileHrefBtn route="#" text="Calculator" />
				</div>
			</div>
		</nav>
	);
}
