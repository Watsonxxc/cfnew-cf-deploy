const fs = require('fs');
const mjs = fs.readdirSync('.').find(f => f.endsWith('.mjs'));
if (mjs) {
  let c = fs.readFileSync(mjs, 'utf8');
  const uuid = process.env.CFNEW_UUID || '69b202d8-bfb3-4c0c-8f1c-9e13733f2261';
  c = c.replace(/let 认证令牌 = '[^']+'/, `let 认证令牌 = '${uuid}'`);
  fs.writeFileSync(mjs, c, 'utf8');
  console.log('UUID updated in ' + mjs + ' -> ' + uuid);
} else {
  console.log('No .mjs file found');
}
