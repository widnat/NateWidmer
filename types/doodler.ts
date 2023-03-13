export type Game = {
    players: Array<Player>;
}

export type Message = {
    type: string;
    value: string;
}

export type Connection = {
    webSocketType: string;
    gameIndex: number;
}

export type AddPlayerUpdate = {
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