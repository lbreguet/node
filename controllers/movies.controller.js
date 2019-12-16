const Movie = require('../models/movie')
const User = require('../models/user')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAll = async function(req, res) {
    try {
        let movies = await Movie.find({user: new ObjectId(req.params.userId)})
        res.json({data: movies})
    } catch (error) {
        res.json({error: error})
    }
}

module.exports.getOne = async function(req, res) {
    try {
        let movie = await Movie.findOne({user: new ObjectId(req.params.userId), _id: new ObjectId(req.params.movieId)})
        res.json({data: movie})
    } catch (error) {
        res.end({error: error})
    }
}

module.exports.create = async function(req, res) {
    try {
        let movie = new Movie(req.body)
        let newMovie = await movie.save()
        res.statusCode = 201
        res.json({data: {id: newMovie._id, message: "Created ok"}})
    } catch (error) {
        console.log(error)
        res.end({error: error})
    }
}

module.exports.delete = async function (req, res) {
    try {
        let movie = await Movie.findByIdAndDelete({ user: new ObjectId(req.params.userId), _id: new ObjectId(req.params.movieId) })
    } catch (error) {
        console.log(error)
        res.send({error:error})
    }
}