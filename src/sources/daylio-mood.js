import { noise, DAY, WEEK } from '../utils';

export default {
	id: 'daylio-mood',
	name: 'Daylio app',
	reviewQuery: 'patient mood diary',
	description: 'A mood diary app.',
	types: ['satisfaction'],
	precision: 10,
	next: date => DAY + Math.abs(noise(date, DAY)) * WEEK // seconds until the next sample
};