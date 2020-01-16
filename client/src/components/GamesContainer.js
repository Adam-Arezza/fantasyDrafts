import React from 'react'
import GameCard from './GameCard'
import styled from 'styled-components'
import axios from 'axios'


const Container = styled.div`
    overflow-x: auto;
    margin-right: 15px;
    margin-left: 8px;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        background: lightgrey;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: black;
        border-radius: 10px;
    }
`

const GamesStyled = styled.div`
    display: flex;
`

class GamesContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameData: [],
            gameCount: 0,
            loading: false,
            more: false,
            sliceVal: [0, 4],
            gameCards: []
        }
        this.updateGameData = this.updateGameData.bind(this)
        this.getGameData = this.getGameData.bind(this)
        this.gameCards = this.gameCards.bind(this)
    }

    updateGameData(data) {
        this.setState({ gameData: [...this.state.gameData, data] })
    }

    componentDidMount() {
        this.getGameData()
    }

    getGameData() {
        delete axios.defaults.headers.Authorization
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

    componentDidUpdate(prevProps, prevState) {
        if (this.props.gameIds !== prevProps.gameIds) {
            this.getGameData()
        }
        if (this.state.gameCards === prevState.gameCards) {
            this.gameCards()
        }

    }

    gameCards() {
        let gameCards = this.state.gameData.map((game, id) => <GameCard gameData={game} key={id}></GameCard>)
        this.setState({ gameCards: gameCards })
    }

    render() {
        if (this.state.loading === true && this.props.gameIds.length === 0) {
            return (
                <GamesStyled>
                    <p>No games last night...</p>
                </GamesStyled>
            )
        }

        if (this.state.loading === true) {
            return (
                <GamesStyled>
                    <p>Getting games...</p>
                </GamesStyled>
            )
        }

        else {
            return (
                <Container>
                    <GamesStyled>
                        {this.state.gameCards}
                    </GamesStyled>
                </Container>
            )
        }
    }
}

export default GamesContainer;
