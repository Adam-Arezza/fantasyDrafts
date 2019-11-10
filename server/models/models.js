const mongoose = require('mongoose');

let leagueSchema = mongoose.Schema({
    Title: { type: String, required: true },
    Teams: {
        Title: String,
        Players: [playerSchema],
        Points: Number
    }
});

let userSchema = mongoose.Schema({
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    Leagues: [String]
});

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

let Player = mongoose.model('Player', playerSchema);
let League = mongoose.model('League', leagueSchema);
let User = mongoose.model('User', userSchema);

module.exports.Player = Player;
module.exports.League = League;
module.exports.User = User;