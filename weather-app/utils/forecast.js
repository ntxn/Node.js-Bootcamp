const request = require('postman-request');

module.exports = (lat, lng, callback, unit = 'f') => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${lat},${lng}&units=${unit}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) return callback('Unable to connect to weather service');
    if (body.error) return callback('Unable to find location');

    const {
      weather_descriptions: descriptions,
      temperature: temp,
      feelslike,
    } = body.current;
    callback(
      undefined,
      `${descriptions[0]}. It is currently ${temp} degrees out. It feels like ${feelslike} degrees out`
    );
  });
};
