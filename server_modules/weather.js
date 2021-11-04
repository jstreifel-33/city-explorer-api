const axios = require('axios');

class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.lowTemp = obj.low_temp;
    this.highTemp = obj.high_temp;
    this.description = obj.weather.description;
    this.icon = obj.weather.icon;
  }
}

async function retrieveWeather(lat, lon) {
  console.log(lat, lon, process.env.WEATHER_API_KEY);
  try{
  return await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=7&units=I`);
  }catch(e){
    console.log('weather request failed');
  }
}

async function serveWeather(req, res) {
  const { lat, lon } = req.query;
  try{
    let weatherResponse = await retrieveWeather(lat, lon);
    let weatherData = weatherResponse.data.data;
    let forecastArray = weatherData ? weatherData.map(day => new Forecast(day)) : false;
    res.status(200).send(forecastArray); // send back forecast array on success
  } catch (e) {
    res.status(500).json({ error: 'Something went wrong retrieving movie data. Please try again later.' }); //return error on error
  }
}

module.exports = {serveWeather};