'use strict';

console.log('My first server');
const express = require('express');
const cors = require('cors');
const reqWeather = require('./module/weather');
const reqMovie = require('./module/movie');
require('dotenv').config();

// let data = require('./data/weather.json');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('Hello from my server!');
});

app.get('/weather', reqWeather);

app.get('/movies', reqMovie );

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.get('*', (req, res) => {
  res.send('The resource does not exist');
});



app.listen(PORT, () => console.log(`listening on port${PORT}`));
