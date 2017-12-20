import { bell, noise, DAY } from '../utils';

export default {
	id: 'height',
	name: 'Height',
	unit: 'cm',
	description: 'Height measurement',
	thresholds(person) {
		let sf = (person.sex === 'female' ? 0.96 : 1) * person.normalHeight / 167;
		return {
			min: sf * 50,
			max: sf * 250
		};
	},
	initial(person, date) {
		let age = person.age(date),
			sf = (person.sex === 'female' ? 0.96 : 1) * person.normalHeight / 167;
		return sf * (age.months < 3 ? age.months * 10 + 50 : // Weech's formula
			age.years <= 14 ? age.years * 6 + 77 : // Weech
			age.years <= 19 ? age.years * 2 + 135 : 173); // guess
	},
	other: (person, date, val) => {
		let fluctuation = 1.5 * bell(noise(date, 2 * DAY), 2);
		return val + fluctuation;
	}
};
