import { bell, noise, HOUR, DAY, MONTH, YEAR } from '../utils';

export default {
	id: 'bp_diastolic',
	name: 'Diastolic blood pressure',
	unit: 'mmHg',
	thresholds() {
		return { min: 30, max: 140 };
	},
	initial() { return 70; },
	associations(person, date, val) {
		return val; // TODO: physical activity
	},
	fluctuations(person, date, val) {
		return val +
		       val * 0.55 * bell(noise(date, 3 * YEAR) + 0.25, 3) + // long-term bp change
		       val * 0.25 * bell(noise(date, MONTH), 3) + // long-term bp change
		       val * 0.5 * bell(noise(date, 5 * DAY), 3) + // medium-term bp change
		       40 * bell(noise(date, 5 * HOUR), 4.5); // normal fluctuation, e.g. due to posture, temperature
	}
};

/* REFERENCES
 * http://www.bloodpressureuk.org/BloodPressureandyou/Thebasics/Bloodpressurechart
 * https://www.nhlbi.nih.gov/files/docs/guidelines/child_tbl.pdf
 */