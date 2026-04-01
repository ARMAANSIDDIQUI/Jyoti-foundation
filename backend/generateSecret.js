const crypto = require('crypto');

const secret = crypto.randomBytes(64).toString('hex');
console.log('--- YOUR NEW JWT SECRET ---');
console.log(secret);
console.log('---------------------------');
console.log('Copy the value above and paste it into your backend/.env file.');
