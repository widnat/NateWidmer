export type Game = {
    players: Array<Player>;
}

export type Message = {
    type: string;
    gameIndex: number;
    playerId: number;
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
    id: number;
	name: string;
    pictureURL: string;
    assignment: DoodleAssignment
    score: number;
}

export type DoodleAssignment = {
    assignment: string;
    acceptableGuesses: string[];
    drawingURL: string;
}