import { id, seed, resetSeeds, pick, weightedPick, rand, DAY, MONTH, YEAR, strval, shuffle } from './utils';

import s1 from './sources/symptom-palpitations.js';
import s2 from './sources/symptom-breathlessness.js';
import s3 from './sources/scales.js';
import s4 from './sources/medicate.js';
import s5 from './sources/inr-reader.js';
import s6 from './sources/height-manual.js';
import s7 from './sources/fitbit-step-counter.js';
import s8 from './sources/fitbit-sleep.js';
import s9 from './sources/fitbit-intake.js';
import s10 from './sources/daylio-mood.js';
import s11 from './sources/clinical-visit.js';
import s12 from './sources/bp-cuff.js';
import s13 from './sources/apple-watch-hr.js';
import t1 from './types/weight.js';
import t2 from './types/sleep.js';
import t3 from './types/satisfaction.js';
import t4 from './types/procedure.js';
import t5 from './types/prescription.js';
import t6 from './types/palpitations.js';
import t7 from './types/medicate.js';
import t8 from './types/inr.js';
import t9 from './types/height.js';
import t10 from './types/heartrate.js';
import t11 from './types/diagnosis.js';
import t12 from './types/caloric-intake.js';
import t13 from './types/caloric-burn.js';
import t14 from './types/breathlessness.js';
import t15 from './types/bp-systolic.js';
import t16 from './types/bp-diastolic.js';

const types = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16];
const sources = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13];

const firstNames = {
	male: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Charles', 'Joseph', 'Thomas', 'Christopher', 'Daniel', 'Paul', 'Mark', 'Donald',
		'George', 'Kenneth', 'Steven', 'Edward', 'Brian', 'Ronald', 'Anthony', 'Kevin', 'Jason', 'Matthew', 'Gary', 'Timothy', 'Jose', 'Larry', 'Jeffrey', 'Frank', 
		'Scott', 'Eric', 'Stephen', 'Andrew', 'Raymond', 'Gregory', 'Joshua', 'Jerry', 'Dennis', 'Walter', 'Patrick', 'Peter', 'Harold', 'Douglas'],
	female: ['Mary', 'Patricia', 'Linda', 'Barbara', 'Elizabeth', 'Jennifer', 'Maria', 'Susan', 'Margaret', 'Dorothy', 'Lisa', 'Nancy', 'Karen', 'Betty', 'Helen',
		'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle', 'Laura', 'Sarah', 'Kimberly', 'Deborah', 'Jessica', 'Shirley', 'Cynthia', 'Angela', 'Melissa', 
		'Brenda', 'Amy', 'Anna', 'Rebecca', 'Virginia', 'Kathleen', 'Pamela', 'Martha', 'Debra', 'Amanda', 'Stephanie', 'Carolyn', 'Christine', 'Marie', 'Janet']
};
const lastNames = ['Scully', 'Lightfoot', 'Sandberg', 'Boggs', 'Swain', 'Herring', 'Williford', 'Jacobs', 'Clifton', 'Cooke', 'Rinaldi', 'Edward', 'Villa', 'Slater',
	'Reese', 'Forrester', 'Foley', 'Wheaton', 'Atherton', 'Cady', 'Branson', 'Mcneal', 'Sharp', 'Wirth', 'Archer', 'Spivey', 'Field', 'Hagan', 'Lin', 'Andrew', 'Guerra',
	'Kinsey', 'Galindo', 'Popp', 'Hiatt', 'Howes', 'Hilliard', 'Blackwell', 'Elliott', 'Tanner', 'Alexander', 'Ledford', 'Alderman', 'Hairston', 'Markham'];
// https://www.blood.co.uk/why-give-blood/the-need-for-blood/know-your-blood-group/
const bloodTypes = [['a+', 0.3], ['a-', 0.08], ['b+', 0.08], ['b-', 0.02], ['o+', 0.36], ['o-', 0.12], ['ab+', 0.03], ['ab-', 0.01]];

