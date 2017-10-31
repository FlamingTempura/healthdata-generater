const { test } = require('tap');

test('node require', t => {
	t.plan(2);
	const { generate } = require('../');
	let patient = generate();
	t.equal(typeof patient.id, 'string');
	t.ok(['male', 'female'].indexOf(patient.sex) > -1);
});