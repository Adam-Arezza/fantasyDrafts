const express = require('express')
const models = require('./models/models')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const usersRouter = require('./routes/users')
const playersRouter = require('./routes/players')
const teamsRouter = require('./routes/teams')
const leaguesRouter =  require('./routes/leagues')

app.use(bodyParser.json())
app.use(cors())
app.use('/users', usersRouter)
app.use('/players', playersRouter)
app.use('/teams', teamsRouter)
app.use('/leagues', leaguesRouter)

var port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', () => console.log("listening on port 3000"))
