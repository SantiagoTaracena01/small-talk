require('dotenv').config()

//yarn add ejs method-override multer multer-gridfs-storage

const mongoose = require('mongoose')
const Grid = require("gridfs-stream")
const fs = require("fs")
const multer = require("multer")
const GridFsStorage = require("multer-gridfs-storage")
const crypto = require('crypto')
const methodOverride = require('method-override')

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Small Talk API',
    status: 'OK',
  })
})

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const chatsRouter = require('./routes/messages')
app.use('/messages', chatsRouter)

app.listen(process.env.API_PORT || 4000, () => console.log('Server is running.'))

app.use(methodOverride('_method'))

let gfs
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo)
  gfs.collection('users')
})

var storage = new GridFsStorage({
  url: 'cambiar a link de base de datos',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'users'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

app.post('/upload', upload.single('ppPictureFile'), (req,res) => {
  
}) 