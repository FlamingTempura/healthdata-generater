import { noise, DAY, MONTH } from '../utils';

export default {
	id: 'clinical-visit',
	name: 'Clinical visit',
	description: 'Visit to a clinic or hospital',
	types: ['diagnosis', 'procedure', 'prescription'],
	reviewQuery: 'clinical visit diary patient',
	next: date => DAY + Math.abs(noise(date, MONTH)) * MONTH // seconds until the next sample
};