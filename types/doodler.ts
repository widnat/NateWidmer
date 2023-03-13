export type Game = {
    players: Array<Player>;
}

export type Message = {
    type: string;
    gameIndex: number;
    value: string;
}

export type AddPlayerMessage = {
    name: string;
    imageUrl: string;
}

export type Draw = {
    ctx: CanvasRenderingContext2D
    currentPoint: Point
    prevPoint: Point | null
}

export type Point = {
	x: number;
	y: number;
}

export type Player = {
    index: number;
	name: string;
    pictureURL: string;
    drawingURL: string;
    score: number;
}