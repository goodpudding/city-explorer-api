'use strict';

console.log('My first server');

const express = require('express');
const cors = require('cors');

require('dotenv').config();

let data = require('./data/weather.json');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('Hello from my server!');
});

app.get('/weather', (req, res, next) => {
  let citySearched = req.query.city_name;
  // let lat = req.query.lat;
  // let lon = req.query.lat;
  try {
    let getCity = data.find((search) => search.city_name === citySearched);
    let selectedCity = getCity.data.map( passedObj => new Forecast(passedObj));
    res.status(200).send(selectedCity);
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
    this.todaysDate = CityObject.valid_date;
    this.low = CityObject.low_temp;
    this.high = CityObject.high_temp;
    this.todaysDescription = CityObject.weather.description;
  }
}

app.listen(PORT, () => console.log(`listening on port${PORT}`));
