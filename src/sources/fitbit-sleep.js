import { bell, noise, DAY } from '../utils';

export default {
	id: 'fitbit-sleep',
	name: 'Fitbit Surge',
	types: ['sleep'],
	reviewQuery: 'fitbit sleep',
	description: 'A wearable device which records sleep through motion sensors.',
	precision: 0.1,
	next: date => DAY + bell(Math.abs(noise(date, DAY)), 3) * DAY // seconds until the next sample
};