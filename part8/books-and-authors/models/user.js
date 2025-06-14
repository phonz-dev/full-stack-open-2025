const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    required: true
  },
  favoriteGenre: String
})

module.exports = mongoose.model('User', schema)
