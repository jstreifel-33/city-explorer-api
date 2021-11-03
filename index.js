'use strict';

//setup requirements of express server
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

//enable cors
app.use(cors());

//define PORT based on environment
const PORT = process.env.PORT;

//server paths
app.get('/hello', (req, res) => res.send('Hi there! :)'));
app.get('/weather', serveWeather);
app.get('/*', (req,res) => res.status(500).json({error: 'Server resource does not exist!'}));

//server Data
let weatherData = require('./weather.json');

//Return classes
class Forecast {
  constructor(date, description){
    this.date = date;
    this.description = description;
  }
}

//server actions
function serveWeather(req, res) {
  let search = req.query;

  let weatherResult = weatherData.find(place => Math.floor(parseFloat(search.lat)) === Math.floor(parseFloat(place.lat)) && Math.floor(parseFloat(search.lon)) === Math.floor(parseFloat(place.lon)));

  let weatherArray = weatherResult ? weatherResult.data.map(day => new Forecast(day.valid_date, day.weather.description)) : false;

  if(weatherArray){
    res.send(weatherArray); // send back weather stuff
  }else{
    res.status(404).json({error: 'Weather data not found'}); //return not found error
  }
}

//listen at open port (proof of life)
app.listen(PORT, () => console.log('I am alive!'));
