import { bell, noise, HOUR, MINUTE, YEAR } from '../utils';

export default {
	id: 'caloric_burn',
	name: 'Caloric burn',
	unit: 'kcal',
	description: 'Calories burned, for example, through exercise',
	thresholds(person) {
		return { min: 800, max: person.avgBurn * 3 };
	},
	initial(person) {
		return person.avgBurn;
	},
	fluctuations(person, date) {
		let longTermActivityChanges = person.avgBurn * (0.9 + noise(date, YEAR) * 0.2),
			routineActivity = 1 * person.avgBurn * Math.abs(noise(date, MINUTE)),
			sporadicActivity = 1 * person.avgBurn * bell(noise(date, HOUR), 19);
		return longTermActivityChanges + routineActivity + sporadicActivity +
			person.avgBurn / 24 * 60 * noise(date, MINUTE);
	}
};
