const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  sender: mongoose.Types.ObjectId,
  receiver: mongoose.Types.ObjectId,
  content: {
    text: String,
    date: Date,
  }
})

module.exports = mongoose.model('Message', messageSchema)
