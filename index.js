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
function retrieveWeather(lat, lon) {
  axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=7`)
    .then(response => response);
}

//Return classes
class Forecast {
  constructor(date, description){
    this.date = date;
    this.description = description;
  }
}

//server actions
async function serveWeather(req, res) {
  let {name, lat, lon} = req.query;

  let weatherResult = await retrieveWeather(lat, lon);

  console.log(weatherResult);

  // let weatherArray = weatherResult ? weatherResult.data.map(day => new Forecast(day.valid_date, day.weather.description)) : false;

  // if(weatherArray){
  //   res.send(weatherArray); // send back weather stuff
  // }else{
  //   res.status(404).json({error: 'Weather data not found'}); //return not found error
  // }
}

//listen at open port (proof of life)
app.listen(PORT, () => console.log('I am alive!'));
