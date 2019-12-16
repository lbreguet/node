var express = require('express');
var router = express.Router();

const controller = require('../controllers/movies.controller')

router.get('/:userId/movies/', controller.getAll)
router.get('/:userId/movies/:movieId', controller.getOne)
router.post('/:userId/movies/', controller.create)
router.delete('/:userId/movies/:movieId', controller.delete)

module.exports = router;
