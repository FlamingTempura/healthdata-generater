import { bell, noise, DAY } from '../utils';

export default {
	id: 'prescription',
	name: 'Drug prescription',
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
