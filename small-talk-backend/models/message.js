const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  context: { sender: String, receiver: String },
  message: String,
  date: Date,
  read: Boolean,
})

module.exports = mongoose.model('Message', messageSchema)
