import { weightedPick } from '../utils';

const prescriptions = [
	[null, 1],
	['warfarin', 1],
	['aspirin', 1],
	['paracetemol', 1]
];

export default {
	id: 'prescription',
	name: 'Drug prescription',
	description: 'A new prescription or change of a prescription for a drug',
	initial() { return weightedPick(prescriptions); },
	filter(val) { return val !== null; }
};
