const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const src = '明文源吗';
const out = 'edgetunnel.mjs';
const srcPath = path.join(process.cwd(), src);

if (!fs.existsSync(srcPath)) {
  console.log('No 明文源吗 found, checking existing worker file...');
} else {
  const code = fs.readFileSync(srcPath, 'utf8');
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
  console.log('Obfuscated successfully -> ' + out);
}
