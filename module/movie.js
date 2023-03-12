const axios = require('axios');

const reqMovie = async (req, res, next) => {
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
};


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

module.exports = reqMovie;
