import { noise, DAY, MONTH } from '../utils';

export default {
	id: 'breathlessness',
	types: ['breathlessness'],
	next: date => DAY + Math.abs(noise(date, DAY)) * MONTH // seconds until the next sample
};