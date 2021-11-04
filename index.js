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

//--SERVER MODULES
let { serveWeather } = require('./server_modules/weather');
let { serveMovie } = require('./server_modules/movies');

//--SERVER PATHS
app.get('/hello', (req, res) => res.send('Hi there! :)'));
app.get('/weather', serveWeather);
app.get('/movies', serveMovie);
app.get('/*', (req, res) => res.status(500).json({ error: 'Server resource does not exist!' }));

//--HELLO SERVER
//Listen at open port (proof of life)
app.listen(PORT, () => console.log(`I am alive! Listening on port: ${PORT}`));
