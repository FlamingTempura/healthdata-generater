import { rand, bell, noise, DAY } from '../utils';

export default {
	id: 'height',
	name: 'Height',
	unit: 'cm',
	description: 'Height measurement',
	thresholds(person) {
		let normalHeight = Math.round(rand(140, 170)),
			sf = (person.sex === 'female' ? 0.96 : 1) * normalHeight / 167;
		return {
			min: Math.round(sf * 50 * 10) / 10,
			normal: Math.round(sf * normalHeight * 10) / 10,
			max: Math.round(sf * normalHeight * 1.1 * 10) / 10
		};
	},
	initial(person, date, value) {
		let age = person.age(date),
			sf = (person.sex === 'female' ? 0.96 : 1) * value / 167;
		return sf * (age.months < 3 ? age.months * 10 + 50 : // Weech's formula
			age.years <= 14 ? age.years * 6 + 77 : // Weech
			age.years <= 19 ? age.years * 2 + 135 : 173); // guess
	},
	other: (person, date, val) => {
		let fluctuation = 1.5 * bell(noise(date, 2 * DAY), 2);
		return val + fluctuation;
	}
};
