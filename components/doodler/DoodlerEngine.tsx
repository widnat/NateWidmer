import { DoodleAssignment } from "@/types/doodler";

export function GetRandomDoodleAssignment() {
	var assignments = new Array<DoodleAssignment>();
	var answers = new Array<string>();
	answers.push("penguin");
	answers.push("ride");
	answers.push("riding");
	answers.push("shark");
	assignments.push({
		assignment: "a penguin riding a shark",
		answers: answers,
	} as DoodleAssignment);

	answers = new Array<string>();
	answers.push("hop");
	answers.push("scotch");
	answers.push("cow");
	answers.push("play");
	assignments.push({
		assignment: "a cow playing hop scotch",
		answers: answers,
	} as DoodleAssignment);

	answers = new Array<string>();
	answers.push("melt");
	answers.push("box");
	answers.push("cleen");
	answers.push("ex");
	assignments.push({
		assignment: "melting box of cleenexes",
		answers: answers,
	} as DoodleAssignment);

	answers = new Array<string>();
	answers.push("tree");
	answers.push("jam");
	answers.push("out");
	answers.push("music");
	assignments.push({
		assignment: "a tree jamming out",
		answers: answers,
	} as DoodleAssignment);

	var assigmentIndex = Math.floor(Math.random() * assignments.length);
	var assignment = assignments[assigmentIndex];
	return assignment;
}
