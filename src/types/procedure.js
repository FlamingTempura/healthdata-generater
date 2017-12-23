import { weightedPick } from '../utils';

const procedures = [
	[null, 5],
	['ablation', 2],
	['bypass', 1]
];

export default {
	id: 'procedure',
	name: 'Clinical procedure',
	description: 'A clinical procedure, such as surgery or blood test.',
	initial() { return weightedPick(procedures); },
	filter(val) { return val !== null; }
};
