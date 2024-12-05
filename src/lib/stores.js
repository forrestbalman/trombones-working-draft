import { writable } from "svelte/store";

export const nightMode = writable(true);
export const currentPhase = writable(null);
export const elementOpacities = writable({
	startHeader: 100,
	score: 0,
	phaseName: 0,
});
export const audioStarted = writable(false);
export const pieceStarted = writable(false);
export const buffersLoaded = writable(false);
export const micVolume = writable(null);
export const burstWindow = writable(null);
export const currentWedge = writable(null);
export const phases = writable({
	"Short + Soft": {
		length: [30, 42],
		delay: [40, 50],
		durations: {
			short: 100,
			medium: 0,
			long: 0,
		},
		volumes: {
			soft: 100,
			medium: 0,
			loud: 0,
		},
		articulations: [
			["Normal", 0],
			["Air noise", 30],
			["Flutter tongue", 70],
			["Air noise", 90],
		],
	},
	"Varied + Soft": {
		length: [35, 50],
		delay: [10, 50],
		durations: {
			short: 25,
			medium: 35,
			long: 40,
		},
		volumes: {
			soft: 100,
			medium: 0,
			loud: 0,
		},
		articulations: [
			["Normal", 0],
			["Air noise", 90],
		],
	},
	"Long + Soft": {
		length: [20, 30],
		delay: [40, 60],
		durations: {
			short: 0,
			medium: 0,
			long: 100,
		},
		volumes: {
			soft: 100,
			medium: 0,
			loud: 0,
		},
		articulations: [
			["Normal", 0],
			["Air noise", 30],
			["Flutter tongue", 70],
			["Air noise", 80],
		],
	},
	"Short + Loud": {
		length: [30, 40],
		delay: [20, 40],
		durations: {
			short: 100,
			medium: 0,
			long: 0,
		},
		volumes: {
			soft: 0,
			medium: 0,
			loud: 100,
		},
		articulations: [["Normal", 0]],
	},
	"Long + Loud": {
		length: [18, 23],
		delay: [40, 60],
		durations: {
			short: 0,
			medium: 0,
			long: 100,
		},
		volumes: {
			soft: 0,
			medium: 0,
			loud: 100,
		},
		articulations: [["Normal", 0]],
	},
	"Short Flutters": {
		length: [30, 32],
		delay: [10, 60],
		durations: {
			short: 100,
			medium: 0,
			long: 0,
		},
		volumes: {
			soft: 10,
			medium: 70,
			loud: 30,
		},
		articulations: [["Flutter tongue", 0]],
	},
	"Medium Flutters": {
		length: [20, 24],
		delay: [30, 40],
		durations: {
			short: 0,
			medium: 100,
			long: 0,
		},
		volumes: {
			soft: 10,
			medium: 90,
			loud: 0,
		},
		articulations: [["Flutter tongue", 0]],
	},
	"Gentle Breeze": {
		length: [20, 24],
		delay: [40, 50],
		durations: {
			short: 0,
			medium: 40,
			long: 60,
		},
		volumes: {
			soft: 90,
			medium: 10,
			loud: 0,
		},
		articulations: [
			["Air noise", 0],
			["Flutter tongue", 80],
		],
	},
	"Rustling Leaves": {
		length: [34, 40],
		delay: [40, 45],
		durations: {
			short: 90,
			medium: 10,
			long: 0,
		},
		volumes: {
			soft: 20,
			medium: 80,
			loud: 0,
		},
		articulations: [["Flutter tongue", 0]],
	},
	"Industrial Engine": {
		length: [25, 27],
		delay: [15, 25],
		durations: {
			short: 0,
			medium: 20,
			long: 80,
		},
		volumes: {
			soft: 0,
			medium: 0,
			loud: 100,
		},
		articulations: [
			["Normal", 0],
			["Air noise", 20],
			["Flutter tongue", 25],
			["Normal", 30],
			["Air noise", 50],
			["Flutter tongue", 75],
			["Normal", 80],
			["Air noise", 95],
		],
	},
	"Noisy Birds": {
		length: [20, 24],
		delay: [15, 25],
		durations: {
			short: 90,
			medium: 10,
			long: 0,
		},
		volumes: {
			soft: 0,
			medium: 0,
			loud: 100,
		},
		articulations: [
			["Normal", 0],
			["Flutter tongue", 15],
			["Normal", 30],
			["Flutter tongue", 95],
		],
		mute: "Plunger",
	},
	Underwater: {
		length: [20, 24],
		delay: [60, 70],
		durations: {
			short: 70,
			medium: 30,
			long: 0,
		},
		volumes: {
			soft: 40,
			medium: 50,
			loud: 10,
		},
		articulations: [
			["Normal", 0],
			["Air Noise", 45],
			["Normal", 65],
		],
		mute: "Plunger",
	},
	Subterranean: {
		length: [30, 34],
		delay: [50, 75],
		durations: {
			short: 80,
			medium: 19,
			long: 1,
		},
		volumes: {
			soft: 20,
			medium: 40,
			loud: 40,
		},
		articulations: [["Normal", 0]],
		mute: "Plunger",
	},
	"Explosive!": {
		length: [12, 15],
		delay: [10, 25],
		durations: {
			short: 100,
			medium: 0,
			long: 0,
		},
		volumes: {
			soft: 0,
			medium: 10,
			loud: 90,
		},
		articulations: [["Normal", 0]],
	},
	"Low Energy": {
		length: [22, 26],
		delay: [70, 75],
		durations: {
			short: 100,
			medium: 0,
			long: 0,
		},
		volumes: {
			soft: 50,
			medium: 50,
			loud: 0,
		},
		articulations: [
			["Air Noise", 0],
			["Normal", 50],
			["Air Noise", 60],
		],
	},
});
