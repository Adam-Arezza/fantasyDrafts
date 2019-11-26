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

let teamSchema = mongooose.Schema({
    Owner: { type: Schema.Types.ObjectId, ref: 'User' },
    League: { type: Schema.Types.ObjectId, ref: 'League' },
    Players: [{ type: Schema.Types.ObjectId, ref: 'Player' }]
})

let leagueSchema = mongoose.Schema({
    Name: { type: String, required: true },
    Creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    Members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
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
