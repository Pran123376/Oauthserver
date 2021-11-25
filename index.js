require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const router = require('./routes/route')
const db = require('./db/db')

db.authenticate()
  .then(() => console.log('DB Success.'))
  .catch(() => console.log('DB Error.'))

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', router)

app.use('/', (req, res) => {
  return res.send('Auth Server.')
})

app.listen(port, () => {
  console.log(`Auth Server live at ${port}`)
})