import React from 'react'
import styled from 'styled-components'
import PlayerCard from './PlayerCard'

const PlayersStyled = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
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

class PlayerContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playersSorted: [],
            more: false
        }
        this.morePlayers = this.morePlayers.bind(this)
        this.lessPlayers = this.lessPlayers.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.playerData !== prevProps.playerData) {
            this.sortPlayerData()
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
                    if(playerStats.stats.skaterStats){
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
        let sortedByPoints = players.sort((a,b) => ((a.goals + a.assists) > (b.goals + b.assists)) ? -1 : 1)
        let sortedByGoals = sortedByPoints.sort((a,b) => (a.goals > b.goals) ? -1 : 1)
        // console.log(sorted)
        this.setState({playersSorted: sortedByGoals})
    }

    morePlayers() {
        this.setState({more: true})
    }
    lessPlayers() {
        this.setState({more: false})
    }

    render() {
        let playerCards = this.state.playersSorted.map((player, id) => {
            if(player.goals + player.assists > 0){
                return (
                    <PlayerCard playerData={player} key={id}></PlayerCard>
                )
            }
            return null
        })
        let topFour = playerCards.slice(0,5)
        return (
            <div>
                <PlayersStyled>
                    {this.state.more === false ? topFour : playerCards}
                </PlayersStyled>
                {this.state.more === true ? <ToggleBtn onClick={this.lessPlayers}>Less</ToggleBtn> : <ToggleBtn onClick={this.morePlayers}>More</ToggleBtn>}
            </div>
        )
    }
}

export default PlayerContainer;
