const fs = require('fs');
const mjs = fs.readdirSync('.').find(f => f.endsWith('.mjs'));
if (!mjs) { console.error('No .mjs found'); process.exit(1); }
const accountId = process.env.CF_ACCOUNT || '4d56d0fe43a1fed19a20f1d56158757a';
const toml = `name = "cfnew"
main = "${mjs}"
compatibility_date = "2025-01-01"
account_id = "${accountId}"
`;
fs.writeFileSync('wrangler.toml', toml);
console.log('wrangler.toml created for ' + mjs);
