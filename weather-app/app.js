const dotenv = require('dotenv');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

dotenv.config({ path: './config.env' });

if (process.argv.length !== 3)
  return console.log(
    'Please provide an address. Use double quote for multiple words'
  );

geocode(process.argv[2], (error, { lat, lng, location } = {}) => {
  if (error) return console.log(error);

  forecast(lat, lng, (error, forecastData) => {
    if (error) return console.log(error);
    console.log(`Weather report for ${location}\n${forecastData}`);
  });
});
