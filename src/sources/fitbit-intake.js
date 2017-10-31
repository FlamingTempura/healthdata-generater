import { noise, DAY } from '../utils';

export default {
	id: 'fitbit - intake',
	name: 'Fitbit App',
	reviewQuery: 'calorie tracker',
	types: ['intake'],
	next: date => DAY + Math.abs(noise(date, DAY)) * 2 * DAY // seconds until the next sample
};