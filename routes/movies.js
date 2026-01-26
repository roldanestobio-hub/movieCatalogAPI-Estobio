const express = require('express');
const movieController = require('../controllers/movies');

const {verify, verifyAdmin} = require("../auth");

const router = express.Router();

router.post('/addMovie', verify, movieController.addMovie);

router.get('/getMovies', verify, verifyAdmin, movieController.getAllMovie);

router.get('/getMovie/:id', verify, movieController.getMovie);

router.patch('/updateMovie/:id', verify, movieController.updateMovie)

router.delete('/deleteMovie/:id', verify, verifyAdmin, movieController.deleteMovie)

router.patch('/addComment/:id', verify, movieController.addComment)

router.get('/getComments/:id', verify, movieController.getComments)

module.exports = router;