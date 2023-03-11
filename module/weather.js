
const axios = require('axios');

const reqWeather = async (req, res, next) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  try {
    console.log(req.query);
    let weatherRequest = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    let results = await axios.get(weatherRequest);
    console.log(results.data);
    let response = results.data.data.map((passedObj) => new Forecast(passedObj));
    console.log(results);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
}


class Forecast {
  constructor(cityObject) {
    this.todaysDate = cityObject.valid_date;
    this.low = cityObject.low_temp;
    this.high = cityObject.high_temp;
    this.todaysDescription = cityObject.weather.description;
  }
}

module.exports = reqWeather;