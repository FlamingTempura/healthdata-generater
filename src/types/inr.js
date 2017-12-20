import { bell, noise, DAY, YEAR } from '../utils';

export default {
	id: 'inr',
	name: 'International Normalized Ratio (INR)',
	description: 'The result (in seconds) for a prothrombin time performed on a normal individual will vary according to the type of analytical system employed.',
	thresholds() {
		return { min: 1.6, max: 8 };
	},
	initial() {
		return 2.5;
	},
	associations(person, date, val) {
		return val;
		// * warfarin
	},
	fluctuations(person, date, val) {
		return val +
		       val * 0.55 * bell(noise(date, 5 * YEAR) + 0.25, 3) + // long-term change
		       val * 0.25 * bell(noise(date, YEAR), 3) + // long-term change
		       0.3 * bell(noise(date, 2 * DAY), 1); // normal fluctuation
	}
};

// http://www.cumbria.nhs.uk/ProfessionalZone/MedicinesManagement/Guidelines/Warfarin%20management%20guidelines.pdf (p20)