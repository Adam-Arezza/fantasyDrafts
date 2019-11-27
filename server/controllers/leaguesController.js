const League = require('../models/models').League

//need to handle db errors
exports.all = (req, res) => {
    let id = req.user
    League.find({Members: id})
    .then(leagues => res.json(leagues))
    .catch(err => console.log(err))
}

exports.create = (req, res) => {
    let id = req.user
    let name = req.body.name
    League.create({Name: name, Creator: id})
    .then(league => res.json({createdLeague: league}))
    .catch(err => console.log(err))
}

exports.joinLeague = (req, res) => {
    let id = req.user
    let league = req.params.leagueId
    League.findByIdAndUpdate(league, {Members: id})
    .then(l => res.json({league: l, updated: true}))
    .catch(err => console.log(err))
}

exports.leaveLeague = (req, res) => {
    let id = req.user
    let league = req.params.leagueId
    League.find({_id: league, Creator: id})
    // remove a user from a league
}

exports.delete = (req, res) => {
    let id = req.user
    let league = req.params.leagueId
    League.findByIdAndRemove(league)
    //delete a league
}