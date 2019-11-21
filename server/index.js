const express = require('express')
const models = require('./models/models')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(cors())

var port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', () => console.log("listening on port 3000"))