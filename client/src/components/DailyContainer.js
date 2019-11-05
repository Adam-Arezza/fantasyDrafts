import React from 'react'
import styled from 'styled-components'
import GameCard from './GameCard'
import axios from 'axios'

const DailyStyled = styled.div`
display: flex;
flex-direction: row;
`


class DailyContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameIds: [],
            gameData: []
        }

    }

    updateGameData(data) {
        this.setState({gameData: [...this.state.gameData, data]})
    }

    updateGameIds(Id) {
        this.setState({gameIds: [...this.state.gameIds, Id]})
    }

    render() {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getUTCDate()
        const gameDate = year + '-' + (month + 1) + '-' + (day - 1)

        axios.get("https://statsapi.web.nhl.com/api/v1/schedule?date=" + gameDate)
            .then(res => {
                for (let i = 0; i < res.data.dates[0].games.length; i++) {
                    axios.get("https://statsapi.web.nhl.com/api/v1/game/" + res.data.dates[0].games[i].gamePk + "/boxscore")
                        .then(res => {
                            let awayTeam = res.data.teams.away.team.name
                            let homeTeam = res.data.teams.home.team.name
                            this.updateGameData({home: homeTeam, away: awayTeam})
                            console.log(this.state.gameData)
                            console.log("got the game data")
                        })
                        .catch(err => console.log(err))

                    this.updateGameIds(res.data.dates[0].games[i].gamePk)
                }
                console.log(this.state.gameIds)
            })
            .catch(err => console.log(err))
        return (
            <DailyStyled></DailyStyled>
        )
    }
}

// function DailyContainer() {
//     let gameIds = []
//     let gameData = []
//     const date = new Date()
//     const year = date.getFullYear()
//     const month = date.getMonth()
//     const day = date.getUTCDate()
//     const gameDate = year + '-' + (month + 1) + '-' + (day - 1)

//     axios.get("https://statsapi.web.nhl.com/api/v1/schedule?date=" + gameDate)
//         .then(res => {
//             for (let i = 0; i < res.data.dates[0].games.length; i++) {
//                 axios.get("https://statsapi.web.nhl.com/api/v1/game/" + res.data.dates[0].games[i].gamePk + "/boxscore")
//                 .then(res => {
//                             let awayTeam = res.data.teams.away.team.name
//                             let homeTeam = res.data.teams.home.team.name
//                             gameData.push({ home: homeTeam, away: awayTeam })
//                             console.log(gameData)
//                             console.log("got the game data")
//                         })
//                         .catch(err => console.log(err))

//                 gameIds.push(res.data.dates[0].games[i].gamePk)
//             }
//             console.log(gameIds)
//         })
//         .catch(err => console.log(err))


//     let gameCards = gameData.map(game => <GameCard gameData={game}></GameCard>)

//     //GET game data from previous day to display in GameCards
//     //data to show: teams, date, score, shots, hits OT/shootout

//     //game DATE format yyyy-mm-dd

//     //game ID format
//     //digits 1-4: year ex."2019"
//     //digits 5-6: gametype, preseason 01, regular season 02, playoffs 03, all-star 04
//     //digits 7-10: game number, 0000 to 1271
//     // axios.get('https://statsapi.web.nhl.com/api/v1/game/ID/boxscore')

//     //GET player data from previous day to display in PlayerCards
//     //data to show: name, team, goals, assists
//     //sort by highest points

//     return (
//         <DailyStyled>
//             {gameCards}
//         </DailyStyled>
//     )
// }

export default DailyContainer;
