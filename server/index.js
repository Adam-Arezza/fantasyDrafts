const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const db = require('../server/config').get(process.env.NODE_ENV).db
const playersRouter = require('./routes/players')
const teamsRouter = require('./routes/teams')
const leaguesRouter =  require('./routes/leagues')
const authenticator = require('./authenticate')
const login = require('./routes/login').login
const register = require('./routes/register').register

app.use(bodyParser.json())
app.use(cors())
app.use('/login', login)
app.use('/register', register)
app.use('/players', authenticator.authenticated, playersRouter)
app.use('/teams', authenticator.authenticated, teamsRouter)
app.use('/leagues', authenticator.authenticated, leaguesRouter)

var port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', () => console.log("listening on port 3000"))
