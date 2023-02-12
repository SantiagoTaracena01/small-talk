const mongoose = require('mongoose')

const messageContentSchema = new mongoose.Schema({
  text: String,
  date: Date,
})

module.exports = mongoose.model('MessageContent', messageContentSchema)
