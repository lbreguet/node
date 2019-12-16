const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    genre: String,
    img: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Movie', movieSchema);
