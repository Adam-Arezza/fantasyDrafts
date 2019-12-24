const Player = require('../models/models').Player
const Team = require('../models/models').Team

exports.player = (req, res) => {
    let player = req.player
    Player.find(player)
    .then(player => res.json({player: player}))
    .catch(err => console.log(err))
}

exports.add = (req, res) => {
    let player = req.player
    let team = req.params.teamId
    Team.find(team)
    //add a specified player to a specified team
}

exports.remove = (req, res) => {
    let player = req.player
    let team = req.params.teamId
    Team.find(team)
    // remove specified player from specified team
}