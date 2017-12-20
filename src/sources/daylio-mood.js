import { noise, DAY, MONTH } from '../utils';

export default {
	id: 'daylio - mood',
	name: 'Daylio app',
	reviewQuery: 'mood diary app',
	description: 'A mood diary app.',
	types: ['satisfaction'],
	next: date => DAY + Math.abs(noise(date, DAY)) * MONTH // seconds until the next sample
};