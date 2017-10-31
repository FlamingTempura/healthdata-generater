import uuid from 'uuid/v4';
import SimplexNoise from 'simplex-noise';
import Alea from 'alea';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 265 * DAY;

let prng,
	simplex,
	seeds = {},
	currSeed;

const seed = (seed) => {
	if (seeds[seed]) { // cache the seeds so they're not reset
		prng = seeds[seed].prng;
		simplex = seeds[seed].simplex;
	} else {
		prng = new Alea(seed);
		simplex = new SimplexNoise(prng);
		seeds[seed] = { prng: prng, simplex: simplex };
	}
	let oldSeed = currSeed;
	currSeed = seed;
	return oldSeed;
};
seed(1);

const resetSeeds = () => {
	seeds = {};
	seed(Math.random());
};

const rand = (min = 0, max = 1) => min + prng() * (max - min);

const chance = chance => rand() < chance;

const times = (n, cb) => Array(n).fill(0).map((u, i) => cb(i));

const id = () => uuid().slice(0, 4) + uuid().slice(-2);

const pick = arr => arr[Math.floor(rand(0, arr.length))];

const weightedPick = arr => { // [[el, weight], ...]
	let totalWeight = arr.reduce((memo, a) => memo + a[1], 0);
	if (totalWeight === 0) { return pick(arr)[0]; }
	let rnd = rand(0, totalWeight);
	return arr.find((a, i) => {
		let prevCumulativeWeight = arr.slice(0, i).reduce((memo, a_) => memo + a_[1], 0);
		return rnd > prevCumulativeWeight && rnd <= prevCumulativeWeight + a[1];
	})[0];
};

const invoke = (val, ...args) => typeof val === 'function' ? val(...args) : val;

const noise = (date, period) => simplex.noise2D(date.valueOf() / period / 5, 0);

const bell = (x, factor = 3.3) => (x < 0 ? -1 : 1) * Math.pow(Math.abs(x), factor); // higher factor means further clustering toward zero

const avg = arr => arr.reduce((avg, el) => avg + el / arr.length, 0);

const sum = arr => arr.reduce((avg, el) => avg + el, 0);

const strval = string => string.split('').reduce((tot, char) => tot + char.charCodeAt(0), 0);

const shuffle = array => {
	let currentIndex = array.length,
		temporaryValue, randomIndex;
	while (0 !== currentIndex) { // While there remain elements to shuffle...
		randomIndex = Math.floor(rand(0, currentIndex)); // Pick a remaining element...
		currentIndex -= 1;
		temporaryValue = array[currentIndex]; // And swap it with the current element.
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};

export {
	SECOND, MINUTE, HOUR, DAY, WEEK, MONTH, YEAR, invoke,
	times, id, pick, weightedPick, seed, chance, rand, noise, bell,
	avg, strval, shuffle, resetSeeds, sum
};
