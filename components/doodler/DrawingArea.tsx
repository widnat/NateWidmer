import React from "react";
import { useState, useRef, useEffect } from "react";
import { Point } from "@/types/doodler";
import { Draw } from "@/types/doodler";
import { useDraw } from "@/hooks/doodler";

type Props = {
	action: any;
	actionText: string;
};

export default function DrawingArea({ action, actionText }: Props) {
	const [color, _setColor] = useState<string>("black");
	const colorRef = useRef(color);
	const setColor = (newColor: string) => {
		colorRef.current = newColor;
		_setColor(newColor);
	};
	const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
	const [lineWidth, _setLineWidth] = useState(5);
	const lineWidthRef = useRef(lineWidth);
	const setLineWidth = (newLineWidth: number) => {
		lineWidthRef.current = newLineWidth;
		_setLineWidth(newLineWidth);
	};
	const [canvasWidth, setCanvasWidth] = useState(50);
	const [canvasHeight, setCanvasHeight] = useState(50);
	var canvasTop = 0;
	var lastx = 0;
	var lasty = 0;

	function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
		const { x: currX, y: currY } = currentPoint;
		const lineColor = colorRef.current;

		let startPoint = prevPoint ?? currentPoint;
		ctx.beginPath();
		ctx.lineWidth = lineWidthRef.current;
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
		setCanvasWidth(window.innerWidth * 0.7);
		setCanvasHeight(window.innerWidth * 0.7);
	}

	useEffect(() => {
		var top = canvasRef.current?.offsetTop;
		canvasTop = top ? top : 0;
		handleResize();
		canvasRef.current?.addEventListener("touchstart", (e) => {
			e.preventDefault();
			lastx = e.touches[0].clientX;
			lasty = e.touches[0].clientY - canvasTop;
			var lastPoint = {
				x: lastx,
				y: lasty,
			} as Point;
			drawLine({
				prevPoint: lastPoint,
				currentPoint: lastPoint,
				ctx: canvasRef.current?.getContext("2d"),
			} as Draw);
		});
		canvasRef.current?.addEventListener("touchmove", (e) => {
			e.preventDefault();
			var newx = e.touches[0].clientX;
			var newy = e.touches[0].clientY - canvasTop;
			var lastPoint = {
				x: lastx,
				y: lasty,
			} as Point;
			var currentPoint = {
				x: newx,
				y: newy,
			} as Point;
			drawLine({
				prevPoint: lastPoint,
				currentPoint: currentPoint,
				ctx: canvasRef.current?.getContext("2d"),
			} as Draw);
			lastx = newx;
			lasty = newy;
		});
	}, []);

	function submit() {
		var doodleURL = canvasRef.current?.toDataURL();
		action(doodleURL);
	}

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
							onClick={() => setColor("red")}
							className="font-bold mx-3 text-gray-700 rounded-full bg-red-500 flex-col items-center justify-center font-mono h-8 w-8"
						/>
						<div
							onClick={() => setColor("orange")}
							className="font-bold mx-3 text-gray-700 rounded-full bg-orange-400 flex-col items-center justify-center font-mono h-8 w-8"
						/>
						<div
							onClick={() => setColor("yellow")}
							className="font-bold mx-3 text-gray-700 rounded-full bg-yellow-300 flex-col items-center justify-center font-mono h-8 w-8"
						/>
						<div
							onClick={() => setColor("green")}
							className="font-bold mx-3 text-gray-700 rounded-full bg-green-400 flex-col items-center justify-center font-mono h-8 w-8"
						/>
						<div
							onClick={() => setColor("blue")}
							className="font-bold mx-3 text-gray-700 rounded-full bg-blue-400 flex-col items-center justify-center font-mono h-8 w-8"
						/>
						<div
							onClick={() => setColor("brown")}
							className="font-bold mx-3 text-gray-700 rounded-full bg-orange-800 flex-col items-center justify-center font-mono h-8 w-8"
						/>
						<div
							onClick={() => setColor("black")}
							className="font-bold mx-3 text-gray-700 rounded-full bg-black flex-col items-center justify-center font-mono h-8 w-8"
						/>
					</div>
					<div className="flex self-stretch justify-center">
						<button
							type="button"
							className="p-2 mr-10 rounded-md border border-black"
							onClick={submit}
						>
							[actionText]
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
