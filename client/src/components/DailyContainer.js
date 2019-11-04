import React from 'react'
import styled from 'styled-components'
import GamrCard from './GameCard'
import axios from 'axios'

const DailyStyled = styled.div`
display: flex;
flex-direction: row;
`

function DailyContainer() {
    let games = []
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getUTCDate()
    const gameDate = year + '-' + month + '-' + (day - 1)

    //GET game data from previous day to display in GameCards
    //data to show: teams, date, score, shots, hits OT/shootout

    //game DATE format yyyy-mm-dd
    //axios.get(https://statsapi.web.nhl.com/api/v1/schedule?date=DATE)
    
    //game ID format
    //digits 1-4: year ex."2019"
    //digits 5-6: gametype, preseason 01, regular season 02, playoffs 03, all-star 04
    //digits 7-10: game number, 0000 to 1271
    // axios.get('https://statsapi.web.nhl.com/api/v1/game/ID/boxscore')

    //GET player data from previous day to display in PlayerCards
    //data to show: name, team, goals, assists
    //sort by highest points
    
    return (
        <DailyStyled>

        </DailyStyled>
    )
}

export default DailyContainer;
