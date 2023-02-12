const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  context: { message: String, date: Date },
})

module.exports = mongoose.model('Message', messageSchema)
