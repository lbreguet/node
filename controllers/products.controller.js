const Product = require('../models/product')

module.exports.getAll = async function(req, res) {
    try { 
        console.log("bahh")
        let products = Product.find({},function(err, products) {
        console.log(err)
        res.json({data: products})

        })

    } catch (error) {
        console.log(error)
        res.json({error: error})
    }
}






module.exports.getOne = async function(req, res) {
        try { 
  let product = await Product.findById(req.params.productId)
  res.json({data: product})
      } catch (error) {
        console.log(error)
        res.end({error: error})
    }
}

module.exports.create = async function(req, res) {
        try { 
  let product = new Product(req.body)
  let newProduct = await product.save()
  res.statusCode = 201
  res.json({data: {id: newProduct._id, message: "Created ok"}})
      } catch (error) {
        console.log(error)
        res.end({error: error})
    }
}