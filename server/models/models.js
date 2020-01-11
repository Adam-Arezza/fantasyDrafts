const mongoose = require('mongoose');

let playerSchema = mongoose.Schema({
    fullName: String,
    Goals: Number,
    Assists: Number,
    Points: Number,
    Wins: Number,
    Shutouts: Number,
    PlayingTonight: Boolean,
    Games: Number
});

let teamSchema = mongoose.Schema({
    Owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    League: { type: mongoose.Schema.Types.ObjectId, ref: 'League' },
    Name: {type: String, required: true},
    Players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
})

let leagueSchema = mongoose.Schema({
    Name: { type: String, required: true },
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    Teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    Forwards: {type: Number, required: true},
    Defense: {type: Number, required: true},
    Goalies: {type: Number, required: true},
    Goals: {type: Number, required: true},
    Assists: {type: Number, required: true},
    GoalieGoals: {type: Number, required: true},
    GoalieAssists: {type: Number, required: true},
    Shutout: {type: Number, required: true},
    Win: {type: Number, required: true},
    IR: {type: Number, required: true},
    DraftType: {type: String, required: true}
});

let userSchema = mongoose.Schema({
    Email: { type: String, required: true },
    Password: { type: String, required: true }
});

let Player = mongoose.model('Player', playerSchema);
let League = mongoose.model('League', leagueSchema);
let User = mongoose.model('User', userSchema);
let Team = mongoose.model('Team', teamSchema);

module.exports.Player = Player;
module.exports.League = League;
module.exports.User = User;
module.exports.Team = Team;
