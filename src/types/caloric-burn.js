import { rand, bell, noise, HOUR, MINUTE, YEAR } from '../utils';

export default {
	id: 'caloric-burn',
	name: 'Caloric burn',
	unit: 'kcal',
	description: 'Calories burned, for example, through exercise',
	thresholds() {
		let avgBurn = Math.round(rand(1500, 3000));
		return {
			min: Math.round(rand(750, 950)),
			normal: avgBurn,
			max: Math.round(rand(avgBurn * 2.5, avgBurn * 3.5))
		};
	},
	fluctuations(person, date, val) {
		let longTermActivityChanges = val * (0.9 + noise(date, YEAR) * 0.2),
			routineActivity = 1 * val * Math.abs(noise(date, MINUTE)),
			sporadicActivity = 1 * val * bell(noise(date, HOUR), 19);
		return longTermActivityChanges + routineActivity + sporadicActivity +
			val / 24 * 60 * noise(date, MINUTE);
	}
};
