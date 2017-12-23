import { rand, bell, noise, sum, times, avg, DAY, WEEK, YEAR } from '../utils';

export default {
	id: 'weight',
	name: 'Body weight',
	unit: 'kg',
	description: 'Body weight measure',
	thresholds() {
		let normalWeight = Math.round(rand(60, 100));
		return {
			min: 2,
			normal: normalWeight,
			max: normalWeight * 2.5
		};
	},
	initial(person, date, value) {
		var age = person.age(date),
			sf = value / 93;
		return sf * (age.months <= 3 ? 3.25 : // Weech's formula
			age.years <= 1 ? (age.months + 9) / 2 : // Weech
			age.years <= 6 ? age.years * 2 + 8 : // Weech
			age.years <= 12 ? (age.years * 7 - 5) / 2 : // Weech
			age.years <= 19 ? (age.years * 9 - 26) / 2: // guess
			75);
	},
	associations(person, date, val) { // weight
		var t = date.getTime();
		var intake = avg(times(30, i => {
			return person.sample('caloric-intake', new Date(t - (i + 6) * DAY));
		}));
		var activity = sum(times(30, i => {
			return person.sample('caloric-burn', new Date(t - (i + 4) * DAY));
		}));
		return val + intake / 200 - bell(Math.min(1, activity / 200)) * 4;
	},
	fluctuations(person, date, val) {		
		return val +
		       val * 0.35 * bell(noise(date, 5 * YEAR) + 0.25, 3) + // long-term weight gain/loss (e.g. lifestyle)
		       val * 0.15 * bell(noise(date, YEAR) + 0.25, 3) + // long-term weight gain/loss
		       val * 0.007 * bell(noise(date, WEEK), 2); // normal fluctuation
	}
};
