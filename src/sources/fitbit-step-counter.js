import { noise, DAY, MONTH } from '../utils';

export default {
	id: 'fitbit-step-counter',
	name: 'Fitbit Surge',
	reviewQuery: 'fitbit physical activity',
	types: ['caloric_burn'],
	description: 'A wearable device which records steps through motion sensors.',
	next: date => DAY + Math.abs(noise(date, DAY)) * MONTH // seconds until the next sample
};