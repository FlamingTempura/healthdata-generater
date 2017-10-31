import { bell, noise, DAY, YEAR } from '../utils';

export default {
	id: 'palpitations',
	name: 'Palpitations',
	unit: 'severity',
	thresholds: function () {
		return { min: 0 };
	},
	initial() {
		return 0;
	},
	associations(person, date, val) {
		return val;
	},
	fluctuations(person, date, val) {
		return val +
		       val * 0.55 * bell(noise(date, 5 * YEAR) + 0.25, 3) + // long-term change
		       val * 0.25 * bell(noise(date, YEAR), 3) + // long-term change
		       0.3 * bell(noise(date, 2 * DAY), 3); // normal fluctuation
	}
};
