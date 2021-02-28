const express = require('express')
const router = express.Router()

const movieController = require('../controller/movieController')

/* POST add movie */
router.post('/addmovie/', movieController.addmovie)

/* GET all added movies */
router.get('/getmovies/', movieController.getmovies)

/* DELETE all added movies */
router.delete('/deletemovies/', movieController.deletemovies)

/* GET all added movies */
// Parameter:
// filters: Array - If filters Array is null, get with default settings
router.get('/getfilteredmovies/', movieController.getmovies)

module.exports = router
