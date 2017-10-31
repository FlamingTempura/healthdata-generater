import uglifyes from 'rollup-plugin-uglify-es';
import babel from 'rollup-plugin-babel';
import esformatter from 'rollup-plugin-esformatter';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

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

};

export default {
	input: 'src/index.js',
	plugins: [
		//{ ongenerate: generateDocs },
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
