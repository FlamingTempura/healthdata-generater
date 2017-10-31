import { noise, DAY, MONTH } from '../utils';

export default {
	id: 'height manual',
	types: ['height'],
	precision: 0.5,
	next: date => DAY + Math.abs(noise(date, DAY)) * MONTH // seconds until the next sample
};