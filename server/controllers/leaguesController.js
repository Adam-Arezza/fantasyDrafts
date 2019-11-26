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
    if(!req.query.league) {
        //handle if there is no query string with leagueID
    }
    else{
        let league = req.query.leagueId
    }
}

exports.leaveLeague = (req, res) => {

}

exports.remove = (req, res) => {

}