// IF UPDATING PLAYERS ONCE A DAY
// get a list of games from last night
// in last nights games, create an array of players if the player earned any points
// for each player that earned points, search the database for the player
// if a match is found, update the players points with the points earned from last night

// IF UPDATING PLAYERS LIVE DURING GAMES
// get a list of todays games
// start an interval at the beginning of the first game until the end of the last game
// at each interval, add players with points to an array
// check the db for a player match and update their points accordingly
// at the end of the last game stop the interval
//
const Player = require('./models/models').Player
const axios = require('axios')

let gamesUrl = "https://statsapi.web.nhl.com/api/v1/schedule?date="

let gamesToday
let playerTimeout
let playerInterval
let updateInterval
let playersToday
let gameInterval

const getGames = () => {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let dateQueryString = `${year}-${month}-20`

    axios.get(gamesUrl + dateQueryString)
        .then(res => {
            let gameIds = res.data.dates[0].games.map(game => game.gamePk)
            clearInterval(gameInterval)
            gamesToday = gameIds
            // make the timeout value equal to the difference between the current date and time
            // to when the first game of the night starts
            playerTimeout = setTimeout(() => getPlayers(gamesToday), 3000)
            return console.log(`The game Ids today are: ${gamesToday}`)
        })
        .catch(err => console.log(err))
}

const getPlayers = (games) => {
    playerInterval = setInterval(() => getPlayers(), 3000)
    let players = []
    let promises = []
    games.forEach(game => {
        promises.push(
            axios.get(`https://statsapi.web.nhl.com/api/v1/game/${game}/boxscore`)
                .then(res => {
                    let data = res.data.teams
                    let homePlayerKeys = Object.keys(data.home.players)
                    let awayPlayerKeys = Object.keys(data.away.players)
                    let homePlayerData = homePlayerKeys.map(pKey => {
                        let goals = 0
                        let assists = 0
                        let name = data.home.players[pKey].person.fullName

                        if (Object.keys(data.home.players[pKey].stats).includes("skaterStats")) {
                            goals = data.home.players[pKey].stats.skaterStats.goals
                            assists = data.home.players[pKey].stats.skaterStats.assists
                        }

                        let player = {
                            name: name,
                            goals: goals,
                            assists: assists
                        }
                        return player
                    })

                    let awayPlayerData = awayPlayerKeys.map(pKey => {
                        let goals = 0
                        let assists = 0
                        let name = data.away.players[pKey].person.fullName

                        if (Object.keys(data.away.players[pKey].stats).includes("skaterStats")) {
                            goals = data.away.players[pKey].stats.skaterStats.goals
                            assists = data.away.players[pKey].stats.skaterStats.assists
                        }

                        let player = {
                            name: name,
                            goals: goals,
                            assists: assists
                        }
                        return player
                    })
                    players.push(...homePlayerData, ...awayPlayerData)
                    playersToday = players
                })
                .catch(err => console.log(err))
        )
    })
    Promise.all(promises).then(() => {
        console.log("Got players")
        return updateInterval = setInterval(() => updatePlayers(playersToday), 3000)
    })
}

const updatePlayers = (players) => {
    console.log(players)
    // make the players stop updating after all games and final scores are completed
    players.forEach(player => {
        Player.updateOne({fullname: player.fullName}, {Goals: player.goals, Assists: player.assists}, (err, result) => {
            if(err) {
                console.log(err)
            }
            console.log(result)
        })
    })
}

// gameInterval = setInterval(() => getGames(), 5000)
module.exports = {
    gameInterval, getGames
}