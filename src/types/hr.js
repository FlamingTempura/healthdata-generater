import { rand, bell, noise, HOUR, avg, times, MINUTE, YEAR } from '../utils';

export default {
	id: 'hr',
	name: 'Heart rate',
	unit: 'bpm',
	description: 'Heart rate',
	thresholds() {
		return {
			min: 40,
			normal: Math.round(rand(50, 70)),
			max: 220
		};
	},
	associations(person, date, val) {
		var burn = avg(times(5, i => {
			//console.log('q',person.sample('caloric-burn', new Date(date.getTime() - i * 10 * MINUTE)) )
			return person.sample('caloric-burn', new Date(date.getTime() - i * 10 * MINUTE));
		}));
		//return val + burn / val * 8;
		return val;
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