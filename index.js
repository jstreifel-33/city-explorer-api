'use strict';

//setup requirements of express server
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const axios = require('axios');

//enable cors
app.use(cors());

//define PORT based on environment
const PORT = process.env.PORT;

//server paths
app.get('/hello', (req, res) => res.send('Hi there! :)'));
app.get('/weather', serveWeather);
app.get('/*', (req,res) => res.status(500).json({error: 'Server resource does not exist!'}));

//server Data
async function retrieveWeather(lat, lon) {
  return await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=7&units=I`);
}

//Return classes
class Forecast {
  constructor(obj){
    this.date = obj.datetime;
    this.lowTemp = obj.low_temp;
    this.highTemp = obj.high_temp;
    this.description = obj.weather.description;
  }
}

//server actions
async function serveWeather(req, res) {
  let {name, lat, lon} = req.query;

  let weatherResponse = await retrieveWeather(lat, lon);
  let weatherData = weatherResponse.data.data;

  let forecastArray = weatherData ? weatherData.map(day => new Forecast(day)) : false;

  console.log(forecastArray);

  if(forecastArray){
    res.send(forecastArray); // send back forecast array
  }else{
    res.status(404).json({error: 'Weather data not found'}); //return not found error
  }
}

//listen at open port (proof of life)
app.listen(PORT, () => console.log('I am alive!'));
