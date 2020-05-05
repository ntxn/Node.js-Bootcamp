const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

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
  res.send({ location: 'Los Angeles', forecast: 'bla' });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
