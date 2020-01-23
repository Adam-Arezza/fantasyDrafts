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

import axios from 'axios'


let gamesToday = []
let gamesChecked = []

const getGames = (url) => {
    axios.get(url)
    .then(res => {
        for (let i = 0; i < res.data.dates[0].games.length; i++) {
            gamesToday.push(res.data.dates[0].games[i].gamePk)
        }
    })
    .catch(err => console.log(err))
}

const getPlayerPoints = (games) => {
    games.forEach( game => {

    })
}


const gameScheduleUrl = "https://statsapi.web.nhl.com/api/v1/schedule?date="

let date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1
let day = date.getUTCDate()
let today = date.toLocaleDateString()
let time = date.toLocaleTimeString()