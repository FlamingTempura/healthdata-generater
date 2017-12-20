import { bell, noise, DAY, MONTH, YEAR } from '../utils';

export default {
	id: 'sleep',
	name: 'Sleep',
	unit: 'hours',
	description: 'Number of hours slept',
	thresholds() { return { min: 0, max: 24 }; },
	initial(person, date) {
		var sf = person.normalSleepHours / 6.3;
		return sf * 13.212 * Math.pow(person.age(date).years, -0.134); // power regression of [1]
	},
	associations(person, date, val) {
		/*var satisfactions = times(7, function (i) {
			return person.sample('satisfaction', new Date(date.getTime() - i * DAY));
		});*/
		// number of hours since last sleep
		//var week = avg(satisfactions);
		return val;// + (0.3 + noise(date, 3 * DAY) * 0.7) * 
				//(week - 0.7) * 24; // satisfaction and sleep might not always correlate, so use some noise
	},
	fluctuations(person, date, val) {
		var age = person.age(date);
		return val +
		       0.5 * bell(noise(date, 5 * YEAR) + 0.25, 3) + // long-term sleep changes
		       0.5 * bell(noise(date, YEAR) + 0.25, 3) + // long-term sleep changes
		       (age.years < 18 ? age.years / 18 * val : val) * (
		       		bell(noise(date, MONTH), 3) * 0.25 +
		       		bell(noise(date, DAY) - 0.15, 5) * 0.25 +
		       		bell(noise(date, DAY) + 0.06, 1.5) * 0.5); // normal fluctuation with increasing sleep variance as one reaches adulthood
	}
};

// [1] https://sleepfoundation.org/press-release/national-sleep-foundation-recommends-new-sleep-times