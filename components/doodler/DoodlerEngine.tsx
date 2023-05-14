import { DoodleAssignment } from "@/types/doodler";

export function GetRandomDoodleAssignment() {
	var assignments = new Array<DoodleAssignment>();
	var answers = new Array<string>();
	var wrongAnswers = new Array<string>();
	answers.push("mountain");
	answers.push("moon");
	wrongAnswers.push("a pointy rock");
	wrongAnswers.push("lopsided basketball");
	wrongAnswers.push("melting cheese");
	assignments.push({
		assignment: "a mountain on the moon",
		answers: answers,
		wrongAnswers: wrongAnswers,
	} as DoodleAssignment);

	answers = new Array<string>();
	wrongAnswers = new Array<string>();
	answers.push("hop");
	answers.push("scotch");
	answers.push("cow");
	answers.push("play");
	wrongAnswers.push("a leopard reading numbers");
	wrongAnswers.push("horse play");
	assignments.push({
		assignment: "a cow playing hop scotch",
		answers: answers,
		wrongAnswers: wrongAnswers,
	} as DoodleAssignment);

	answers = new Array<string>();
	wrongAnswers = new Array<string>();
	answers.push("melt");
	answers.push("box");
	answers.push("cleen");
	answers.push("ex");
	wrongAnswers.push("a weird candle");
	wrongAnswers.push("smores");
	assignments.push({
		assignment: "melting box of cleenexes",
		answers: answers,
		wrongAnswers: wrongAnswers,
	} as DoodleAssignment);

	answers = new Array<string>();
	wrongAnswers = new Array<string>();
	answers.push("tree");
	answers.push("jam");
	answers.push("out");
	wrongAnswers.push("an orchestra bush");
	wrongAnswers.push("musical roots");
	assignments.push({
		assignment: "a tree jamming out",
		answers: answers,
		wrongAnswers: wrongAnswers,
	} as DoodleAssignment);

	answers = new Array<string>();
	wrongAnswers = new Array<string>();
	answers.push("fast");
	answers.push("speed");
	answers.push("sloth");
	wrongAnswers.push("flying monkey");
	wrongAnswers.push("wolverine in action");
	assignments.push({
		assignment: "speedy sloth",
		answers: answers,
		wrongAnswers: wrongAnswers,
	} as DoodleAssignment);

	var assigmentIndex = Math.floor(Math.random() * assignments.length);
	var assignment = assignments[assigmentIndex];
	return assignment;
}
export function GetDoodleAssignment(assigmentIndex: number) {
	var assignments = new Array<DoodleAssignment>();
	var answers = new Array<string>();
	var wrongAnswers = new Array<string>();
	answers.push("mountain");
	answers.push("moon");
	wrongAnswers.push("a pointy rock");
	wrongAnswers.push("lopsided basketball");
	wrongAnswers.push("melting cheese");
	assignments.push({
		assignment: "a mountain on the moon",
		answers: answers,
		wrongAnswers: wrongAnswers,
	} as DoodleAssignment);

	answers = new Array<string>();
	wrongAnswers = new Array<string>();
	answers.push("hop");
	answers.push("scotch");
	answers.push("cow");
	answers.push("play");
	wrongAnswers.push("a leopard reading numbers");
	wrongAnswers.push("horse play");
	assignments.push({
		assignment: "a cow playing hop scotch",
		answers: answers,
		wrongAnswers: wrongAnswers,
	} as DoodleAssignment);

	answers = new Array<string>();
	wrongAnswers = new Array<string>();
	answers.push("melt");
	answers.push("box");
	answers.push("cleen");
	answers.push("ex");
	wrongAnswers.push("a weird candle");
	wrongAnswers.push("smores");
	assignments.push({
		assignment: "melting box of cleenexes",
		answers: answers,
		wrongAnswers: wrongAnswers,
	} as DoodleAssignment);

	answers = new Array<string>();
	wrongAnswers = new Array<string>();
	answers.push("tree");
	answers.push("jam");
	answers.push("out");
	wrongAnswers.push("an orchestra bush");
	wrongAnswers.push("musical roots");
	assignments.push({
		assignment: "a tree jamming out",
		answers: answers,
		wrongAnswers: wrongAnswers,
	} as DoodleAssignment);

	answers = new Array<string>();
	wrongAnswers = new Array<string>();
	answers.push("fast");
	answers.push("speed");
	answers.push("sloth");
	wrongAnswers.push("flying monkey");
	wrongAnswers.push("wolverine in action");
	assignments.push({
		assignment: "speedy sloth",
		answers: answers,
		wrongAnswers: wrongAnswers,
	} as DoodleAssignment);

	var assignment = assignments[assigmentIndex];
	return assignment;
}
