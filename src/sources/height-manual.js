import { noise, DAY, MONTH } from '../utils';

export default {
	id: 'height-manual',
	types: ['height'],
	name: 'Tape measure.',
	description: 'Tape measure.',
	reviewQuery: 'patient height self tracking',
	precision: 0.5,
	next: date => DAY + Math.abs(noise(date, DAY)) * MONTH // seconds until the next sample
};