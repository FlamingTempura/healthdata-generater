import uglifyes from 'rollup-plugin-uglify-es';
import babel from 'rollup-plugin-babel';
import esformatter from 'rollup-plugin-esformatter';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import fs from 'fs';
import mhealthgen from './src/index';

const browsers = [
	'Chrome >= 49',
	'ChromeAndroid >= 61',
	'Edge >= 14',
	'Firefox >= 52',
	'FirefoxAndroid >= 56',
	'iOS >= 10.2',
	'Opera >= 36',
	'OperaMobile >= 37',
	'Safari >= 10',
	'Samsung >=5'
];

const generateDocs = () => {
	let readme = fs.readFileSync('README.md', 'utf8');
	let types = mhealthgen.types.map(t => `${t.id} | ${t.name || ''} | ${t.unit || ''}`);
	let sources = mhealthgen.sources.map(s => `${s.id} | ${s.name || ''} | ${s.description || ''} | ${(s.types || []).join(', ')} | ${s.precision || ''}`);
	readme = readme.replace(/\[\/\/\]: # \(TYPES\)[\w\W]*\[\/\/\]: # \(TYPES!\)/m, `[//]: # (TYPES)

ID | Name | Unit
---|------|------
${types.join('\n')}

[//]: # (TYPES!)`).replace(/\[\/\/\]: # \(SOURCES\)[\w\W]*\[\/\/\]: # \(SOURCES!\)/m, `[//]: # (SOURCES)

ID | Name | Description | Types | Precision
---|------|-------------|-------|----------
${sources.join('\n')}

[//]: # (SOURCES!)`);
	fs.writeFileSync('README.md', readme, 'utf8');
};

export default {
	input: 'src/index.js',
	plugins: [
		{ ongenerate: generateDocs },
		resolve({
			browser: true
		}),
		commonjs(),
		babel({
			'presets': [
				['env', { targets: { browsers }, modules: false, loose: true }]
			],
			plugins: ['external-helpers'],
			exclude: 'node_modules/**'
		}),
		uglifyes(),
		esformatter({
			indent: {
				value: '	',
			},
			whiteSpace: {
				after: {
					ConditionalExpressionAlternate: 1
				}
			}
		})
	],
	//sourcemap: true,
	name: 'mhealthgen',
	output: {
		format: 'umd',
		file: 'mhealthgen.js'
	}
};
