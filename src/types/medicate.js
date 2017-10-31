import { bell, noise, DAY, YEAR } from '../utils';

export default {
	id: 'medicate',
	name: 'Dosage',
	unit: '%',
	thresholds() {
		return { min: 0, max: 1 };
	},
	initial() {
		return 0.9;
	},
	associations(person, date, val) {
		return val;
	},
	fluctuations(person, date, val) {
		return val +
		       val * 0.55 * bell(noise(date, 5 * YEAR) + 0.25, 3) + // long-term change
		       val * 0.25 * bell(noise(date, YEAR), 3) + // long-term change
		       0.3 * bell(noise(date, DAY), 3); // normal fluctuation
	}
};
