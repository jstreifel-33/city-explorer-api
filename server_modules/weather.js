'use strict';

const axios = require('axios');

let { cache } = require('./cache.js');

module.exports = { serveWeather };

async function serveWeather(req, res) {
  const { lat, lon } = req.query;
  const key = 'weather-' + lat + lon;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=7`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 300000)) {
    res.status(200).send(parseWeather(cache[key]));
  } else {
    cache[key] = {};
    cache[key].timestamp = Date.now();
    try {
      let response = await axios.get(url);
      cache[key].data = response.data.data;
      res.status(200).send(parseWeather(cache[key]));
    } catch (e) {
      res.status(500).json({ error: 'Something went wrong retrieving weather data. Please try again later.' }); //return error on error
    }
  }
}

function parseWeather(weatherData) {
  return weatherData.data.map(day => new Weather(day));
}

class Weather {
  constructor(obj) {
    this.date = obj.datetime;
    this.lowTemp = obj.low_temp;
    this.highTemp = obj.high_temp;
    this.description = obj.weather.description;
    this.icon = obj.weather.icon;
  }
}
