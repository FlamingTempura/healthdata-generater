import { noise, DAY, MONTH } from '../utils';

export default {
	id: 'inr_reader',
	name: 'INR reader',
	description: 'Consumer INR reader.',
	types: ['inr'],
	next: date => DAY + Math.abs(noise(date, DAY)) * MONTH // seconds until the next sample
};