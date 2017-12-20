import { bell, noise, WEEK, DAY, MONTH, YEAR } from '../utils';

export default {
	id: 'satisfaction',
	name: 'Life satisfaction',
	description: 'Between 0% and 100%, how satisfied a person is with their current situation.',
	thresholds() {
		return { min: 0, max: 100 };
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
		       15 * bell(noise(date, 5 * YEAR), 3) + // long-term mood changes
		       25 * bell(noise(date, YEAR), 1) + // long-term mood changes
		       35 * bell(noise(date, MONTH), 6) +
		       15 * noise(date, MONTH) +
		       (age.years < 18 ? age.years / 18 * 1 : 1) * 
		          (bell(noise(date, DAY), 1) * 20 +
		           bell(noise(date, WEEK), 2) * 20 +
		           bell(noise(date, WEEK), 6) * 70); // normal fluctuation with more potential for mood variance as one reaches adulthood
	}
};

// check against personal Daylio data