const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  sender: mongoose.Types.ObjectId,
  receiver: mongoose.Types.ObjectId,
  content: { type: mongoose.Types.ObjectId, ref: 'MessageContent' }
})

module.exports = mongoose.model('Message', messageSchema)
