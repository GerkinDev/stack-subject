import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sourceMaps from 'rollup-plugin-sourcemaps';

export default {
	input: 'src/index.ts',
	output: {
		file: `dist/index.js`,
		format: 'es',
		// Use `name` as window to hack a bit & avoid exports.
		name: 'StackSubject',
		sourcemap: true,
	},
	plugins: [
		// Compile TypeScript files
		typescript({
			clean:                     true,
			check:                     true,
		}),
		// Allow node_modules resolution, so you can use 'external' to control
		// which external modules to include in the bundle
		// https://github.com/rollup/rollup-plugin-node-resolve#usage
		resolve({
			browser: true,
		}),
		
		terser(),
		
		sourceMaps(),
	],
	external: [ 'rxjs' ]
}
