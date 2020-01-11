const League = require('../models/models').League

//need to handle db errors
exports.all = (req, res) => {
    let id = req.decoded.userId
    // console.log(id)
    League.find({Members: id}, function(err, leagues) {
        if(err) {
            console.log(err)
        }
        res.json(leagues)
    })
}

exports.create = (req, res) => {
    let id = req.decoded.userId
    let leagueOptions = req.body.options
    leagueOptions["Creator"] = id
    leagueOptions["Members"] = id
    console.log(leagueOptions)
    League.create({...leagueOptions}, function(err, league) {
        if(err) {
            console.log(err)
        }
        console.log(league)
        res.json(league)
    })
}

exports.joinLeague = (req, res) => {
    let id = req.decoded.userId
    let league = req.params.leagueId
    League.findByIdAndUpdate(league, {Members: id})
    .then(l => res.json({league: l, updated: true}))
    .catch(err => console.log(err))
}

exports.leaveLeague = (req, res) => {
    let id = req.decoded.userId
    let league = req.params.leagueId
    League.find({_id: league, Creator: id})
    // remove a user from a league
}

exports.delete = (req, res) => {
    let league = req.params.leagueId
    League.findByIdAndRemove(league)
    //delete a league
}