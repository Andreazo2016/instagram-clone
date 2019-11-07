const Mongoose = require('mongoose')

const CommentSchema = new Mongoose.Schema({
  text: String
})

module.exports = Mongoose.model('Comment', CommentSchema)
