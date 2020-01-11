const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const alias = require('rollup-plugin-alias');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const requireContext = require('rollup-plugin-require-context');
const replace = require('rollup-plugin-replace');
const { eslint } = require('rollup-plugin-eslint');
const pkg = require('../package.json');
const { toCamel } = require('./utils');
const aliass = require('./alias.js');

const name = toCamel(pkg.name);
const author = pkg.author || 'Hyhello';
const version = process.env.VERSION || pkg.version;
const env = process.env.NODE_ENV || 'development';

const banner =
	'/*!\n' +
	` * ${pkg.name} v${version}\n` +
	` * @license (c) 2018-${new Date().getFullYear()} ${author}\n` +
	' * Released under the MIT License.\n' +
	' */';

const config = {
	input: 'src/index.js',
	output: [
		{
			format: 'umd',
			name: name,
			file: pkg.main,
			sourcemap: false,
			banner: banner
		}
	],
	plugins: [
		resolve(),
        commonjs(),
        json(),
        requireContext(),
		alias(Object.assign({}, aliass)),
		eslint({
			formatter: require('eslint-friendly-formatter'),
			include: ['src/**/*.js']
		}),
		babel({
			exclude: 'node_modules/**'
		}),
		replace({
			__VERSION__: version,
			'process.env.NODE_ENV': JSON.stringify(env)
		})
	]
};

module.exports = config;
