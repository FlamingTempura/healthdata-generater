import { noise, DAY, MONTH } from '../utils';

export default {
	id: 'medicate',
	types: ['medicate'],
	precision: 0.01,
	name: 'Medication diary',
	description: 'The person took their medication and recorded it.',
	next: date => DAY + Math.abs(noise(date, DAY)) * MONTH // seconds until the next sample
};