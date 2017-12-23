import { rand, bell, noise, DAY, YEAR } from '../utils';

export default {
	id: 'caloric-intake',
	name: 'Caloric intake',
	unit: 'kcal',
	description: 'Calories consumed.',
	thresholds() {
		return {
			min: 0,
			normal: Math.round(rand(2000, 3500))
		};
	},
	initial(person, date, val) {
		var age = person.age(date),
			sf = (person.sex === 'female' ? 0.9 : 1) * val / 2000;
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