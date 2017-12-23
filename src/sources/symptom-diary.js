import { noise, DAY, MONTH } from '../utils';

export default {
	id: 'symptom-diary',
	types: ['symptom-palpitations', 'symptom-breathlessness'],
	name: 'Symptom diary',
	description: 'Person recorded an episode of palpitations.',
	reviewQuery: 'patient symptom diary',
	precision: 1,
	next: date => DAY + Math.abs(noise(date, DAY)) * MONTH // seconds until the next sample
};