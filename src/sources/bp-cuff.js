import { noise, DAY, MONTH } from '../utils';

export default {
	id: 'valuemed-bp',
	name: 'ValueMed Blood Pressure Cuff',
	types: ['bp_diastolic', 'bp_systolic'],
	unit: 'mmHg',
	reviewQuery: 'consumer blood pressure cuff',
	precision: 2,
	next: date => DAY / 2 + Math.abs(noise(date, DAY)) * MONTH / 3 // seconds until the next sample
};