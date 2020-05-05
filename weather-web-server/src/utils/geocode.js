const request = require('postman-request');

module.exports = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) return callback('Unable to connect to location services');
    if (body.features.length === 0)
      return callback('Unable to find location. Try another search');

    const { place_name, center } = body.features[0];
    const [lng, lat] = center;
    callback(undefined, { location: place_name, lng, lat });
  });
};
