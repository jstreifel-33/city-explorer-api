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
app.get('/*', (req, res) => res.status(500).json({ error: 'Server resource does not exist!' }));


//--SERVER DATA HANDLING
//Retrieve Weather data from weatherbit.io API
async function retrieveWeather(lat, lon) {
  return await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=7&units=I`);
}

//Retrieve Movie data from TMDB API
async function retrieveMovies(place) {
  return await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${place}&page=1&include_adult=false`);
}

//Return classes
class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.lowTemp = obj.low_temp;
    this.highTemp = obj.high_temp;
    this.description = obj.weather.description;
    this.icon = obj.weather.icon;
  }
}

class Movie {
  constructor(obj) {
    this.title = obj.title;
    this.description = obj.overview;
    this.posterUrl = `https://image.tmdb.org/t/p/w342${obj.poster_path}`;
    this.release = obj.release_date;
    this.averageVotes = obj.vote_average;
    this.totalVotes = obj.vote_count;
    this.popularity = obj.popularity;
  }
}

//--SERVER ACTIONS
//Handle weather information query
async function serveWeather(req, res) {
  const { lat, lon } = req.query;

  let weatherResponse = await retrieveWeather(lat, lon);
  let weatherData = weatherResponse.data.data;

  let forecastArray = weatherData ? weatherData.map(day => new Forecast(day)) : false;

  if (forecastArray) {
    res.send(forecastArray); // send back forecast array
  } else {
    res.status(404).json({ error: 'Weather data not found' }); //return not found error
  }
}

//Handle movie information query

async function serveMovie(req, res) {
  const { name } = req.query;
  try {
    let movieData = await retrieveMovies(name);
    let movieArray = movieData.data.results.map(movie => new Movie(movie));
    res.status(200).send(movieArray);
  } catch (e) {
    res.status(500).send('Something went wrong retrieving movie data. Please try again later.');
  }
}

//--HELLO SERVER
//Listen at open port (proof of life)
app.listen(PORT, () => console.log(`I am alive! Listening on port: ${process.env.PORT}`));
