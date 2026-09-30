const fs = require('fs');
const mjs = fs.readdirSync('.').find(f => f.endsWith('.mjs'));
if (!mjs) { console.error('No .mjs found'); process.exit(1); }
let c = fs.readFileSync(mjs, 'utf8');
const uuid = process.env.CFNEW_UUID || 'fca1522b-fd22-490c-b4fe-b1722a33b0f7';
c = c.replace(/let 认证令牌 = '[^']+'/, `let 认证令牌 = '${uuid}'`);
fs.writeFileSync(mjs, c, 'utf8');
console.log('Updated ' + mjs + ' UUID -> ' + uuid);
