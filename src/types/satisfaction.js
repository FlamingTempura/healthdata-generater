import { rand, bell, noise, WEEK, DAY, MONTH, YEAR } from '../utils';

export default {
	id: 'satisfaction',
	name: 'Life satisfaction',
	unit: '%',
	description: 'Between 0% and 100%, how satisfied a person is with their current situation.',
	thresholds() {
		return {
			min: 0,
			normal: Math.round(rand(50, 90)),
			max: 100
		};
	},
	associations(person, date, val) {
		let sleep = person.sample('sleep', date);
		return val + (sleep < 7 ? noise(date, 3 * DAY) * (7 / sleep - 1) : 0);
	},
	fluctuations(person, date, val) {
		return val +
		       15 * bell(noise(date, 5 * YEAR), 3) + // long-term mood changes
		       25 * bell(noise(date, YEAR), 1) + // long-term mood changes
		       35 * bell(noise(date, MONTH), 6) +
		       15 * noise(date, MONTH) +
		       20 * bell(noise(date, DAY), 1) +
		       20 * bell(noise(date, WEEK), 2) +
		       70 * bell(noise(date, WEEK), 6);
	}
};

// check against personal Daylio data