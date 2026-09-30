const fs = require('fs');
const mjs = fs.readdirSync('.').find(f => f.endsWith('.mjs')) ||
              fs.readdirSync('.').find(f => f.includes('edgetunnel') && !f.endsWith('.yml'));
if (!mjs) { console.error('No worker script found'); process.exit(1); }
const accountId = process.env.CF_ACCOUNT || '4d56d0fe43a1fed19a20f1d56158757a';
const toml = 'name = "cfnew"\n' +
             'main = "' + mjs + '"\n' +
             'compatibility_date = "2025-01-01"\n' +
             'account_id = "' + accountId + '"\n';
fs.writeFileSync('wrangler.toml', toml);
console.log('wrangler.toml created for: ' + mjs);
