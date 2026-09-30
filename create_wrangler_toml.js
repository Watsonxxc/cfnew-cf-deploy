const fs = require('fs');
const mjs = fs.readdirSync('.').find(f => f.endsWith('.mjs'));
if (!mjs) { console.error('No .mjs file found'); process.exit(1); }
const accountId = process.env.CF_ACCOUNT || '4d56d0fe43a1fed19a20f1d56158757a';
const kvId = process.env.CF_KV_ID || '767924847e864431bd4b8a292b129a70';
const enableKV = process.env.CF_KV_ENABLED !== 'false';
var tomlLines = [
  'name = "cfnew"',
  'main = "' + mjs + '"',
  'compatibility_date = "2025-01-01"',
  'account_id = "' + accountId + '"'
];
if (enableKV) {
  tomlLines.push('[[kv_namespaces]]');
  tomlLines.push('binding = "c"');
  tomlLines.push('id = "' + kvId + '"');
}
var toml = tomlLines.join('\n') + '\n';
fs.writeFileSync('wrangler.toml', toml);
console.log('wrangler.toml created: main=' + mjs + (enableKV ? ' KV=' + kvId : ' (no KV)'));
