const path = require('path');
const express = require('express');
const hbs = require('hbs');
const dotenv = require('dotenv');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

dotenv.config({ path: './config.env' });
const app = express();
const port = process.env.PORT || 3000;

// Setup handlebars and views location
app.set('view engine', 'hbs'); // at this step, the default view folder is called views at the root dir
app.set('views', path.join(__dirname, '../templates/views')); // change the default view folder
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

// Setup routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Robot',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Robot',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is a help message',
    title: 'Help',
    name: 'Robot',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address)
    return res.status(400).json({ error: 'You must provide an address' });

  geocode(req.query.address, (error, { lat, lng, location } = {}) => {
    if (error) return res.status(400).json({ error });

    forecast(lat, lng, (error, forecastData) => {
      if (error) return res.status(400).json({ error });
      res.status(200).json({
        location,
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Robot',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Robot',
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.log('Server is up on port 3000');
});
