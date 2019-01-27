import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { spawnSync } from 'child_process';

const dirname = resolve( fileURLToPath( import .meta.url ), '..' );
const README = resolve( dirname, 'README.md' );
const OUT = resolve( dirname, 'docs' );
const DOCS_URL = 'https://gerkindev.github.io/stack-subject/';

const readmeContent = readFileSync( README, 'utf-8' );

const endDelimiterPos = readmeContent.match( /^## Index$/m );
if ( !endDelimiterPos ){
	throw new Error();
}
const endPos = endDelimiterPos.index;
const constantContent = readmeContent.slice( 0, endPos ).trim();

writeFileSync( README, constantContent );

console.log( 'Generating docs' );
spawnSync( 'typedoc', ['--theme', 'markdown', '--out', OUT, '--mode', 'file', '--excludeNotExported'] );

console.log( 'Copying README' );
const rewritenContent = readFileSync( `${OUT}/README.md`, 'utf-8' );
const replacedContent = rewritenContent.replace( /\]\((?!http)(\w)/g, `](${DOCS_URL}$1` );
writeFileSync( README, replacedContent );
