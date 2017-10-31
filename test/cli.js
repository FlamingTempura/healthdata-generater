const { test } = require('tap');
const { exec } = require('child_process');
const { tmpdir } = require('os');
const fs = require('fs');

test('cli', t => {
	t.plan(2);
	exec(`node mhealthgen ${tmpdir()}/mhealthgen-patient.json`, err => {
		if (err) { throw err; }
		let patient = JSON.parse(fs.readFileSync(`${tmpdir()}/mhealthgen-patient.json`, 'utf8'));
		fs.unlinkSync(`${tmpdir()}/mhealthgen-patient.json`);
		t.equal(typeof patient.id, 'string');
		t.ok(['male', 'female'].indexOf(patient.sex) > -1);
	});
});