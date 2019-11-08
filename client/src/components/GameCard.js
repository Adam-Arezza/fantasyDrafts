import React from 'react'
import styled from 'styled-components'

const GameCardStyled = styled.div`
border: solid black 2px;
border-radius: 10px;
margin:10px;
padding: 5px;
box-shadow: 5px 5px grey;
`
const Stats = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`
const GameStats = styled.div`
display: flex;
flex-direction: column;
`

function GameCard(props) {
    return (
        <GameCardStyled>
            <Stats>
                <GameStats>
                    <h3>{props.gameData.home}</h3>
                    <strong>
                        Goals: {props.gameData.homeStats.goals}
                    </strong>
                    <strong>
                        Shots: {props.gameData.homeStats.shots}
                    </strong>
                    <strong>
                        Hits: {props.gameData.homeStats.hits}
                    </strong>
                </GameStats>
                <strong>VS</strong>
                <GameStats>
                    <h3>{props.gameData.away}</h3>
                    <strong>
                        Goals: {props.gameData.awayStats.goals}
                    </strong>
                    <strong>
                        Shots: {props.gameData.awayStats.shots}
                    </strong>
                    <strong>
                        Hits: {props.gameData.awayStats.hits}
                    </strong>
                </GameStats>
            </Stats>
        </GameCardStyled>
    )
}

export default GameCard;
