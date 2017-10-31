const { test } = require('tap');
const jsdom = require('jsdom');
const fs = require('fs');

test('browser', t => {
	let document = new jsdom.JSDOM(`
		<h1 id="a"></h1>
		<script>${fs.readFileSync('mhealthgen.js', 'utf8')}</script>
		<script>
			patient = mhealthgen.generate();
			document.getElementById('a').textContent = patient.sex;
		</script>
	`, { runScripts: "dangerously" }).window.document;

	t.plan(1);
	t.ok(['male', 'female'].indexOf(document.getElementById('a').textContent) > -1);
});