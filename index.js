const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3001
const router = require('./routes/index')

const db = require('./db')
db.authenticate()
  .then(() => console.log('DB Error.'))
  .catch(() => console.log('DB Success.'))

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router)

app.use('/', (req, res) => {
  res.send('Hello From Auth Server.')
})

app.listen(port, () => {
  console.log(`Auth Server live at http://localhost:${port}`)
})