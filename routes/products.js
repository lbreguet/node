var express = require('express');
var router = express.Router();

const controller = require('../controllers/products.controller')

router.get('/', controller.getAll)

module.exports = router;
