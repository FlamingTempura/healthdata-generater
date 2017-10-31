import { bell, noise, WEEK, DAY, MONTH, YEAR } from '../utils';

export default {
	id: 'satisfaction',
	name: 'Life satisfaction',
	thresholds() {
		return { min: 0, max: 1 };
	},
	initial(person) {
		return person.normalSatisfaction;
	},
	associations(person, date, val) {
		var sleep = person.sample('sleep', date);
		return val + (sleep < 7 ? noise(date, 3 * DAY) * (7 / sleep - 1) : 0);
	},
	fluctuations(person, date, val) {
		var age = person.age(date);
		return val +
		       0.15 * bell(noise(date, 5 * YEAR), 3) + // long-term mood changes
		       0.25 * bell(noise(date, YEAR), 1) + // long-term mood changes
		       0.35 * bell(noise(date, MONTH), 6) +
		       0.15 * noise(date, MONTH) +
		       (age.years < 18 ? age.years / 18 * 1 : 1) * 
		          (bell(noise(date, DAY), 1) * 0.2 +
		           bell(noise(date, WEEK), 2) * 0.2 +
		           bell(noise(date, WEEK), 6) * 0.7); // normal fluctuation with more potential for mood variance as one reaches adulthood
	}
};

// check against personal Daylio data