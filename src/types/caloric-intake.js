import { bell, noise, DAY, YEAR } from '../utils';

export default {
	id: 'intake',
	name: 'Caloric intake',
	unit: 'kcal',
	thresholds() {
		return { min: 0 };
	},
	initial(person, date) {
		var age = person.age(date);
		var sf = (person.sex === 'female' ? 0.9 : 1) * person.normalIntake / 2000;
		return sf * (age.years < 18 ? 1000 + age.years * (1600 / 14) :
			   age.years < 40 ? 1000 - (age.years - 68) / 40 * 1600 : 2000);
	},
	associations(person, date, val) {
		return val;
	},
	fluctuations(person, date, val) {
		return val +
		       (1000 + val * 0.55) * bell(noise(date, 5 * YEAR) + 0.25, 3) + // long-term diet changes
		       (1000 + val * 0.25) * bell(noise(date, YEAR), 3) + // long-term diet changes
		       val * noise(date, DAY); // normal fluctuation
	}
};

// https://health.gov/dietaryguidelines/2015/guidelines/appendix-2/