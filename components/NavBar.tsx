import React from "react";
import Link from "next/link";
import MenuDropdown from "./MenuDropdown";

export default function NavBar() {
    
    return (
        <nav className="flex">
            <div className="title">
            My Projects
            </div>

            <ul className="flex">
                <MenuDropdown/>
                <li>
                    <Link href="/#about">About Me</Link>
                </li>
            </ul>
        </nav>
    )
}