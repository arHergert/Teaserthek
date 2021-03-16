const express = require('express')
const router = express.Router()

const movieController = require('../controller/movieController')

/* POST add movie */
router.post('/addmovie/', movieController.addmovie)

/* GET all added movies */
router.get('/getmovies/', movieController.getmovies)

/* DELETE all added movies */
router.delete('/deletemovies/', movieController.deletemovies)

/* POST all added movies */
// Query:
// limit - How many traiers you want to fetch
// Body:
// filters: Array - If filters Array is null, get with default settings
router.post('/getfilteredmovies/', movieController.getfilteredmovies)

module.exports = router
