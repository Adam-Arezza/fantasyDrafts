import React from 'react'
import styled from 'styled-components'
import GamesContainer from './GamesContainer'
import PlayerContainer from './PlayerContainer'
import axios from 'axios'

const DailyStyled = styled.div`
text-align: center;
`

class DailyContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameIds: [],
            playerData: []
        }
        this.updateGameIds = this.updateGameIds.bind(this)
        this.updatePlayerData = this.updatePlayerData.bind(this)
    }

    updateGameIds(Id) {
        this.setState({ gameIds: [...this.state.gameIds, Id] })
    }

    componentDidMount() {
        const date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getUTCDate()
        if(year === 2020 && month === 0 && day === 1){
            year = 2019
            day = 2
        }
        const gameDate = year + '-' + (month + 1) + '-' + (day - 1)

        axios.get("https://statsapi.web.nhl.com/api/v1/schedule?date=" + gameDate)
            .then(res => {
                for (let i = 0; i < res.data.dates[0].games.length; i++) {
                    this.updateGameIds(res.data.dates[0].games[i].gamePk)
                }
            })
            .catch(err => console.log(err))
    }
    updatePlayerData(data) {
        this.setState({ playerData: [...this.state.playerData, data] })
    }

    render() {

        return (
            <DailyStyled>
                <h1>Games last night</h1>
                <GamesContainer gameIds={this.state.gameIds} updatePlayerData={this.updatePlayerData}></GamesContainer>
                <h1>Player points</h1>
                <PlayerContainer playerData={this.state.playerData}></PlayerContainer>
            </DailyStyled>
        )
    }
}

export default DailyContainer;
