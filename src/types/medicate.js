import { bell, noise, DAY, YEAR } from '../utils';

export default {
	id: 'medicate',
	name: 'Dosage',
	unit: '%',
	description: 'Between 0% and 100%, how well the patient has complied with the medication',
	thresholds() {
		return { min: 0, max: 100 };
	},
	initial() {
		return 90;
	},
	associations(person, date, val) {
		return val;
	},
	fluctuations(person, date, val) {
		return val +
		       val * 55 * bell(noise(date, 5 * YEAR) + 25, 3) + // long-term change
		       val * 25 * bell(noise(date, YEAR), 3) + // long-term change
		       30 * bell(noise(date, DAY), 3); // normal fluctuation
	}
};
