import React from 'react'
import styled from 'styled-components'

const PlayStyled = styled.div`
border: solid black 2px;
border-radius: 10px;
margin: 10px;
box-shadow: 5px 5px grey;
min-width: 20%;
@media only screen and (max-width: 600px){
    min-width: 45%;
}
`
const Content = styled.div`
display: flex;
flex-direction: column;
`

function PlayerCard(props) {
    return (
        <PlayStyled>
            <Content>
                <p><strong>Team:</strong> {props.playerData.team}</p>
                <p><strong>Name:</strong> {props.playerData.name}</p>
                <p><strong>Points:</strong> {props.playerData.goals + props.playerData.assists}</p>
                <p><strong>Goals: </strong>{props.playerData.goals}</p>
                <p><strong>Assists: </strong>{props.playerData.assists}</p>
            </Content>
        </PlayStyled>
    )
}

export default PlayerCard;
