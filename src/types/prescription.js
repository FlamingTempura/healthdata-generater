import { bell, noise, DAY } from '../utils';

export default {
	id: 'prescription',
	name: 'Drug prescription',
	description: 'A new prescription or change of a prescription for a drug',
	thresholds() {
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
		       0.3 * bell(noise(date, DAY), 8); // normal fluctuation
	}
};
