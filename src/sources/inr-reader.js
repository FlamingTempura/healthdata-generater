import { noise, DAY, MONTH } from '../utils';

export default {
	id: 'inr-reader',
	name: 'INR reader',
	description: 'Consumer INR reader.',
	reviewQuery: 'inr self-monitoring',
	types: ['inr'],
	precision: 0.01,
	next: date => DAY + Math.abs(noise(date, DAY)) * MONTH // seconds until the next sample
};