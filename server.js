'use strict';

console.log('My first server');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const reqWeather = require('./module/weather');
require('dotenv').config();

// let data = require('./data/weather.json');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('Hello from my server!');
});

app.get('/weather', reqWeather);

app.get('/movies', async (req, res, next) => {
  let cityName = req.query.cityName;
  try {
    let movieURL = `
    https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${cityName}&page=1&include_adult=false`;
    let movieResults = await axios.get(movieURL);
    let response =  movieResults.data.results.map(passedObj => new Movie (passedObj));
    res.status(200).send(response);
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



class Movie {
  constructor(movieObject){
    this.title = movieObject.title;
    this.overview = movieObject.overview;
    this.averageVote = movieObject.vote_average;
    this.voteCount = movieObject.vote_count;
    this.imageURL = `https://image.tmdb.org/t/p/w500${movieObject.poster_path}`;
    this.popularity = movieObject.popularity;
    this.releasedOn = movieObject.release_date;

  }
}

app.listen(PORT, () => console.log(`listening on port${PORT}`));
