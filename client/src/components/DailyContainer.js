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
            gameIds: []
        }
        this.updateGameIds = this.updateGameIds.bind(this)
    }

    updateGameIds(Id) {
        this.setState({ gameIds: [...this.state.gameIds, Id] })
    }

    componentDidMount() {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getUTCDate()
        const gameDate = year + '-' + (month + 1) + '-' + (day - 1)

        axios.get("https://statsapi.web.nhl.com/api/v1/schedule?date=" + gameDate)
            .then(res => {
                for (let i = 0; i < res.data.dates[0].games.length; i++) {
                    this.updateGameIds(res.data.dates[0].games[i].gamePk)
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        
        return (
            <DailyStyled>
                <GamesContainer gameIds={this.state.gameIds}></GamesContainer>
                <PlayerContainer></PlayerContainer>
            </DailyStyled>
        )
    }
}

export default DailyContainer;
