const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const src = '明文源吗';
const out = 'edgetunnel.mjs';

if (!fs.existsSync(path.join(process.cwd(), src))) {
  console.log('No 明文源吗 found');
  process.exit(1);
}
const code = fs.readFileSync(path.join(process.cwd(), src), 'utf8');
const obfuscated = JavaScriptObfuscator.obfuscate(code, {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 1.0,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 2,
  renameGlobals: true,
  identifierNamesGenerator: 'mangled-shuffled',
  target: 'browser',
  numbersToExpressions: false,
  simplify: false,
  splitStrings: true,
  splitStringsChunkLength: 1,
  unicodeEscapeSequence: true,
  selfDefending: false,
  disableConsoleOutput: false,
  domainLock: []
}).getObfuscatedCode();
fs.writeFileSync(path.join(process.cwd(), out), obfuscated, 'utf8');
console.log('Obfuscated -> ' + out);
