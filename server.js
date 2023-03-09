'use strict';

console.log('My first server');

const express = require('express');

require('dotenv').config();

let data = require('./data/weather.json');
const app = express();

const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('Hello from my server!');
});

app.get('/weather', (req, res, next) => {
  let citySearched = req.query.city_name;
  try {
    let getCity = data.find((search) => search.city_name === citySearched);
    let selectedCity = getCity.data.map( passedObj => new Forecast(passedObj));
    res.send(selectedCity);
  } catch (error) {
    next(error);
  }
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


app.get('*', (req, res) => {
  res.send('The resource does not exist');
});

class Forecast {
  constructor(CityObject) {
    console.log(CityObject);
    this.todaysDate = CityObject.valid_date;
    this.todaysDescription = CityObject.weather.description;
  }
}

app.listen(PORT, () => console.log(`listening on port${PORT}`));
