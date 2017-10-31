import { noise, MINUTE, DAY } from '../utils';

export default {
	id: 'iwatch-hr',
	name: 'Apple Watch',
	description: 'Apple Watch smartwatch heart rate monitor. The heart rate is read using light sensors.',
	types: ['hr'],
	reviewQuery: 'apple watch heart rate',
	precision: 1,
	next: date => MINUTE + Math.abs(noise(date, DAY)) * DAY // seconds until the next sample
};