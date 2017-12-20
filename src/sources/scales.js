import { noise, DAY, WEEK } from '../utils';

export default {
	id: 'scales',
	reviewQuery: 'weighing scales accuracy health adult',
	types: ['weight'],
	name: 'Weighing scales',
	description: 'Consumer analog weighing scales.',
	precision: 0.5,
	next: date => DAY + Math.abs(noise(date, DAY)) * WEEK // seconds until the next sample
};
