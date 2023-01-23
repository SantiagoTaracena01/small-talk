const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(process.env.API_PORT || 4000, () =>
  console.log('Server is running...'),
)
