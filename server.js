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
    let cityWeather = new Forecast(getCity);
    console.log(getCity.data.datetime);
    res.send(cityWeather);
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
    this.todaysDate = CityObject.data[0].valid_date;
    this.todaysDescription = CityObject.data[0].weather.description;
    this.tomorrowsDate = CityObject.data[1].valid_date;
    this.tomorrowsDescription = CityObject.data[1].weather.description;
    this.dayAfterTomDate = CityObject.data[2].valid_date;
    this.dayAfterTomDescription = CityObject.data[2].weather.description;
  }
}

app.listen(PORT, () => console.log(`listening on port${PORT}`));
