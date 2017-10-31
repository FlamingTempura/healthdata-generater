import { bell, noise, DAY } from '../utils';

export default {
	id: 'procedure',
	name: 'Clinical procedure',
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
		       0.3 * bell(noise(date, DAY), 25); // normal fluctuation
	}
};
