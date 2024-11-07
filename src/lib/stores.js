import { writable } from "svelte/store";

export const nightMode = writable(true);
export const currentPhase = writable(null);
export const elementOpacities = writable({
	startHeader: 100,
	score: 0,
	phaseName: 0,
});
export const phases = writable({
	"Short + Soft": {
		length: [45, 60],
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
		articulations: {
			Normal: 0,
			"Air noise": 30,
			"Flutter tongue": 40,
		},
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
		articulations: {
			Normal: 0,
			"Air noise": 70,
		},
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
		articulations: {
			Normal: 0,
			"Air noise": 60,
		},
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
		articulations: {
			Normal: 0,
		},
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
		articulations: {
			Normal: 0,
		},
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
		articulations: {
			"Flutter tongue": 0,
		},
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
		articulations: {
			"Flutter tongue": 0,
		},
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
		articulations: {
			"Air noise": 0,
			"Flutter tongue": 90,
		},
	},
	"Rustling Leaves": {
		length: [34, 40],
		delay: [20, 25],
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
		articulations: {
			"Flutter tongue": 0,
		},
	},
	"Industrial Engine": {
		length: [25, 27],
		delay: [5, 15],
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
		articulations: {
			"Air noise": 0,
			"Flutter tongue": 30,
		},
	},
	"Noisy Birds": {
		length: [20, 24],
		delay: [5, 10],
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
		articulations: {
			Normal: 0,
			"Flutter tongue": 80,
		},
		mute: "Plunger",
	},
	"Underwater": {
		length: [20, 24],
		delay: [5, 10],
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
		articulations: {
			Normal: 0,
			"Flutter tongue": 80,
		},
		mute: "Plunger",
	},
});
