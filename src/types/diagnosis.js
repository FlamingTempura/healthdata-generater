import { weightedPick } from '../utils';

const diagnoses = [
	['obesity', 1],
	['heart failure', 1],
	['hypertension', 1],
	['atrial fibrillation', 1],
	['stroke', 1],
	['leg fracture', 1],
	['arm fracture', 1],
	['lung cancer', 1],
	['depression', 1]
];

export default {
	id: 'diagnosis',
	name: 'Diagnosis',
	description: 'A diagnosis made by a clinician.',
	initial() {
		return weightedPick(diagnoses);
	}
};
