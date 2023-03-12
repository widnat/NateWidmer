export interface Game {
    webSocket: WebSocket;
    players: Array<Player>;
}

export interface Message {
    type: string;
    value: string;
}

export interface Draw {
    ctx: CanvasRenderingContext2D
    currentPoint: Point
    prevPoint: Point | null
}

export interface Point {
	x: number;
	y: number;
}

export interface Player {
    index: number;
	name: string;
    pictureURL: string;
    drawingURL: string;
    score: number;
}