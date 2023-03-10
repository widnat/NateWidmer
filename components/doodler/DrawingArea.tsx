"use client";

import {
	FC,
	SetStateAction,
	useState,
	useRef,
	useEffect,
	useLayoutEffect,
} from "react";
import { Draw } from "@/types/doodler";
import { useDraw } from "@/hooks/doodler";

export default function DrawingArea() {
	const [color, setColor] = useState<string>("black");
	const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
	const [lineWidth, setLineWidth] = useState(5);
	const [canvasWidth, setCanvasWidth] = useState(50);
	const [canvasHeight, setCanvasHeight] = useState(50);

	function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
		const { x: currX, y: currY } = currentPoint;
		const lineColor = color;

		let startPoint = prevPoint ?? currentPoint;
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = lineColor;
		ctx.moveTo(startPoint.x, startPoint.y);
		ctx.lineTo(currX, currY);
		ctx.stroke();

		ctx.fillStyle = lineColor;
		ctx.beginPath();
		ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
		ctx.fill();
	}

	function handleResize() {
		setCanvasWidth(window.innerWidth / 2);
		setCanvasHeight(window.innerWidth / 2);
	}

	useEffect(() => {
		handleResize();
	}, []);

	return (
		<div className="flex items-center justify-center">
			<div className="flex-col">
				<canvas
					ref={canvasRef}
					onMouseDown={onMouseDown}
					width={canvasWidth}
					height={canvasHeight}
					className="border border-teal-300 rounded-md"
				/>
				<div className="flex-row">
					<div className="flex self-stretch justify-center my-5">
						<input
							onChange={(e) => setLineWidth(e.target.valueAsNumber)}
							value={lineWidth}
							className="w-64 mr-10 cursor-pointer accent-teal-500 rounded-full"
							type="range"
							min="4"
							max="20"
							step="1"
						/>
						<div
							onClick={() => alert("hey")}
							className="font-bold text-gray-700 rounded-full bg-gray-300 flex-col items-center justify-center font-mono h-6 w-6"
						/>
					</div>
					<div className="flex self-stretch justify-center my-5">
						<div
							onClick={() => alert("hey")}
							className="font-bold mx-3 text-gray-700 rounded-full bg-red-500 flex-col items-center justify-center font-mono h-8 w-8"
						/>
						<div
							onClick={() => alert("hey")}
							className="font-bold mx-3 text-gray-700 rounded-full bg-orange-400 flex-col items-center justify-center font-mono h-8 w-8"
						/>
						<div
							onClick={() => alert("hey")}
							className="font-bold mx-3 text-gray-700 rounded-full bg-yellow-300 flex-col items-center justify-center font-mono h-8 w-8"
						/>
						<div
							onClick={() => alert("hey")}
							className="font-bold mx-3 text-gray-700 rounded-full bg-green-400 flex-col items-center justify-center font-mono h-8 w-8"
						/>
						<div
							onClick={() => alert("hey")}
							className="font-bold mx-3 text-gray-700 rounded-full bg-blue-400 flex-col items-center justify-center font-mono h-8 w-8"
						/>
						<div
							onClick={() => alert("hey")}
							className="font-bold mx-3 text-gray-700 rounded-full bg-orange-800 flex-col items-center justify-center font-mono h-8 w-8"
						/>
						<div
							onClick={() => alert("hey")}
							className="font-bold mx-3 text-gray-700 rounded-full bg-black flex-col items-center justify-center font-mono h-8 w-8"
						/>
					</div>
					<div className="flex self-stretch justify-center">
						<button
							type="button"
							className="p-2 mr-10 rounded-md border border-black"
							onClick={clear}
						>
							Submit Drawing
						</button>
						<button
							type="button"
							className="p-2 rounded-md border border-black"
							onClick={clear}
						>
							Clear canvas
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
