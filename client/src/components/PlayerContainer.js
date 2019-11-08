import React from 'react'
import styled from 'styled-components'
import PlayerCard from './PlayerCard'

const PlayersStyled = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
align-items: center;
padding: 10px;
margin: 10px;
`

const ShiftBtn = styled.button`
background: black;
color: white;
border-radius: 5px;
border:none;
font-size: 1.1em;
padding:15px;
:hover {
    cursor:pointer;
    background: darkgrey;
}
`

class PlayerContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playersSorted: [],
            more: false,
            playerCards: [],
            sliceVal: [0, 5]
        }
        this.morePlayers = this.morePlayers.bind(this)
        this.lessPlayers = this.lessPlayers.bind(this)
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

    morePlayers() {
        let slice = this.state.sliceVal
        if (slice[1] === this.state.playerCards.length){
            return
        }
        slice[0] = slice[0] + 1
        slice[1] = slice[1] + 1
        this.setState({sliceVal: slice})
    }
    lessPlayers() {
        let slice = this.state.sliceVal
        if(slice[0] === 0){
            return
        }
        slice[0] = slice[0] - 1
        slice[1] = slice[1] - 1
        this.setState({sliceVal: slice})
    }

    render() {
        
        return (
            <div>
                <h2>Player points</h2>
                <PlayersStyled>
                    <ShiftBtn onClick={() => this.morePlayers()}>Shift</ShiftBtn>
                    {this.state.playerCards.slice(this.state.sliceVal[0], this.state.sliceVal[1])}
                    <ShiftBtn onClick={() => this.lessPlayers()}>Shift</ShiftBtn>
                </PlayersStyled>
            </div>
        )
    }
}

export default PlayerContainer;
