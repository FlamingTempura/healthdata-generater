import { bell, noise, HOUR, avg, times, MINUTE, YEAR } from '../utils';

export default {
	id: 'hr',
	name: 'Heart rate',
	unit: 'bpm',
	description: 'Heart rate',
	thresholds(person, date) {
		var age = person.age(date);
		return { min: 40, max: 220 - age.years };
	},
	initial(person) {
		return person.restingHeartRate;
	},
	associations(person, date, val) {
		var burn = avg(times(5, function (i) {
			return person.sample('caloric_burn', new Date(date.getTime() - i * 10 * MINUTE));
		}));
		return val + burn / person.avgBurn * 8;
	},
	fluctuations(person, date, val) {
		return val +
		       20 * bell(noise(date, 5 * YEAR), 3) + // long-term hr change
		       20 * bell(noise(date, YEAR), 3) + // long-term hr change
		       50 * bell(noise(date, HOUR) + 0.1, 4); // normal fluctuation, e.g. due to posture, temperature
	}
};

/* REFERENCES
* Children: 70-100bpm https://my.clevelandclinic.org/health/articles/pulse-target-heart-rate-heart-health
* Adults: 60 - 100bpm https://my.clevelandclinic.org/health/articles/pulse-target-heart-rate-heart-health
*/
// https://www.bhf.org.uk/-/media/files/publications/medical-information-sheets/your-heart-rate-is23.pdf