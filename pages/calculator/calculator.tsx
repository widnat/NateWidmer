import { useState, useEffect } from "react";
import GrayBtn from "../../components/calculator/GrayBtn";
import ColorBtn from "../../components/calculator/ColorBtn";
import DarkBtn from "../../components/calculator/DarkBtn";
import NavBar from "../../components/NavBar/NavBar";

export default function Calculator() {
	const [input, setInput] = useState("");
	const [calculation, setCalculation] = useState("");
	const [total, setTotal] = useState("");
	const [showNum, setShowNum] = useState(true);
	const [showTotal, setShowTotal] = useState(false);
	const [operator, setOperator] = useState("");

	function clear() {
		setInput("");
		setTotal("");
		setShowNum(true);
		setShowTotal(false);
		setOperator("");
	}

	function calculate() {}

	return (
		<>
			<NavBar />
			<div className="bg-gray-900 flex">
				<div className="w-96 overflow-hidden mx-auto mt-10 mb-auto shadow-lg bg-gray-900 border rounded-lg">
					<div>
						<div className="p-5 text-white text-center text-3xl">
							Calculator
						</div>
						<div className="pt-16 p-5 pb-0 text-white text-right text-3xl">
							{calculation}
						</div>
						<div className="p-5 text-white text-right text-3xl">= {total}</div>

						<div className="flex items-stretch h-24">
							<GrayBtn action={() => alert("C")} text="C" />
							<GrayBtn action={() => alert("=")} text="+/-" />
							<GrayBtn action={() => alert("=")} text="%" />
							<ColorBtn action={() => alert("=")} text="/" />
						</div>

						<div className="flex items-stretch h-24">
							<DarkBtn action={() => alert("=")} text="7" />
							<DarkBtn action={() => alert("=")} text="8" />
							<DarkBtn action={() => alert("=")} text="9" />
							<ColorBtn action={() => alert("=")} text="x" />
						</div>

						<div className="flex items-stretch h-24">
							<DarkBtn action={() => alert("=")} text="4" />
							<DarkBtn action={() => alert("=")} text="5" />
							<DarkBtn action={() => alert("=")} text="6" />
							<ColorBtn action={() => alert("=")} text="-" />
						</div>

						<div className="flex items-stretch h-24">
							<DarkBtn action={() => alert("=")} text="1" />
							<DarkBtn action={() => alert("=")} text="2" />
							<DarkBtn action={() => alert("=")} text="3" />
							<ColorBtn action={() => alert("=")} text="+" />
						</div>

						<div className="flex items-stretch h-24 mb-4">
							<DarkBtn action={() => alert("=")} text="0" />
							<DarkBtn action={() => alert("=")} text="0" />
							<DarkBtn action={() => alert("=")} text="." />
							<ColorBtn action={() => alert("=")} text="=" />
						</div>
					</div>
				</div>
				<div className="h-screen" />
			</div>
		</>
	);
}
