import { useState, useEffect } from "react";
import GrayBtn from "../../components/calculator/GrayBtn";
import ColorBtn from "../../components/calculator/ColorBtn";
import DarkBtn from "../../components/calculator/DarkBtn";
import NavBar from "../../components/NavBar/NavBar";

export default function Calculator() {
	const [inputNum, setInputNum] = useState("");
	const [firstNum, setFirstNum] = useState("");
	const [secondNum, setsecondNum] = useState("");
	const [total, setTotal] = useState("");
	const [operator, setOperator] = useState("");

	function clear() {
		alert("clear");
		setInputNum("");
		setTotal("");
		setFirstNum("");
		setsecondNum("");
		setOperator("");
	}

	function appendNum(num: string) {
		setInputNum(inputNum + num);
	}

	function handleOperator(op: string) {
		if (secondNum !== "") {
			if (operator === "+/-") changeValueHelper((num: number) => num * -1);
			else if (operator === "%") changeValueHelper((num: number) => num / 100);
			else if (operator === "/")
				doMath((num1: number, num2: number) => num1 / num2, op);
			else if (operator === "x")
				doMath((num1: number, num2: number) => num1 * num2, op);
			else if (operator === "-")
				doMath((num1: number, num2: number) => num1 - num2, op);
			else if (operator === "+")
				doMath((num1: number, num2: number) => num1 + num2, op);

			if (op === "/" || op === "x" || op === "-" || op === "+") setOperator(op);
		}

		if (firstNum !== "") {
			if (op === "+/-") changeValueHelper((num: number) => num * -1);
			else if (op === "%") changeValueHelper((num: number) => num / 100);
			else if (op === "/")
				mathOpHelper((num1: number, num2: number) => num1 / num2);
			else if (op === "x")
				mathOpHelper((num1: number, num2: number) => num1 * num2);
			else if (op === "-")
				mathOpHelper((num1: number, num2: number) => num1 - num2);
			else if (op === "+")
				mathOpHelper((num1: number, num2: number) => num1 + num2);
			else if (op === "=") {
				if (secondNum === "") {
					setOperator("");
					setTotal(firstNum);
				} else
					mathOpHelper((num1: number, num2: number) => num1 + num2, operator);
			}
		}
	}

	function changeValueHelper(opFunction: any) {
		if (secondNum === "") {
			let num: number = opFunction(Number(firstNum));
			setFirstNum(String(num));
		} else {
			let num: number = opFunction(Number(secondNum));
			setFirstNum(String(num));
		}
	}

	function doMath(opFunction: any, op: string) {
		let num: number = opFunction(Number(firstNum), Number(secondNum));
		setFirstNum(String(num));
		setsecondNum("");
		setTotal(String(num));
		setOperator(op);
	}

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
							{firstNum} {operator} {secondNum}
						</div>
						<div className="p-5 text-white text-right text-3xl">= {total}</div>

						<div className="flex items-stretch h-24">
							<GrayBtn action={clear} text="C" />
							<GrayBtn action={handleOperator} text="+/-" />
							<GrayBtn action={handleOperator} text="%" />
							<ColorBtn action={handleOperator} text="/" />
						</div>

						<div className="flex items-stretch h-24">
							<DarkBtn action={appendNum} text="7" />
							<DarkBtn action={appendNum} text="8" />
							<DarkBtn action={appendNum} text="9" />
							<ColorBtn action={handleOperator} text="x" />
						</div>

						<div className="flex items-stretch h-24">
							<DarkBtn action={appendNum} text="4" />
							<DarkBtn action={appendNum} text="5" />
							<DarkBtn action={appendNum} text="6" />
							<ColorBtn action={handleOperator} text="-" />
						</div>

						<div className="flex items-stretch h-24">
							<DarkBtn action={appendNum} text="1" />
							<DarkBtn action={appendNum} text="2" />
							<DarkBtn action={appendNum} text="3" />
							<ColorBtn action={handleOperator} text="+" />
						</div>

						<div className="flex items-stretch h-24 mb-4">
							<DarkBtn action={appendNum} text="0" />
							<DarkBtn action={appendNum} text="0" />
							<DarkBtn action={appendNum} text="." />
							<ColorBtn action={handleOperator} text="=" />
						</div>
					</div>
				</div>
				<div className="h-screen" />
			</div>
		</>
	);
}
