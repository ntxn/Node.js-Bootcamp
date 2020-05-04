const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

console.log('Starting');

setTimeout(() => {
  console.log('2 second timer');
}, 2000);

setTimeout(() => {
  console.log('0 second timer');
}, 0);

console.log('Stopping');
console.log(process.env.WEATHERSTACK_API_KEY);