const generate = (options = {}) => {
	let { person = {}, fluctuations = true, associations = true, days = 30 } = options;
	resetSeeds();

	if (!person.hasOwnProperty('id')) { person.id = id(); }
	if (!person.hasOwnProperty('version')) { person.version = 0; }
	if (!person.hasOwnProperty('sex')) { person.sex = pick(['male', 'female']); }
	if (!person.hasOwnProperty('firstName')) { person.firstName = pick(firstNames[person.sex]); }
	if (!person.hasOwnProperty('lastName')) { person.lastName = pick(lastNames); }
	if (!person.hasOwnProperty('birthdate')) { person.birthdate = new Date(Date.now() - rand(0, 70) * YEAR); }
	if (!person.hasOwnProperty('bloodType')) { person.bloodType = weightedPick(bloodTypes); }
	if (!person.hasOwnProperty('normalHeight')) { person.normalHeight = 150; }
	if (!person.hasOwnProperty('normalWeight')) { person.normalWeight = 90; }
	if (!person.hasOwnProperty('normalIntake')) { person.normalIntake = 2500; }
	if (!person.hasOwnProperty('normalSatisfaction')) { person.normalSatisfaction = 0.5; }
	if (!person.hasOwnProperty('normalSleepHours')) { person.normalSleepHours = 8; }
	if (!person.hasOwnProperty('restingHeartRate')) { person.restingHeartRate = 60; }
	if (!person.hasOwnProperty('avgBurn')) { person.avgBurn = rand(1500, 3000); } // how much physical activity do they do? 

	seed(person.id); // deterministic randomness
	
	person.version++;
	person.sources = sources;
	person.types = types;
	person.nodes = [];
	person.birthdate = new Date(person.birthdate);
	person.age = date => {
		let diff = date.getTime() - person.birthdate.getTime();
		return {
			days: diff / DAY,
			month: diff / MONTH,
			years: diff / YEAR
		};
	};
	person.sample = (typeName, date, checkAssociations) => { // checkAssociations prevents cyclic recursion
		let oldSeed = seed(strval(`${person.id}:type:${typeName}`)),
			type = types.find(type => type.id === typeName),
			value = type.initial(person, date);
		if (type.associations && checkAssociations && associations) {
			value = type.associations(person, date, value);
		}
		if (type.fluctuations && fluctuations) {
			value = type.fluctuations(person, date, value);
		}
		if (type.thresholds) {
		 	let thresholds = type.thresholds(person, date);
			if (thresholds.max) {
				value = Math.min(thresholds.max, value);
			}
			if (thresholds.min) {
				value = Math.max(thresholds.min, value);
			}
		}
		seed(oldSeed);
		return value;
	};

	let startDate = new Date(Date.now() - days * DAY),
		endDate = new Date();

	 shuffle(sources).map(source => {
		let oldSeed = seed(strval(`${person.id}:source:${source.id}`)),
			types_ = source.types.map(t => types.find(type => type.id === t)),
			timestamp = startDate.getTime() + source.next(startDate),
			end = endDate.getTime();
		while (timestamp < end) {
			let date = new Date(timestamp);
			types_.forEach(type => {
				let value = person.sample(type.id, date, true);
				if (source.precision) {
					let decimalplaces = (source.precision + '.').split('.')[1].length;
					value = Number((Math.round(value * 1 / source.precision) * source.precision).toFixed(decimalplaces)); // prevent floating point errors (eg 1.00000001)
				}
				person.nodes.push({
					date,
					type: type.id,
					source: source.id,
					value
				});
			});
			timestamp += source.next(date);
		}
		seed(oldSeed);
		return {
			id: source.id,
			name: source.name,
			unit: source.unit,
			description: source.description,
			reviewQuery: source.reviewQuery
		};
	});

	person.nodes = person.nodes.sort((n1, n2) => n1.date.getTime() - n2.date.getTime());

	return person;
};

if (typeof require !== 'undefined' && require.main === module) { // if CLI
	const fs = require('fs');
	const argv = require('yargs')
		.usage('$0 [options] <outfile>', 'Generate healthdata', yargs => {
			yargs.positional('outfile', {
				describe: 'The output json file'
			});
		})
		.alias('p', 'person')
		.describe('p', 'Existing person file')
		.alias('d', 'days')
		.describe('days', 'Number of days to generate health data for')
		.default('d', 30)
		.alias('a', 'associations')
		.describe('a', 'Account for associated events')
		.default('a', true)
		.alias('f', 'fluctuations')
		.describe('f', 'Account for random fluctuations')
		.default('f', true)
		.alias('h', 'help')
		.help('h')
		.alias('v', 'version')
		.example('$0 example.json', 'generate random person and health data')
		.example('$0 -p example.json example2.json', 'regenerate health data for existing person')
		.demandCommand(1)
		.argv;

	if (argv.person) {
		argv.person = JSON.parse(fs.readFileSync(argv.person), 'utf8');
	}
	let person = generate(argv);
	fs.writeFileSync(argv.outfile, JSON.stringify(person, null, 2), 'utf8');
}

export default { generate, types, sources };