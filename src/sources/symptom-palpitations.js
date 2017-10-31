import { noise, DAY, MONTH } from '../utils';

export default {
	id: 'palpitations',
	types: ['palpitations'],
	next: date => DAY + Math.abs(noise(date, DAY)) * MONTH // seconds until the next sample
};