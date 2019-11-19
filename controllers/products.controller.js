const model = require('../models/product')

exports.getAll = function(req, res, next) {
  let products = model.getProducts()
  res.json({data: products})
}