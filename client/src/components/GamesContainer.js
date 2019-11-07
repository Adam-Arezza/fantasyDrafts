import React from 'react'
import GameCard from './GameCard'
import styled from 'styled-components'
import axios from 'axios'


const Container = styled.div`
border-bottom: black solid 2px;
padding: 15px;
`

const GamesStyled = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items; center;
justify-content: center;
padding: 10px;
margin: 10px;
`

const ToggleBtn = styled.button`
background: black;
color: white;
border-radius: 5px;
border:none;
font-size: 1.1em;
padding:5px;
:hover {
    cursor:pointer;
    background: darkgrey;
}
`

class GamesContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameData: [],
            gameCount: 0,
            loading: false,
            more: false
        }
        this.updateGameData = this.updateGameData.bind(this)
        this.getGameData = this.getGameData.bind(this)
        this.moreGames = this.moreGames.bind(this)
        this.lessGames = this.lessGames.bind(this)
    }

    updateGameData(data) {
        this.setState({ gameData: [...this.state.gameData, data] })
    }

    componentDidMount() {
        this.getGameData()
    }

    getGameData() {
        let count = this.state.gameCount
        if (this.props.gameIds.length === 0) {
            this.setState({ loading: true })
        }
        if (this.props.gameIds.length > 0) {
            axios.get("https://statsapi.web.nhl.com/api/v1/game/" + this.props.gameIds[count] + "/boxscore")
                .then(res => {
                    let awayTeam = res.data.teams.away.team.name
                    let homeTeam = res.data.teams.home.team.name
                    let homeStats = res.data.teams.home.teamStats.teamSkaterStats
                    let awayStats = res.data.teams.away.teamStats.teamSkaterStats
                    let homePlayers = res.data.teams.home.players
                    let awayPlayers = res.data.teams.away.players
                    this.updateGameData({ home: homeTeam, homeStats: homeStats, away: awayTeam, awayStats })
                    this.props.updatePlayerData([homePlayers, awayPlayers])
                })
                .catch(err => console.log(err))
            this.setState({ gameCount: this.state.gameCount + 1 })
            this.setState({ loading: false })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.gameIds !== prevProps.gameIds) {
            this.getGameData()
        }
    }

    moreGames() {
        this.setState({ more: true })
    }

    lessGames() {
        this.setState({ more: false })
    }

    render() {
        if (this.state.loading === true) {
            return (
                <GamesStyled>
                    <p>Getting games...</p>
                </GamesStyled>
            )
        }
        else {
            let gameCards = this.state.gameData.map((game, id) => <GameCard gameData={game} key={id}></GameCard>)
            let firstFour = gameCards.slice(0, 4)
            return (
                <Container>
                    <h2>Latest Games</h2>
                    <GamesStyled>
                        {this.state.more === true ? gameCards : firstFour}
                    </GamesStyled>
                    {this.state.more === true ? <ToggleBtn onClick={this.lessGames}>Less</ToggleBtn> : <ToggleBtn onClick={this.moreGames}>More</ToggleBtn>}
                </Container>
            )
        }
    }
}

export default GamesContainer;
