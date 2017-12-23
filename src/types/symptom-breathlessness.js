import { bell, noise, DAY, YEAR } from '../utils';

export default {
	id: 'symptom-breathlessness',
	name: 'Breathlessness',
	unit: 'severity',
	description: 'An episode of breathlessness.',
	thresholds() {
		return {
			min: 0,
			normal: 0,
			max: 5
		};
	},
	associations(person, date, val) {
		return val;
	},
	fluctuations(person, date, val) {
		return (val +
			val * 0.55 * bell(noise(date, 5 * YEAR) + 0.25, 3) + // long-term change
			val * 0.25 * bell(noise(date, YEAR), 3) + // long-term change
			3 * bell(noise(date, 2 * DAY), 3)) * 5; // normal fluctuation
	},
	filter(val) { return val > 0; }
};

// * warfarin