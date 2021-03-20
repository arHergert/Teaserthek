const FilterPipeline = require('../helper/FilterPipeline')
const Movie = require('../models/movie')

exports.addmovie = (req, res) => {
  const newMovie = new Movie({
    name: req.body.name,
    videoUrl: req.body.videoUrl,
    releaseDate:
      req.body.releaseDate !== undefined
        ? new Date(req.body.releaseDate)
        : undefined,
    genres: req.body.genres,
    language: req.body.language,
    tmdb_id: req.body.tmdb_id,
    spoilerTimeStamp: req.body.spoilerTimeStamp
  })
  newMovie
    .save()
    .then(movie => res.status(201).send('Movie added'))
    .catch(e => console.error(e))
}

exports.getmovies = (req, res) => {
  Movie.find()
    .then(movies => res.status(200).send(movies))
    .catch(e => console.error(e))
}

exports.deletemovies = (req, res) => {
  Movie.deleteMany({})
    .then(response => res.status(204).send('All movie entries deleted'))
    .catch(e => console.error(e))
}

exports.getfilteredmovies = (req, res) => {
  try {
    const limit = req.query.limit !== undefined ? parseInt(req.query.limit) : 25
    Movie.find()
      .then(movies => {
        // Create Pipeline
        const pipe = new FilterPipeline(movies, limit, req.body.filters)
        // Send the filtered movie playlist
        res.status(200).send(pipe.getFilteredMovies())
      })
      .catch(e => console.error(e))
  } catch (error) {
    console.error(error)
  }
}
