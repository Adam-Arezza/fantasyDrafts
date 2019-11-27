const Team = require('../models/models').Team

//need error handling
exports.all = (req, res) => {
    let id = req.user
    Team.find({_id: id})
    .then(teams => res.json({teams}))
    .catch(err => console.log(err))
}

exports.team = (req, res) => {
    let team = req.params.teamId
    Team.findById(team)
    .then(t => res.json({t}))
    .catch(err => console.log(err))
}

exports.create = (req, res) => {
    let id = req.user
    let league = req.params.league
    Team.create({Owner: id, League: league, Players: []})
    .then(team => res.json({createdTeam: 'created new team', owned: team.Owner}))
    .catch(err => console.log(err))
}

exports.remove = (req, res) => {
    let id = req.user
    let team = req.params.teamId
    Team.remove({Owner: id, _id: team})
    .then(removed => res.json({team: team, removed: removed}))
    .catch(err => console.log(err))
}