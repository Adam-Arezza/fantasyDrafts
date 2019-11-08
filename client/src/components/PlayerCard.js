import React from 'react'
import styled from 'styled-components'

const PlayStyled = styled.div`
border: solid black 2px;
border-radius: 10px;
margin:10px;
padding: 5px;
display: flex;
flex-direction: column;
box-shadow: 5px 5px grey;
`

function PlayerCard(props) {
    return (
        <PlayStyled>
            <strong>Team: {props.playerData.team}</strong>
            <strong>Name: {props.playerData.name}</strong>
            <strong>Points: {props.playerData.goals + props.playerData.assists}</strong>
            <strong>Goals: {props.playerData.goals}</strong>
            <strong>Assists: {props.playerData.assists}</strong>
        </PlayStyled>
    )
}

export default PlayerCard;
