'use strict';

//--SETUP AND INITIALIZATION
//Setup requirements of express server
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const axios = require('axios');
//Enable cors
app.use(cors());
//Define PORT based on environment
const PORT = process.env.PORT;

//--SERVER PATHS
app.get('/hello', (req, res) => res.send('Hi there! :)'));
app.get('/weather', serveWeather);
app.get('/movies', serveMovie);
app.get('/*', (req,res) => res.status(500).json({error: 'Server resource does not exist!'}));

//--SERVER DATA RETRIEVAL
//Retrieve Weather data from weatherbit.io
async function retrieveWeather(lat, lon) {
  return await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=7&units=I`);
}
//Retrive Movie data from TMDB
async function retrieveMovies(place){
  return await axios.get(`https://api.themoviedb.org/3/movie/550?api_key=241e72dd762cf653d0f4c9a6b2dc611f`);
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

//--SERVER ACTIONS
//Handle weather information query
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

//Handle movie information query

//--HELLO SERVER
//Listen at open port (proof of life)
app.listen(PORT, () => console.log(`I am alive! Listening on port: ${process.env.PORT}`));
