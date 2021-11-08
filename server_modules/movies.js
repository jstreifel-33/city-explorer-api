const axios = require('axios');

const { cache } = require('./cache.js');

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

async function retrieveMovies(place) {
  return await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${place}&page=1&include_adult=false`);
}

async function serveMovie(req, res) {
  const { name } = req.query;
  const key = 'movies-' + name;
  if (cache[key] && (Date.now() - cache[key].timestamp < 300000)) {
    console.log('movie cache hit');
    let movieArray = cache[key].data;
    res.status(200).send(movieArray);
  } else {
    console.log('movie cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    try {
      let movieData = await retrieveMovies(name);
      let movieArray = movieData.data.results.map(movie => new Movie(movie));
      cache[key].data = movieArray;
      res.status(200).send(movieArray);
    } catch (e) {
      res.status(500).send('Something went wrong retrieving movie data. Please try again later.');
    }
  }
}

module.exports = { serveMovie };