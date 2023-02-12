require('dotenv').config()

const express = require('express')
const router = express.Router()
const Message = require('../models/message')
const User = require('../models/user')

router.get('/', async (req, res) => {
  try {
    const chats = await Chat.find()
    res.json(chats)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:uid', async (req, res) => {
  try {
    const uid = req.params.uid
    const users = await User.aggregate([
      {
        $match: {
          $expr: {
            $in: [uid, '$contacts']
          }
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          firstname: 1,
          lastname: 1,
          picture: 1
        }
      }
    ])
    
    const userIds = users.map(user => user._id)

    const lastmessage = await Message.find({
      $or: [
        { $and: [ { "sender": uid }, { "receiver": { $in: userIds } } ] },
        { $and: [ { "receiver": uid }, { "sender": { $in: userIds } } ] }
      ]
    }).sort({ "content.date": -1 }).limit(1)

    //Referenciados
    const Nuvo = users.map(user => {
      const message = lastmessage.find(m => m.sender === user._id.toString() || m.receiver === user._id.toString());
      return {
        _id: user._id,
        picture: user.picture,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        message: message || {}
      };
    });    

    //Console log

    // Nuvo.forEach(user => {
    //   console.log(user.message);
    // });
    

    console.log(Nuvo)
    res.json(lastmessage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
