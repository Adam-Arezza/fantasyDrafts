import React from 'react'
import styled from 'styled-components'
import PlayerCard from './PlayerCard'

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

const PlayersStyled = styled.div`
display: flex;
padding: 10px;
margin: 10px;
`

class PlayerContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playersSorted: [],
            more: false,
            playerCards: []
        }
        this.playerCards = this.playerCards.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.playerData !== prevProps.playerData) {
            this.sortPlayerData()
        }
        if(this.state.playersSorted !== prevState.playersSorted){
            this.playerCards()
        }
    }

    sortPlayerData() {
        let playerLists = this.props.playerData
        let players = []
        playerLists.forEach(teamList => {
            // console.log(teamList)
            teamList.forEach(playerList => {
                // console.log(playerList)
                let playerIds = Object.keys(playerList)
                // console.log(playerIds)
                playerIds.forEach(player => {
                    let playerStats = playerList[player]
                    // console.log(playerStats)
                    if (playerStats.stats.skaterStats) {
                        players.push({
                            team: playerStats.person.currentTeam.name,
                            name: playerStats.person.fullName,
                            goals: playerStats.stats.skaterStats.goals,
                            assists: playerStats.stats.skaterStats.assists
                        })
                    }
                })
            })
        })
        // console.log(players)
        let sortedByPoints = players.sort((a, b) => ((a.goals + a.assists) > (b.goals + b.assists)) ? -1 : 1)
        let sortedByGoals = sortedByPoints.sort((a, b) => (a.goals > b.goals) ? -1 : 1)
        // console.log(sorted)
        this.setState({ playersSorted: sortedByGoals })
    }

    playerCards() {
        let playerCards = this.state.playersSorted.map((player, id) => {
            if (player.goals + player.assists > 0) {
                return (
                    <PlayerCard playerData={player} key={id}></PlayerCard>
                )
            }
            return null
        })
        this.setState({playerCards: playerCards})
    }

    render() {
        if(this.props.playerData.length === 0) {
            return null
        }
        
        return (
            <Container>
                <PlayersStyled>
                    {this.state.playerCards}
                </PlayersStyled>
            </Container>
        )
    }
}

export default PlayerContainer;
