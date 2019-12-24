const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const {rules, validate} = require('./validator')
const mongoose = require('mongoose')
const dbConfig = require('../server/config').get(process.env.NODE_ENV).db
const playersRouter = require('./routes/players')
const teamsRouter = require('./routes/teams')
const leaguesRouter =  require('./routes/leagues')
const authenticator = require('./authenticate').authenticated
const login = require('./routes/login').login
const register = require('./routes/register').register

mongoose.connect(dbConfig, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error...'))
db.on('open', ()=> console.log("database ready"))

app.use(bodyParser.json())
app.use(cors())
app.use('/login', login)
app.use('/register', rules(), validate, register)
app.use('/players', authenticator, playersRouter)
app.use('/teams', authenticator, teamsRouter)
app.use('/leagues', authenticator, leaguesRouter)

var port = process.env.PORT || 5000
app.listen(port, '0.0.0.0', () => console.log(`Listening on port: ${port}`))
